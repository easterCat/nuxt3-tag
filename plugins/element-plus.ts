// plugins\element-plus.ts
import { defineNuxtPlugin } from '#app'
import * as icons from "@element-plus/icons-vue";
import ElementPlus from 'element-plus'
import { ID_INJECTION_KEY } from 'element-plus'
import "element-plus/dist/index.css"


export default defineNuxtPlugin(nuxtApp => {
    nuxtApp.vueApp.provide(ID_INJECTION_KEY, {
        prefix: Math.floor(Math.random() * 1000),
        current: 0
    })

    nuxtApp.vueApp.use(ElementPlus)

    // 全局注册 element 图标
    Object.keys(icons).forEach((key) => {
        nuxtApp.vueApp.component("ElIcon" + key, icons[key]);
    });
})
