import { defineStore } from "pinia";
import { ref } from "vue";
import type { Color } from "../types/color";

export const useCarStore = defineStore("car", () => {
  const selectedCategory = ref("3");
  const selectedColor = ref("");
  const selectedCar = ref<Color | null>(null);

  const setSelectedCategory = (category: string) => {
    selectedCategory.value = category;
  };

  const setSelectedColor = (colorName: string) => {
    selectedColor.value = colorName;
  };

  const setSelectedCar = (car: Color) => {
    selectedCar.value = car;
  };

  return {
    selectedCategory,
    selectedColor,
    selectedCar,
    setSelectedCategory,
    setSelectedColor,
    setSelectedCar,
  };
});
