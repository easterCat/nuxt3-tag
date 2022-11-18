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
                                <div class="image-con">
                                    <img :date-src="image?.src" :alt="image?.prompt" />
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <client-only>
                <el-dialog v-model="dialogVisible" title="模板信息" width="800px">
                    <el-descriptions :column="1" border>
                        <el-descriptions-item
                            label="Username"
                            label-align="right"
                            align="center"
                            label-class-name="description-label"
                        >
                            {{ currentTem?.name }}
                        </el-descriptions-item>

                        <el-descriptions-item
                            label="正向标签"
                            label-align="right"
                            align="center"
                            label-class-name="description-label"
                        >
                            {{ currentTem?.prompt }}
                        </el-descriptions-item>

                        <el-descriptions-item
                            label="负面标签"
                            label-align="right"
                            align="center"
                            label-class-name="description-label"
                        >
                            {{ currentTem?.nprompt }}
                        </el-descriptions-item>

                        <el-descriptions-item
                            label="step"
                            label-align="right"
                            align="center"
                            label-class-name="description-label"
                        >
                            {{ currentTem?.step }}
                        </el-descriptions-item>

                        <el-descriptions-item
                            label="scale"
                            label-align="right"
                            align="center"
                            label-class-name="description-label"
                        >
                            {{ currentTem?.scale }}
                        </el-descriptions-item>
                    </el-descriptions>
                    <template #footer>
                        <span class="dialog-footer">
                            <el-button @click="dialogVisible = false">取消</el-button>
                            <el-button type="primary" @click="dialogVisible = false">
                                确定
                            </el-button>
                        </span>
                    </template>
                </el-dialog>
            </client-only>
        </div>
    </NuxtLayout>
</template>

<script lang="ts" setup>
// https://juejin.cn/post/7049942717442293773 瀑布流实现
import { ref, toRaw, Ref } from 'vue';
import { debounce } from '~/utils/index';

interface ImageItem {
    gallery: string;
    grid: boolean;
    guidance: number;
    height: number;
    id: string;
    model: string;
    nsfw: boolean;
    prompt: string;
    promptid: string;
    seed: string;
    src: string;
    srcSmall: string;
    width: number;
    _width?: number;
    _height?: number;
    _top?: number;
    _left?: number;
    _error?: boolean;
}

//data
const { LexicaApi } = useApi();
const loadingIndex: Ref<number> = ref(0);
const loadingArr = [
    'genshin',
    'sliver armor',
    'armor',
    'thighs',
    'stockings',
    'pantyhose',
    'wedding dress',
    'bikini',
    'underboob',
    'wet clothes',
    'covered nipples',
    'war',
    'solder',
    'gril',
    'cat',
    'dog',
    'backgound',
];
const domRefs: Ref<any[]> = ref([]);
const colWidth: Ref<number> = ref(0);
const viewHeight: Ref<number> = ref(0);
const colNum: Ref<number> = ref(5);
const dialogVisible: Ref<boolean> = ref(false);
const wallBeginIndex: Ref<number> = ref(0);
const wrapper: Ref<HTMLElement | null> = ref(null);
let colsHeightArr: any[] = reactive([]);
let imageList: Ref<ImageItem[]> = ref([]);
let loadedCount: Ref<number> = ref(0);
let currentTem = ref({
    name: '',
    prompt: '',
    nprompt: '',
    step: '',
    scale: '',
    author: '',
    preview: '',
});

const result = await LexicaApi.getList({
    q: loadingArr[loadingIndex.value],
});
let images: ImageItem[] = toRaw(result.images ? result.images : []);
let len = images?.length;

// 瀑布流
const waterfall = () => {
    let top, left, height;

    if (wallBeginIndex.value === 0) {
        colsHeightArr = [];
    }

    for (let i = wallBeginIndex.value; i < len; ++i) {
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
        wrapper.value.style.height = Math.max.apply(null, colsHeightArr) + 180 + 'px';
    }
};

const renderImage = () => {
    const imgRefs = toRaw(domRefs.value);
    if (!imgRefs) return;

    for (let i = wallBeginIndex.value; i < len; ++i) {
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
        if (!item.src) {
            images[index]._width = colWidth.value;
            images[index]._height = 0;
            ++loadedCount.value;
            if (len === loadedCount.value) {
                preloaded();
            }
        } else {
            let img = new Image();
            img.src = item.src;
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
                colWidth.value * (images[index].height / images[index].width),
            );
            ++loadedCount.value;
            if (len === loadedCount.value) {
                preloaded();
            }
        }
    });
};

const scrollLoading = async () => {
    const minHeight = Math.min.apply(null, colsHeightArr);
    let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    if (scrollTop + viewHeight.value > minHeight - 20) {
        loadingIndex.value = loadingIndex.value + 1;
        const data = await LexicaApi.getList({ q: loadingArr[loadingIndex.value] });
        console.log('触底');
        images = [...images, ...(data.images ? data.images : [])];
        len = images?.length - 1;
        preload();
    }
};

const initCol = () => {
    const width = document.body.clientWidth;
    if (width > 2500) {
        colNum.value = 8;
    } else if (width < 2500 && width > 1600) {
        colNum.value = 6;
    } else if (width < 1600 && width > 1300) {
        colNum.value = 5;
    } else if (width < 1300 && width > 960) {
        colNum.value = 4;
    } else {
        colNum.value = 2;
    }
    colWidth.value = Math.round((document.body.clientWidth - 40) / colNum.value);
};

const init = () => {
    initCol();
    preload();
};

onMounted(() => {
    init();
    window.addEventListener('scroll', () => debounceScroll());
    window.addEventListener('resize', () => {
        debounceResize();
    });
});

const debounceResize = debounce(() => {
    wallBeginIndex.value = 0;
    loadedCount.value = 0;
    initCol();
    resizePreload();
}, 1000);

const debounceScroll = debounce(() => {
    scrollLoading();
}, 1500);
</script>

<style lang="scss" scoped>
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
            width: 100%;
            height: 100%;
            border-radius: 10px;
            overflow: hidden;
            object-fit: fill;
            background: transparent;
        }

        .image-con:hover {
            box-shadow: rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.1) 0px 8px 24px,
                rgba(17, 17, 26, 0.1) 0px 16px 56px;
            transform: scale(1.01);
            transition: all 0.5s;
            transition-delay: 0.1s;
        }

        img {
            width: 100%;
            height: 100%;
            opacity: 0;
            transform: scale(0.6);
        }
    }
}
</style>
