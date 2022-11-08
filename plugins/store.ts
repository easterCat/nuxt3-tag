import { defineNuxtPlugin } from '#app'
import store from 'store'

export default defineNuxtPlugin(nuxtApp => {
    return {
        provide: {
            store
        }
    }
})
