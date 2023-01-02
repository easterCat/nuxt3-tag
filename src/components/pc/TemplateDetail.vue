<template>
    <div>
        <app-animate>
            <div v-if="modelValue" class="template-preview">
                <div class="preview-wrap" @click="close"></div>
                <div class="preview-con">
                    <div class="left">
                        <div class="list-con">
                            <ul>
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
                                        <i-ep-copy-document
                                            @click="copy(currentTemplate?.prompt)"
                                        ></i-ep-copy-document>
                                    </span>
                                </li>
                                <li v-if="currentTemplate?.prompt_zh">
                                    <span>prompt_zh :</span>
                                    <span>
                                        {{ currentTemplate?.prompt_zh }}
                                        <i-ep-copy-document
                                            @click="copy(currentTemplate?.prompt_zh)"
                                        ></i-ep-copy-document>
                                    </span>
                                </li>
                                <li v-if="currentTemplate?.n_prompt">
                                    <span>n_prompt :</span>
                                    <span>
                                        {{ currentTemplate?.n_prompt }}
                                        <i-ep-copy-document
                                            @click="copy(currentTemplate?.n_prompt)"
                                        ></i-ep-copy-document>
                                    </span>
                                </li>
                                <li v-if="currentTemplate?.n_prompt_zh">
                                    <span>n_prompt_zh :</span>
                                    <span>
                                        {{ currentTemplate?.n_prompt_zh }}
                                        <i-ep-copy-document
                                            @click="copy(currentTemplate?.n_prompt_zh)"
                                        ></i-ep-copy-document>
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
                    </div>
                    <div class="right">
                        <div class="image-con">
                            <img :src="currentTemplate?.preview" alt="" />
                        </div>
                        <div class="button-con">
                            <button class="btn btn-secondary m-r-10" @click="close">关闭</button>
                            <button class="btn btn-accent" @click="exportShop">导入购物车</button>
                        </div>
                    </div>
                </div>
            </div>
        </app-animate>
    </div>
</template>

<script lang="ts" setup>
const props = defineProps(['modelValue', 'currentTemplate']);

watch(
    () => props.modelValue,
    (val) => {
        val && stop();
    },
);

const { setShop } = useShop();
const emits = defineEmits(['update:modelValue']);
const { copy } = useCopy();
const close = () => {
    move();
    emits('update:modelValue', false);
};
const stop = () => {
    const mo = function (e: any) {
        e.preventDefault();
    };
    document.body.style.overflowY = 'hidden';
    document.addEventListener('touchmove', mo, false); // 禁止页面滑动
};

const move = () => {
    const mo = function (e: any) {
        e.preventDefault();
    };
    document.body.style.overflowY = ''; // 出现滚动条
    document.removeEventListener('touchmove', mo, false);
};

const exportShop = () => {
    setShop(props.currentTemplate?.prompt);
};

onMounted(() => {
    move();
});
</script>

<style lang="scss" scoped>
.template-preview {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 1001;
    display: flex;
    justify-content: center;

    .preview-wrap {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        z-index: 1;
        --tw-bg-opacity: 0.4;
        background-color: hsl(var(--nf, var(--n)) / var(--tw-bg-opacity));
    }

    .preview-con {
        display: flex;
        justify-content: center;
        position: absolute;
        top: 30px;
        bottom: 30px;
        z-index: 2;
        width: 1200px;
        border-radius: 10px;
        padding: 30px 30px 30px 30px;
        --tw-bg-opacity: 1;
        background-color: hsl(var(--b1) / var(--tw-bg-opacity));
        box-shadow: rgba(149, 157, 165, 0.2) 0px 4px 20px;

        .left {
            width: 460px;
            height: 100%;
            padding-right: 16px;
            overflow-x: hidden;
            overflow-y: auto;
        }

        .right {
            flex: 1;
            height: 100%;
            padding-left: 16px;
            position: relative;
            display: flex;
            justify-content: center;
        }

        .button-con {
            width: 100%;
            height: 100px;
            padding-top: 50px;
            display: flex;
            justify-content: center;
        }

        li {
            line-height: 20px;
            padding: 2px 0;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: flex-start;
        }

        span:nth-child(1) {
            width: 100%;
            display: inline;
            font-weight: bold;
            font-size: 16px;
            margin-bottom: 2px;
        }

        span:nth-child(2) {
            width: 100%;
            font-size: 14px;
            > span {
                font-size: 14px;
                transform: translate3d(4px, 4px, 4px);
                cursor: pointer;
            }

            svg {
                display: inline;
            }
        }

        .image-con {
            position: absolute;
            top: 0;
            max-height: calc(100% - 100px);
            display: flex;
            justify-content: center;

            img {
                min-width: 512px;
                height: 100%;
            }
        }

        .button-con {
            position: absolute;
            bottom: 0;
            display: flex;
            justify-content: center;
        }

        img {
            max-height: calc(100% - 10px);
            border-radius: 10px;
        }
    }
}
</style>
