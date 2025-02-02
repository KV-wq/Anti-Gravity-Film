<script setup lang="ts">
import { useCarStore } from "~/store/carStore";
import type { Color } from "../types/color";

const { data } = await useFetch("/api/colors");
const carStore = useCarStore();

// Получаем все машины выбранной категории
const categoryColors = computed(() => {
  if (!data.value?.colors) return [];

  // Находим объект выбранного цвета
  const selectedColor = data.value.colors.find(
    (color) => color.name === carStore.selectedColor
  );

  // Получаем его категорию или используем дефолтную
  const category = selectedColor?.category || "3";

  // Возвращаем все цвета этой категории
  return data.value.colors.filter((color) => color.category === category);
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

// Определяем какие три машины показывать
const displayedCars = computed(() => {
  const colors = categoryColors.value;
  const selectedIndex = colors.findIndex(
    (color) => color.name === carStore.selectedColor
  );

  if (selectedIndex === -1) {
    // Если ничего не выбрано, показываем первые три
    return colors.slice(0, 3);
  }

  if (selectedIndex === 0) {
    // Если выбрана первая, показываем первые три
    return colors.slice(0, 3);
  }

  if (selectedIndex === colors.length - 1) {
    // Если выбрана последняя, показываем последние три
    return colors.slice(-3);
  }

  // В остальных случаях показываем выбранную в центре
  return [
    colors[selectedIndex - 1],
    colors[selectedIndex],
    colors[selectedIndex + 1],
  ];
});

// Привязываем машины к позициям
const carSlots = computed(() => {
  return positions.map((position, index) => ({
    ...position,
    car: displayedCars.value[index] || null,
  }));
});

const handleClick = (car: Color) => {
  carStore.setSelectedColor(car.name);
  carStore.setSelectedCar(car);
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
            :name="'car-selector'"
            :checked="slot.car.name === carStore.selectedColor"
            @click="handleClick(slot.car)"
            class="sr-only"
          />
          <img
            :src="slot.car.carImage"
            :alt="slot.car.name"
            class="size-full mt-[0.2vw] max-md:mt-2"
          />
        </label>
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
