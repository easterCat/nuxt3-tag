import { defineNuxtPlugin } from '#app';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import {
  ElMenu,
  ElMenuItem,
  ElButton,
  ElRow,
  ElCol,
  ElCard,
  ElInput,
  ElIcon,
  ElDescriptions,
  ElDescriptionsItem,
  ElDrawer,
  ElLink,
  ElDialog,
  ElTag,
  ElAvatar,
  ElBadge,
} from 'element-plus';
import { ID_INJECTION_KEY } from 'element-plus';
import 'element-plus/dist/index.css';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.provide(ID_INJECTION_KEY, {
    prefix: Math.floor(Math.random() * 1000),
    current: 0,
  });

  nuxtApp.vueApp.use(ElMenu);
  nuxtApp.vueApp.use(ElMenuItem);
  nuxtApp.vueApp.use(ElButton);
  nuxtApp.vueApp.use(ElRow);
  nuxtApp.vueApp.use(ElCol);
  nuxtApp.vueApp.use(ElCard);
  nuxtApp.vueApp.use(ElInput);
  nuxtApp.vueApp.use(ElIcon);
  nuxtApp.vueApp.use(ElDescriptions);
  nuxtApp.vueApp.use(ElDescriptionsItem);
  nuxtApp.vueApp.use(ElDrawer);
  nuxtApp.vueApp.use(ElLink);
  nuxtApp.vueApp.use(ElDialog);
  nuxtApp.vueApp.use(ElTag);
  nuxtApp.vueApp.use(ElAvatar);
  nuxtApp.vueApp.use(ElBadge);

  // 全局注册 element 图标
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    nuxtApp.vueApp.component(key, component);
  }
});
