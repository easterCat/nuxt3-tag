# Nuxt3开发的web应用程序

项目由nuxt3 + vue3 + ts + element-plus构成

 [nuxt 3 documentation](https://v3.nuxtjs.org)
 [element-plus](https://element-plus.gitee.io/zh-CN/component/button.html)
 [vue 3 documentation](https://cn.vuejs.org/guide/introduction.html#api-styles)
 [关TypeScript的所有知识](https://www.tslang.cn/docs/home.html)

## Setup

Make sure to install the dependencies: node@16

```bash
# yarn
yarn install

# npm
npm install

# pnpm
pnpm install --shamefully-hoist
```

## Development Server

Start the development server on
Local:    <http://localhost:7089/stable-diffution-utils-project/>
Network:  <http://172.18.234.34:7089/stable-diffution-utils-project/>

> 为了使用github page的二级页面, 需要变更baseURL: '/stable-diffution-utils-project'

```bash
yarn dev
```

## Production静态页面

Build the application for production:

```bash
yarn generate
```

> 将打包出的dist发布到github page即可

Checkout the [deployment documentation](https://v3.nuxtjs.org/guide/deploy/presets) for more information.

## Production部署服务端渲染(没用上)

Build the application for production:

```bash
yarn build
```

Locally preview production build:

```bash
yarn preview
```

Checkout the [deployment documentation](https://v3.nuxtjs.org/guide/deploy/presets) for more information.
