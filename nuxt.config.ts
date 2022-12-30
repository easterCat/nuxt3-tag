import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';
import Inspect from 'vite-plugin-inspect';

let ssrStatus = true;
if (process.env.npm_lifecycle_event === 'generate') {
    ssrStatus = false;
}

export default defineNuxtConfig({
    ssr: ssrStatus,
    sourcemap: false,
    srcDir: 'src/',
    css: ['@/assets/scss/index.scss', '@/assets/scss/element.modify.scss'],
    modules: [
        '@nuxt/image-edge',
        '@nuxtjs/tailwindcss',
        '@nuxtjs/color-mode',
        'nuxt-icon',
        '@pinia/nuxt',
    ],
    colorMode: {
        preference: 'Sunset',
        dataValue: 'theme',
    },
    image: {
        dir: 'assets/imgs',
    },
    app: {
        baseURL: '/nuxt3-tag',
        head: {
            charset: 'utf-8',
            viewport:
                'width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no',
            title: 'AI绘画的辅助工具',
            link: [
                {
                    rel: 'icon',
                    type: 'image/x-icon',
                    href: '/nuxt3-tag/dute_favicon_32x32.ico',
                },
                {
                    rel: 'stylesheet',
                    type: 'text/css',
                    href: 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css',
                },
            ],
            meta: [
                { name: 'apple-mobile-web-app-capable', content: 'yes' },
                { name: 'apple-mobile-web-app-status-bar-style', content: 'black' },
                { name: 'description', content: 'AI绘画的辅助工具.' },
                { name: 'referrer', content: 'never' },
                { name: 'msapplication-TileColor"', content: '#ffffff' },
                { name: 'theme-color"', content: '#ffffff' },
            ],
            script: [
                { src: 'https://cdn.jsdelivr.net/npm/theme-change@2.0.2/index.js', defer: true },
            ],
        },
    },
    runtimeConfig: {
        public: {
            API_DATA_FROM: process.env.API_DATA_FROM,
            FLASK_BASE_API: process.env.FLASK_BASE_API,
            GELBOORU_TOKEN: process.env.GELBOORU_TOKEN,
            IP_ADDRESS: process.env.IP_ADDRESS,
        },
    },
    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: `@use "~/assets/scss/element.theme.scss" as *;`,
                },
            },
        },
        build: {
            chunkSizeWarningLimit: 1600,
            rollupOptions: {
                output: {
                    manualChunks(id: any): any {
                        const chunks = [
                            'element-plus',
                            'store',
                            'pinia',
                            'uuid',
                            'vue-uuid',
                            'dayjs',
                            'sortablejs',
                            'lodash',
                            'vuedraggable',
                        ];

                        if (id.includes('/node_modules/')) {
                            for (const chunkName of chunks) {
                                if (id.includes(chunkName)) {
                                    return chunkName;
                                }
                            }
                        }
                    },
                },
            },
            minify: 'terser',
        },
        plugins: [
            AutoImport({
                resolvers: [
                    ElementPlusResolver({ ssr: ssrStatus }),
                    IconsResolver({
                        prefix: 'Icon',
                    }),
                ],
                dts: './types/auto-imports.d.ts',
            }),
            Components({
                resolvers: [
                    ElementPlusResolver({ ssr: ssrStatus }),
                    IconsResolver({
                        enabledCollections: ['ep'],
                    }),
                ],
                dts: './types/components.d.ts',
            }),
            Icons({
                autoInstall: true,
            }),
            Inspect(),
        ],
    },
    postcss: require('./postcss.config.js'),
});
