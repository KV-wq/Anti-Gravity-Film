<script setup lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, type Swiper as SwiperType } from "swiper/modules";
import "swiper/css";

const { data: productsData } = await useFetch("/api/products");

const titleWords = computed(() => productsData.value?.title.split(" ") || []);

const swiperModules = [Navigation];
const isBeginning = ref(true);
const isEnd = ref(false);

const onSwiper = (swiper: SwiperType) => {
  isBeginning.value = swiper.isBeginning;
  isEnd.value = swiper.isEnd;
};

const onSlideChange = (swiper: SwiperType) => {
  isBeginning.value = swiper.isBeginning;
  isEnd.value = swiper.isEnd;
};

const swiperOptions = {
  slidesPerView: 4,
  spaceBetween: 20,
  navigation: {
    nextEl: ".arrow-right",
    prevEl: ".arrow-left",
  },
  breakpoints: {
    320: {
      slidesPerView: 1.5,
      spaceBetween: 10,
    },
    640: {
      slidesPerView: 4,
      spaceBetween: 20,
    },
  },
};
</script>

<template>
  <div>
    <div class="flex justify-between items-end max-sm:mb-4">
      <h1 class="font-nolimits text-[3.5vw] max-sm:text-4xl">
        {{ titleWords[0] }} <br class="sm:hidden" />{{ titleWords[1] }}
      </h1>
      <div class="flex gap-[2vw] -translate-y-[1vw] max-sm:hidden">
        <Arrow class="w-[5.5vw] arrow-left" :active="!isBeginning" />
        <Arrow right class="w-[5.5vw] arrow-right" :active="!isEnd" />
      </div>
    </div>

    <Swiper
      :modules="swiperModules"
      v-bind="swiperOptions"
      class="mt-[1vw]"
      @swiper="onSwiper"
      @slideChange="onSlideChange"
    >
      <SwiperSlide v-for="product in productsData.products" :key="product.id">
        <ProductCard v-bind="product" />
      </SwiperSlide>
    </Swiper>

    <div class="flex gap-5 -translate-y-[1vw] sm:hidden max-sm:mt-14">
      <Arrow class="w-16 arrow-left" :active="!isBeginning" />
      <Arrow right class="w-16 arrow-right" :active="!isEnd" />
    </div>
  </div>
</template>
