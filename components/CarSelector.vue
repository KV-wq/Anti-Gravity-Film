<script setup lang="ts">
import { useCarStore } from "~/store/carStore";
import { computed } from "vue";
import type { Color } from "../types/color";

const { data } = await useFetch("/api/colors");
const carStore = useCarStore();

// Находим полный объект цвета на основе selectedColor из store
const selectedColorObject = computed(() => {
  if (!data.value?.colors || !carStore.selectedColor) return null;

  return data.value.colors.find(
    (color) => color.name === carStore.selectedColor
  );
});

// Получаем категорию выбранного цвета
const currentCategory = computed(() => {
  return selectedColorObject.value?.category || "3";
});

const positions = [
  {
    position: 0,
    container: "right-[11vw] top-[2.7vw] max-sm:right-16 max-sm:-top-2",
    text: "right-[1.5vw] top-[3.4vw] max-sm:right-[10px] max-sm:text-[9px] max-sm:top-[2px]",
  },
  {
    position: 1,
    container: "right-[3vw] top-[17vw] max-sm:right-2 max-sm:top-[85px]",
    text: "-right-[6.5vw] top-[17.8vw] max-sm:-right-[46px] max-sm:text-[9px] max-sm:top-[102px]",
  },
  {
    position: 2,
    container: "right-[11vw] bottom-[2.5vw] max-sm:right-16 max-sm:bottom-0",
    text: "right-[1.5vw] bottom-[3.4vw] max-sm:right-[10px] max-sm:text-[9px] max-sm:bottom-5",
  },
];

// Создаем слоты с машинами той же категории, что и выбранный цвет
const carSlots = computed(() => {
  if (!data.value?.colors) return [];

  // Получаем все цвета той же категории
  const categoryColors = data.value.colors.filter(
    (color) => color.category === currentCategory.value
  );

  // Распределяем по позициям
  return positions.map((position, index) => {
    const car = categoryColors[index] || null;
    return {
      ...position,
      car,
    };
  });
});

// При выборе машины обновляем store
const handleColorSelect = (car: Color) => {
  if (car) {
    carStore.setSelectedCar(car);
    carStore.setSelectedColor(car.name);
  }
};
</script>

<template>
  <div>
    <div v-for="slot in carSlots" :key="slot.position">
      <div
        class="size-[5.5vw] rounded-full bg-white border-2 absolute pt-[1vw] max-sm:pt-2 max-sm:size-16"
        :class="[
          slot.container,
          slot.car && slot.car.name === carStore.selectedColor
            ? 'border-secondary'
            : '',
        ]"
      >
        <label v-if="slot.car" class="cursor-pointer">
          <input
            type="radio"
            :value="slot.car.name"
            :checked="slot.car.name === carStore.selectedColor"
            @change="handleColorSelect(slot.car)"
            :name="'car-' + slot.car.id"
            class="sr-only"
          />
          <img
            :src="slot.car.carImage"
            :alt="slot.car.name"
            class="size-full mt-[0.2vw] max-md:mt-2"
          />
        </label>
        <!-- Пустой белый круг, если нет машины в этой позиции -->
        <div v-else class="size-[5.2vw] max-sm:size-16"></div>
      </div>
      <div
        v-if="slot.car"
        class="text-[1.2vw] absolute w-[9vw] max-sm:w-12"
        :class="slot.text"
      >
        {{ slot.car.code }} <br />
        {{ slot.car.name }}
      </div>
    </div>
  </div>
</template>

<style scoped>
input:focus-visible + img {
  outline: 2px solid #4caf50;
  outline-offset: 2px;
}
</style>
