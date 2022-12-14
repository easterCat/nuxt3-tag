import AutoImport from 'unplugin-auto-import/vite';
import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import { createStyleImportPlugin, ElementPlusResolve } from 'vite-plugin-style-import';
import Inspect from 'vite-plugin-inspect';

const ssrStatus = false;

export default defineNuxtConfig({
    ssr: ssrStatus,
    sourcemap: false,
    srcDir: 'src/',
    css: [
        '@/assets/scss/index.scss',
        '@/assets/scss/animate.scss',
        '@/assets/scss/layout.scss',
        '@/assets/scss/flex.scss',
        '@/assets/scss/box.scss',
        '@/assets/scss/media.scss',
    ],
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
        // layoutTransition: { name: 'layout', mode: 'out-in' },
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
            rollupOptions: {
                output: {
                    manualChunks(id: any): any {
                        // element-plus 通过analyze分析得出entry中的大文件，进行抽离
                        if (id.includes('node_modules/element-plus')) {
                            return 'element-plus';
                        }

                        // vuedraggable
                        if (id.includes('node_modules/vuedraggable')) {
                            return 'vuedraggable';
                        }

                        // sortablejs
                        if (id.includes('node_modules/sortablejs')) {
                            return 'sortablejs';
                        }

                        // lodash
                        if (id.includes('node_modules/lodash')) {
                            return 'lodash';
                        }

                        // default
                        if (id.includes('node_modules')) {
                            return 'vendor';
                        }
                    },
                },
            },
            minify: 'terser',
        },
        plugins: [
            // 解决自动导入message toast样式丢失问题
            createStyleImportPlugin({
                resolves: [ElementPlusResolve()],
                libs: [
                    {
                        libraryName: 'element-plus',
                        esModule: true,
                        resolveStyle: (name) => {
                            if (!name.includes('id-injection-key')) {
                                return `element-plus/theme-chalk/${name}.css`;
                            } else {
                                return '';
                            }
                        },
                    },
                ],
            }),
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
