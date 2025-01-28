<script setup lang="ts"></script>

<template>
  <div>
    <Header />
    <div class="pl-[5vw] h-screen max-sm:pr-[5vw] flex max-sm:flex-col-reverse">
      <div
        class="w-[20vw] h-full flex items-end sm:pt-[9vw] pb-[8vw] max-sm:pb-10 max-sm:w-full"
      >
        <ChoiseColor class="w-full h-full" />
      </div>
      <div
        class="h-full flex items-end justify-center sm:w-[70vw] sm:pb-[5vw] max-sm:pb-3"
      >
        <CarStand />
      </div>
    </div>
  </div>
</template>
