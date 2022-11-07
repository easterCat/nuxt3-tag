<template>
    <NuxtLayout>
        <div class="utils-page">
            <el-container>
                <el-header>
                    <AppHeader />
                </el-header>
                <div class="max-width-limit">
                    <el-container>
                        <el-aside width="200px">
                            <div class="menu-list">
                                <div v-for="(menu, mIndex) in menuList" class="menu-item"
                                    :class="{ 'menu-item-active': mIndex === menuActive }" :key="mIndex"
                                    @click="menuClick(menu, mIndex)">
                                    <img v-lazy="menu?.bg" alt="" /><span>{{ menu?.name }}</span>
                                </div>
                            </div>
                        </el-aside>
                        <el-main width="800px">
                            <div class="tranfer-con">
                                <el-input v-model="textArea" :autosize="{ minRows: 6, maxRows: 10 }" type="textarea"
                                    placeholder="Please input" />
                                <el-input v-model="filterTextArea" :autosize="{ minRows: 6, maxRows: 10 }"
                                    type="textarea" placeholder="Please input" />
                                <div class="button-con">
                                    <!-- <el-button shadow="always" @click="tagsFormat">
                                        Tags美化
                                    </el-button> -->
                                    <el-button shadow="always" @click="tagsSplit">
                                        Tags分离
                                    </el-button>
                                    <el-button shadow="always" @click="tagsAddComma">
                                        Tags加逗号
                                    </el-button>
                                    <el-button shadow="always" @click="mediumToCircle">
                                        Tags[]转()
                                    </el-button>
                                    <el-button shadow="always" @click="circleToMedium">
                                        Tags()转[]
                                    </el-button>
                                </div>
                                <div class="tags-con">
                                    <el-tag v-for="(tag, tIndex) in textAreaTags" :key="tIndex" round size="large"
                                        effect="dark"
                                        style="margin-right: 8px !important;margin-bottom: 8px !important;">
                                        {{ tag }}
                                    </el-tag>
                                </div>
                                <el-link href="https://danbooru.donmai.us/" target="_blank" type="primary">
                                    https://danbooru.donmai.us/</el-link>
                                <el-link href="https://gelbooru.com/index.php" target="_blank" type="primary">
                                    https://gelbooru.com/index.php</el-link>
                                <el-link href="https://aibooru.online/" target="_blank" type="primary">
                                    https://aibooru.online/</el-link>
                                <el-link href="https://aitag.top/" target="_blank" type="primary">https://aitag.top/
                                </el-link>
                                <el-link href="https://noveltags.com/" target="_blank" type="primary">
                                    https://noveltags.com/</el-link>
                                <el-link href="https://tags.novelai.dev/" target="_blank" type="primary">
                                    https://tags.novelai.dev/</el-link>
                            </div>
                        </el-main>
                    </el-container>
                </div>
            </el-container>
        </div>
    </NuxtLayout>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { utilMenus } from "~~/assets/json/utils.js";
const img = ref("https://image.lexica.art/md/82a37c02-9f1d-4280-b725-2716c759165e");
const initActive = 5;
const textArea = ref("");
const textAreaTags = ref([""]);
const filterTextArea = ref("");
const menuActive = ref(initActive);
const menuList = ref(utilMenus);
const menuChilds = ref(menuList.value[initActive]?.childs);

const menuClick = (menu: any, index: number) => {
    menuActive.value = index;
    menuChilds.value = menu?.childs;
};

// const tagsFormat = () => {
//     filterTextArea.value = textArea.value.replace(",", ", ");
// };

const tagsSplit = () => {
    textAreaTags.value = textArea.value.replace(',,',',').split(",");
    filterTextArea.value = textArea.value.replace(/\ /g, ", ");
};

const tagsAddComma = () => {
    textAreaTags.value = textArea.value.split(/\ /g);
    filterTextArea.value = textArea.value.replace(/\ /g, ", ");
};

const mediumToCircle = () => {
    filterTextArea.value = textArea.value.replace(/\{/g, "(");
    filterTextArea.value = textArea.value.replace(/\}/g, ")");
};

const circleToMedium = () => {
    filterTextArea.value = textArea.value.replace(/\(/g, "{");
    filterTextArea.value = textArea.value.replace(/\)/g, "}");
};
</script>

<style lang="scss" scoped>
.utils-page {
    display: flex;
    justify-content: center;
    background-color: #f2f5f7;
    min-height: 100vh;
}

.max-width-limit {
    max-width: 1000px;
    margin: 20px auto 0 auto;
}

:deep(.el-textarea) {
    width: 100%;
}

.menu-list {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;

    .menu-item {
        display: flex;
        justify-content: flex-start;
        width: 100%;
        height: 40px;
        line-height: 40px;
        font-size: 16px;
        padding: 10px 0;
        color: rgb(74, 71, 71);
        cursor: pointer;

        >img {
            width: 40px;
            height: 40px;
            border-radius: 12px;
            margin-right: 8px;
        }

        &-active {
            color: rgb(227, 29, 88);
        }
    }
}

.tranfer-con {
    width: 800px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;

    .el-textarea {
        width: 100%;
        margin-bottom: 20px;
    }
}

.button-con {
    display: flex;
    justify-content: flex-start;
    margin-bottom: 20px;
}
</style>
