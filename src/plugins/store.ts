import store from 'store';
import { defineNuxtPlugin } from '#app';

export default defineNuxtPlugin(() => {
    return {
        provide: {
            store,
        },
    };
});
