import { defineStore } from "pinia";
import { ref } from "vue";

export const useCarStore = defineStore("car", () => {
  const selectedCar = ref({
    id: 2,
    image: "/images/car-2.svg",
    code: "TPU-001S",
    name: "Glossy Swan White (SS)",
  });

  const setSelectedCar = (car: any) => {
    selectedCar.value = car;
  };

  return {
    selectedCar,
    setSelectedCar,
  };
});
