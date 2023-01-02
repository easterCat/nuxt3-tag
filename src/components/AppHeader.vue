<template>
    <header class="fix-header header bg-base-30">
        <div class="header-con">
            <div class="header-menu">
                <div class="header-icon">
                    <nuxt-img
                        src="https://image.lexica.art/md/9ce846a3-21f0-4f35-bf40-61d5c918860a"
                    />
                </div>
                <div v-if="screenSize === 'large'" class="my-menu">
                    <span
                        class="menu-item"
                        :class="{ 'item-active': activeEvent('home') }"
                        @click="handleNavClick('home')"
                    >
                        <i-ep-house></i-ep-house>
                        首页
                    </span>
                    <span
                        class="menu-item"
                        :class="{ 'item-active': activeEvent('tags') }"
                        @mouseenter="hoverTagMenu"
                        @mouseleave="leaveTagMenu"
                    >
                        <i-ep-collection-tag></i-ep-collection-tag>
                        标签
                        <transition name="slide">
                            <div v-if="hoverMenu" class="menu-item-select">
                                <ClientOnly>
                                    <div class="hover-con">
                                        <span
                                            v-animate-css="{ direction: 'modifySlideInDown' }"
                                            @click="handleNavClick('tags')"
                                        >
                                            <img src="@/assets/imgs/header-drop/01.webp" alt="" />
                                            <span>常规标签</span>
                                        </span>
                                        <span
                                            v-animate-css="{
                                                direction: 'modifySlideInDown',
                                                delay: 60,
                                            }"
                                            @click="handleNavClick('tags/chitu')"
                                        >
                                            <img src="@/assets/imgs/header-drop/02.webp" alt="" />
                                            <span>词图标签</span>
                                        </span>
                                        <span
                                            v-animate-css="{
                                                direction: 'modifySlideInDown',
                                                delay: 120,
                                            }"
                                            @click="handleNavClick('tags/gelbooru')"
                                        >
                                            <img src="@/assets/imgs/header-drop/03.webp" alt="" />
                                            <span>Gelbooru(H)</span>
                                        </span>
                                        <span
                                            v-animate-css="{
                                                direction: 'modifySlideInDown',
                                                delay: 180,
                                            }"
                                            @click="handleNavClick('tags/eh')"
                                        >
                                            <img src="@/assets/imgs/header-drop/04.webp" alt="" />
                                            <span>EHentai(H)</span>
                                        </span>
                                    </div>
                                </ClientOnly>
                            </div>
                        </transition>
                    </span>
                    <span
                        class="menu-item"
                        :class="{ 'item-active': activeEvent('template/sfw') }"
                        @click="handleNavClick('template/sfw')"
                    >
                        <i-ep-files></i-ep-files>
                        SFW模版
                    </span>
                    <span
                        class="menu-item"
                        :class="{ 'item-active': activeEvent('template/nsfw') }"
                        @click="handleNavClick('template/nsfw')"
                    >
                        <i-ep-files></i-ep-files>
                        NSFW模版
                    </span>
                    <span
                        class="menu-item"
                        :class="{ 'item-active': activeEvent('utils') }"
                        @click="handleNavClick('utils')"
                    >
                        <i-ep-guide></i-ep-guide>
                        工具
                    </span>
                    <span
                        class="menu-item"
                        :class="{ 'item-active': activeEvent('links') }"
                        @click="handleNavClick('links')"
                    >
                        <i-ep-link></i-ep-link>
                        收录
                    </span>
                </div>
            </div>
            <div class="user-info">
                <div class="dropdown">
                    <label tabindex="0" class="m-1">
                        <div
                            v-if="screenSize === 'large' || screenSize === 'medium'"
                            class="user-name"
                        >
                            <el-avatar
                                src="https://image.lexica.art/md/26ef6676-a7e3-4560-8cb8-4355e017dc2b"
                            />
                            <span>{{ indexStore?.username || 'Welcome!' }}</span>
                        </div>
                    </label>
                    <ul
                        tabindex="0"
                        class="p-2 shadow dropdown-content menu bg-base-100 rounded-box w-52"
                    >
                        <li @click="router.push({ path: '/pc/profile' })"><a>用户中心</a></li>
                        <li @click="logout">
                            <a>{{ indexStore?.username ? '账号登出' : '账号登录' }}</a>
                        </li>
                    </ul>
                </div>

                <div class="user-util">
                    <div v-if="!shopStatus">
                        <button
                            class="hover-anime-btn btn btn-sm btn-primary btn-circle"
                            @click="shopEvent"
                        >
                            <Icon name="clarity:shopping-cart-solid" size="16" />
                        </button>
                    </div>
                    <div v-else>
                        <button
                            class="hover-anime-btn btn btn-sm btn-primary btn-circle"
                            @click="shopEvent"
                        >
                            <Icon name="clarity:shopping-cart-solid-badged" size="16" />
                        </button>
                    </div>
                    <div>
                        <button
                            class="hover-anime-btn btn btn-sm btn-secondary btn-circle"
                            @click="handleNavClick('design')"
                        >
                            <Icon name="ant-design:sketch-outlined" size="20" />
                        </button>
                    </div>
                    <div>
                        <button
                            class="hover-anime-btn btn btn-sm btn-accent btn-circle"
                            @click="() => (drawer = !drawer)"
                        >
                            <Icon name="ant-design:skin-outlined" size="16" />
                        </button>
                    </div>
                    <div class="user-menu">
                        <Transition name="fade">
                            <span v-if="openMenu"><i-ep-expand></i-ep-expand></span>
                            <span v-else><i-ep-fold></i-ep-fold></span>
                        </Transition>
                    </div>
                </div>
            </div>
        </div>
        <ClientOnly>
            <el-drawer v-model="drawer" title="主题" :with-header="false" size="50%">
                <div class="m-b-20">daisyUI 主题</div>
                <ul class="flex flex-wrap">
                    <li
                        v-for="theme of themes"
                        :key="theme"
                        class="theme-select-btn"
                        @click="() => (colorMode.preference = theme)"
                    >
                        <div class="left">
                            {{ theme }}
                        </div>
                        <div class="right">
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </li>
                </ul>
            </el-drawer>
        </ClientOnly>
        <PcShopLayer v-model="showShopLayer"></PcShopLayer>
    </header>
</template>

<script lang="ts" setup>
import { Ref, ref } from 'vue';
import lodash from 'lodash';
import { Icon } from '#components';
import { useIndexStore } from '@/store/index';

const colorMode = useColorMode();
const themes = [
    'light',
    'dark',
    'cupcake',
    'bumblebee',
    'emerald',
    'corporate',
    'synthwave',
    'retro',
    'cyberpunk',
    'valentine',
    'halloween',
    'garden',
    'forest',
    'aqua',
    'lofi',
    'pastel',
    'fantasy',
    'wireframe',
    'black',
    'luxury',
    'dracula',
    'cmyk',
    'autumn',
    'business',
    'acid',
    'lemonade',
    'night',
    'coffee',
    'winter',
    'Sunset',
];

const indexStore: any = useIndexStore();
const { AuthApi } = useApi();
const router = useRouter();
const route = useRoute();
// large medium small
const screenSize = ref('large');
const path: Ref<string> = ref(route.path);
const activeIndex: Ref<string> = ref(path.value ?? '/home');
const shopStatus: Ref<boolean> = ref(false);
const showShopLayer: Ref<boolean> = ref(false);
const openMenu: Ref<boolean> = ref(false);
const hoverMenu: Ref<boolean> = ref(false);
const drawer: Ref<boolean> = ref(false);
const { shopList } = useShop();

watch(shopList, (newValue) => {
    shopStatus.value = !!newValue.length;
});

const logout = async () => {
    if (!indexStore?.username) {
        indexStore.clearToken();
        indexStore.clearUserInfo();
        return router.push({ path: '/pc/login' });
    }
    const result = await AuthApi.logout();
    const { code, msg } = result;
    if ((code === 200 || code === 20003) && msg) {
        indexStore.clearToken();
        indexStore.clearUserInfo();
        return ElMessage({
            type: 'success',
            message: '账号登出成功!ByeBye',
            showClose: true,
        });
    } else {
        return ElMessage({
            type: 'warning',
            message: msg,
            showClose: true,
        });
    }
};

const activeEvent = (r: string) => {
    return route.path.includes(`pc/${r}`);
};

const hoverTagMenu = () => {
    hoverMenu.value = true;
};

const leaveTagMenu = () => {
    hoverMenu.value = false;
};

// methods
const handleNavClick = (link: string) => {
    router.push({ path: `/pc/${link}` });
    activeIndex.value = `/pc/${link}`;
};

const shopEvent = () => {
    showShopLayer.value = true;
};

const resize = () => {
    const w: any = window?.innerWidth;
    if (w < 1200 && w > 750) {
        screenSize.value = 'medium';
    } else if (w < 750) {
        screenSize.value = 'small';
    } else {
        screenSize.value = 'large';
    }
};

const throttleResize = lodash.throttle(resize, 1200);

onMounted(() => {
    // indexStore = useIndexStore();
    resize();
    window.addEventListener('resize', throttleResize);
});

onBeforeUnmount(() => {
    window.removeEventListener('resize', throttleResize);
});
</script>

<style lang="scss" scoped>
.theme-select-btn {
    width: 30%;
    margin-bottom: 10px;
    margin-right: 10px;
    text-align: center;
    box-sizing: border-box;
    border-radius: 10px;
    cursor: pointer;

    .left {
        width: 100%;
        height: 40px;
        line-height: 40px;
        text-align: left;
    }
    .right {
        height: 50px;
        display: flex;
        justify-content: flex-start;
        align-items: center;

        > span {
            height: 50px;
            width: 20%;
        }

        span:nth-child(1) {
            border-color: hsl(var(--p) / 1);
            background-color: hsl(var(--p) / 1);
            color: hsl(var(--pc) / 1);
        }
        span:nth-child(2) {
            border-color: hsl(var(--a) / 1);
            background-color: hsl(var(--a) / 1);
            color: hsl(var(--ac) / 1);
        }
        span:nth-child(3) {
            border-color: hsl(var(--s) / 1);
            background-color: hsl(var(--s) / 1);
            color: hsl(var(--sc) / 1);
        }
        span:nth-child(4) {
            border-color: hsl(var(--n) / 1);
            background-color: hsl(var(--n) / 1);
            color: hsl(var(--nc) / 1);
        }
    }
}

.bg-base-30 {
    --tw-bg-opacity: 0.3;
    background-color: hsl(var(--b1) / var(--tw-bg-opacity));
}

.header {
    position: sticky;
    top: 0px;
    z-index: 1001;
    width: 100%;
    box-shadow: hsl(var(--p) / 0.2) 0px 48px 100px 0px;

    .header-con {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 72px;
    }

    .header-menu {
        width: auto;
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }

    .header-icon {
        width: 52px;
        height: 52px;
        margin-left: 16px;
        margin-right: 36px;
        border-radius: 10px;
        overflow: hidden;
        animation-name: wobbleHorizontal;
        animation-duration: 28s;
        animation-timing-function: ease-in-out;
        animation-iteration-count: infinite;

        img {
            width: 100%;
            height: 100%;
            object-fit: contain;
        }
    }

    .my-menu {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        height: 70px;
    }

    .menu-item {
        position: relative;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        height: 72px;
        padding: 0 24px;
        margin: 0 6px;
        font-size: 14px;
        cursor: pointer;

        > svg {
            margin-right: 8px;
            font-size: 18px;
        }
    }

    .menu-item-select {
        position: absolute;
        top: 70px;
        left: 0px;
        right: 0px;
        width: 800px;
        height: 140px;
        padding-top: 22px;

        .hover-con {
            display: flex;
            justify-content: space-around;
            align-items: center;
            border-radius: 10px;
            width: 800px;
            height: 120px;

            > span {
                position: relative;
                width: 180px;
                height: 120px;
                line-height: 120px;
                text-align: center;
                font-size: 14px;
                border-radius: 10px;
                overflow: hidden;

                > span {
                    position: absolute;
                    top: 10px;
                    left: 10px;
                    width: auto;
                    height: 30px;
                    line-height: 30px;
                    --tw-text-opacity: 1;
                    color: hsl(var(--pc) / var(--tw-text-opacity));
                    font-size: 18px;
                    font-weight: bold;
                }

                img {
                    width: 100%;
                    height: 100%;
                    filter: blur(4px) grayscale(20%);
                }
            }
        }
    }

    .menu-item:hover {
        --tw-text-opacity: 0.8;
        color: hsl(var(--nc) / var(--tw-text-opacity));

        &::after {
            content: '';
            position: absolute;
            left: 14px;
            bottom: 0;
            width: calc(100% - 20px);
            height: 2px;
            --tw-border-opacity: 1;
            background: hsl(var(--p) / var(--tw-border-opacity));
            animation-duration: 0.4s;
            animation-name: slideIn;
            animation-iteration-count: 1;
        }

        > svg {
            --tw-text-opacity: 1;
            color: hsl(var(--nc) / var(--tw-text-opacity));
        }
    }

    .item-active {
        --tw-text-opacity: 1;
        color: hsl(var(--nc) / var(--tw-text-opacity));

        &::after {
            content: '';
            position: absolute;
            left: 14px;
            bottom: 0;
            width: calc(100% - 20px);
            height: 2px;
            --tw-border-opacity: 1;
            background: hsl(var(--p) / var(--tw-border-opacity));
            animation-duration: 0.4s;
            animation-name: slideIn;
            animation-iteration-count: 1;
        }

        > svg {
            --tw-text-opacity: 1;
            color: hsl(var(--nc) / var(--tw-text-opacity));
        }
    }

    .user-info {
        width: auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 72px;
    }

    .user-name {
        width: auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: relative;
        font-size: 14px;
        padding: 0 10px 0 0;

        > span {
            margin-left: 8px;
        }
    }

    .user-util {
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: relative;
        font-size: 14px;
        padding: 0 10px 0 8px;

        > div {
            padding: 0 8px;
        }

        .icon {
            margin-left: 0;
        }
    }

    .user-menu {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 22px;
        width: 40px;
        cursor: pointer;
        position: relative;

        span {
            display: flex;
            align-items: center;
            position: absolute;
            right: 0;
        }
    }

    .hover-anime-btn:hover {
        animation: 0.9s cubic-bezier(0.25, 0.1, 0.25, 1) 0s infinite pulse;
    }
}

:deep(.el-overlay) {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    transition: all 0.5s linear;

    .el-drawer {
        background: hsl(var(--b2) / 1);
    }
}
</style>
