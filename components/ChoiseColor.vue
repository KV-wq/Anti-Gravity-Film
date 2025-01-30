<script setup lang="ts">
const colors = [
  { id: "red", value: "bg-red-500" },
  { id: "orange", value: "bg-orange-500" },
  { id: "yellow", value: "bg-yellow-500" },
  { id: "green", value: "bg-green-500" },
  { id: "blue", value: "bg-blue-500" },
  { id: "purple", value: "bg-purple-500" },
  { id: "purple-dark", value: "bg-purple-900" },
];

const selectedColor = ref("bg-red-500");
</script>

<template>
  <div class="flex flex-col justify-end gap-[1.2vw] max-sm:gap-4">
    <h1
      class="text-[2.75vw] leading-[3.2vw] font-bold uppercase max-sm:text-2xl"
    >
      Марка Авто Пример
    </h1>

    <div class="w-full h-px bg-white"></div>

    <h2 class="text-[2vw] max-sm:text-xl">Подобрать цвет</h2>

    <select
      id="filter"
      class="px-4 py-5 max-sm:px-3 max-sm:py-3 w-full rounded bg-black text-white border text-lg border-white"
    >
      <option value="1" selected>Эксклюзивные</option>
      <option value="2">Матовые</option>
      <option value="3">Глянцевые</option>
    </select>

    <div class="grid grid-cols-5 w-full gap-4 max-sm:w-10/12">
      <label
        v-for="color in colors"
        :key="color.id"
        class="relative cursor-pointer"
      >
        <input
          type="radio"
          :value="color.value"
          v-model="selectedColor"
          :name="color.id"
          class="sr-only"
        />
        <div
          class="rounded-full size-[2.7vw] max-sm:size-10 transition-all duration-200"
          :class="[
            color.value,
            selectedColor === color.value
              ? 'ring-2 ring-secondary ring-offset-2 ring-offset-black'
              : '',
          ]"
        ></div>
      </label>
    </div>

    <Button
      class="font-bold text-white !text-[1.3vw] w-full h-[4.7vw] max-sm:h-[55px] max-sm:!text-base"
    >
      Выбрать
    </Button>
  </div>
</template>
