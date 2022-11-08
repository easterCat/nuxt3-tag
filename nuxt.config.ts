// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    ssr: false,
    app: {
        baseURL: '/stable-diffution-utils-project',
        head: {
            charset: 'utf-16',
            viewport: 'width=500, initial-scale=1',
            title: 'Stable Diffusion Utils',
            meta: [
                { name: 'description', content: 'My amazing site.' }
            ],
        },
    },
    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: '@use "@/assets/scss/colors.scss" as *;'
                }
            }
        }
    },
    css: [
        '@/assets/scss/index.scss',
        '@/assets/scss/layout.scss',
    ]
})
