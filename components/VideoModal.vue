<script setup lang="ts">
import { useModalStore } from "../store/modalStore";

const store = useModalStore();
const videoRef = ref<HTMLVideoElement | null>(null);

// Автовоспроизведение при открытии
watch(
  () => store.isVideoVisible,
  (isVisible: boolean) => {
    if (isVisible && videoRef.value) {
      videoRef.value.play();
    } else if (videoRef.value) {
      videoRef.value.pause();
      videoRef.value.currentTime = 0;
    }
  }
);

// Обработка клавиши Escape
const handleEscape = (e: KeyboardEvent) => {
  if (e.key === "Escape" && store.isVideoVisible) {
    store.hideVideo();
  }
};

const handleBackdropClick = (e: MouseEvent) => {
  // Проверяем, что клик был именно по подложке, а не по видео
  if (e.target === e.currentTarget) {
    store.hideVideo();
  }
};

onMounted(() => {
  document.addEventListener("keydown", handleEscape);
  videoRef.value.volume = 0.35;
});

onUnmounted(() => {
  document.removeEventListener("keydown", handleEscape);
});
</script>

<template>
  <div v-if="true" class="fixed inset-0 z-50">
    <div
      class="relative h-full flex items-center justify-center p-4"
      @click="handleBackdropClick"
    >
      <video
        ref="videoRef"
        src="/video/preview.mov"
        class="max-h-[calc(100vh-2rem)] h-full rounded-lg"
        controls
        autoplay
      />
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
