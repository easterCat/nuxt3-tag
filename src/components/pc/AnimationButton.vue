<template>
    <div class="animation-button">
        <button
            class="custom-btn"
            :class="[`btn-${buttonStyle}`, `${buttonSize}`, buttonShadow ? 'btn-shadow' : '']"
            :style="buttomColor"
            :data-style="buttonStyle"
            @click="buttonClick"
        >
            <template v-if="[1, 2, 13, 14].includes(buttonStyle)">
                {{ buttonText }}
            </template>
            <span v-if="[5, 6].includes(buttonStyle)">{{ buttonText }}</span>
            <template v-if="[11].includes(buttonStyle)">
                {{ buttonText }}
                <div class="dot"></div>
            </template>
        </button>
    </div>
</template>

<script setup lang="ts">
// https://codepen.io/yuhomyan/pen/OJMejWJ
const emit = defineEmits(['submit']);

const props = defineProps({
    // buttonStyle value 1,2,5,6,13,14
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
    if (props.buttonColor) {
        let bg = `background: linear-gradient(${props.buttonAngel}, rgba(${props.buttonColor},1) 0%, rgba(${props.buttonColor},0.8) 100%);`;
        if (props?.buttonWidth) bg = `${bg}width:${props?.buttonWidth}`;
        return bg;
    } else {
        return '';
    }
});

const buttonClick = () => {
    emit('submit');
};
</script>

<style lang="scss" scoped>
.animation-button {
    display: inline-block;
    border-radius: 10px;
    margin-right: 10px;
    overflow: hidden;
    line-height: 1;
}

.custom-btn {
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    display: inline-block;
    outline: none;
    overflow: hidden;
    height: 100%;
}

$basebtnwidth: 24px;
$basebtnpadding: 8px;

.larger {
    width: 100%;
    height: $basebtnwidth + 16;
    line-height: $basebtnwidth + 16;
    padding: 0 $basebtnpadding + 12px;
    font-size: 16px;
}

.large {
    width: 100%;
    height: $basebtnwidth + 12;
    line-height: $basebtnwidth + 12;
    padding: 0 $basebtnpadding + 8px;
    font-size: 15px;
}

.medium {
    width: 100%;
    height: $basebtnwidth + 8;
    line-height: $basebtnwidth + 8;
    padding: 0 $basebtnpadding + 6px;
    font-size: 14px;
}

.small {
    width: 100%;
    height: $basebtnwidth + 4;
    line-height: $basebtnwidth + 4;
    padding: 0 $basebtnpadding + 4px;
    font-size: 13px;
}

.smaller {
    width: 100%;
    height: 24px;
    line-height: $basebtnwidth;
    padding: 0px $basebtnpadding;
    font-size: 12px;
}

.btn-shadow {
    box-shadow: inset 2px 2px 2px 0px rgba(255, 255, 255, 0.5), 7px 7px 20px 0px rgba(0, 0, 0, 0.1),
        4px 4px 5px 0px rgba(0, 0, 0, 0.1);
}

/* 1 */
.btn-1 {
    border: none;
}
.btn-1:hover {
    filter: drop-shadow(4px 4px 5px rgb(207, 207, 207));
    background: inherit;
    filter: brightness(1.1);
}

/* 2 */
.btn-2 {
    border: none;
}
.btn-2:before {
    height: 0%;
    width: 2px;
}
.btn-2:hover {
    box-shadow: 2px 2px 4px 0 rgba(255, 255, 255, 0.4), -2px -2px 4px 0 rgba(116, 125, 136, 0.4),
        inset -2px -2px 4px 0 rgba(255, 255, 255, 0.1), inset 2px 2px 4px 0 rgba(0, 0, 0, 0.3);
}

/* 5 */
.btn-5 {
    width: 100%;
    border: none;
}
.btn-5:hover {
    background: inherit;
    filter: brightness(1.1);
}
.btn-5:before,
.btn-5:after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    height: 2px;
    width: 0;
    background: inherit;
    filter: brightness(1.1);
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
    position: relative;
    border: none;
}
.btn-6 span {
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
    background: inherit;
    filter: brightness(1.1);
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

/* 11 */
.btn-11 {
    border: none;
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
    background: currentColor;
    filter: brightness(1.1);
    animation: shiny-btn1 3s ease-in-out infinite;
}
.btn-11:hover {
    background: inherit;
    filter: brightness(1.1);
}
.btn-11:active {
    box-shadow: 4px 4px 6px 0 rgba(255, 255, 255, 0.3), -4px -4px 6px 0 rgba(116, 125, 136, 0.2),
        inset -4px -4px 6px 0 rgba(255, 255, 255, 0.2), inset 4px 4px 6px 0 rgba(0, 0, 0, 0.2);
}

/* 13 */
.btn-13 {
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
    background: inherit;
    filter: brightness(1.1);
    box-shadow: -7px -7px 20px 0px #fff9, -4px -4px 5px 0px #fff9, 7px 7px 20px 0px #0002,
        4px 4px 5px 0px #0001;
    transition: all 0.3s ease;
}
.btn-13:hover {
    background: inherit;
    filter: brightness(1.1);
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
    background: inherit;
    filter: brightness(1.1);
    box-shadow: inset 2px 2px 2px 0px rgba(255, 255, 255, 0.5) 7px 7px 20px 0px rgba(0, 0, 0, 0.1),
        4px 4px 5px 0px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
}
.btn-14:hover {
    background: inherit;
    filter: brightness(1.1);
}
.btn-14:hover:after {
    top: auto;
    bottom: 0;
    height: 100%;
}
.btn-14:active {
    top: 2px;
}
</style>
