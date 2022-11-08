<template>
    <div class="tranfer-con">
        <el-row :gutter="20">
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                <el-input
                    v-model="textArea"
                    :autosize="{ minRows: 6, maxRows: 10 }"
                    type="textarea"
                    placeholder="Please input"
                />
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                <el-input
                    v-model="filterTextArea"
                    :autosize="{ minRows: 6, maxRows: 10 }"
                    type="textarea"
                    placeholder="Please input"
                />
            </el-col>
        </el-row>

        <div class="button-con">
            <!-- <el-button shadow="always" @click="tagsFormat">
                                        Prompt美化
                                    </el-button> -->
            <el-button shadow="always" type="warning" @click="tagsSplit"> Prompt分离 </el-button>
            <el-button shadow="always" type="warning" @click="tagsAddComma">
                Prompt加逗号
            </el-button>
            <el-button shadow="always" type="warning" @click="mediumToCircle">
                Prompt[]转()
            </el-button>
            <el-button shadow="always" type="warning" @click="circleToMedium">
                Prompt()转[]
            </el-button>
        </div>

        <div class="tags-con">
            <el-tag
                v-for="(tag, tIndex) in tagsList.filter((i) => !!i)"
                :key="tIndex"
                round
                size="large"
                effect="dark"
                style="margin-right: 8px !important; margin-bottom: 8px !important"
            >
                {{ tag }}
            </el-tag>
        </div>
    </div>
</template>

<script setup lang="ts">
const textArea = ref("");
const tagsList = ref([""]);
const filterTextArea = ref("");

// const tagsFormat = () => {
//     filterTextArea.value = textArea.value.replace(",", ", ");
// };

const tagsSplit = () => {
    tagsList.value = textArea.value.replace(",,", ",").split(",");
    filterTextArea.value = textArea.value.replace(/\ /g, ", ");
};

const tagsAddComma = () => {
    tagsList.value = textArea.value.split(/\ /g);
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
.tranfer-con {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    margin-top: 20px;

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

:deep(.el-textarea) {
    border: 1px solid #f1f1f1;
    border-radius: 10px;
}
</style>
