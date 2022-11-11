// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  ssr: false,
  app: {
    baseURL: '/stable-diffution-utils-project',
    head: {
      charset: 'utf-8',
      viewport:
        'width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no',
      title: 'Stable Diffusion Utils',
      meta: [
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black' },
        { name: 'description', content: 'My amazing site.' },
      ],
    },
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/scss/colors.scss" as *;',
        },
      },
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return 'vendor';
            }
          },
        },
      },
      minify: false,
    },
  },
  css: ['@/assets/scss/index.scss', '@/assets/scss/layout.scss'],
  postcss: {
    config: true,
    plugins: {
      autoprefixer: {}, // 用来给不同的浏览器自动添加相应前缀，如-webkit-，-moz-等等
      'postcss-px-to-viewport-7039': {
        unitToConvert: 'px', // 需要转换的单位，默认为"px"
        viewportWidth: 375, // 设计稿的视口宽度
        unitPrecision: 3, // 单位转换后保留的精度
        propList: ['*'], // 能转化为vw的属性列表
        viewportUnit: 'vw', // 希望使用的视口单位
        fontViewportUnit: 'vw', // 字体使用的视口单位
        selectorBlackList: ['.ignore'], // 需要忽略的CSS选择器，不会转为视口单位，使用原有的px等单位。
        minPixelValue: 1, // 设置最小的转换数值，如果为1的话，只有大于1的值会被转换
        mediaQuery: false, // 媒体查询里的单位是否需要转换单位
        replace: true, //  是否直接更换属性值，而不添加备用属性
        exclude: [/[\\/]pages[\\/]pc[\\/]/, /[\\/]components[\\/]pc[\\/]/], // 忽略某些文件夹下的文件或特定文件，例如 'node_modules' 下的文件
        include: [/[\\/]pages[\\/]mobile[\\/]/, /[\\/]components[\\/]mobile[\\/]/], // 如果设置了include，那将只有匹配到的文件才会被转换
        landscape: true, // 是否添加根据 landscapeWidth 生成的媒体查询条件 @media (orientation: landscape)
        landscapeUnit: 'vw', // 横屏时使用的单位
        landscapeWidth: 1920, // 横屏时使用的视口宽度
      },
    },
  },
});
