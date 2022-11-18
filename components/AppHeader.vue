<template>
    <header class="fix-header header">
        <div class="header-menu">
            <el-menu
                :default-active="activeIndex"
                class="el-menu-demo"
                mode="horizontal"
                :ellipsis="false"
            >
                <el-menu-item index="0">Stable Diffusion</el-menu-item>
                <div class="flex-grow" />
                <el-menu-item index="/pc/home" @click="handleNavClick('home')">首页</el-menu-item>
                <el-sub-menu index="/tags">
                    <template #title>标签</template>
                    <el-menu-item index="/pc/tags" @click="handleNavClick('tags')">
                        常规标签
                    </el-menu-item>
                    <el-menu-item
                        index="/pc/tags/gelbooru"
                        @click="handleNavClick('tags/gelbooru')"
                    >
                        gelbooru标签
                    </el-menu-item>
                    <el-menu-item index="/pc/tags/eh" @click="handleNavClick('tags/eh')">
                        EH标签(nsfw)
                    </el-menu-item>
                </el-sub-menu>
                <el-menu-item index="/pc/template" @click="handleNavClick('template')">
                    模板
                </el-menu-item>
                <el-menu-item index="/pc/utils" @click="handleNavClick('utils')">工具</el-menu-item>
                <el-menu-item index="/pc/links" @click="handleNavClick('links')">收录</el-menu-item>
                <el-menu-item index="/pc/web" @click="handleNavClick('web')">其他</el-menu-item>
            </el-menu>
        </div>
        <div class="user-info">
            <div v-if="!shopStatus">
                <el-button size="small" type="success">
                    购物车
                    <slot name="icon">
                        <i-ep-shopping-cart />
                    </slot>
                </el-button>
            </div>
            <div v-else>
                <el-badge :value="1">
                    <el-button size="small" type="success" @click="shopEvent">
                        购物车
                        <slot name="icon">
                            <i-ep-shopping-cart-full />
                        </slot>
                    </el-button>
                </el-badge>
            </div>
            <div>
                <el-button type="success" size="small" @click="handleNavClick('design')">
                    设计模式
                </el-button>
            </div>
            <div>
                <el-avatar src="https://image.lexica.art/md/26ef6676-a7e3-4560-8cb8-4355e017dc2b" />
            </div>
        </div>
        <PcShopLayer v-model="showShopLayer"></PcShopLayer>
    </header>
</template>

<script lang="ts" setup>
import { Ref, ref } from 'vue';

// data
const router = useRouter();
const route = useRoute();
const path: Ref<string> = ref(route.path);
const activeIndex: Ref<string> = ref(path ?? '/home');
const shopStatus: Ref<boolean> = ref(false);
const showShopLayer: Ref<boolean> = ref(false);
const { shopList } = useShop();

watch(shopList, (newValue) => {
    shopStatus.value = !!newValue.length;
});

//methods
const handleNavClick = (link: string) => {
    router.push({ path: `/pc/${link}` });
    activeIndex.value = `/pc/${link}`;
};

const shopEvent = () => {
    showShopLayer.value = true;
};

onMounted(() => {});
</script>

<style lang="scss" scoped>
header {
    position: sticky;
    top: 0px;
    z-index: 1001;
    display: flex;
    background: #fff;
    box-shadow: rgba(17, 17, 26, 0.15) 0px 3px 8px;

    .header-menu {
        flex: 1;
    }

    .user-info {
        width: 260px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        padding: 0 20px;
    }
}

:deep(.el-menu) {
    height: 72px;
}

.shop-card {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 3001;
    background: #fff;
    padding: 30px 40px;
    overflow-y: auto;

    .shop-card-header {
        display: flex;
        justify-content: space-between;
        font-size: 28px;
        color: rgb(97, 96, 96);

        svg {
            cursor: pointer;
        }
    }

    .shop-card-con {
        margin-top: 20px;

        > div {
            display: flex;
            justify-content: flex-start;
            flex-wrap: wrap;
        }
    }

    .shop-item {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 8px 16px;
        color: #666;
        background: linear-gradient(145deg, rgb(233, 233, 233) 0%, rgba(233, 233, 233, 0.7) 100%);
        margin-right: 16px;
        margin-bottom: 16px;
        border-radius: 4px;
        box-shadow: rgba(17, 17, 26, 0.15) 0px 3px 8px;
        cursor: pointer;
        font-weight: bold;

        svg {
            font-size: 14px;
            margin-left: 8px;
            transform: translateY(3px);
        }
    }
}

:deep(.el-menu--horizontal) {
    border-bottom: none;
}
</style>
