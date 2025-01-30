<script setup lang="ts">
import { useModalStore } from "~/store/modalStore";

const props = defineProps<{
  second?: boolean;
}>();

const order = () => {
  useModalStore().setSelectedFilm("Наименование товара");
  useModalStore().showForm();
};
</script>

<template>
  <div class="flex flex-col gap-[0.9vw] w-[20vw] max-sm:w-[60vw] max-sm:gap-2">
    <img
      src="../assets/images/test/film-1.svg"
      alt="film"
      v-if="!second"
      class="w-full"
    />
    <img
      src="../assets/images/test/film-2.svg"
      alt="film"
      v-else
      class="w-full"
    />

    <h2
      class="uppercase text-[1.3vw] leading-[1.5vw] font-semibold max-sm:text-sm"
    >
      наименование товара <br />
      здесь пример текста
    </h2>

    <p class="text-[1.5vw] max-sm:text-lg">5 500 ₽</p>

    <Button
      class="w-full h-[4vw] !text-[1.2vw] max-sm:h-12 max-sm:!text-base"
      @click="order"
      >заказать</Button
    >
  </div>
</template>
