<script setup lang="ts">
const { data: pageData } = await useFetch("/api/video-review");
</script>

<template>
  <div>
    <NuxtLink href="/video-review">
      <div
        class="flex items-center gap-3 absolute z-20 left-5 top-7 md:left-[5vw] md:top-[2vw]"
      >
        <img
          src="../assets/images/icons/arrow-left.svg"
          alt="back"
          class="w-12 md:w-[4vw]"
        />
        <p
          class="font-light text-sm md:text-[1.27vw] hover:text-secondary transition-colors"
        >
          Назад
        </p>
      </div>
    </NuxtLink>
    <VideoPlayer :src="pageData.videoSrc" :small="false" />
  </div>
</template>
