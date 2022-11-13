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
                :style="`width:${colWidth}px;height:${image._height}px;`"
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
            <el-button type="primary" @click="dialogVisible = false">确定</el-button>
          </span>
        </template>
      </el-dialog>
    </div>
  </NuxtLayout>
</template>

<script lang="ts" setup>
// https://juejin.cn/post/7049942717442293773 瀑布流实现
import { ref, toRaw, Ref } from 'vue';
import { getLexicaImages } from '~/server/lexica';

interface IImageItem {
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
  _error?: boolean;
}

//data
const domRefs: Ref<any[]> = ref([]);
const colWidth: Ref<number> = ref(0);
const viewHeight: Ref<number> = ref(0);
const colNum: Ref<number> = ref(5);
const dialogVisible: Ref<boolean> = ref(false);
const wallBeginIndex: Ref<number> = ref(0);
const wrapper: Ref<HTMLElement | null> = ref(null);
let colsHeightArr: any[] = reactive([]);
let imageList: Ref<IImageItem[]> = ref([]);
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

// const result = await getLexicaImages('/lexica/v1/search', 'get', { q: 'cat' });
const result = reactive({ images: [] });
const images: IImageItem[] = toRaw(result.images);
const len = images.length - 1;

// 瀑布流
const waterfall = () => {
  const imgRefs = toRaw(domRefs.value);
  if (!imgRefs) return;
  let top, left, height;

  if (wallBeginIndex.value === 0) {
    colsHeightArr = [];
  }

  for (let i = wallBeginIndex.value; i < len; ++i) {
    if (!imgRefs[i]) return;
    height = imgRefs[i].offsetHeight;

    if (i < colNum.value) {
      colsHeightArr.push(height);
      top = 0;
      left = i * colWidth.value + (i % colNum.value);
    } else {
      const minHeight = Math.min.apply(null, colsHeightArr);
      console.log('colsHeightArr :>> ', colsHeightArr);
      const minIndex = colsHeightArr.indexOf(minHeight);
      top = minHeight;
      left = minIndex * colWidth.value;
      colsHeightArr[minIndex] += height;
    }

    imgRefs[i].style.top = top + 'px';
    imgRefs[i].style.left = left + 'px';
    // if (top < viewHeight.value) {
    //   let imgEl = imgRefs[i].children[0];
    //   imgEl.src = imgEl.getAttribute('date-src');
    //   imgEl.style.opacity = 1;
    //   imgEl.style.transform = 'scale(1)';
    // }

    let imgEl = imgRefs[i].children[0].children[0];
    imgEl.src = imgEl.getAttribute('date-src');
    imgEl.style.opacity = 1;
    imgEl.style.transform = 'scale(1)';
  }

  if (wrapper.value) {
    wrapper.value.style.height = Math.max.apply(null, colsHeightArr) + 'px';
  }
  wallBeginIndex.value = imgRefs.length;
};

const preloaded = () => {
  imageList.value = images;
  nextTick(() => {
    waterfall();
  });
};

// 预加载
const preload = () => {
  images.forEach((item: IImageItem, index: number) => {
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

let running = false;
let time = Date.now();
const throttle = (func: any) => {
  if (running) {
    return;
  } else {
    if (Date.now() - time > 5000) {
      console.log(111);
      running = false;
      func();
    } else {
      time = Date.now();
    }
  }
};

const initCol = () => {
  colWidth.value = Math.round((document.body.clientWidth - 40) / colNum.value);
  viewHeight.value = document.body.clientHeight;
};

const init = () => {
  initCol();
  preload();
};

onMounted(() => {
  init();
  //   window.addEventListener('resize', () => {
  //     throttle(() => {
  //       initCol();
  //       waterfall();
  //     });
  //   });
});
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
      border-radius: 20px;
      overflow: hidden;
      object-fit: fill;
      background: transparent;
    }

    .image-con:hover {
      box-shadow: rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.1) 0px 8px 24px,
        rgba(17, 17, 26, 0.1) 0px 16px 56px;
      transform: scale(1.02);
      transition: all 0.5s;
      transition-delay: 0.1s;
    }

    img {
      width: 100%;
      height: 100%;
      opacity: 0;
      transform: scale(0.4);
      transition: all 0.4s;
      transition-delay: 0.1s;
    }
  }
}
</style>
