<script setup lang="ts"></script>

<template>
  <div>
    <Header />
    <div
      class="pl-[5vw] h-screen pr-[5vw] flex justify-between items-center w-full max-sm:flex-col max-sm:justify-center max-sm:-translate-y-10 max-sm:items-start"
    >
      <div class="w-[30vw] max-sm:w-80 max-sm:mb-10">
        <h1
          class="uppercase font-nolimits text-[3.7vw] max-sm:text-4xl max-sm:mb-3"
        >
          видеообзор
        </h1>
        <p class="text-[1.1vw] max-sm:text-sm max-sm:leading-5">
          Это тестовый контент который не должен нести никакого смысла, лишь
          показать текст. Это тестовый контент который не должен нести никакого
          смысла, лишь показать текст.
        </p>
      </div>
      <div
        class="relative flex justify-center items-center w-[52vw] overflow-hidden h-[30vw] max-sm:w-full max-sm:h-[47vw]"
      >
        <VideoPlayer src="/video/main.mp4" class="absolute inset-0" />
      </div>
    </div>
  </div>
</template>
