import { defineNuxtPlugin } from '#app';
import VueAnimateCss from 'vue3-animate-css';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueAnimateCss);
});
