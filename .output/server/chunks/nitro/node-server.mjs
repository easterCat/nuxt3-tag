globalThis._importMeta_=globalThis._importMeta_||{url:"file:///_entry.js",env:process.env};import 'node-fetch-native/polyfill';
import { Server as Server$1 } from 'http';
import { Server } from 'https';
import destr from 'destr';
import { eventHandler, setHeaders, sendRedirect, defineEventHandler, handleCacheHeaders, createEvent, getRequestHeader, getRequestHeaders, setResponseHeader, createError, lazyEventHandler, createApp, createRouter as createRouter$1, toNodeListener } from 'h3';
import { createFetch as createFetch$1, Headers } from 'ofetch';
import { createCall, createFetch } from 'unenv/runtime/fetch/index';
import { createHooks } from 'hookable';
import { snakeCase } from 'scule';
import { hash } from 'ohash';
import { parseURL, withQuery, joinURL, withLeadingSlash, withoutTrailingSlash } from 'ufo';
import { createStorage } from 'unstorage';
import defu from 'defu';
import { toRouteMatcher, createRouter } from 'radix3';
import { promises } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'pathe';
import { createIPX, createIPXMiddleware } from 'ipx';

const _runtimeConfig = {"app":{"baseURL":"/nuxt3-tag","buildAssetsDir":"/_nuxt/","cdnURL":""},"nitro":{"routeRules":{"/__nuxt_error":{"cache":false}},"envPrefix":"NUXT_"},"public":{"API_DATA_FROM":"database","FLASK_BASE_API":"http://www.ptg.life/stable/api","GELBOORU_TOKEN":"b8d9e7d1fa1dcc3e5116760c093be229"},"ipx":{"dir":"","domains":[],"sharp":{},"alias":{}}};
const ENV_PREFIX = "NITRO_";
const ENV_PREFIX_ALT = _runtimeConfig.nitro.envPrefix ?? process.env.NITRO_ENV_PREFIX ?? "_";
const getEnv = (key) => {
  const envKey = snakeCase(key).toUpperCase();
  return destr(process.env[ENV_PREFIX + envKey] ?? process.env[ENV_PREFIX_ALT + envKey]);
};
function isObject(input) {
  return typeof input === "object" && !Array.isArray(input);
}
function overrideConfig(obj, parentKey = "") {
  for (const key in obj) {
    const subKey = parentKey ? `${parentKey}_${key}` : key;
    const envValue = getEnv(subKey);
    if (isObject(obj[key])) {
      if (isObject(envValue)) {
        obj[key] = { ...obj[key], ...envValue };
      }
      overrideConfig(obj[key], subKey);
    } else {
      obj[key] = envValue ?? obj[key];
    }
  }
}
overrideConfig(_runtimeConfig);
const config$1 = deepFreeze(_runtimeConfig);
const useRuntimeConfig = () => config$1;
function deepFreeze(object) {
  const propNames = Object.getOwnPropertyNames(object);
  for (const name of propNames) {
    const value = object[name];
    if (value && typeof value === "object") {
      deepFreeze(value);
    }
  }
  return Object.freeze(object);
}

const globalTiming = globalThis.__timing__ || {
  start: () => 0,
  end: () => 0,
  metrics: []
};
const timingMiddleware = eventHandler((event) => {
  const start = globalTiming.start();
  const _end = event.res.end;
  event.res.end = function(chunk, encoding, cb) {
    const metrics = [["Generate", globalTiming.end(start)], ...globalTiming.metrics];
    const serverTiming = metrics.map((m) => `-;dur=${m[1]};desc="${encodeURIComponent(m[0])}"`).join(", ");
    if (!event.res.headersSent) {
      event.res.setHeader("Server-Timing", serverTiming);
    }
    _end.call(event.res, chunk, encoding, cb);
    return this;
  }.bind(event.res);
});

const _assets = {

};

function normalizeKey(key) {
  if (!key) {
    return "";
  }
  return key.replace(/[/\\]/g, ":").replace(/:+/g, ":").replace(/^:|:$/g, "");
}

const assets$1 = {
  getKeys() {
    return Promise.resolve(Object.keys(_assets))
  },
  hasItem (id) {
    id = normalizeKey(id);
    return Promise.resolve(id in _assets)
  },
  getItem (id) {
    id = normalizeKey(id);
    return Promise.resolve(_assets[id] ? _assets[id].import() : null)
  },
  getMeta (id) {
    id = normalizeKey(id);
    return Promise.resolve(_assets[id] ? _assets[id].meta : {})
  }
};

const storage = createStorage({});

const useStorage = () => storage;

storage.mount('/assets', assets$1);

const config = useRuntimeConfig();
const _routeRulesMatcher = toRouteMatcher(createRouter({ routes: config.nitro.routeRules }));
function createRouteRulesHandler() {
  return eventHandler((event) => {
    const routeRules = getRouteRules(event);
    if (routeRules.headers) {
      setHeaders(event, routeRules.headers);
    }
    if (routeRules.redirect) {
      return sendRedirect(event, routeRules.redirect.to, routeRules.redirect.statusCode);
    }
  });
}
function getRouteRules(event) {
  event.context._nitro = event.context._nitro || {};
  if (!event.context._nitro.routeRules) {
    const path = new URL(event.req.url, "http://localhost").pathname;
    event.context._nitro.routeRules = getRouteRulesForPath(path);
  }
  return event.context._nitro.routeRules;
}
function getRouteRulesForPath(path) {
  return defu({}, ..._routeRulesMatcher.matchAll(path).reverse());
}

const defaultCacheOptions = {
  name: "_",
  base: "/cache",
  swr: true,
  maxAge: 1
};
function defineCachedFunction(fn, opts) {
  opts = { ...defaultCacheOptions, ...opts };
  const pending = {};
  const group = opts.group || "nitro";
  const name = opts.name || fn.name || "_";
  const integrity = hash([opts.integrity, fn, opts]);
  const validate = opts.validate || (() => true);
  async function get(key, resolver) {
    const cacheKey = [opts.base, group, name, key + ".json"].filter(Boolean).join(":").replace(/:\/$/, ":index");
    const entry = await useStorage().getItem(cacheKey) || {};
    const ttl = (opts.maxAge ?? opts.maxAge ?? 0) * 1e3;
    if (ttl) {
      entry.expires = Date.now() + ttl;
    }
    const expired = entry.integrity !== integrity || ttl && Date.now() - (entry.mtime || 0) > ttl || !validate(entry);
    const _resolve = async () => {
      if (!pending[key]) {
        entry.value = void 0;
        entry.integrity = void 0;
        entry.mtime = void 0;
        entry.expires = void 0;
        pending[key] = Promise.resolve(resolver());
      }
      entry.value = await pending[key];
      entry.mtime = Date.now();
      entry.integrity = integrity;
      delete pending[key];
      if (validate(entry)) {
        useStorage().setItem(cacheKey, entry).catch((error) => console.error("[nitro] [cache]", error));
      }
    };
    const _resolvePromise = expired ? _resolve() : Promise.resolve();
    if (opts.swr && entry.value) {
      _resolvePromise.catch(console.error);
      return Promise.resolve(entry);
    }
    return _resolvePromise.then(() => entry);
  }
  return async (...args) => {
    const key = (opts.getKey || getKey)(...args);
    const entry = await get(key, () => fn(...args));
    let value = entry.value;
    if (opts.transform) {
      value = await opts.transform(entry, ...args) || value;
    }
    return value;
  };
}
const cachedFunction = defineCachedFunction;
function getKey(...args) {
  return args.length ? hash(args, {}) : "";
}
function defineCachedEventHandler(handler, opts = defaultCacheOptions) {
  const _opts = {
    ...opts,
    getKey: (event) => {
      const url = event.req.originalUrl || event.req.url;
      const friendlyName = decodeURI(parseURL(url).pathname).replace(/[^a-zA-Z0-9]/g, "").substring(0, 16);
      const urlHash = hash(url);
      return `${friendlyName}.${urlHash}`;
    },
    validate: (entry) => {
      if (entry.value.code >= 400) {
        return false;
      }
      if (entry.value.body === void 0) {
        return false;
      }
      return true;
    },
    group: opts.group || "nitro/handlers",
    integrity: [
      opts.integrity,
      handler
    ]
  };
  const _cachedHandler = cachedFunction(async (incomingEvent) => {
    const reqProxy = cloneWithProxy(incomingEvent.req, { headers: {} });
    const resHeaders = {};
    let _resSendBody;
    const resProxy = cloneWithProxy(incomingEvent.res, {
      statusCode: 200,
      getHeader(name) {
        return resHeaders[name];
      },
      setHeader(name, value) {
        resHeaders[name] = value;
        return this;
      },
      getHeaderNames() {
        return Object.keys(resHeaders);
      },
      hasHeader(name) {
        return name in resHeaders;
      },
      removeHeader(name) {
        delete resHeaders[name];
      },
      getHeaders() {
        return resHeaders;
      },
      end(chunk, arg2, arg3) {
        if (typeof chunk === "string") {
          _resSendBody = chunk;
        }
        if (typeof arg2 === "function") {
          arg2();
        }
        if (typeof arg3 === "function") {
          arg3();
        }
        return this;
      },
      write(chunk, arg2, arg3) {
        if (typeof chunk === "string") {
          _resSendBody = chunk;
        }
        if (typeof arg2 === "function") {
          arg2();
        }
        if (typeof arg3 === "function") {
          arg3();
        }
        return this;
      },
      writeHead(statusCode, headers2) {
        this.statusCode = statusCode;
        if (headers2) {
          for (const header in headers2) {
            this.setHeader(header, headers2[header]);
          }
        }
        return this;
      }
    });
    const event = createEvent(reqProxy, resProxy);
    event.context = incomingEvent.context;
    const body = await handler(event) || _resSendBody;
    const headers = event.res.getHeaders();
    headers.etag = headers.Etag || headers.etag || `W/"${hash(body)}"`;
    headers["last-modified"] = headers["Last-Modified"] || headers["last-modified"] || new Date().toUTCString();
    const cacheControl = [];
    if (opts.swr) {
      if (opts.maxAge) {
        cacheControl.push(`s-maxage=${opts.maxAge}`);
      }
      if (opts.staleMaxAge) {
        cacheControl.push(`stale-while-revalidate=${opts.staleMaxAge}`);
      } else {
        cacheControl.push("stale-while-revalidate");
      }
    } else if (opts.maxAge) {
      cacheControl.push(`max-age=${opts.maxAge}`);
    }
    if (cacheControl.length) {
      headers["cache-control"] = cacheControl.join(", ");
    }
    const cacheEntry = {
      code: event.res.statusCode,
      headers,
      body
    };
    return cacheEntry;
  }, _opts);
  return defineEventHandler(async (event) => {
    if (opts.headersOnly) {
      if (handleCacheHeaders(event, { maxAge: opts.maxAge })) {
        return;
      }
      return handler(event);
    }
    const response = await _cachedHandler(event);
    if (event.res.headersSent || event.res.writableEnded) {
      return response.body;
    }
    if (handleCacheHeaders(event, {
      modifiedTime: new Date(response.headers["last-modified"]),
      etag: response.headers.etag,
      maxAge: opts.maxAge
    })) {
      return;
    }
    event.res.statusCode = response.code;
    for (const name in response.headers) {
      event.res.setHeader(name, response.headers[name]);
    }
    return response.body;
  });
}
function cloneWithProxy(obj, overrides) {
  return new Proxy(obj, {
    get(target, property, receiver) {
      if (property in overrides) {
        return overrides[property];
      }
      return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
      if (property in overrides) {
        overrides[property] = value;
        return true;
      }
      return Reflect.set(target, property, value, receiver);
    }
  });
}
const cachedEventHandler = defineCachedEventHandler;

const script = "\"use strict\";const w=window,de=document.documentElement,knownColorSchemes=[\"dark\",\"light\"],preference=window.localStorage.getItem(\"nuxt-color-mode\")||\"Sunset\";let value=preference===\"system\"?getColorScheme():preference;const forcedColorMode=de.getAttribute(\"data-color-mode-forced\");forcedColorMode&&(value=forcedColorMode),addColorScheme(value),w[\"__NUXT_COLOR_MODE__\"]={preference,value,getColorScheme,addColorScheme,removeColorScheme};function addColorScheme(e){const o=\"\"+e+\"-mode\",t=\"theme\";de.classList?de.classList.add(o):de.className+=\" \"+o,t&&de.setAttribute(\"data-\"+t,e)}function removeColorScheme(e){const o=\"\"+e+\"-mode\",t=\"theme\";de.classList?de.classList.remove(o):de.className=de.className.replace(new RegExp(o,\"g\"),\"\"),t&&de.removeAttribute(\"data-\"+t)}function prefersColorScheme(e){return w.matchMedia(\"(prefers-color-scheme\"+e+\")\")}function getColorScheme(){if(w.matchMedia&&prefersColorScheme(\"\").media!==\"not all\"){for(const e of knownColorSchemes)if(prefersColorScheme(\":\"+e).matches)return e}return\"light\"}\n";

const _vkr4xntkTJ = (function(nitro) {
  nitro.hooks.hook("render:html", (htmlContext) => {
    htmlContext.head.push(`<script>${script}<\/script>`);
  });
});

const plugins = [
  _vkr4xntkTJ
];

function hasReqHeader(event, name, includes) {
  const value = getRequestHeader(event, name);
  return value && typeof value === "string" && value.toLowerCase().includes(includes);
}
function isJsonRequest(event) {
  return hasReqHeader(event, "accept", "application/json") || hasReqHeader(event, "user-agent", "curl/") || hasReqHeader(event, "user-agent", "httpie/") || event.req.url?.endsWith(".json") || event.req.url?.includes("/api/");
}
function normalizeError(error) {
  const cwd = process.cwd();
  const stack = (error.stack || "").split("\n").splice(1).filter((line) => line.includes("at ")).map((line) => {
    const text = line.replace(cwd + "/", "./").replace("webpack:/", "").replace("file://", "").trim();
    return {
      text,
      internal: line.includes("node_modules") && !line.includes(".cache") || line.includes("internal") || line.includes("new Promise")
    };
  });
  const statusCode = error.statusCode || 500;
  const statusMessage = error.statusMessage ?? (statusCode === 404 ? "Not Found" : "");
  const message = error.message || error.toString();
  return {
    stack,
    statusCode,
    statusMessage,
    message
  };
}

const errorHandler = (async function errorhandler(error, event) {
  const { stack, statusCode, statusMessage, message } = normalizeError(error);
  const errorObject = {
    url: event.node.req.url,
    statusCode,
    statusMessage,
    message,
    stack: "",
    data: error.data
  };
  event.node.res.statusCode = errorObject.statusCode !== 200 && errorObject.statusCode || 500;
  if (errorObject.statusMessage) {
    event.node.res.statusMessage = errorObject.statusMessage;
  }
  if (error.unhandled || error.fatal) {
    const tags = [
      "[nuxt]",
      "[request error]",
      error.unhandled && "[unhandled]",
      error.fatal && "[fatal]",
      Number(errorObject.statusCode) !== 200 && `[${errorObject.statusCode}]`
    ].filter(Boolean).join(" ");
    console.error(tags, errorObject.message + "\n" + stack.map((l) => "  " + l.text).join("  \n"));
  }
  if (isJsonRequest(event)) {
    event.node.res.setHeader("Content-Type", "application/json");
    event.node.res.end(JSON.stringify(errorObject));
    return;
  }
  const isErrorPage = event.node.req.url?.startsWith("/__nuxt_error");
  const res = !isErrorPage ? await useNitroApp().localFetch(withQuery(joinURL(useRuntimeConfig().app.baseURL, "/__nuxt_error"), errorObject), {
    headers: getRequestHeaders(event),
    redirect: "manual"
  }).catch(() => null) : null;
  if (!res) {
    const { template } = await import('../error-500.mjs');
    event.node.res.setHeader("Content-Type", "text/html;charset=UTF-8");
    event.node.res.end(template(errorObject));
    return;
  }
  for (const [header, value] of res.headers.entries()) {
    setResponseHeader(event, header, value);
  }
  if (res.status && res.status !== 200) {
    event.node.res.statusCode = res.status;
  }
  if (res.statusText) {
    event.node.res.statusMessage = res.statusText;
  }
  event.node.res.end(await res.text());
});

const assets = {
  "/.DS_Store": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"1804-3y++sUAKzaCQmjLBz2v0kvESHgc\"",
    "mtime": "2022-12-06T12:40:08.121Z",
    "size": 6148,
    "path": "../public/.DS_Store"
  },
  "/dute_favicon_32x32.ico": {
    "type": "image/vnd.microsoft.icon",
    "etag": "\"10be-8oCXDVT9HoWT374Zl0C8RR6n29g\"",
    "mtime": "2022-12-06T12:40:08.121Z",
    "size": 4286,
    "path": "../public/dute_favicon_32x32.ico"
  },
  "/robots.txt": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"50-69DQBog8W6e8ZlGS0bRz1eURY9A\"",
    "mtime": "2022-12-06T12:40:08.120Z",
    "size": 80,
    "path": "../public/robots.txt"
  },
  "/worker.js": {
    "type": "application/javascript",
    "etag": "\"576-2zXlF0n7n2o2/pad0eK9vHB37zY\"",
    "mtime": "2022-12-06T12:40:08.119Z",
    "size": 1398,
    "path": "../public/worker.js"
  },
  "/_nuxt/AppAnimate.9fc6f310.js": {
    "type": "application/javascript",
    "etag": "\"f1-YXEiYojWpgoXuwnfxg8xrVrsEHQ\"",
    "mtime": "2022-12-06T12:40:08.116Z",
    "size": 241,
    "path": "../public/_nuxt/AppAnimate.9fc6f310.js"
  },
  "/_nuxt/AppAnimate.vue_vue_type_script_setup_true_lang.e5a0a712.js": {
    "type": "application/javascript",
    "etag": "\"1fd-dFbfcK3cziowfDoo0r8dkf7WapM\"",
    "mtime": "2022-12-06T12:40:08.116Z",
    "size": 509,
    "path": "../public/_nuxt/AppAnimate.vue_vue_type_script_setup_true_lang.e5a0a712.js"
  },
  "/_nuxt/AppBanner.6fb6f63e.js": {
    "type": "application/javascript",
    "etag": "\"679-pOXjf7hnNtH79AsKuOCk2P9Jx1Q\"",
    "mtime": "2022-12-06T12:40:08.115Z",
    "size": 1657,
    "path": "../public/_nuxt/AppBanner.6fb6f63e.js"
  },
  "/_nuxt/AppFooter.8fab0c23.js": {
    "type": "application/javascript",
    "etag": "\"345-7xigrtdHRO40e8o1oTt2nezA/mY\"",
    "mtime": "2022-12-06T12:40:08.115Z",
    "size": 837,
    "path": "../public/_nuxt/AppFooter.8fab0c23.js"
  },
  "/_nuxt/AppHeader.c04b879b.js": {
    "type": "application/javascript",
    "etag": "\"474b-YrqbzWq8ScFtA2TOWwd3mjzroDs\"",
    "mtime": "2022-12-06T12:40:08.114Z",
    "size": 18251,
    "path": "../public/_nuxt/AppHeader.c04b879b.js"
  },
  "/_nuxt/AppHeader.db6ebb22.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"503a-7hYJemTzBz9d+ehL3hnpXijjShU\"",
    "mtime": "2022-12-06T12:40:08.114Z",
    "size": 20538,
    "path": "../public/_nuxt/AppHeader.db6ebb22.css"
  },
  "/_nuxt/AreaTitle.1500d1c0.js": {
    "type": "application/javascript",
    "etag": "\"1be-MVfNCI4jztyhtI+iBJSqYWVxL8Y\"",
    "mtime": "2022-12-06T12:40:08.113Z",
    "size": 446,
    "path": "../public/_nuxt/AreaTitle.1500d1c0.js"
  },
  "/_nuxt/AreaTitle.55af651e.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"212-m+GcEQ8qAz+KW3KybO9YiuIVvtI\"",
    "mtime": "2022-12-06T12:40:08.112Z",
    "size": 530,
    "path": "../public/_nuxt/AreaTitle.55af651e.css"
  },
  "/_nuxt/FixMenu.2fee41b6.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1104-Z3gTpHbcLQs36MMtEroVGU5yW6s\"",
    "mtime": "2022-12-06T12:40:08.112Z",
    "size": 4356,
    "path": "../public/_nuxt/FixMenu.2fee41b6.css"
  },
  "/_nuxt/FixMenu.7517c275.js": {
    "type": "application/javascript",
    "etag": "\"3ae-pY9VrhFjfk8TuCtsLUEpY0oIcZg\"",
    "mtime": "2022-12-06T12:40:08.112Z",
    "size": 942,
    "path": "../public/_nuxt/FixMenu.7517c275.js"
  },
  "/_nuxt/FixMenu.vue_vue_type_style_index_0_scoped_5afae692_lang.b1b754b9.js": {
    "type": "application/javascript",
    "etag": "\"36a-ZsDHoyrFAfNR6gpSODGEkt59InI\"",
    "mtime": "2022-12-06T12:40:08.111Z",
    "size": 874,
    "path": "../public/_nuxt/FixMenu.vue_vue_type_style_index_0_scoped_5afae692_lang.b1b754b9.js"
  },
  "/_nuxt/ImageBox.9dbbaaa4.js": {
    "type": "application/javascript",
    "etag": "\"a8-NUGjCTxdd5KF6kBhBHY2NXkvOb8\"",
    "mtime": "2022-12-06T12:40:08.111Z",
    "size": 168,
    "path": "../public/_nuxt/ImageBox.9dbbaaa4.js"
  },
  "/_nuxt/ImageView.ad049d99.js": {
    "type": "application/javascript",
    "etag": "\"1f2-Znwr91YiQ/eCVogrDLMZoHZCNU8\"",
    "mtime": "2022-12-06T12:40:08.110Z",
    "size": 498,
    "path": "../public/_nuxt/ImageView.ad049d99.js"
  },
  "/_nuxt/LinkList.28246524.js": {
    "type": "application/javascript",
    "etag": "\"1ccb-3xjagrf3Yu0MgIcl5nXX0nLEfX0\"",
    "mtime": "2022-12-06T12:40:08.110Z",
    "size": 7371,
    "path": "../public/_nuxt/LinkList.28246524.js"
  },
  "/_nuxt/NovelAI_cankaotu.339f5bb2.js": {
    "type": "application/javascript",
    "etag": "\"670bc-R2D0FQCA+m0qYRxUH1XQgO6Bt70\"",
    "mtime": "2022-12-06T12:40:08.109Z",
    "size": 422076,
    "path": "../public/_nuxt/NovelAI_cankaotu.339f5bb2.js"
  },
  "/_nuxt/NovelAI_fumiantag.2f48f896.js": {
    "type": "application/javascript",
    "etag": "\"b1f3-hPb+RqNSUStfSKssrPbgQYgIDUo\"",
    "mtime": "2022-12-06T12:40:08.106Z",
    "size": 45555,
    "path": "../public/_nuxt/NovelAI_fumiantag.2f48f896.js"
  },
  "/_nuxt/NovelAI_goutu.80a9b3d6.js": {
    "type": "application/javascript",
    "etag": "\"4cdc-FVU7QaOQ24rPmRxlbVtiJQ4op4E\"",
    "mtime": "2022-12-06T12:40:08.105Z",
    "size": 19676,
    "path": "../public/_nuxt/NovelAI_goutu.80a9b3d6.js"
  },
  "/_nuxt/NovelAI_huafeng.72a3e915.js": {
    "type": "application/javascript",
    "etag": "\"a524-m2kOPczDKmLoeg5+/klZFXypUJw\"",
    "mtime": "2022-12-06T12:40:08.104Z",
    "size": 42276,
    "path": "../public/_nuxt/NovelAI_huafeng.72a3e915.js"
  },
  "/_nuxt/NovelAI_huageren.afd84e06.js": {
    "type": "application/javascript",
    "etag": "\"27689-cuVYjo0901SNNgqp4sM5/0vV34w\"",
    "mtime": "2022-12-06T12:40:08.103Z",
    "size": 161417,
    "path": "../public/_nuxt/NovelAI_huageren.afd84e06.js"
  },
  "/_nuxt/NovelAI_huagewuti.7cbf7439.js": {
    "type": "application/javascript",
    "etag": "\"a432-fedXKiL5gFDRY7Uwn4G83XTIM2o\"",
    "mtime": "2022-12-06T12:40:08.102Z",
    "size": 42034,
    "path": "../public/_nuxt/NovelAI_huagewuti.7cbf7439.js"
  },
  "/_nuxt/NovelAI_zhengmiantag.3f260789.js": {
    "type": "application/javascript",
    "etag": "\"7fa9-P2jV/B4CsbX5Mnl8rC/IT19bD/k\"",
    "mtime": "2022-12-06T12:40:08.101Z",
    "size": 32681,
    "path": "../public/_nuxt/NovelAI_zhengmiantag.3f260789.js"
  },
  "/_nuxt/TemplateDetail.33142682.js": {
    "type": "application/javascript",
    "etag": "\"135e-g90YK5GHT3ZXTDGdRTQ2/zO2Elc\"",
    "mtime": "2022-12-06T12:40:08.100Z",
    "size": 4958,
    "path": "../public/_nuxt/TemplateDetail.33142682.js"
  },
  "/_nuxt/chitu.8f533c7d.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"55c-D35Zhy0JckvSTU+3ePikOs8tvd8\"",
    "mtime": "2022-12-06T12:40:08.099Z",
    "size": 1372,
    "path": "../public/_nuxt/chitu.8f533c7d.css"
  },
  "/_nuxt/chitu.c6b8ef30.js": {
    "type": "application/javascript",
    "etag": "\"1223-T30R2ViBv+A6CLCnCjYaJGtDMt4\"",
    "mtime": "2022-12-06T12:40:08.098Z",
    "size": 4643,
    "path": "../public/_nuxt/chitu.c6b8ef30.js"
  },
  "/_nuxt/copy-document.fff7f18a.js": {
    "type": "application/javascript",
    "etag": "\"297-FXOgQqpfL7NU/Zc4k0vqddqlwQo\"",
    "mtime": "2022-12-06T12:40:08.098Z",
    "size": 663,
    "path": "../public/_nuxt/copy-document.fff7f18a.js"
  },
  "/_nuxt/default.6d160e8b.js": {
    "type": "application/javascript",
    "etag": "\"21c-fTyXG6CiNSh5LslM4fL2c9KYnG0\"",
    "mtime": "2022-12-06T12:40:08.097Z",
    "size": 540,
    "path": "../public/_nuxt/default.6d160e8b.js"
  },
  "/_nuxt/default.a8f53c13.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1b3-5qHYoDSFMsmIXr5XnGHrqjqOQcs\"",
    "mtime": "2022-12-06T12:40:08.097Z",
    "size": 435,
    "path": "../public/_nuxt/default.a8f53c13.css"
  },
  "/_nuxt/delete.945d50b7.js": {
    "type": "application/javascript",
    "etag": "\"256-DglrPkYsGgNKiAdOAEe5yPjqh3g\"",
    "mtime": "2022-12-06T12:40:08.096Z",
    "size": 598,
    "path": "../public/_nuxt/delete.945d50b7.js"
  },
  "/_nuxt/document-copy.5ae862cd.js": {
    "type": "application/javascript",
    "etag": "\"20f-lpIg4xZI/nCH0CHC1BmZfO2IMmU\"",
    "mtime": "2022-12-06T12:40:08.096Z",
    "size": 527,
    "path": "../public/_nuxt/document-copy.5ae862cd.js"
  },
  "/_nuxt/eHentai.12cbac61.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"3ce-eCEIYB2TNrKcE5QICzYMg+oTOGs\"",
    "mtime": "2022-12-06T12:40:08.095Z",
    "size": 974,
    "path": "../public/_nuxt/eHentai.12cbac61.css"
  },
  "/_nuxt/eHentai.8642eb4e.js": {
    "type": "application/javascript",
    "etag": "\"a90-LOfl8D/N2ddUglagupGY5yN4Png\"",
    "mtime": "2022-12-06T12:40:08.095Z",
    "size": 2704,
    "path": "../public/_nuxt/eHentai.8642eb4e.js"
  },
  "/_nuxt/eHentaiMore.98892179.js": {
    "type": "application/javascript",
    "etag": "\"1544-4TYM3U1LRi5G++2Dh0CvRU1732s\"",
    "mtime": "2022-12-06T12:40:08.094Z",
    "size": 5444,
    "path": "../public/_nuxt/eHentaiMore.98892179.js"
  },
  "/_nuxt/eHentaiMore.d4f1dc34.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"3d9-4xc9YdOStM6mqPLI8sas6KyWPM4\"",
    "mtime": "2022-12-06T12:40:08.094Z",
    "size": 985,
    "path": "../public/_nuxt/eHentaiMore.d4f1dc34.css"
  },
  "/_nuxt/eh.10922c81.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"534-qe8071eRfILezB2iiF4wrmL19c0\"",
    "mtime": "2022-12-06T12:40:08.093Z",
    "size": 1332,
    "path": "../public/_nuxt/eh.10922c81.css"
  },
  "/_nuxt/eh.3647c3f2.js": {
    "type": "application/javascript",
    "etag": "\"4bc-27bNb3HY7BsbMA/lfxZ9jTK2O+Q\"",
    "mtime": "2022-12-06T12:40:08.092Z",
    "size": 1212,
    "path": "../public/_nuxt/eh.3647c3f2.js"
  },
  "/_nuxt/element-plus.0985e982.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"241a5-BmomMYB3o7fqophL95PVVQV+BmQ\"",
    "mtime": "2022-12-06T12:40:08.092Z",
    "size": 147877,
    "path": "../public/_nuxt/element-plus.0985e982.css"
  },
  "/_nuxt/element-plus.ff0be31b.js": {
    "type": "application/javascript",
    "etag": "\"3476e-neStvqHWQ2wUlpC5TpwCSPoGMzs\"",
    "mtime": "2022-12-06T12:40:08.090Z",
    "size": 214894,
    "path": "../public/_nuxt/element-plus.ff0be31b.js"
  },
  "/_nuxt/entry.ac71e7d2.js": {
    "type": "application/javascript",
    "etag": "\"75767-QoLAYha30ngwUQ+3ouE2SvK3fVo\"",
    "mtime": "2022-12-06T12:40:08.088Z",
    "size": 481127,
    "path": "../public/_nuxt/entry.ac71e7d2.js"
  },
  "/_nuxt/entry.b04f7139.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1811a-lgT8DxA0xmft9mLOlfe7SY5jRb4\"",
    "mtime": "2022-12-06T12:40:08.084Z",
    "size": 98586,
    "path": "../public/_nuxt/entry.b04f7139.css"
  },
  "/_nuxt/error-component.bd96c471.js": {
    "type": "application/javascript",
    "etag": "\"5c-eHXRXfdZvaUrU4iaceNCJ91MzfU\"",
    "mtime": "2022-12-06T12:40:08.082Z",
    "size": 92,
    "path": "../public/_nuxt/error-component.bd96c471.js"
  },
  "/_nuxt/gelbooru.08fb4f71.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"236-anHptLSNWbzkLl3UzEq+QNKukTU\"",
    "mtime": "2022-12-06T12:40:08.082Z",
    "size": 566,
    "path": "../public/_nuxt/gelbooru.08fb4f71.css"
  },
  "/_nuxt/gelbooru.33cc4b2e.js": {
    "type": "application/javascript",
    "etag": "\"d7b-4BtChi7u3xNaDRE5L/YR5t4E0xA\"",
    "mtime": "2022-12-06T12:40:08.081Z",
    "size": 3451,
    "path": "../public/_nuxt/gelbooru.33cc4b2e.js"
  },
  "/_nuxt/gelbooru.42285e8d.js": {
    "type": "application/javascript",
    "etag": "\"45a-bjxZZmiECQF9MmiOyoZxsTtvMq0\"",
    "mtime": "2022-12-06T12:40:08.081Z",
    "size": 1114,
    "path": "../public/_nuxt/gelbooru.42285e8d.js"
  },
  "/_nuxt/gelbooru.7d54c59e.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"53a-3m2MxkftvsGBwTpHDixI3paM4Nk\"",
    "mtime": "2022-12-06T12:40:08.080Z",
    "size": 1338,
    "path": "../public/_nuxt/gelbooru.7d54c59e.css"
  },
  "/_nuxt/index.08206160.js": {
    "type": "application/javascript",
    "etag": "\"e6-pq8N4baM1jlnF0Dmyw0PzRPSxMc\"",
    "mtime": "2022-12-06T12:40:08.079Z",
    "size": 230,
    "path": "../public/_nuxt/index.08206160.js"
  },
  "/_nuxt/index.08b59c7e.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"61f-fNf6qt3dqorJE4AaOYbRASX3U1E\"",
    "mtime": "2022-12-06T12:40:08.079Z",
    "size": 1567,
    "path": "../public/_nuxt/index.08b59c7e.css"
  },
  "/_nuxt/index.180d84d9.js": {
    "type": "application/javascript",
    "etag": "\"ca2-4bPQPD2dgPVw28W9I6qVVu6yTFA\"",
    "mtime": "2022-12-06T12:40:08.078Z",
    "size": 3234,
    "path": "../public/_nuxt/index.180d84d9.js"
  },
  "/_nuxt/index.33682be0.js": {
    "type": "application/javascript",
    "etag": "\"377-brbnl5GP7ZxUOUtp5noNtEPSqnE\"",
    "mtime": "2022-12-06T12:40:08.078Z",
    "size": 887,
    "path": "../public/_nuxt/index.33682be0.js"
  },
  "/_nuxt/index.3f7edc33.js": {
    "type": "application/javascript",
    "etag": "\"70-pEb0a7dFR+y/G6A9yAlfqXWtYKM\"",
    "mtime": "2022-12-06T12:40:08.077Z",
    "size": 112,
    "path": "../public/_nuxt/index.3f7edc33.js"
  },
  "/_nuxt/index.42b4091a.js": {
    "type": "application/javascript",
    "etag": "\"aaa-Q5j1LEGGVKCMpwVoevc3vLMThCY\"",
    "mtime": "2022-12-06T12:40:08.076Z",
    "size": 2730,
    "path": "../public/_nuxt/index.42b4091a.js"
  },
  "/_nuxt/index.469e24c3.js": {
    "type": "application/javascript",
    "etag": "\"af0-mj9NL05CBeT6Sg6BqfSoDate3vY\"",
    "mtime": "2022-12-06T12:40:08.075Z",
    "size": 2800,
    "path": "../public/_nuxt/index.469e24c3.js"
  },
  "/_nuxt/index.a4f3a4e8.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"531-N7Q0LeXU8GQPQAa5nh7IUe9kNCU\"",
    "mtime": "2022-12-06T12:40:08.075Z",
    "size": 1329,
    "path": "../public/_nuxt/index.a4f3a4e8.css"
  },
  "/_nuxt/index.a9682611.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1373-m4twkrvEOWBXFZ2sGgMCjiLnDGI\"",
    "mtime": "2022-12-06T12:40:08.074Z",
    "size": 4979,
    "path": "../public/_nuxt/index.a9682611.css"
  },
  "/_nuxt/index.c15b40f0.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"2a7-4NvPEgNVVOa6ZgTdGig4OFYCsqg\"",
    "mtime": "2022-12-06T12:40:08.073Z",
    "size": 679,
    "path": "../public/_nuxt/index.c15b40f0.css"
  },
  "/_nuxt/index.c883caa4.js": {
    "type": "application/javascript",
    "etag": "\"1dc0-9IiM9SO8UE25Ag3Bt1rJNdWDFmk\"",
    "mtime": "2022-12-06T12:40:08.073Z",
    "size": 7616,
    "path": "../public/_nuxt/index.c883caa4.js"
  },
  "/_nuxt/index.d0c7a81e.js": {
    "type": "application/javascript",
    "etag": "\"1bf4-j72y6ECqnyyQzJwb3heKC4R6B7E\"",
    "mtime": "2022-12-06T12:40:08.072Z",
    "size": 7156,
    "path": "../public/_nuxt/index.d0c7a81e.js"
  },
  "/_nuxt/index.e740aef9.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"4cc-laSGRhaBjMxlRs6/ivZMyQRtpVI\"",
    "mtime": "2022-12-06T12:40:08.071Z",
    "size": 1228,
    "path": "../public/_nuxt/index.e740aef9.css"
  },
  "/_nuxt/index.ea601804.js": {
    "type": "application/javascript",
    "etag": "\"823-7iWReN5yY1TNB33ZUCmEuHdOgCI\"",
    "mtime": "2022-12-06T12:40:08.070Z",
    "size": 2083,
    "path": "../public/_nuxt/index.ea601804.js"
  },
  "/_nuxt/index.f43a33c3.js": {
    "type": "application/javascript",
    "etag": "\"e5a-dxg9IRhbZ26NexJ5IHo90Osbbaw\"",
    "mtime": "2022-12-06T12:40:08.070Z",
    "size": 3674,
    "path": "../public/_nuxt/index.f43a33c3.js"
  },
  "/_nuxt/lodash.ea4d81e6.js": {
    "type": "application/javascript",
    "etag": "\"16f76-I1M4+AQBnXN8v+9LBfW4x8Alo6Y\"",
    "mtime": "2022-12-06T12:40:08.069Z",
    "size": 94070,
    "path": "../public/_nuxt/lodash.ea4d81e6.js"
  },
  "/_nuxt/plus.6d20b090.js": {
    "type": "application/javascript",
    "etag": "\"7a0-SGyWvOo8RFb7Onhze4n3fFe02us\"",
    "mtime": "2022-12-06T12:40:08.067Z",
    "size": 1952,
    "path": "../public/_nuxt/plus.6d20b090.js"
  },
  "/_nuxt/promptBeautiful.45e74aa9.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"516-vJseenyv8slyHYiPSYKa8a8W3us\"",
    "mtime": "2022-12-06T12:40:08.067Z",
    "size": 1302,
    "path": "../public/_nuxt/promptBeautiful.45e74aa9.css"
  },
  "/_nuxt/promptBeautiful.508694c9.js": {
    "type": "application/javascript",
    "etag": "\"1c96-BxHZKS/GqYY/Xl2JKulXzA2fUrE\"",
    "mtime": "2022-12-06T12:40:08.066Z",
    "size": 7318,
    "path": "../public/_nuxt/promptBeautiful.508694c9.js"
  },
  "/_nuxt/sYw7uX71Xe.ba953995.jpeg": {
    "type": "image/jpeg",
    "etag": "\"39ad7-5UOCl95VjRaXmMkVoV5E4eTrjDM\"",
    "mtime": "2022-12-06T12:40:08.064Z",
    "size": 236247,
    "path": "../public/_nuxt/sYw7uX71Xe.ba953995.jpeg"
  },
  "/_nuxt/shop.c4e62d1a.js": {
    "type": "application/javascript",
    "etag": "\"81c-P+1r5XR8rZMO9Vllx44/vdI8PzM\"",
    "mtime": "2022-12-06T12:40:08.060Z",
    "size": 2076,
    "path": "../public/_nuxt/shop.c4e62d1a.js"
  },
  "/_nuxt/shopping-trolley.6e00b3de.js": {
    "type": "application/javascript",
    "etag": "\"369-GWnzurx4wcuySxWdARUWDf07Q6o\"",
    "mtime": "2022-12-06T12:40:08.059Z",
    "size": 873,
    "path": "../public/_nuxt/shopping-trolley.6e00b3de.js"
  },
  "/_nuxt/sortablejs.8210fcbe.js": {
    "type": "application/javascript",
    "etag": "\"ae85-CTKkWvj4saxF/yc2IBbV1RAaOwo\"",
    "mtime": "2022-12-06T12:40:08.051Z",
    "size": 44677,
    "path": "../public/_nuxt/sortablejs.8210fcbe.js"
  },
  "/_nuxt/vuedraggable.b6dc714b.js": {
    "type": "application/javascript",
    "etag": "\"c4ff-ydgGDgS/GPfaBFx7YYXZo79RJTY\"",
    "mtime": "2022-12-06T12:40:08.050Z",
    "size": 50431,
    "path": "../public/_nuxt/vuedraggable.b6dc714b.js"
  }
};

function readAsset (id) {
  const serverDir = dirname(fileURLToPath(globalThis._importMeta_.url));
  return promises.readFile(resolve(serverDir, assets[id].path))
}

const publicAssetBases = [];

function isPublicAssetURL(id = '') {
  if (assets[id]) {
    return true
  }
  for (const base of publicAssetBases) {
    if (id.startsWith(base)) { return true }
  }
  return false
}

function getAsset (id) {
  return assets[id]
}

const METHODS = ["HEAD", "GET"];
const EncodingMap = { gzip: ".gz", br: ".br" };
const _f4b49z = eventHandler((event) => {
  if (event.req.method && !METHODS.includes(event.req.method)) {
    return;
  }
  let id = decodeURIComponent(withLeadingSlash(withoutTrailingSlash(parseURL(event.req.url).pathname)));
  let asset;
  const encodingHeader = String(event.req.headers["accept-encoding"] || "");
  const encodings = encodingHeader.split(",").map((e) => EncodingMap[e.trim()]).filter(Boolean).sort().concat([""]);
  if (encodings.length > 1) {
    event.res.setHeader("Vary", "Accept-Encoding");
  }
  for (const encoding of encodings) {
    for (const _id of [id + encoding, joinURL(id, "index.html" + encoding)]) {
      const _asset = getAsset(_id);
      if (_asset) {
        asset = _asset;
        id = _id;
        break;
      }
    }
  }
  if (!asset) {
    if (isPublicAssetURL(id)) {
      throw createError({
        statusMessage: "Cannot find static asset " + id,
        statusCode: 404
      });
    }
    return;
  }
  const ifNotMatch = event.req.headers["if-none-match"] === asset.etag;
  if (ifNotMatch) {
    event.res.statusCode = 304;
    event.res.end();
    return;
  }
  const ifModifiedSinceH = event.req.headers["if-modified-since"];
  if (ifModifiedSinceH && asset.mtime) {
    if (new Date(ifModifiedSinceH) >= new Date(asset.mtime)) {
      event.res.statusCode = 304;
      event.res.end();
      return;
    }
  }
  if (asset.type && !event.res.getHeader("Content-Type")) {
    event.res.setHeader("Content-Type", asset.type);
  }
  if (asset.etag && !event.res.getHeader("ETag")) {
    event.res.setHeader("ETag", asset.etag);
  }
  if (asset.mtime && !event.res.getHeader("Last-Modified")) {
    event.res.setHeader("Last-Modified", asset.mtime);
  }
  if (asset.encoding && !event.res.getHeader("Content-Encoding")) {
    event.res.setHeader("Content-Encoding", asset.encoding);
  }
  if (asset.size && !event.res.getHeader("Content-Length")) {
    event.res.setHeader("Content-Length", asset.size);
  }
  return readAsset(id);
});

const _NrhlIF = lazyEventHandler(() => {
  const ipxOptions = {
    ...useRuntimeConfig().ipx || {},
    dir: fileURLToPath(new URL("../public", globalThis._importMeta_.url))
  };
  const ipx = createIPX(ipxOptions);
  const middleware = createIPXMiddleware(ipx);
  return eventHandler(async (event) => {
    event.req.url = withLeadingSlash(event.context.params._);
    await middleware(event.req, event.res);
  });
});

const _lazy_FegE4j = () => import('../handlers/renderer.mjs');

const handlers = [
  { route: '', handler: _f4b49z, lazy: false, middleware: true, method: undefined },
  { route: '/__nuxt_error', handler: _lazy_FegE4j, lazy: true, middleware: false, method: undefined },
  { route: '/_ipx/**', handler: _NrhlIF, lazy: false, middleware: false, method: undefined },
  { route: '/**', handler: _lazy_FegE4j, lazy: true, middleware: false, method: undefined }
];

function createNitroApp() {
  const config = useRuntimeConfig();
  const hooks = createHooks();
  const h3App = createApp({
    debug: destr(false),
    onError: errorHandler
  });
  h3App.use(config.app.baseURL, timingMiddleware);
  const router = createRouter$1();
  h3App.use(createRouteRulesHandler());
  for (const h of handlers) {
    let handler = h.lazy ? lazyEventHandler(h.handler) : h.handler;
    if (h.middleware || !h.route) {
      const middlewareBase = (config.app.baseURL + (h.route || "/")).replace(/\/+/g, "/");
      h3App.use(middlewareBase, handler);
    } else {
      const routeRules = getRouteRulesForPath(h.route.replace(/:\w+|\*\*/g, "_"));
      if (routeRules.cache) {
        handler = cachedEventHandler(handler, {
          group: "nitro/routes",
          ...routeRules.cache
        });
      }
      router.use(h.route, handler, h.method);
    }
  }
  h3App.use(config.app.baseURL, router);
  const localCall = createCall(toNodeListener(h3App));
  const localFetch = createFetch(localCall, globalThis.fetch);
  const $fetch = createFetch$1({ fetch: localFetch, Headers, defaults: { baseURL: config.app.baseURL } });
  globalThis.$fetch = $fetch;
  const app = {
    hooks,
    h3App,
    router,
    localCall,
    localFetch
  };
  for (const plugin of plugins) {
    plugin(app);
  }
  return app;
}
const nitroApp = createNitroApp();
const useNitroApp = () => nitroApp;

const cert = process.env.NITRO_SSL_CERT;
const key = process.env.NITRO_SSL_KEY;
const server = cert && key ? new Server({ key, cert }, toNodeListener(nitroApp.h3App)) : new Server$1(toNodeListener(nitroApp.h3App));
const port = destr(process.env.NITRO_PORT || process.env.PORT) || 3e3;
const host = process.env.NITRO_HOST || process.env.HOST;
const s = server.listen(port, host, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  const protocol = cert && key ? "https" : "http";
  const i = s.address();
  const baseURL = (useRuntimeConfig().app.baseURL || "").replace(/\/$/, "");
  const url = `${protocol}://${i.family === "IPv6" ? `[${i.address}]` : i.address}:${i.port}${baseURL}`;
  console.log(`Listening ${url}`);
});
{
  process.on("unhandledRejection", (err) => console.error("[nitro] [dev] [unhandledRejection] " + err));
  process.on("uncaughtException", (err) => console.error("[nitro] [dev] [uncaughtException] " + err));
}
const nodeServer = {};

export { useRuntimeConfig as a, getRouteRules as g, nodeServer as n, useNitroApp as u };
