// components/VideoPlayer.vue
<script setup lang="ts">
const props = defineProps<{
  src: string;
  small: boolean;
}>();

const router = useRouter();
const videoRef = ref<HTMLVideoElement | null>(null);
const progressRef = ref<HTMLDivElement | null>(null);
const isPlaying = ref(false);
const isMuted = ref(false);
const currentTime = ref("0:00");
const isDragging = ref(false);

const togglePlay = () => {
  if (!videoRef.value) return;

  if (videoRef.value.paused) {
    videoRef.value.play();
    isPlaying.value = true;
  } else {
    videoRef.value.pause();
    isPlaying.value = false;
  }
};

const toggleMute = () => {
  if (!videoRef.value) return;

  videoRef.value.muted = !videoRef.value.muted;
  isMuted.value = videoRef.value.muted;
};

const handleExpand = () => {
  router.push("/video");
};

const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};

const updateProgress = () => {
  if (!videoRef.value || !progressRef.value || isDragging.value) return;

  const progress = (videoRef.value.currentTime / videoRef.value.duration) * 100;
  progressRef.value.style.width = `${progress}%`;
  currentTime.value = formatTime(videoRef.value.currentTime);
};

const handleProgressBarClick = (event: MouseEvent) => {
  if (!videoRef.value || !event.currentTarget) return;

  const progressBar = event.currentTarget as HTMLElement;
  const rect = progressBar.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const percentage = x / rect.width;

  videoRef.value.currentTime = percentage * videoRef.value.duration;
};

const startDragging = () => {
  isDragging.value = true;
};

const stopDragging = () => {
  isDragging.value = false;
};

onMounted(() => {
  if (videoRef.value) {
    videoRef.value.addEventListener("timeupdate", updateProgress);
  }
});

onUnmounted(() => {
  if (videoRef.value) {
    videoRef.value.removeEventListener("timeupdate", updateProgress);
  }
});
</script>

<template>
  <div
    class="relative w-screen h-screen bg-black"
    :class="{ '!h-auto': small }"
  >
    <!-- Видео -->
    <video
      ref="videoRef"
      :src="src"
      class="w-full h-full object-contain"
      @click="togglePlay"
    />

    <!-- Оверлей с элементами управления -->
    <div
      class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity"
    >
      <!-- Центральная кнопка play/pause -->
      <button
        @click="togglePlay"
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"
      >
        <div
          v-if="!isPlaying"
          class="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-white border-b-8 border-b-transparent ml-1"
        />
        <div
          v-else
          class="w-3 h-8 border-r-3 border-r-white border-l-3 border-l-white"
        />
      </button>

      <!-- Нижняя панель управления -->
      <div class="absolute bottom-0 left-0 right-0 p-4 flex items-center gap-4">
        <!-- Play/Pause кнопка -->
        <button @click="togglePlay" class="text-white">
          <div
            v-if="!isPlaying"
            class="w-0 h-0 border-t-6 border-t-transparent border-l-8 border-l-white border-b-6 border-b-transparent"
          />
          <div
            v-else
            class="w-2 h-6 border-r-2 border-r-white border-l-2 border-l-white"
          />
        </button>

        <!-- Прогресс-бар -->
        <div
          class="flex-1 h-1 bg-white/30 cursor-pointer relative"
          @mousedown="startDragging"
          @mouseup="stopDragging"
          @click="handleProgressBarClick"
        >
          <div
            ref="progressRef"
            class="absolute top-0 left-0 h-full bg-white"
          />
        </div>

        <!-- Время -->
        <span class="text-white text-sm">{{ currentTime }}</span>

        <!-- Кнопка звука -->
        <button @click="toggleMute" class="text-white">
          <svg
            v-if="!isMuted"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
          </svg>
          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <line x1="23" y1="9" x2="17" y2="15" />
            <line x1="17" y1="9" x2="23" y2="15" />
          </svg>
        </button>

        <!-- Кнопка расширения (показывается только если small=true) -->
        <button v-if="small" @click="handleExpand" class="text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M15 3h6v6" />
            <path d="M9 21H3v-6" />
            <path d="M21 3l-7 7" />
            <path d="M3 21l7-7" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.border-l-12 {
  border-left-width: 12px;
}
.border-t-6 {
  border-top-width: 6px;
}
.border-b-6 {
  border-bottom-width: 6px;
}
.border-r-3 {
  border-right-width: 3px;
}
.border-l-3 {
  border-left-width: 3px;
}
.border-r-2 {
  border-right-width: 2px;
}
.border-l-2 {
  border-left-width: 2px;
}
</style>
