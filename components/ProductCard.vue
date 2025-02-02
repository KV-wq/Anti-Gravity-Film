<script setup lang="ts">
import { useModalStore } from "~/store/modalStore";

interface ProductProps {
  image: string;
  name: string;
  subtitle: string;
  price: number;
}

const props = defineProps<ProductProps>();

const order = () => {
  useModalStore().setSelectedFilm(props.name);
  useModalStore().showForm();
};
</script>

<template>
  <div class="flex flex-col gap-[0.9vw] w-[20vw] max-sm:w-[60vw] max-sm:gap-2">
    <img :src="image" :alt="name" class="w-full" />

    <h2
      class="uppercase text-[1.3vw] leading-[1.5vw] font-semibold max-sm:text-sm"
    >
      {{ name }}
    </h2>
    <h3
      class="uppercase text-[1.3vw] leading-[0vw] max-sm:leading-[3px] font-semibold max-sm:text-sm"
    >
      {{ subtitle }}
    </h3>

    <p class="text-[1.5vw] max-sm:text-lg mt-[0.75vw] max-sm:mt-2">
      {{ price.toLocaleString() }} ₽
    </p>

    <Button
      class="w-full h-[4vw] !text-[1.2vw] max-sm:h-12 max-sm:!text-base"
      @click="order"
    >
      заказать
    </Button>
  </div>
</template>
