<script setup lang="ts">
const props = defineProps<{
  outline?: boolean;
  isVertical?: boolean;
}>();
</script>

<template>
  <button
    class="w-64 h-20 uppercase text-xl font-normal text-white from-primary_light to-primary_dark transition-all hover:font-semibold active:scale-95"
    :class="{
      'bg-gradient-to-t ': !outline,
      '!bg-gradient-to-r -rotate-90': isVertical,
      'bg-transparent border border-white': outline,
    }"
  >
    <slot></slot>
  </button>
</template>
