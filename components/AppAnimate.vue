<template>
  <transition
    :enter-active-class="enterAninateClass"
    leave-active-class="animate__animated animate__bounceOut"
    :duration="{ enter: enterDuration, leave: leaveDuration }"
  >
    <template v-if="show">
      <slot></slot>
    </template>
  </transition>
</template>

<script setup lang="ts">
  // https://animate.style/
  import { computed, onMounted } from 'vue';

  // props
  const props = defineProps({
    enterName: {
      type: String,
      default: 'animate__fadeIn',
    },
    leaveName: {
      type: String,
      default: 'animate__fadeOut',
    },
    delay: {
      type: [String, Number],
      default: '0', // 100ms
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
  const show = ref(false);

  // mounted
  onMounted(() => {
    show.value = true;
  });

  // methods
  const enterAninateClass = computed(() => {
    return `animate__animated ${props.enterName} animate__delay__${Number(props.delay)}`;
  });

  const leaveAninateClass = computed(() => {
    return `animate__animated ${props.leaveName} animate__delay__${Number(props.delay)}`;
  });
</script>

<style lang="scss" scoped>
  @for $i from 0 through 30 {
    .animate__delay__#{(100 * $i)} {
      animation-delay: 100ms * $i;
    }
  }
</style>
