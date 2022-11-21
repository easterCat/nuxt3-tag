<template>
    <div>
        <app-animate>
            <div v-if="modelValue" class="template-preview">
                <div class="preview-con">
                    <!-- <div class="close">
                        <i-ep-close-bold @click="shopEvent"></i-ep-close-bold>
                    </div> -->
                    <div class="list-con">
                        <ul>
                            <li>
                                <span>preview :</span>
                                <span><img :src="currentTemplate?.preview" alt="" /></span>
                            </li>
                            <li>
                                <span>name :</span>
                                <span>{{ currentTemplate?.name }}</span>
                            </li>
                            <li v-if="currentTemplate?.author">
                                <span>author :</span>
                                <span>{{ currentTemplate?.author }}</span>
                            </li>
                            <li v-if="`${currentTemplate?.like}`">
                                <span>like :</span>
                                <span>{{ currentTemplate?.like }}</span>
                            </li>
                            <li>
                                <span>prompt :</span>
                                <span>
                                    {{ currentTemplate?.prompt }}
                                    <span>
                                        <i-ep-copy-document
                                            @click="copy(currentTemplate?.prompt)"
                                        ></i-ep-copy-document>
                                    </span>
                                </span>
                            </li>
                            <li v-if="currentTemplate?.prompt_zh">
                                <span>prompt_zh :</span>
                                <span>
                                    {{ currentTemplate?.prompt_zh }}
                                    <span>
                                        <i-ep-copy-document
                                            @click="copy(currentTemplate?.prompt_zh)"
                                        ></i-ep-copy-document>
                                    </span>
                                </span>
                            </li>
                            <li v-if="currentTemplate?.n_prompt">
                                <span>n_prompt :</span>
                                <span>
                                    {{ currentTemplate?.n_prompt }}
                                    <span>
                                        <i-ep-copy-document
                                            @click="copy(currentTemplate?.n_prompt)"
                                        ></i-ep-copy-document>
                                    </span>
                                </span>
                            </li>
                            <li v-if="currentTemplate?.n_prompt_zh">
                                <span>n_prompt_zh :</span>
                                <span>
                                    {{ currentTemplate?.n_prompt_zh }}
                                    <span>
                                        <i-ep-copy-document
                                            @click="copy(currentTemplate?.n_prompt_zh)"
                                        ></i-ep-copy-document>
                                    </span>
                                </span>
                            </li>
                            <li v-if="currentTemplate?.step">
                                <span>step :</span>
                                <span>{{ currentTemplate?.step }}</span>
                            </li>
                            <li v-if="currentTemplate?.sampler">
                                <span>sampler :</span>
                                <span>{{ currentTemplate?.sampler }}</span>
                            </li>
                            <li v-if="currentTemplate?.scale">
                                <span>scale :</span>
                                <span>{{ currentTemplate?.scale }}</span>
                            </li>
                            <li v-if="currentTemplate?.seed">
                                <span>seed :</span>
                                <span>{{ currentTemplate?.seed }}</span>
                            </li>
                            <li v-if="currentTemplate?.size">
                                <span>size :</span>
                                <span>{{ currentTemplate?.size }}</span>
                            </li>
                            <li v-if="currentTemplate?.model">
                                <span>model :</span>
                                <span>{{ currentTemplate?.model }}</span>
                            </li>
                            <li v-if="currentTemplate?.desc">
                                <span>desc :</span>
                                <span>{{ currentTemplate?.desc }}</span>
                            </li>
                        </ul>
                    </div>
                    <div class="button-con">
                        <el-button @click="shopEvent">关闭</el-button>
                        <el-button type="warning">导入购物车</el-button>
                    </div>
                </div>
            </div>
        </app-animate>
    </div>
</template>

<script lang="ts" setup>
defineProps(['modelValue', 'currentTemplate']);
const $emit = defineEmits(['update:modelValue']);
const { copy } = useCopy();
const shopEvent = () => {
    $emit('update:modelValue', false);
};

onMounted(() => {});
</script>

<style lang="scss" scoped>
.template-preview {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 1001;
    background: rgba(12, 17, 20, 0.8);
    display: flex;
    justify-content: center;

    .preview-con {
        position: absolute;
        width: 1100px;
        top: 30px;
        bottom: 30px;
        background: linear-gradient(120deg, rgb(235, 238, 240), rgb(247, 247, 247));
        border-radius: 15px;
        color: rgb(12, 17, 20);
        padding: 30px 30px 30px 30px;
        overflow-x: hidden;
        overflow-y: auto;

        .close {
            position: absolute;
            right: 2px;
            top: 6px;
            font-size: 20px;
            color: rgba(12, 17, 20, 0.5);
            cursor: pointer;
        }

        .button-con {
            width: 100%;
            height: 100px;
            padding-top: 50px;
            display: flex;
            justify-content: center;
        }

        li {
            line-height: 24px;
            padding: 6px 0;
            display: flex;
            justify-content: center;
            align-items: flex-start;
        }

        span:nth-child(1) {
            width: 110px;
            font-weight: bold;
            font-size: 16px;
        }

        span:nth-child(2) {
            width: calc(100% - 220px);
            font-size: 14px;

            > span {
                display: inline-block;
                font-size: 14px;
                transform: translate3d(4px, 4px, 4px);
                cursor: pointer;
            }
        }

        img {
            max-width: 100%;
            width: 900px;
            min-height: 400px;
            border-radius: 15px;
        }
    }
}
</style>
