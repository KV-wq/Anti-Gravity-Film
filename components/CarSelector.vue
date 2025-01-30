// components/CarSelector.vue
<script setup lang="ts">
import { ref } from "vue";

const cars = [
  {
    id: 1,
    code: "TPU-014S",
    name: "Beetroot",
    suffix: "Purple (SS)",
    image: "/images/car-3.svg",
    position: {
      container: "right-[11vw] top-[2.7vw] max-sm:right-16 max-sm:-top-2",
      text: "-right-[2.3vw] top-[3.5vw] max-sm:right-[14px] max-sm:text-[8px] max-sm:top-0.5",
    },
  },
  {
    id: 2,
    code: "TPU-001S",
    name: "Glossy Swan",
    suffix: "White (SS)",
    image: "/images/car-2.svg",
    position: {
      container: "right-[3vw] top-[17vw] max-sm:right-2 max-sm:top-[85px]",
      text: "-right-[12vw] top-[18vw] max-sm:-right-[47px] max-sm:text-[8px] max-sm:top-[97px]",
    },
  },
  {
    id: 3,
    code: "PU-015S",
    name: "Lake Blue",
    suffix: "",
    image: "/images/car-4.svg",
    position: {
      container: "right-[11vw] bottom-[2.5vw] max-sm:right-16 max-sm:bottom-0",
      text: "right-[4vw] bottom-[3.4vw] max-sm:right-[18px] max-sm:text-[8px] max-sm:bottom-5",
    },
  },
];

const selectedCar = ref(2);
</script>

<template>
  <div>
    <div v-for="car in cars" :key="car.id">
      <div
        class="size-[5.5vw] rounded-full bg-white border-2 absolute pt-[1vw] max-sm:pt-2 max-sm:size-16"
        :class="[
          car.position.container,
          selectedCar === car.id ? 'border-secondary' : '',
        ]"
      >
        <label class="cursor-pointer">
          <input
            type="radio"
            :value="car.id"
            v-model="selectedCar"
            :name="'car-' + car.id"
            class="sr-only"
          />
          <img
            :src="car.image"
            :alt="car.name"
            class="size-[5.2vw] max-sm:size-16"
          />
        </label>
      </div>
      <p class="text-[1.2vw] absolute" :class="car.position.text">
        {{ car.code }} <br />
        {{ car.name }} <br class="sm:hidden" />
        {{ car.suffix }}
      </p>
    </div>
  </div>
</template>

<style scoped>
input:focus-visible + img {
  outline: 2px solid #4caf50;
  outline-offset: 2px;
}
</style>
