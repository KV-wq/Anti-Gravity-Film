<script setup lang="ts"></script>

<template>
  <div
    class="relative size-[39vw] max-sm:size-60 ml-[10vw] max-[380px]:scale-90"
  >
    <img
      src="/images/car-2.svg"
      alt="Car"
      class="absolute top-[10vw] -left-[7.5vw] w-[40vw] max-sm:w-[240px] max-sm:top-[18vw] max-sm:-left-14"
    />
    <p
      class="absolute top-[7.5vw] -left-[6.4vw] text-black z-10 font-semibold w-[10vw] text-[0.8vw] max-sm:text-xs max-sm:w-24 max-sm:-left-12 max-sm:top-4"
    >
      TPU-001S Glossy Swan White (SS)
    </p>
    <div class="absolute top-[3vw] -left-[7vw] max-sm:-left-16 max-sm:top-0">
      <img
        src="../assets/images/test/metal.svg"
        alt="color"
        class="w-[10.5vw] max-sm:w-28"
      />
      <img
        src="../assets/images/icons/lines.svg"
        alt="lines"
        class="ml-7 mt-2 h-[7vw] max-sm:h-12 max-sm:ml-2"
      />
    </div>
    <div
      class="absolute inset-0 bg-[url('/images/circle.svg')] bg-center bg-contain bg-no-repeat"
    ></div>

    <CarSelector />
  </div>
</template>
