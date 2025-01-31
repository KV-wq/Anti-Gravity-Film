<script setup lang="ts">
import { useModalStore } from "../store/modalStore";

const store = useModalStore();
</script>

<template>
  <Transition name="fade">
    <div
      v-if="store.isOverlayVisible"
      class="z-20 fixed inset-0 bg-black/60"
      @click="store.closeAll"
    />
  </Transition>

  <Transition name="fade">
    <Form v-if="store.isFormVisible" />
  </Transition>

  <Transition name="slide">
    <Contacts v-if="store.isContactsVisible" />
  </Transition>

  <Transition name="fade">
    <VideoModal v-if="store.isVideoVisible" />
  </Transition>
</template>

<style scoped>
/* Анимация прозрачности */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Анимация слайда справа */
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}
</style>
