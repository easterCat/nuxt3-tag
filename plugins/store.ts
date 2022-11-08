import { defineNuxtPlugin } from '#app'
import store from 'store'

export default defineNuxtPlugin(() => {
    return {
        provide: {
            store
        }
    }
})
