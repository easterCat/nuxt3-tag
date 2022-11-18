<template>
    <transition :name="name" :duration="{ enter: enterDuration, leave: leaveDuration }">
        <template v-if="show">
            <slot></slot>
        </template>
    </transition>
</template>

<script setup lang="ts">
// https://animate.style/
import { onMounted, Ref } from 'vue';

// props
defineProps({
    name: {
        type: String,
        default: 'fadeIn',
    },
    enterDuration: {
        type: Number,
        default: 800, // 100ms
    },
    leaveDuration: {
        type: Number,
        default: 800, // 100ms
    },
});

//data
const show: Ref<boolean> = ref(false);

onMounted(() => {
    show.value = true;
});
</script>

<style lang="scss" scoped>
.fadeIn-enter-active {
    transition: all 0.5s ease-out;
}

.fadeIn-leave-active {
    transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.fadeIn-enter-from,
.fadeIn-leave-to {
    opacity: 0;
    filter: blur(4px);
    transform: translateY(10px);
}
</style>
