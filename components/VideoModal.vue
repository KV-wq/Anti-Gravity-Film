<script setup lang="ts">
import { useModalStore } from "../store/modalStore";
const { data: homeData } = await useFetch("/api/home");

const store = useModalStore();
const videoRef = ref<HTMLVideoElement | null>(null);

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

const handleEscape = (e: KeyboardEvent) => {
  if (e.key === "Escape" && store.isVideoVisible) {
    store.hideVideo();
  }
};

const handleBackdropClick = (e: MouseEvent) => {
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
      <!-- Кнопка закрытия для мобильных устройств -->
      <button
        @click="store.hideVideo"
        class="absolute top-[6vh] right-8 z-20 hidden max-[480px]:block bg-black/50 rounded-full p-2 hover:bg-black/70 transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>

      <video
        ref="videoRef"
        :src="homeData.previewVideo"
        class="max-h-[calc(100vh-2rem)] h-full rounded-lg"
        controls
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
