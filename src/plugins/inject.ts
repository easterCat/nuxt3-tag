import scrollTo from '../direction/scrollTo';
import animate from '../direction/animate';

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(scrollTo);
    nuxtApp.vueApp.use(animate);
});
