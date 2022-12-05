import scrollTo from '../utils/direction/scrollTo';

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(scrollTo);
});
