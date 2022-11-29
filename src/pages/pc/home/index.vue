<template>
    <NuxtLayout>
        <div class="home-page page">
            <AppHeader />
            <div class="content">
                <div class="wrapper" ref="wrapper">
                    <div class="image-con">
                        <ul class="image-list">
                            <li
                                v-for="(image, iIndex) in imageList"
                                :key="iIndex"
                                class="image-item"
                                :style="`width:${colWidth}px;height:${image._height}px;top:${image._top}px;left:${image._left}px;`"
                                ref="domRefs"
                            >
                                <div
                                    class="image-con"
                                    @mouseenter="hoverImageCon(iIndex)"
                                    @mouseleave="leaveImageCon"
                                >
                                    <img :date-src="image?.preview" :alt="image?.prompt" />
                                    <Transition name="fade">
                                        <div v-if="hoverIndex === iIndex" class="wrapper">
                                            <div class="icon-con">
                                                <span v-if="hoverIndex === iIndex">
                                                    <i-ep-search></i-ep-search>
                                                </span>
                                                <span>
                                                    <i-ep-star
                                                        :class="{
                                                            liked: image?.like_address.includes(ip),
                                                        }"
                                                        @click="likeTemplate(image?.id, iIndex)"
                                                    ></i-ep-star>
                                                    <i-ep-more
                                                        @click="showDetail(image)"
                                                    ></i-ep-more>
                                                </span>
                                            </div>
                                            <div class="text-con">
                                                <p>{{ image?.name }}</p>
                                                <p>{{ image?.prompt }}</p>
                                            </div>
                                        </div>
                                    </Transition>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div v-show="loadingStatus" class="spinner">
                    <div class="dot1"></div>
                    <div class="dot2"></div>
                </div>
            </div>

            <PcTemplateDetail
                v-model="showPreview"
                :currentTemplate="currentTemplate"
            ></PcTemplateDetail>
        </div>
    </NuxtLayout>
</template>

<script lang="ts" setup>
// https://juejin.cn/post/7049942717442293773 瀑布流实现
import { ref, toRaw, Ref } from 'vue';
import { debounce } from 'lodash';

interface ImageItem {
    name: string;
    author: string;
    src?: string;
    category: string;
    desc: boolean;
    height: number;
    id: number;
    like_address: string;
    like: number;
    model: boolean;
    prompt: string;
    prompt_zh: string;
    n_prompt: string;
    n_prompt_zh: string;
    seed: string;
    preview: string;
    sampler: string;
    skip: string;
    size: string;
    step: string;
    scale: string;
    _width?: number;
    _height?: number;
    _top?: number;
    _left?: number;
    _error?: boolean;
}

//data
const { $store }: any = useNuxtApp();
const showPreview = ref(false);
const currentTemplate: Ref<any | null> = ref(null);
const domRefs: Ref<any[]> = ref([]);
const colWidth: Ref<number> = ref(0);
const viewHeight: Ref<number> = ref(0);
const colNum: Ref<number> = ref(5);
const loadingStatus: Ref<boolean> = ref(false);
const wallBeginIndex: Ref<number> = ref(0);
const wrapper: Ref<HTMLElement | null> = ref(null);
const hoverIndex: Ref<number | null> = ref(null);
const pageIndex = ref(1);
const pageSize = ref(50);
const ip = ref('');
let colsHeightArr: any[] = reactive([]);
let imageList: Ref<ImageItem[]> = ref([]);
let loadedCount: Ref<number> = ref(0);

const { TemplateApi } = useApi();
TemplateApi.setIp();
const result = await TemplateApi.getTemplates({
    pageIndex: pageIndex.value,
    pageSize: pageSize.value,
});
let images: ImageItem[] = result?.templates ? result?.templates : [];
let len = images?.length;

const hoverImageCon = (i: any) => {
    hoverIndex.value = i;
};

const leaveImageCon = () => {
    hoverIndex.value = null;
};

const showDetail = (tem: any) => {
    currentTemplate.value = { ...tem };
    showPreview.value = true;
};

const likeTemplate = async (id: number, index: number) => {
    const result: any = await TemplateApi.likeTemplateById({ id });
    if (result.like) {
        const address = imageList.value[index].like_address;
        const like = imageList.value[index].like;
        if (address) {
            imageList.value[index].like_address = address + ',' + ip.value;
        } else {
            imageList.value[index].like_address = '' + ip.value;
        }
        imageList.value[index].like = like + 1;
    }
};

// 瀑布流
const waterfall = () => {
    let top, left, height;

    if (wallBeginIndex.value === 0) {
        colsHeightArr = [];
    }

    for (let i = wallBeginIndex.value; i <= len; ++i) {
        if (!images[i]) return;
        height = images[i]._height || 0;
        if (i < colNum.value) {
            colsHeightArr.push(height);
            top = 0;
            left = i * colWidth.value + (i % colNum.value);
        } else {
            const minHeight = Math.min.apply(null, colsHeightArr);
            const minIndex = colsHeightArr.indexOf(minHeight);
            top = minHeight;
            left = minIndex * colWidth.value;
            colsHeightArr[minIndex] += height;
        }

        images[i]._top = top;
        images[i]._left = left;
    }

    if (wrapper.value) {
        wrapper.value.style.height = Math.max.apply(null, colsHeightArr) + 300 + 'px';
    }
};

const renderImage = () => {
    const imgRefs = toRaw(domRefs.value);
    if (!imgRefs) return;

    for (let i = wallBeginIndex.value; i <= len; ++i) {
        const cur = imgRefs[i];
        if (!cur) return;

        let imgEl = cur.children[0].children[0];
        imgEl.src = imgEl.getAttribute('date-src');
        imgEl.style.transition = 'all 0.5s';
        imgEl.onload = () => {
            imgEl.style.opacity = 1;
            imgEl.style.transform = 'scale(1)';
        };
    }
    loadingStatus.value = false;
    wallBeginIndex.value = imgRefs.length;
};

const preloaded = () => {
    waterfall();
    imageList.value = images;
    nextTick(() => {
        renderImage();
    });
};

// 预加载
const preload = () => {
    viewHeight.value = document.body.clientHeight;

    images.forEach((item: ImageItem, index: number) => {
        if (index < loadedCount.value) {
            return;
        }
        if (!item.preview) {
            images[index]._width = colWidth.value;
            images[index]._height = 0;
            ++loadedCount.value;
            if (len === loadedCount.value) {
                preloaded();
            }
        } else {
            let img = new Image();
            img.src = item.preview;
            img.onload = img.onerror = (e) => {
                images[index]._width = colWidth.value;
                images[index]._height =
                    (e as Event).type === 'load'
                        ? Math.round(colWidth.value * (img.height / img.width))
                        : img.width;

                if ((e as Event).type === 'error') {
                    images[index]._error = true;
                }

                ++loadedCount.value;
                if (len === loadedCount.value) {
                    preloaded();
                }
            };
        }
    });
};

const resizePreload = () => {
    images.forEach((item: ImageItem, index: number) => {
        if (!item.src) {
            images[index]._width = colWidth.value;
            images[index]._height = 0;
            ++loadedCount.value;
            if (len === loadedCount.value) {
                preloaded();
            }
        } else {
            images[index]._width = colWidth.value;
            images[index]._height = Math.round(
                colWidth.value * (images[index]._height / images[index]._width),
            );
            ++loadedCount.value;
            if (len === loadedCount.value) {
                preloaded();
            }
        }
    });
};

const scrollLoading = async () => {
    if (loadingStatus.value) return;
    const minHeight = Math.min.apply(null, colsHeightArr);
    let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    if (scrollTop + viewHeight.value > minHeight - 20) {
        console.log('触底');
        pageIndex.value = pageIndex.value + 1;
        loadingStatus.value = true;
        const result: any = await TemplateApi.getTemplates({
            pageIndex: pageIndex.value,
            pageSize: pageSize.value,
        });
        images = [...images, ...(result?.templates ? result?.templates : [])];
        len = images?.length - 1;
        preload();
    }
};

const initCol = () => {
    const width = document.body.clientWidth;
    if (width > 3500) {
        colNum.value = 10;
    } else if (width < 3500 && width > 2500) {
        colNum.value = 8;
    } else if (width < 2500 && width > 2000) {
        colNum.value = 7;
    } else if (width < 2000 && width > 1600) {
        colNum.value = 6;
    } else if (width < 1600 && width > 1280) {
        colNum.value = 5;
    } else if (width < 1280 && width > 960) {
        colNum.value = 4;
    } else if (width < 960 && width > 750) {
        colNum.value = 3;
    } else {
        colNum.value = 2;
    }
    colWidth.value = Math.round((document.body.clientWidth - 40) / colNum.value);
};

const initResizeEvent = () => {
    wallBeginIndex.value = 0;
    loadedCount.value = 0;
    initCol();
    resizePreload();
};

const init = () => {
    initCol();
    preload();
};

const debounceScroll = debounce(scrollLoading, 1500);

const debounceResize = debounce(initResizeEvent, 1000);

onMounted(() => {
    init();
    window.addEventListener('scroll', debounceScroll);
    window.addEventListener('resize', debounceResize);

    ip.value = $store.get('ip');
});

onUnmounted(() => {
    window.removeEventListener('scroll', debounceScroll);
    window.removeEventListener('resize', debounceResize);
});
</script>

<style lang="scss" scoped>
.home-page {
    .image-list {
        display: grid;
        position: relative;
        width: 100%;
        max-width: 100%;
        height: 100%;
        .image-item {
            position: absolute;
            cursor: pointer;
            padding: 8px;
            box-sizing: border-box;

            .image-con {
                position: relative;
                width: 100%;
                height: 100%;
                border-radius: 16px;
                overflow: hidden;
                background: rgba(0, 0, 0, 0);
            }

            .image-con:hover {
                box-shadow: rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.1) 0px 8px 24px,
                    rgba(17, 17, 26, 0.1) 0px 16px 56px;
                transition: all 0.4s;
            }

            .wrapper {
                position: absolute;
                top: 0;
                right: 0;
                bottom: 0;
                left: 0;
                z-index: 3;
                opacity: 100;
                background: linear-gradient(
                    to bottom,
                    rgba(0, 0, 0, 0.6) 0%,
                    rgba(0, 0, 0, 0.2) 30%,
                    rgba(0, 0, 0, 0.2) 70%,
                    rgba(0, 0, 0, 0.6) 100%
                );
            }

            .icon-con {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 10px;
                color: #fff;
                animation-duration: 0.4s;
                animation-name: slideInDown;

                span:nth-child(1) {
                    font-size: 20px;
                }

                span:nth-child(2) {
                    font-size: 22px;
                    svg {
                        margin-right: 10px;
                    }
                }
            }

            .text-con {
                position: absolute;
                bottom: 20px;
                padding: 10px;
                width: 100%;
                height: 50px;
                animation-duration: 0.4s;
                animation-name: slideInUp;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;

                > p:nth-child(1) {
                    width: 100%;
                    height: 20px;
                    line-height: 20px;
                    font-size: 16px;
                    color: #fff;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }

                > p:nth-child(2) {
                    width: 100%;
                    height: 20px;
                    line-height: 20px;
                    font-size: 12px;
                    color: rgb(188, 188, 188);
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    margin-top: 6px;
                }
            }

            img {
                width: 100%;
                height: 100%;
                opacity: 0;
                transform: scale(0.6);
            }

            .liked {
                color: rgb(245, 108, 108);
                font-weight: bold;
            }
        }
    }

    .spinner {
        margin: 0 auto;
        width: 90px;
        height: 90px;
        position: relative;
        top: -100px;
        text-align: center;
        animation: rotate 2s infinite linear;
    }

    .dot1,
    .dot2 {
        width: 60%;
        height: 60%;
        display: inline-block;
        position: absolute;
        top: 0;
        background-color: rgb(245, 108, 108);
        border-radius: 100%;
        animation: bounce 2s infinite ease-in-out;
    }

    .dot2 {
        top: auto;
        bottom: 0px;
        -webkit-animation-delay: -1s;
        animation-delay: -1s;
    }

    @-webkit-keyframes rotate {
        100% {
            -webkit-transform: rotate(360deg);
        }
    }
    @keyframes rotate {
        100% {
            transform: rotate(360deg);
            -webkit-transform: rotate(360deg);
        }
    }

    @-webkit-keyframes bounce {
        0%,
        100% {
            -webkit-transform: scale(0);
        }
        50% {
            -webkit-transform: scale(1);
        }
    }

    @keyframes bounce {
        0%,
        100% {
            transform: scale(0);
            -webkit-transform: scale(0);
        }
        50% {
            transform: scale(1);
            -webkit-transform: scale(1);
        }
    }
}

.fade-enter-active {
    transition: opacity 0.4s linear;
}

.fade-leave-active {
    transition: opacity 0s linear;
}

.fade-enter-from {
    opacity: 0;
}

.fade-leave-to {
    opacity: 0;
}

@keyframes slideInDown {
    from {
        transform: translateY(-20px);
        opacity: 0;
    }

    to {
        transform: translateY(0px);
        opacity: 100;
    }
}

@keyframes slideInUp {
    from {
        transform: translateY(20px);
        opacity: 0;
    }

    to {
        transform: translateY(0px);
        opacity: 100;
    }
}
</style>
