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

// data
const show: Ref<boolean> = ref(false);

onMounted(() => {
    show.value = true;
});
</script>

<style lang="scss" scoped></style>
