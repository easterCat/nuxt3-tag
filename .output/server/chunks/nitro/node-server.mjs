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

const _runtimeConfig = {"app":{"baseURL":"/nuxt3-tag","buildAssetsDir":"/_nuxt/","cdnURL":""},"nitro":{"routeRules":{"/__nuxt_error":{"cache":false}},"envPrefix":"NUXT_"},"public":{"API_DATA_FROM":"database","FLASK_BASE_API":"https://www.ptg.life/stable/api","GELBOORU_TOKEN":"b8d9e7d1fa1dcc3e5116760c093be229","IP_ADDRESS":"https://www.ptg.life"},"ipx":{"dir":"","domains":[],"sharp":{},"alias":{}}};
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
    "mtime": "2023-01-09T08:41:36.402Z",
    "size": 6148,
    "path": "../public/.DS_Store"
  },
  "/dute_favicon_32x32.ico": {
    "type": "image/vnd.microsoft.icon",
    "etag": "\"10be-8oCXDVT9HoWT374Zl0C8RR6n29g\"",
    "mtime": "2023-01-09T08:41:36.401Z",
    "size": 4286,
    "path": "../public/dute_favicon_32x32.ico"
  },
  "/robots.txt": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"50-69DQBog8W6e8ZlGS0bRz1eURY9A\"",
    "mtime": "2023-01-09T08:41:36.401Z",
    "size": 80,
    "path": "../public/robots.txt"
  },
  "/worker.js": {
    "type": "application/javascript",
    "etag": "\"576-2zXlF0n7n2o2/pad0eK9vHB37zY\"",
    "mtime": "2023-01-09T08:41:36.400Z",
    "size": 1398,
    "path": "../public/worker.js"
  },
  "/_nuxt/01.bfcaf521.webp": {
    "type": "image/webp",
    "etag": "\"1f4f8-3S7JGluLSJZK6xC8cOfp2VXckkw\"",
    "mtime": "2023-01-09T08:41:36.399Z",
    "size": 128248,
    "path": "../public/_nuxt/01.bfcaf521.webp"
  },
  "/_nuxt/02.dedaa15f.webp": {
    "type": "image/webp",
    "etag": "\"27098-f0Cdu0eLWVZX+rbvAjUMpM1jIzc\"",
    "mtime": "2023-01-09T08:41:36.398Z",
    "size": 159896,
    "path": "../public/_nuxt/02.dedaa15f.webp"
  },
  "/_nuxt/03.871e52e8.webp": {
    "type": "image/webp",
    "etag": "\"25ef0-2K/HI+17WfR7tMdfDoiWHiuBlgw\"",
    "mtime": "2023-01-09T08:41:36.396Z",
    "size": 155376,
    "path": "../public/_nuxt/03.871e52e8.webp"
  },
  "/_nuxt/04.dc12eeac.webp": {
    "type": "image/webp",
    "etag": "\"2f992-1Lrkz+KkNIjqcgoM/c+N9xMioy4\"",
    "mtime": "2023-01-09T08:41:36.395Z",
    "size": 194962,
    "path": "../public/_nuxt/04.dc12eeac.webp"
  },
  "/_nuxt/AppAnimate.4746750f.js": {
    "type": "application/javascript",
    "etag": "\"c0-57gbdplR7l9aRdmXnVZupfq+Iio\"",
    "mtime": "2023-01-09T08:41:36.393Z",
    "size": 192,
    "path": "../public/_nuxt/AppAnimate.4746750f.js"
  },
  "/_nuxt/AppBanner.700ba76e.js": {
    "type": "application/javascript",
    "etag": "\"704-h3k4K35Xgi08dJ8XNkwLmDimzG8\"",
    "mtime": "2023-01-09T08:41:36.393Z",
    "size": 1796,
    "path": "../public/_nuxt/AppBanner.700ba76e.js"
  },
  "/_nuxt/AppFooter.33f05377.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"537-f6aIDzA3+yf3iy0rAG+Z/tFFPyU\"",
    "mtime": "2023-01-09T08:41:36.392Z",
    "size": 1335,
    "path": "../public/_nuxt/AppFooter.33f05377.css"
  },
  "/_nuxt/AppFooter.6eecb1c5.js": {
    "type": "application/javascript",
    "etag": "\"270-UmTWq0VW2LAuUNAfd/fp1cODWEM\"",
    "mtime": "2023-01-09T08:41:36.392Z",
    "size": 624,
    "path": "../public/_nuxt/AppFooter.6eecb1c5.js"
  },
  "/_nuxt/AppHeader.41b86523.js": {
    "type": "application/javascript",
    "etag": "\"7a0b-S1hLONnXlZxpy6yLYm5gwmtS6yU\"",
    "mtime": "2023-01-09T08:41:36.391Z",
    "size": 31243,
    "path": "../public/_nuxt/AppHeader.41b86523.js"
  },
  "/_nuxt/AppHeader.85503488.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"7b56-cZ/A+b9Jm0fwrxH4V2DfHXDMMTg\"",
    "mtime": "2023-01-09T08:41:36.391Z",
    "size": 31574,
    "path": "../public/_nuxt/AppHeader.85503488.css"
  },
  "/_nuxt/AreaTitle.aabfd2d0.js": {
    "type": "application/javascript",
    "etag": "\"234-i7RWDm8jccg4XIFv8v0mAvJbKq0\"",
    "mtime": "2023-01-09T08:41:36.390Z",
    "size": 564,
    "path": "../public/_nuxt/AreaTitle.aabfd2d0.js"
  },
  "/_nuxt/AreaTitle.ccdca4aa.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"213-FDVqMMu4aIlpHTAe6orqKJMJago\"",
    "mtime": "2023-01-09T08:41:36.390Z",
    "size": 531,
    "path": "../public/_nuxt/AreaTitle.ccdca4aa.css"
  },
  "/_nuxt/FixMenu.562f1dbb.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"119a-+/dEourmdjxVTWDzmG6NzjrmORY\"",
    "mtime": "2023-01-09T08:41:36.389Z",
    "size": 4506,
    "path": "../public/_nuxt/FixMenu.562f1dbb.css"
  },
  "/_nuxt/FixMenu.636cdee3.js": {
    "type": "application/javascript",
    "etag": "\"4dc-j4BGUai8iQKKa5KraWVxhBbPOmU\"",
    "mtime": "2023-01-09T08:41:36.389Z",
    "size": 1244,
    "path": "../public/_nuxt/FixMenu.636cdee3.js"
  },
  "/_nuxt/FixMenu.vue_vue_type_style_index_0_scoped_8a5ecf18_lang.9c1025d6.js": {
    "type": "application/javascript",
    "etag": "\"8e6-Zagf3Pz1v3t7+ojyyojj4O++Yfc\"",
    "mtime": "2023-01-09T08:41:36.388Z",
    "size": 2278,
    "path": "../public/_nuxt/FixMenu.vue_vue_type_style_index_0_scoped_8a5ecf18_lang.9c1025d6.js"
  },
  "/_nuxt/Icon.bbc2cf5c.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"43-1Uw9MIPhuZ9XfqwJANDPFYERiNg\"",
    "mtime": "2023-01-09T08:41:36.388Z",
    "size": 67,
    "path": "../public/_nuxt/Icon.bbc2cf5c.css"
  },
  "/_nuxt/Icon.f96b4a01.js": {
    "type": "application/javascript",
    "etag": "\"6592-jUn/QABeYp2JHEpKfUG2YDEPQNA\"",
    "mtime": "2023-01-09T08:41:36.387Z",
    "size": 26002,
    "path": "../public/_nuxt/Icon.f96b4a01.js"
  },
  "/_nuxt/ImageBox.018a14aa.js": {
    "type": "application/javascript",
    "etag": "\"123-BVVWMPnhHOw9TT8x9cAxDXWBObw\"",
    "mtime": "2023-01-09T08:41:36.387Z",
    "size": 291,
    "path": "../public/_nuxt/ImageBox.018a14aa.js"
  },
  "/_nuxt/ImageView.3eeffd81.js": {
    "type": "application/javascript",
    "etag": "\"20d-FwpDBJbXCPGb0cwvZuqUDOcfSKM\"",
    "mtime": "2023-01-09T08:41:36.386Z",
    "size": 525,
    "path": "../public/_nuxt/ImageView.3eeffd81.js"
  },
  "/_nuxt/LinkList.b0afc8e1.js": {
    "type": "application/javascript",
    "etag": "\"1ec8-F9uc+k84LMfniT5FTIthOMEIrVg\"",
    "mtime": "2023-01-09T08:41:36.386Z",
    "size": 7880,
    "path": "../public/_nuxt/LinkList.b0afc8e1.js"
  },
  "/_nuxt/TemplateDetail.90bd7f26.js": {
    "type": "application/javascript",
    "etag": "\"1679-SvZAEXjb2m0nI/MWp3mL5/pkV9I\"",
    "mtime": "2023-01-09T08:41:36.385Z",
    "size": 5753,
    "path": "../public/_nuxt/TemplateDetail.90bd7f26.js"
  },
  "/_nuxt/chitu.8e335285.js": {
    "type": "application/javascript",
    "etag": "\"2179-xzMQobzsnQjr7KvKX+y7e0JA24I\"",
    "mtime": "2023-01-09T08:41:36.385Z",
    "size": 8569,
    "path": "../public/_nuxt/chitu.8e335285.js"
  },
  "/_nuxt/chitu.f36da382.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"5b0-7qqizfbZZcmukUFADwOaK/btoso\"",
    "mtime": "2023-01-09T08:41:36.384Z",
    "size": 1456,
    "path": "../public/_nuxt/chitu.f36da382.css"
  },
  "/_nuxt/component.vue3.8a2e6e47.js": {
    "type": "application/javascript",
    "etag": "\"26a-MURjLVyk6wWxi9COJxC2COMr7VM\"",
    "mtime": "2023-01-09T08:41:36.384Z",
    "size": 618,
    "path": "../public/_nuxt/component.vue3.8a2e6e47.js"
  },
  "/_nuxt/dayjs.3bf4ac2a.js": {
    "type": "application/javascript",
    "etag": "\"1bdb-Snd4UcPnwBkFVZuCLdvZ927L2PQ\"",
    "mtime": "2023-01-09T08:41:36.383Z",
    "size": 7131,
    "path": "../public/_nuxt/dayjs.3bf4ac2a.js"
  },
  "/_nuxt/default.3f537815.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1b4-b9+kyCXvI/sUNh1lYTfY/+QWrEg\"",
    "mtime": "2023-01-09T08:41:36.383Z",
    "size": 436,
    "path": "../public/_nuxt/default.3f537815.css"
  },
  "/_nuxt/default.cebccf72.js": {
    "type": "application/javascript",
    "etag": "\"2e4-QwGKdd9f6yO1YwSnT6TjRA424qE\"",
    "mtime": "2023-01-09T08:41:36.382Z",
    "size": 740,
    "path": "../public/_nuxt/default.cebccf72.js"
  },
  "/_nuxt/delete.3a3a4f9c.js": {
    "type": "application/javascript",
    "etag": "\"25d-LKcFAYOVp8DNiE7P0FmavSFiU1w\"",
    "mtime": "2023-01-09T08:41:36.382Z",
    "size": 605,
    "path": "../public/_nuxt/delete.3a3a4f9c.js"
  },
  "/_nuxt/document-copy.9ed563a4.js": {
    "type": "application/javascript",
    "etag": "\"216-5et658S8VjLjgPG+TLgMT83cA5o\"",
    "mtime": "2023-01-09T08:41:36.381Z",
    "size": 534,
    "path": "../public/_nuxt/document-copy.9ed563a4.js"
  },
  "/_nuxt/eHentai.3d66ad51.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"3cf-mcJXjvxa8lCj3/e80PhQyVEMHSY\"",
    "mtime": "2023-01-09T08:41:36.381Z",
    "size": 975,
    "path": "../public/_nuxt/eHentai.3d66ad51.css"
  },
  "/_nuxt/eHentai.8de36c8e.js": {
    "type": "application/javascript",
    "etag": "\"b0a-qoDtLUL1srxh2aKcJbsYa88/pso\"",
    "mtime": "2023-01-09T08:41:36.381Z",
    "size": 2826,
    "path": "../public/_nuxt/eHentai.8de36c8e.js"
  },
  "/_nuxt/eHentaiMore.031ca11a.js": {
    "type": "application/javascript",
    "etag": "\"15be-GKHApA0oLly/eRHFPshC1DTdy/k\"",
    "mtime": "2023-01-09T08:41:36.380Z",
    "size": 5566,
    "path": "../public/_nuxt/eHentaiMore.031ca11a.js"
  },
  "/_nuxt/eHentaiMore.aa4fa0ce.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"453-/rEvVMT4ZGc7A6bXYmCibvDQaUM\"",
    "mtime": "2023-01-09T08:41:36.380Z",
    "size": 1107,
    "path": "../public/_nuxt/eHentaiMore.aa4fa0ce.css"
  },
  "/_nuxt/eh.7736dbb5.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"545-DEzwMCIURtp6KRk87BiJOCSdERU\"",
    "mtime": "2023-01-09T08:41:36.379Z",
    "size": 1349,
    "path": "../public/_nuxt/eh.7736dbb5.css"
  },
  "/_nuxt/eh.c70875da.js": {
    "type": "application/javascript",
    "etag": "\"5aa-JivuZwclBaGhcbqFVMmV1eLDrWg\"",
    "mtime": "2023-01-09T08:41:36.377Z",
    "size": 1450,
    "path": "../public/_nuxt/eh.c70875da.js"
  },
  "/_nuxt/element-plus.3e7898c2.js": {
    "type": "application/javascript",
    "etag": "\"15e3d6-O3oJtbNU/RqwOxgB6kO/mmDToVA\"",
    "mtime": "2023-01-09T08:41:36.376Z",
    "size": 1434582,
    "path": "../public/_nuxt/element-plus.3e7898c2.js"
  },
  "/_nuxt/element-plus.bce9ecad.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1f2d8-MqTRAQR9/F/uMXQJ4oyt85Gh92A\"",
    "mtime": "2023-01-09T08:41:36.371Z",
    "size": 127704,
    "path": "../public/_nuxt/element-plus.bce9ecad.css"
  },
  "/_nuxt/entry.0a93fc69.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"67a48-oYciyl3dqMEbF5GbymkYtu3BkcU\"",
    "mtime": "2023-01-09T08:41:36.370Z",
    "size": 424520,
    "path": "../public/_nuxt/entry.0a93fc69.css"
  },
  "/_nuxt/entry.fcefc495.js": {
    "type": "application/javascript",
    "etag": "\"135ce-qlNW2drwNjmqf+V82AzyK480V9U\"",
    "mtime": "2023-01-09T08:41:36.367Z",
    "size": 79310,
    "path": "../public/_nuxt/entry.fcefc495.js"
  },
  "/_nuxt/error-404.1474f64e.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"e70-HViiyiVJMGPK8i0/uY2HTTvRXlw\"",
    "mtime": "2023-01-09T08:41:36.366Z",
    "size": 3696,
    "path": "../public/_nuxt/error-404.1474f64e.css"
  },
  "/_nuxt/error-404.85166055.js": {
    "type": "application/javascript",
    "etag": "\"94c-yfUCfl90kkaFuZ+QlUMrBhnTUls\"",
    "mtime": "2023-01-09T08:41:36.366Z",
    "size": 2380,
    "path": "../public/_nuxt/error-404.85166055.js"
  },
  "/_nuxt/error-500.070dde72.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"7e0-TCe48BfeVVDBYpMZAIyaR+rmom0\"",
    "mtime": "2023-01-09T08:41:36.365Z",
    "size": 2016,
    "path": "../public/_nuxt/error-500.070dde72.css"
  },
  "/_nuxt/error-500.b26567e0.js": {
    "type": "application/javascript",
    "etag": "\"7f2-XEWVxQqy/tZoTeBB55/fHiVwbRQ\"",
    "mtime": "2023-01-09T08:41:36.365Z",
    "size": 2034,
    "path": "../public/_nuxt/error-500.b26567e0.js"
  },
  "/_nuxt/error-component.1a4c325b.js": {
    "type": "application/javascript",
    "etag": "\"60b-8BKvasDgOFqYGHyM7e7o9w7UiAY\"",
    "mtime": "2023-01-09T08:41:36.364Z",
    "size": 1547,
    "path": "../public/_nuxt/error-component.1a4c325b.js"
  },
  "/_nuxt/gelbooru.4bbd5957.js": {
    "type": "application/javascript",
    "etag": "\"548-KEwcjibTZgx8NJMjQLFkTOehI9Y\"",
    "mtime": "2023-01-09T08:41:36.364Z",
    "size": 1352,
    "path": "../public/_nuxt/gelbooru.4bbd5957.js"
  },
  "/_nuxt/gelbooru.767a3652.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"247-OoUAyRu3ZoAgDrqLuchKSH/S6fM\"",
    "mtime": "2023-01-09T08:41:36.363Z",
    "size": 583,
    "path": "../public/_nuxt/gelbooru.767a3652.css"
  },
  "/_nuxt/gelbooru.e5b18d90.js": {
    "type": "application/javascript",
    "etag": "\"e01-wg3F4ki302/30cOS5UAIr3nVBIo\"",
    "mtime": "2023-01-09T08:41:36.363Z",
    "size": 3585,
    "path": "../public/_nuxt/gelbooru.e5b18d90.js"
  },
  "/_nuxt/gelbooru.eeb749a9.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"54b-mDBgqK3EJcnq7TR9kZlWmVlqgeU\"",
    "mtime": "2023-01-09T08:41:36.362Z",
    "size": 1355,
    "path": "../public/_nuxt/gelbooru.eeb749a9.css"
  },
  "/_nuxt/generateImage.25c2c081.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"6bf-kFS7RN9pzKI7yQZqcHqke50+DAA\"",
    "mtime": "2023-01-09T08:41:36.362Z",
    "size": 1727,
    "path": "../public/_nuxt/generateImage.25c2c081.css"
  },
  "/_nuxt/generateImage.9764f266.js": {
    "type": "application/javascript",
    "etag": "\"1d57-OKKMyj8u94OZHpVN2f+zx1cYEDs\"",
    "mtime": "2023-01-09T08:41:36.361Z",
    "size": 7511,
    "path": "../public/_nuxt/generateImage.9764f266.js"
  },
  "/_nuxt/imageAnalysis.50a4d731.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"6a4-aMo3LV+8oS5NOAPFfjSaT9U+B+w\"",
    "mtime": "2023-01-09T08:41:36.361Z",
    "size": 1700,
    "path": "../public/_nuxt/imageAnalysis.50a4d731.css"
  },
  "/_nuxt/imageAnalysis.d2914945.js": {
    "type": "application/javascript",
    "etag": "\"117d-meclWQ9qIImzEVNGuDWLZJtE04Y\"",
    "mtime": "2023-01-09T08:41:36.361Z",
    "size": 4477,
    "path": "../public/_nuxt/imageAnalysis.d2914945.js"
  },
  "/_nuxt/index.035df21e.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"510-9loaoxXSrjXlnJQqfjpR9Mmq59M\"",
    "mtime": "2023-01-09T08:41:36.360Z",
    "size": 1296,
    "path": "../public/_nuxt/index.035df21e.css"
  },
  "/_nuxt/index.065c9f26.js": {
    "type": "application/javascript",
    "etag": "\"ae-WmLq9JRcird9hyah2h6gy4pjm7U\"",
    "mtime": "2023-01-09T08:41:36.360Z",
    "size": 174,
    "path": "../public/_nuxt/index.065c9f26.js"
  },
  "/_nuxt/index.085e35b7.js": {
    "type": "application/javascript",
    "etag": "\"478-sVhY4dqOwwASo1HTFV762VtYMu0\"",
    "mtime": "2023-01-09T08:41:36.359Z",
    "size": 1144,
    "path": "../public/_nuxt/index.085e35b7.js"
  },
  "/_nuxt/index.0f2e28f0.js": {
    "type": "application/javascript",
    "etag": "\"c03-Ila2gjK1fB3wB6wgMUYfEl7dC5U\"",
    "mtime": "2023-01-09T08:41:36.358Z",
    "size": 3075,
    "path": "../public/_nuxt/index.0f2e28f0.js"
  },
  "/_nuxt/index.1f7a77cf.js": {
    "type": "application/javascript",
    "etag": "\"fe6-ywwociZbhnpquM7m1R+kZvDnDfg\"",
    "mtime": "2023-01-09T08:41:36.357Z",
    "size": 4070,
    "path": "../public/_nuxt/index.1f7a77cf.js"
  },
  "/_nuxt/index.283ae9d4.js": {
    "type": "application/javascript",
    "etag": "\"1dbb-4sWU7+fRHA5+dWMKKZRro4ujHOg\"",
    "mtime": "2023-01-09T08:41:36.357Z",
    "size": 7611,
    "path": "../public/_nuxt/index.283ae9d4.js"
  },
  "/_nuxt/index.396537f2.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"32f-qF7r8nNLhUK0unD/NrgYpcHnRMg\"",
    "mtime": "2023-01-09T08:41:36.356Z",
    "size": 815,
    "path": "../public/_nuxt/index.396537f2.css"
  },
  "/_nuxt/index.3f203118.js": {
    "type": "application/javascript",
    "etag": "\"129-6cXtbb4IZgflK+TLo+6wWLCkY2c\"",
    "mtime": "2023-01-09T08:41:36.356Z",
    "size": 297,
    "path": "../public/_nuxt/index.3f203118.js"
  },
  "/_nuxt/index.42a06764.js": {
    "type": "application/javascript",
    "etag": "\"a08-JmtZDrryI4e1zy7d5u1PQDmuQAE\"",
    "mtime": "2023-01-09T08:41:36.355Z",
    "size": 2568,
    "path": "../public/_nuxt/index.42a06764.js"
  },
  "/_nuxt/index.4fe012d4.js": {
    "type": "application/javascript",
    "etag": "\"1669-UhVTWiMHGlVZKlee0U2WcRloVLo\"",
    "mtime": "2023-01-09T08:41:36.355Z",
    "size": 5737,
    "path": "../public/_nuxt/index.4fe012d4.js"
  },
  "/_nuxt/index.56eb6998.js": {
    "type": "application/javascript",
    "etag": "\"1019-rEtjFHwjWUmlSbMPb2rTzI478HE\"",
    "mtime": "2023-01-09T08:41:36.354Z",
    "size": 4121,
    "path": "../public/_nuxt/index.56eb6998.js"
  },
  "/_nuxt/index.570d39c8.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"51f-o0NOCXQAhtJQkGY1OxncJqaAKLI\"",
    "mtime": "2023-01-09T08:41:36.354Z",
    "size": 1311,
    "path": "../public/_nuxt/index.570d39c8.css"
  },
  "/_nuxt/index.699548f7.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1374-o3CrDdaqf5s5WM2/7VxUKvlXDKc\"",
    "mtime": "2023-01-09T08:41:36.353Z",
    "size": 4980,
    "path": "../public/_nuxt/index.699548f7.css"
  },
  "/_nuxt/index.6f0b7816.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"8ea-W8FM5zNOeJENd0nj6IQabEEfwYQ\"",
    "mtime": "2023-01-09T08:41:36.353Z",
    "size": 2282,
    "path": "../public/_nuxt/index.6f0b7816.css"
  },
  "/_nuxt/index.73eb72e6.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"542-ubNIfinJMSLNpcek2T4kfpHchNw\"",
    "mtime": "2023-01-09T08:41:36.352Z",
    "size": 1346,
    "path": "../public/_nuxt/index.73eb72e6.css"
  },
  "/_nuxt/index.a681802f.js": {
    "type": "application/javascript",
    "etag": "\"58a-7I6XXj5d9t9rqKDT79NS7yM5KE4\"",
    "mtime": "2023-01-09T08:41:36.351Z",
    "size": 1418,
    "path": "../public/_nuxt/index.a681802f.js"
  },
  "/_nuxt/index.d7af4b93.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"54d-+E/yTo2hw5GxkreC3PdpMOg8yxQ\"",
    "mtime": "2023-01-09T08:41:36.351Z",
    "size": 1357,
    "path": "../public/_nuxt/index.d7af4b93.css"
  },
  "/_nuxt/index.dc295ea4.js": {
    "type": "application/javascript",
    "etag": "\"cac-wVxtGKJygAN7lVt4W7Aw4OwpjVA\"",
    "mtime": "2023-01-09T08:41:36.350Z",
    "size": 3244,
    "path": "../public/_nuxt/index.dc295ea4.js"
  },
  "/_nuxt/index.ffbe85b7.js": {
    "type": "application/javascript",
    "etag": "\"1e86-eszAzY3T16nGqlkvS75M6SUJbaE\"",
    "mtime": "2023-01-09T08:41:36.350Z",
    "size": 7814,
    "path": "../public/_nuxt/index.ffbe85b7.js"
  },
  "/_nuxt/lodash.93025024.js": {
    "type": "application/javascript",
    "etag": "\"1160e-MIND9AFdJDSINZlu1sA3wMMIYkI\"",
    "mtime": "2023-01-09T08:41:36.349Z",
    "size": 71182,
    "path": "../public/_nuxt/lodash.93025024.js"
  },
  "/_nuxt/nsfw.9ea694e9.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"6b7-JNCaLlkKPdIxT+HXlQ97AQKaHyI\"",
    "mtime": "2023-01-09T08:41:36.348Z",
    "size": 1719,
    "path": "../public/_nuxt/nsfw.9ea694e9.css"
  },
  "/_nuxt/nsfw.e74c371a.js": {
    "type": "application/javascript",
    "etag": "\"10f3-1Zl3Pf+INK4yyqWxXTWaaYm+gsk\"",
    "mtime": "2023-01-09T08:41:36.348Z",
    "size": 4339,
    "path": "../public/_nuxt/nsfw.e74c371a.js"
  },
  "/_nuxt/opportunity.6a6909c9.js": {
    "type": "application/javascript",
    "etag": "\"26a-wBWzGOWCmLwe8p6RiwF+DU1KYUs\"",
    "mtime": "2023-01-09T08:41:36.347Z",
    "size": 618,
    "path": "../public/_nuxt/opportunity.6a6909c9.js"
  },
  "/_nuxt/pinia.7ac5f2a7.js": {
    "type": "application/javascript",
    "etag": "\"7a6e-Wv4okGPnpG5GBXSItxx48EECAFI\"",
    "mtime": "2023-01-09T08:41:36.347Z",
    "size": 31342,
    "path": "../public/_nuxt/pinia.7ac5f2a7.js"
  },
  "/_nuxt/plus.bb77e419.js": {
    "type": "application/javascript",
    "etag": "\"61e-975Hw7UXr+AoEO1YJRfHBbPStTk\"",
    "mtime": "2023-01-09T08:41:36.346Z",
    "size": 1566,
    "path": "../public/_nuxt/plus.bb77e419.js"
  },
  "/_nuxt/promptBeautiful.6bb7c7c4.js": {
    "type": "application/javascript",
    "etag": "\"1a2a-meXrlckr/xgyFhRkjlZmFh6vy6A\"",
    "mtime": "2023-01-09T08:41:36.345Z",
    "size": 6698,
    "path": "../public/_nuxt/promptBeautiful.6bb7c7c4.js"
  },
  "/_nuxt/promptBeautiful.e9f9e773.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"581-bAdfvIUlcrkqMGQ25V+p9KTAhF4\"",
    "mtime": "2023-01-09T08:41:36.345Z",
    "size": 1409,
    "path": "../public/_nuxt/promptBeautiful.e9f9e773.css"
  },
  "/_nuxt/sYw7uX71Xe.38399cea.js": {
    "type": "application/javascript",
    "etag": "\"54-mfaS4l5fAxZxoMq5A+oTBUmQpyc\"",
    "mtime": "2023-01-09T08:41:36.344Z",
    "size": 84,
    "path": "../public/_nuxt/sYw7uX71Xe.38399cea.js"
  },
  "/_nuxt/sYw7uX71Xe.6fa69bb4.jpeg": {
    "type": "image/jpeg",
    "etag": "\"2ba5b-mSCyUXXaLyjcwRITfcfO5cP41CQ\"",
    "mtime": "2023-01-09T08:41:36.343Z",
    "size": 178779,
    "path": "../public/_nuxt/sYw7uX71Xe.6fa69bb4.jpeg"
  },
  "/_nuxt/sfw.771d4136.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"6b7-tSk+13YP7BifltAD+LP/bCw61KI\"",
    "mtime": "2023-01-09T08:41:36.342Z",
    "size": 1719,
    "path": "../public/_nuxt/sfw.771d4136.css"
  },
  "/_nuxt/sfw.9f53b6f0.js": {
    "type": "application/javascript",
    "etag": "\"10a7-eotIe3aBVe5yzmzIYb/uD5X4Aog\"",
    "mtime": "2023-01-09T08:41:36.341Z",
    "size": 4263,
    "path": "../public/_nuxt/sfw.9f53b6f0.js"
  },
  "/_nuxt/shop.8f25176c.js": {
    "type": "application/javascript",
    "etag": "\"344c-eQ0cg6KZIl4k/RFJrvaIlHnMYl0\"",
    "mtime": "2023-01-09T08:41:36.340Z",
    "size": 13388,
    "path": "../public/_nuxt/shop.8f25176c.js"
  },
  "/_nuxt/shopping-trolley.5f2a9482.js": {
    "type": "application/javascript",
    "etag": "\"370-s6xC4r1ySaUmrV+6q4KcOCHVWII\"",
    "mtime": "2023-01-09T08:41:36.339Z",
    "size": 880,
    "path": "../public/_nuxt/shopping-trolley.5f2a9482.js"
  },
  "/_nuxt/sortablejs.c8011fea.js": {
    "type": "application/javascript",
    "etag": "\"ae84-6k6k/plyDwFKcle51VkAvHEykK4\"",
    "mtime": "2023-01-09T08:41:36.338Z",
    "size": 44676,
    "path": "../public/_nuxt/sortablejs.c8011fea.js"
  },
  "/_nuxt/store.e5acb8cd.js": {
    "type": "application/javascript",
    "etag": "\"3209-6fG6V0FEMgj6Xll7ECWPHVSJaPU\"",
    "mtime": "2023-01-09T08:41:36.337Z",
    "size": 12809,
    "path": "../public/_nuxt/store.e5acb8cd.js"
  },
  "/_nuxt/utils.da672ed3.js": {
    "type": "application/javascript",
    "etag": "\"143-RY+Du6a7ZITGaR7WmCYcTQ+ngXA\"",
    "mtime": "2023-01-09T08:41:36.336Z",
    "size": 323,
    "path": "../public/_nuxt/utils.da672ed3.js"
  },
  "/_nuxt/uuid.d56aad75.js": {
    "type": "application/javascript",
    "etag": "\"1e17-w4ZqKMcepJTctQQRXCkcD2SS594\"",
    "mtime": "2023-01-09T08:41:36.335Z",
    "size": 7703,
    "path": "../public/_nuxt/uuid.d56aad75.js"
  },
  "/_nuxt/vuedraggable.5801950c.js": {
    "type": "application/javascript",
    "etag": "\"c504-uRpHsB6Tldxw4tJAA1Yj6YFfUwE\"",
    "mtime": "2023-01-09T08:41:36.334Z",
    "size": 50436,
    "path": "../public/_nuxt/vuedraggable.5801950c.js"
  },
  "/_nuxt/welcome.31ce16eb.js": {
    "type": "application/javascript",
    "etag": "\"17765-aVWpfSiW4K/VujaX+kNgmOEanes\"",
    "mtime": "2023-01-09T08:41:36.333Z",
    "size": 96101,
    "path": "../public/_nuxt/welcome.31ce16eb.js"
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
