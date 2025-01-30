<script setup lang="ts"></script>

<template>
  <div>
    <NuxtLink href="/">
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
    <VideoPlayer src="/video/main.mp4" />
  </div>
</template>
