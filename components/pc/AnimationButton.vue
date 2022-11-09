<template>
  <div class="animation-button">
    <button
      class="custom-btn"
      :class="[`btn-${buttonStyle}`, `${buttonSize}`, buttonShadow ? 'btn-shadow' : '']"
      :style="buttomColor"
      @click="buttonClick"
    >
      <template v-if="[1, 2, 13, 14, 15, 16].includes(buttonStyle)">{{ buttonText }}</template>
      <template v-if="[9, 10].includes(buttonStyle)"
        ><span>{{ buttonText }}</span></template
      >
      <span v-if="[3, 4, 5, 6, 7, 8, 15, 16].includes(buttonStyle)"> {{ buttonText }}</span>
      <template v-if="[11].includes(buttonStyle)">
        {{ buttonText }}
        <div class="dot"></div>
      </template>
      <template v-if="[12].includes(buttonStyle)">
        <span>Click!</span><span> {{ buttonText }}</span>
      </template>
    </button>
  </div>
</template>

<script setup lang="ts">
  // https://codepen.io/yuhomyan/pen/OJMejWJ
  const emit = defineEmits(['submit']);

  const props = defineProps({
    // buttonStyle value 1-16
    buttonStyle: { type: Number, default: 1 },
    // 特效按钮使用定位较多,现使用传参宽度
    buttonWidth: { type: String, default: '' },
    buttonText: { type: String, default: '' },
    // 输入颜色值 "233, 233, 233"
    buttonColor: { type: String, default: '' },
    buttonShadow: { type: Boolean, default: false },
    // 渐变背景的角度值
    buttonAngel: { type: String, default: '0deg' },
    // larger large medium small smaller
    buttonSize: { type: String, default: 'medium' },
  });

  const buttomColor = computed(() => {
    let bg = `background: linear-gradient(${props.buttonAngel}, rgba(${props.buttonColor},1) 0%, rgba(${props.buttonColor},0.7) 100%);`;
    if (!!props?.buttonWidth) bg = bg + `width:${props?.buttonWidth}`;
    return bg;
  });

  const buttonClick = () => {
    emit('submit');
  };
</script>

<style lang="scss" scoped>
  .animation-button {
    display: inline-block;
    margin-right: 10px;
  }

  .custom-btn {
    color: #fff;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    display: inline-block;
    outline: none;
    overflow: hidden;
  }

  $basebtnwidth: 20px;

  .larger {
    width: 100%;
    height: 44px;
    line-height: $basebtnwidth + 24;
    padding: 0 16px;
    font-size: 18px;
  }

  .large {
    width: 100%;
    height: 38px;
    line-height: $basebtnwidth + 18;
    padding: 0 12px;
    font-size: 16px;
  }

  .medium {
    width: 100%;
    height: 32px;
    line-height: $basebtnwidth + 12;
    padding: 0 8px;
    font-size: 14px;
  }

  .small {
    width: 100%;
    height: 26px;
    line-height: $basebtnwidth + 6;
    padding: 0 4px;
    font-size: 12px;
  }

  .smaller {
    width: 100%;
    height: 20px;
    line-height: $basebtnwidth;
    padding: 0 4px;
    font-size: 10px;
  }

  .btn-shadow {
    box-shadow: inset 2px 2px 2px 0px rgba(255, 255, 255, 0.5), 7px 7px 20px 0px rgba(0, 0, 0, 0.1),
      4px 4px 5px 0px rgba(0, 0, 0, 0.1);
  }

  /* 1 */
  .btn-1 {
    // background: rgb(6, 14, 131);
    // background: linear-gradient(0deg, rgba(6, 14, 131, 1) 0%, rgba(12, 25, 180, 1) 100%);
    border: none;
  }
  .btn-1:hover {
    filter: drop-shadow(4px 4px 5px rgb(207, 207, 207)) opacity(80%);
  }

  /* 2 */
  .btn-2 {
    background: rgb(96, 9, 240);
    background: linear-gradient(0deg, rgba(96, 9, 240, 1) 0%, rgba(129, 5, 240, 1) 100%);
    border: none;
  }
  .btn-2:before {
    height: 0%;
    width: 2px;
  }
  .btn-2:hover {
    box-shadow: 4px 4px 6px 0 rgba(255, 255, 255, 0.5), -4px -4px 6px 0 rgba(116, 125, 136, 0.5),
      inset -4px -4px 6px 0 rgba(255, 255, 255, 0.2), inset 4px 4px 6px 0 rgba(0, 0, 0, 0.4);
  }

  /* 3 */
  .btn-3 {
    background: rgb(0, 172, 238);
    background: linear-gradient(0deg, rgba(0, 172, 238, 1) 0%, rgba(2, 126, 251, 1) 100%);
    width: 100%;
    height: 40px;
    border: none;
  }
  .btn-3 span {
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
  }
  .btn-3:before,
  .btn-3:after {
    position: absolute;
    content: '';
    right: 0;
    top: 0;
    background: rgba(2, 126, 251, 1);
    transition: all 0.3s ease;
  }
  .btn-3:before {
    height: 0%;
    width: 2px;
  }
  .btn-3:after {
    width: 0%;
    height: 2px;
  }
  .btn-3:hover {
    background: transparent;
    box-shadow: none;
  }
  .btn-3:hover:before {
    height: 100%;
  }
  .btn-3:hover:after {
    width: 100%;
  }
  .btn-3 span:hover {
    color: rgba(2, 126, 251, 1);
  }
  .btn-3 span:before,
  .btn-3 span:after {
    position: absolute;
    content: '';
    left: 0;
    bottom: 0;
    background: rgba(2, 126, 251, 1);
    transition: all 0.3s ease;
  }
  .btn-3 span:before {
    width: 2px;
    height: 0%;
  }
  .btn-3 span:after {
    width: 0%;
    height: 2px;
  }
  .btn-3 span:hover:before {
    height: 100%;
  }
  .btn-3 span:hover:after {
    width: 100%;
  }

  /* 4 */
  .btn-4 {
    background-color: #4dccc6;
    background-image: linear-gradient(315deg, #4dccc6 0%, #96e4df 74%);
    border: none;
  }
  .btn-4:hover {
    background-color: #89d8d3;
    background-image: linear-gradient(315deg, #89d8d3 0%, #03c8a8 74%);
  }
  .btn-4 span {
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
  }
  .btn-4:before,
  .btn-4:after {
    position: absolute;
    content: '';
    right: 0;
    top: 0;
    box-shadow: 4px 4px 6px 0 rgba(255, 255, 255, 0.9), -4px -4px 6px 0 rgba(116, 125, 136, 0.2),
      inset -4px -4px 6px 0 rgba(255, 255, 255, 0.9), inset 4px 4px 6px 0 rgba(116, 125, 136, 0.3);
    transition: all 0.3s ease;
  }
  .btn-4:before {
    height: 0%;
    width: 0.1px;
  }
  .btn-4:after {
    width: 0%;
    height: 0.1px;
  }
  .btn-4:hover:before {
    height: 100%;
  }
  .btn-4:hover:after {
    width: 100%;
  }
  .btn-4 span:before,
  .btn-4 span:after {
    position: absolute;
    content: '';
    left: 0;
    bottom: 0;
    box-shadow: 4px 4px 6px 0 rgba(255, 255, 255, 0.9), -4px -4px 6px 0 rgba(116, 125, 136, 0.2),
      inset -4px -4px 6px 0 rgba(255, 255, 255, 0.9), inset 4px 4px 6px 0 rgba(116, 125, 136, 0.3);
    transition: all 0.3s ease;
  }
  .btn-4 span:before {
    width: 0.1px;
    height: 0%;
  }
  .btn-4 span:after {
    width: 0%;
    height: 0.1px;
  }
  .btn-4 span:hover:before {
    height: 100%;
  }
  .btn-4 span:hover:after {
    width: 100%;
  }

  /* 5 */
  .btn-5 {
    width: 100%;
    border: none;
    background: rgb(255, 27, 0);
    background: linear-gradient(0deg, rgba(255, 27, 0, 1) 0%, rgba(251, 75, 2, 1) 100%);
  }
  .btn-5:hover {
    color: #f0094a;
    background: transparent;
    box-shadow: none;
  }
  .btn-5:before,
  .btn-5:after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    height: 2px;
    width: 0;
    background: #f0094a;
    box-shadow: -1px -1px 5px 0px #fff, 7px 7px 20px 0px #0003, 4px 4px 5px 0px #0002;
    transition: 400ms ease all;
  }
  .btn-5:after {
    right: inherit;
    top: inherit;
    left: 0;
    bottom: 0;
  }
  .btn-5:hover:before,
  .btn-5:hover:after {
    width: 100%;
    transition: 800ms ease all;
  }

  /* 6 */
  .btn-6 {
    background: rgb(247, 150, 192);
    background: radial-gradient(circle, rgba(247, 150, 192, 1) 0%, rgba(118, 174, 241, 1) 100%);
    border: none;
  }
  .btn-6 span {
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
  }
  .btn-6:before,
  .btn-6:after {
    position: absolute;
    content: '';
    height: 0%;
    width: 1px;
    box-shadow: -1px -1px 20px 0px rgba(255, 255, 255, 1), -4px -4px 5px 0px rgba(255, 255, 255, 1),
      7px 7px 20px 0px rgba(0, 0, 0, 0.4), 4px 4px 5px 0px rgba(0, 0, 0, 0.3);
  }
  .btn-6:before {
    right: 0;
    top: 0;
    transition: all 500ms ease;
  }
  .btn-6:after {
    left: 0;
    bottom: 0;
    transition: all 500ms ease;
  }
  .btn-6:hover {
    background: transparent;
    color: #76aef1;
    box-shadow: none;
  }
  .btn-6:hover:before {
    transition: all 500ms ease;
    height: 100%;
  }
  .btn-6:hover:after {
    transition: all 500ms ease;
    height: 100%;
  }
  .btn-6 span:before,
  .btn-6 span:after {
    position: absolute;
    content: '';
    box-shadow: -1px -1px 20px 0px rgba(255, 255, 255, 1), -4px -4px 5px 0px rgba(255, 255, 255, 1),
      7px 7px 20px 0px rgba(0, 0, 0, 0.4), 4px 4px 5px 0px rgba(0, 0, 0, 0.3);
  }
  .btn-6 span:before {
    left: 0;
    top: 0;
    width: 0%;
    height: 0.5px;
    transition: all 500ms ease;
  }
  .btn-6 span:after {
    right: 0;
    bottom: 0;
    width: 0%;
    height: 0.5px;
    transition: all 500ms ease;
  }
  .btn-6 span:hover:before {
    width: 100%;
  }
  .btn-6 span:hover:after {
    width: 100%;
  }

  /* 7 */
  .btn-7 {
    background: linear-gradient(0deg, rgba(255, 151, 0, 1) 0%, rgba(251, 75, 2, 1) 100%);
    border: none;
  }
  .btn-7 span {
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
  }
  .btn-7:before,
  .btn-7:after {
    position: absolute;
    content: '';
    right: 0;
    bottom: 0;
    background: rgba(251, 75, 2, 1);
    box-shadow: -7px -7px 20px 0px rgba(255, 255, 255, 0.9),
      -4px -4px 5px 0px rgba(255, 255, 255, 0.9), 7px 7px 20px 0px rgba(0, 0, 0, 0.2),
      4px 4px 5px 0px rgba(0, 0, 0, 0.3);
    transition: all 0.3s ease;
  }
  .btn-7:before {
    height: 0%;
    width: 2px;
  }
  .btn-7:after {
    width: 0%;
    height: 2px;
  }
  .btn-7:hover {
    color: rgba(251, 75, 2, 1);
    background: transparent;
  }
  .btn-7:hover:before {
    height: 100%;
  }
  .btn-7:hover:after {
    width: 100%;
  }
  .btn-7 span:before,
  .btn-7 span:after {
    position: absolute;
    content: '';
    left: 0;
    top: 0;
    background: rgba(251, 75, 2, 1);
    box-shadow: -7px -7px 20px 0px rgba(255, 255, 255, 0.9),
      -4px -4px 5px 0px rgba(255, 255, 255, 0.9), 7px 7px 20px 0px rgba(0, 0, 0, 0.2),
      4px 4px 5px 0px rgba(0, 0, 0, 0.3);
    transition: all 0.3s ease;
  }
  .btn-7 span:before {
    width: 2px;
    height: 0%;
  }
  .btn-7 span:after {
    height: 2px;
    width: 0%;
  }
  .btn-7 span:hover:before {
    height: 100%;
  }
  .btn-7 span:hover:after {
    width: 100%;
  }

  /* 8 */
  .btn-8 {
    // background-color: rgb(240, 236, 252);
    // background-image: linear-gradient(315deg, rgb(240, 236, 252) 0%, rgb(199, 151, 235) 74%);
    border: none;
    color: #fff;
    overflow: hidden;
  }
  .btn-8 span {
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
  }
  .btn-8:before,
  .btn-8:after {
    position: absolute;
    content: '';
    right: 0;
    bottom: 0;
    background: #c797eb;
    /*box-shadow:  4px 4px 6px 0 rgba(255,255,255,.5),
              -4px -4px 6px 0 rgba(116, 125, 136, .2),
    inset -4px -4px 6px 0 rgba(255,255,255,.5),
    inset 4px 4px 6px 0 rgba(116, 125, 136, .3);*/
    transition: all 0.3s ease;
  }
  .btn-8:before {
    height: 0%;
    width: 2px;
  }
  .btn-8:after {
    width: 0%;
    height: 2px;
  }
  .btn-8:hover:before {
    height: 100%;
  }
  .btn-8:hover:after {
    width: 100%;
  }
  .btn-8:hover {
    background: transparent !important;
  }
  .btn-8 span:hover {
    color: #c797eb;
  }
  .btn-8 span:before,
  .btn-8 span:after {
    position: absolute;
    content: '';
    left: 0;
    top: 0;
    background: rgb(199, 151, 235);
    /*box-shadow:  4px 4px 6px 0 rgba(255,255,255,.5),
              -4px -4px 6px 0 rgba(116, 125, 136, .2),
    inset -4px -4px 6px 0 rgba(255,255,255,.5),
    inset 4px 4px 6px 0 rgba(116, 125, 136, .3);*/
    transition: all 0.3s ease;
  }
  .btn-8 span:before {
    width: 2px;
    height: 0%;
  }
  .btn-8 span:after {
    height: 2px;
    width: 0%;
  }
  .btn-8 span:hover:before {
    height: 100%;
  }
  .btn-8 span:hover:after {
    width: 100%;
  }

  /* 9 */
  .btn-9 {
    border: none;
    color: #fff;
    transition: all 0.3s ease;
    overflow: hidden;
  }
  .btn-9 span {
    position: absolute;
    content: ' ';
    z-index: 1;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
  }
  .btn-9:after {
    position: absolute;
    content: ' ';
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background-color: rgb(31, 209, 249);
    background-image: linear-gradient(315deg, rgb(31, 209, 249) 0%, rgb(180, 32, 254) 74%);
    transition: all 0.3s ease;
  }
  .btn-9:hover {
    background: transparent;
    box-shadow: 4px 4px 6px 0 rgba(255, 255, 255, 0.5), -4px -4px 6px 0 rgba(116, 125, 136, 0.2),
      inset -4px -4px 6px 0 rgba(255, 255, 255, 0.5), inset 4px 4px 6px 0 rgba(116, 125, 136, 0.3);
  }
  .btn-9:hover:after {
    transform: scale(2) rotate(180deg);
    transform: scale(2) rotate(180deg);
    box-shadow: 4px 4px 6px 0 rgba(255, 255, 255, 0.5), -4px -4px 6px 0 rgba(116, 125, 136, 0.2),
      inset -4px -4px 6px 0 rgba(255, 255, 255, 0.5), inset 4px 4px 6px 0 rgba(116, 125, 136, 0.3);
  }

  /* 10 */
  .btn-10 {
    position: relative;
    // background: rgb(22, 9, 240);
    // background: linear-gradient(0deg, rgba(22, 9, 240, 1) 0%, rgba(49, 110, 244, 1) 100%);
    color: #fff;
    border: none;
    transition: all 0.3s ease;
    overflow: hidden;
  }
  .btn-10 span {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
  }
  .btn-10:after {
    position: absolute;
    content: ' ';
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transition: all 0.3s ease;
    transform: scale(0.1);
  }
  .btn-10:hover {
    border: none;
    background: transparent;
  }
  .btn-10:hover:after {
    background: rgb(0, 3, 255);
    background: linear-gradient(0deg, rgba(2, 126, 251, 1) 0%, rgba(0, 3, 255, 1) 100%);
    transform: scale(1);
  }

  /* 11 */
  .btn-11 {
    border: none;
    // background: rgb(251, 33, 117);
    // background: linear-gradient(0deg, rgba(251, 33, 117, 1) 0%, rgba(234, 76, 137, 1) 100%);
    color: #fff;
    overflow: hidden;
  }
  .btn-11:hover {
    text-decoration: none;
    color: #fff;
  }
  .btn-11:before {
    position: absolute;
    content: '';
    display: inline-block;
    top: -180px;
    left: 0;
    width: 30px;
    height: 100%;
    background-color: #fff;
    animation: shiny-btn1 3s ease-in-out infinite;
  }
  .btn-11:hover {
    opacity: 0.7;
  }
  .btn-11:active {
    box-shadow: 4px 4px 6px 0 rgba(255, 255, 255, 0.3), -4px -4px 6px 0 rgba(116, 125, 136, 0.2),
      inset -4px -4px 6px 0 rgba(255, 255, 255, 0.2), inset 4px 4px 6px 0 rgba(0, 0, 0, 0.2);
  }

  @keyframes shiny-btn1 {
    0% {
      transform: scale(0) rotate(45deg);
      opacity: 0;
    }
    80% {
      transform: scale(0) rotate(45deg);
      opacity: 0.5;
    }
    81% {
      transform: scale(4) rotate(45deg);
      opacity: 1;
    }
    100% {
      transform: scale(50) rotate(45deg);
      opacity: 0;
    }
  }

  /* 12 */
  .btn-12 {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 300px;
    perspective: 230px;
    overflow: hidden;
  }
  .btn-12 span {
    position: absolute;
    // background: rgb(0, 172, 238);
    // background: linear-gradient(0deg, rgba(0, 172, 238, 1) 0%, rgba(2, 126, 251, 1) 100%);
    width: 100%;
    box-sizing: border-box;
    transition: all 0.4s;
    box-shadow: inset 2px 2px 2px 0px rgba(255, 255, 255, 0.5), 7px 7px 20px 0px rgba(0, 0, 0, 0.1),
      4px 4px 5px 0px rgba(0, 0, 0, 0.1);
  }
  .btn-12 span:nth-child(1) {
    transform: rotateX(90deg);
    transform-origin: 50% 50% -20px;
    display: 0;
  }
  .btn-12 span:nth-child(2) {
    transform: rotateX(0deg);
    transform-origin: 50% 50% -20px;
    opacity: 100;
  }
  .btn-12:hover span:nth-child(1) {
    box-shadow: inset 2px 2px 2px 0px rgba(255, 255, 255, 0.5), 7px 7px 20px 0px rgba(0, 0, 0, 0.1),
      4px 4px 5px 0px rgba(0, 0, 0, 0.1);
    transform: rotateX(0deg);
    transform: rotateX(0deg);
    opacity: 100;
  }
  .btn-12:hover span:nth-child(2) {
    box-shadow: inset 2px 2px 2px 0px rgba(255, 255, 255, 0.5), 7px 7px 20px 0px rgba(0, 0, 0, 0.1),
      4px 4px 5px 0px rgba(0, 0, 0, 0.1);
    transform: rotateX(-90deg);
    transform: rotateX(-90deg);
    opacity: 0;
  }

  /* 13 */
  .btn-13 {
    background-color: #89d8d3;
    background-image: linear-gradient(315deg, #89d8d3 0%, #03c8a8 74%);
    border: none;
    z-index: 1;
  }
  .btn-13:after {
    position: absolute;
    content: '';
    width: 100%;
    height: 0;
    bottom: 0;
    left: 0;
    z-index: -1;
    background-color: #4dccc6;
    background-image: linear-gradient(315deg, #4dccc6 0%, #96e4df 74%);
    box-shadow: -7px -7px 20px 0px #fff9, -4px -4px 5px 0px #fff9, 7px 7px 20px 0px #0002,
      4px 4px 5px 0px #0001;
    transition: all 0.3s ease;
  }
  .btn-13:hover {
    color: #fff;
  }
  .btn-13:hover:after {
    top: 0;
    height: 100%;
  }
  .btn-13:active {
    top: 2px;
  }

  /* 14 */
  .btn-14 {
    background: rgb(255, 151, 0);
    border: none;
    z-index: 1;
  }
  .btn-14:after {
    position: absolute;
    content: '';
    width: 100%;
    height: 0;
    top: 0;
    left: 0;
    z-index: -1;
    background-color: #eaf818;
    background-image: linear-gradient(315deg, #eaf818 0%, #f6fc9c 74%);
    box-shadow: inset 2px 2px 2px 0px rgba(255, 255, 255, 0.5) 7px 7px 20px 0px rgba(0, 0, 0, 0.1),
      4px 4px 5px 0px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
  }
  .btn-14:hover {
    color: #000;
  }
  .btn-14:hover:after {
    top: auto;
    bottom: 0;
    height: 100%;
  }
  .btn-14:active {
    top: 2px;
  }

  /* 15 */
  .btn-15 {
    background: #b621fe;
    border: none;
    z-index: 1;
  }
  .btn-15:after {
    position: absolute;
    content: '';
    width: 0;
    height: 100%;
    top: 0;
    right: 0;
    z-index: -1;
    background-color: #663dff;
    box-shadow: inset 2px 2px 2px 0px rgba(255, 255, 255, 0.5), 7px 7px 20px 0px rgba(0, 0, 0, 0.1),
      4px 4px 5px 0px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
  }
  .btn-15:hover {
    color: #fff;
  }
  .btn-15:hover:after {
    left: 0;
    width: 100%;
  }
  .btn-15:active {
    top: 2px;
  }

  /* 16 */
  .btn-16 {
    border: none;
    color: #000;
  }
  .btn-16:after {
    position: absolute;
    content: '';
    width: 0;
    height: 100%;
    top: 0;
    left: 0;
    direction: rtl;
    z-index: -1;
    box-shadow: -7px -7px 20px 0px #fff9, -4px -4px 5px 0px #fff9, 7px 7px 20px 0px #0002,
      4px 4px 5px 0px #0001;
    transition: all 0.3s ease;
  }
  .btn-16:hover {
    color: #000;
  }
  .btn-16:hover:after {
    left: auto;
    right: 0;
    width: 100%;
  }
  .btn-16:active {
    top: 2px;
  }
</style>
