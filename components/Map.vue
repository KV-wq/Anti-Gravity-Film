<script setup lang="ts">
const isLoading = ref(true);

const handleImageLoad = () => {
  isLoading.value = false;
};
</script>

<template>
  <div class="relative w-full">
    <!-- Loader -->
    <div
      v-show="isLoading"
      class="w-full h-[450px] mt-[1.75vw] max-sm:absolute max-sm:bottom-0 bg-gray-100 flex items-center justify-center"
    >
      <div
        class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"
      ></div>
    </div>

    <!-- Карта -->
    <img
      src="https://static-maps.yandex.ru/v1?ll=37.620070,55.753630&size=650,450&z=13&pt=37.620070,55.753630,pm2vvl&apikey=6ac6eb26-fc8f-477d-ae89-ce393e43e5b3"
      alt="Map"
      class="w-full mt-[1.75vw] max-sm:absolute max-sm:bottom-0"
      @load="handleImageLoad"
      :class="{ hidden: isLoading }"
    />
  </div>
</template>

<style scoped>
.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
