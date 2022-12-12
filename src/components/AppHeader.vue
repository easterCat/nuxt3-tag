<template>
    <header class="fix-header header bg-base-100">
        <div class="header-menu">
            <div class="header-icon">
                <nuxt-img src="https://image.lexica.art/md/9ce846a3-21f0-4f35-bf40-61d5c918860a" />
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
                            <div class="hover-con bg-base-100">
                                <span @click="handleNavClick('tags')">常规标签</span>
                                <span @click="handleNavClick('tags/chitu')">词图标签</span>
                                <span @click="handleNavClick('tags/gelbooru')">Gelbooru(H)</span>
                                <span @click="handleNavClick('tags/eh')">EHentai(H)</span>
                            </div>
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
            <div v-if="screenSize === 'large' || screenSize === 'medium'" class="user-name">
                <div>
                    <el-avatar
                        src="https://image.lexica.art/md/26ef6676-a7e3-4560-8cb8-4355e017dc2b"
                    />
                </div>
                <span>Welcome!</span>
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
            </div>
            <div class="user-menu">
                <Transition name="fade">
                    <span v-if="openMenu"><i-ep-expand></i-ep-expand></span>
                    <span v-else><i-ep-fold></i-ep-fold></span>
                </Transition>
            </div>
        </div>
        <client-only>
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
        </client-only>
        <PcShopLayer v-model="showShopLayer"></PcShopLayer>
    </header>
</template>

<script lang="ts" setup>
import { Ref, ref } from 'vue';
import { throttle } from 'lodash';
import { Icon } from '#components';

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

// large medium small
const screenSize = ref('large');
const router = useRouter();
const route = useRoute();
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

const throttleResize = throttle(resize, 1200);

onMounted(() => {
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

header {
    position: sticky;
    top: 0px;
    z-index: 1001;
    width: 100%;
    box-shadow: rgba(17, 17, 26, 0.05) 0px 6px 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .header-menu {
        flex: 1;
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
        height: 42px;
        padding: 0 24px;
        margin: 0 6px;
        font-size: 14px;
        border-radius: 10px;
        cursor: pointer;

        > svg {
            margin-right: 8px;
            font-size: 18px;
        }
    }

    .menu-item-select {
        position: absolute;
        bottom: -195px;
        left: 0px;
        width: 400px;
        height: 200px;

        .hover-con {
            display: flex;
            justify-content: space-around;
            align-items: center;
            flex-wrap: wrap;
            border-radius: 10px;
            width: 170px;
            height: 210px;
            padding: 10px;
            transform: translateY(25px);
            border-color: hsl(var(--p) / 1);
            box-shadow: 0 3.67px 38.7px rgb(0 0 0 / 11%);

            span {
                width: 150px;
                height: 42px;
                line-height: 42px;
                text-align: center;
                font-size: 14px;
                border-radius: 10px;
                --tw-border-opacity: 1;
                border-color: hsl(var(--p) / var(--tw-border-opacity));
                --tw-bg-opacity: 1;
                background-color: hsl(var(--p) / var(--tw-bg-opacity));
                --tw-text-opacity: 1;
                color: hsl(var(--pc) / var(--tw-text-opacity));
            }
        }
    }

    .menu-item:last-child {
        &::after {
            display: none;
        }
    }

    .menu-item:hover {
        --tw-border-opacity: 1;
        border-color: hsl(var(--p) / var(--tw-border-opacity));
        --tw-bg-opacity: 1;
        background-color: hsl(var(--p) / var(--tw-bg-opacity));
        --tw-text-opacity: 1;
        color: hsl(var(--pc) / var(--tw-text-opacity));
        transition: background 0.3s ease;

        > svg {
            --tw-text-opacity: 1;
            color: hsl(var(--pc) / var(--tw-text-opacity));
        }
    }

    .item-active {
        --tw-border-opacity: 1;
        border-color: hsl(var(--p) / var(--tw-border-opacity));
        --tw-bg-opacity: 1;
        background-color: hsl(var(--p) / var(--tw-bg-opacity));
        --tw-text-opacity: 1;
        color: hsl(var(--pc) / var(--tw-text-opacity));
        transition: background 0.3s ease;

        > svg {
            --tw-text-opacity: 1;
            color: hsl(var(--pc) / var(--tw-text-opacity));
        }
    }

    .user-info {
        width: 360px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 20px;
    }

    .user-name {
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
        animation: 0.8s cubic-bezier(0.25, 0.1, 0.25, 1) 0s infinite pulse;
    }
}

@keyframes pulse {
    0% {
        transform: scaleX(1);
    }

    50% {
        transform: scale3d(1.1, 1.05, 1.05);
    }

    100% {
        transform: scaleX(1);
    }
}
</style>
