<script setup lang="ts">
import { useCarStore } from "~/store/carStore";
import { computed } from "vue";

const { data } = await useFetch("/api/colors");
const carStore = useCarStore();

// Получаем полный объект цвета на основе выбранного имени
const selectedColorData = computed(() => {
  if (!data.value?.colors || !carStore.selectedColor) {
    return data.value?.colors[0]; // Возвращаем первый цвет как дефолтный
  }

  return data.value.colors.find(
    (color) => color.name === carStore.selectedColor
  );
});
</script>

<template>
  <div
    class="relative size-[39vw] max-sm:size-60 ml-[10vw] max-[380px]:scale-90"
  >
    <div
      class="absolute top-[10vw] -left-[7.5vw] w-[40vw] max-sm:w-[240px] max-sm:top-[18vw] max-sm:-left-14"
    >
      <TransitionGroup name="car-rotate">
        <img
          :key="selectedColorData?.carImage"
          :src="selectedColorData?.carImage"
          alt="Car"
          class="w-full h-full object-contain"
        />
      </TransitionGroup>
    </div>

    <p
      class="absolute top-[7.5vw] -left-[6.4vw] text-black z-20 font-semibold w-[10vw] text-[0.8vw] max-sm:text-xs max-sm:w-24 max-sm:-left-12 max-sm:top-4"
    >
      {{ selectedColorData?.code }} <br />
      {{ selectedColorData?.name }}
    </p>

    <div
      class="absolute top-[3vw] -left-[7vw] max-sm:-left-16 max-sm:top-0 z-10"
    >
      <img
        :src="selectedColorData?.cardImage"
        alt="color"
        class="w-[10.5vw] max-sm:w-28 rounded-xl h-[7.5vw] max-sm:h-[72px]"
      />
      <img
        src="../assets/images/icons/lines.svg"
        alt="lines"
        class="ml-7 mt-2 h-[6.7vw] max-sm:h-12 max-sm:ml-2"
      />
    </div>

    <div
      class="absolute inset-0 bg-[url('/images/circle.svg')] bg-center bg-contain bg-no-repeat"
    ></div>

    <CarSelector />
  </div>
</template>

<style scoped>
.car-rotate-enter-active,
.car-rotate-leave-active {
  transition: all 0.5s ease-in-out;
  transform-origin: center center;
}

.car-rotate-enter-from {
  opacity: 0;
  transform: translateX(30%);
}

.car-rotate-leave-to {
  opacity: 0;
  transform: translateX(-40%);
}

.car-rotate-enter-to,
.car-rotate-leave-from {
  opacity: 1;
  transform: translate(0, 0) rotate(0);
}

.car-rotate-leave-active {
  position: absolute;
  width: 100%;
  height: 100%;
}
</style>
