<script setup>
import { useModalStore } from "~/store/modalStore";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation } from "swiper/modules";
const { data: homeData } = await useFetch("/api/home");
import "swiper/css";

const slides = homeData.value.slider;

const currentIndex = ref(1);
const totalSlides = slides.length;

const swiper = ref(null);
const isLeftActive = ref(false);
const isRightActive = ref(true);

const updateNavigation = () => {
  if (!swiper.value) return;
  isLeftActive.value = !swiper.value.isBeginning;
  isRightActive.value = !swiper.value.isEnd;
};

const handleNext = () => {
  swiper.value?.slideNext();
};

const handlePrev = () => {
  swiper.value?.slidePrev();
};

const onSwiper = (swiperInstance) => {
  swiper.value = swiperInstance;
  updateNavigation();
};

const onSlideChange = () => {
  if (!swiper.value) return;
  currentIndex.value = swiper.value.realIndex + 1;
  updateNavigation();
};
</script>

<template>
  <div class="relative min-h-screen w-full bg-black">
    <Swiper
      :modules="[Navigation]"
      @swiper="onSwiper"
      @slideChange="onSlideChange"
      :slides-per-view="1"
      :mousewheel="false"
      :speed="700"
      :space-between="0"
      class="sm:pointer-events-none !absolute left-0 max-sm:w-full w-7/12 h-screen max-sm:h-[40vh] !z-0"
    >
      <SwiperSlide v-for="(slide, index) in slides" :key="index">
        <img
          :src="slide.image"
          :alt="'Car ' + (index + 1)"
          class="w-full h-full object-cover object-left"
        />
      </SwiperSlide>
    </Swiper>

    <NuxtLink href="/choose-color">
      <Button
        is-vertical
        class="absolute left-0 top-1/2 max-sm:top-[24%] -translate-y-[50%] -translate-x-[35%] !w-[17vw] max-sm:!w-44 max-sm:h-14 h-[5.5vw] !text-[1.3vw] max-sm:!text-lg"
        >выбрать цвет</Button
      >
    </NuxtLink>

    <img
      :src="homeData.logoImage"
      class="absolute max-sm:left-[30vw] sm:top-9 max-sm:top-2 left-[25vw] h-[9vw] max-sm:h-20 w-auto"
    />

    <img
      @click="useModalStore().showMenu()"
      src="../assets/images/icons/burger.svg"
      alt="menu"
      class="absolute top-20 sm:left-20 w-[4vw] max-sm:right-5 max-sm:top-5 max-sm:w-11 max-[350px]:w-8 max-lg:top-[3.75rem] cursor-pointer"
    />

    <div
      class="w-5/12 flex flex-col justify-between pb-[3.5vw] max-sm:pb-[4vw] absolute pl-[4.7vw] pt-[3.5vw] pr-[3vw] max-sm:pr-0 max-sm:pl-[7vw] max-sm:pt-[3.75rem] right-0 bottom-0 h-screen bg-gradient-to-t from-primary_light to-primary_dark max-sm:w-full max-sm:h-[60%]"
    >
      <div>
        <h1
          class="font-nolimits text-[3.5vw] max-sm:text-[9vw] max-sm:leading-[7.5vw] leading-[3vw]"
        >
          {{ homeData.hero.title.split(" ")[0] }}<br />
          {{ homeData.hero.title.split(" ")[1] }}
        </h1>
        <p
          class="text-[1.20vw] max-sm:text-[3.7vw] font-normal max-w-[84%] mt-[2vw] max-sm:mt-3 max-sm:max-w-[94%]"
        >
          {{ homeData.hero.description }}
        </p>
      </div>

      <div>
        <div
          class="flex justify-start gap-[2vw] max-sm:gap-[4vw] mb-[3vw] max-sm:mb-4 mt-3"
        >
          <NuxtLink href="/video-review">
            <Button
              outline
              class="w-[15vw] max-sm:w-[45vw] max-sm:h-[15vw] max-sm:!text-[4vw] h-[4vw] !text-[1.2vw]"
            >
              подробнее
            </Button>
          </NuxtLink>

          <img
            src="../assets/images/icons/play.svg"
            alt="play"
            class="h-[4vw] max-sm:h-[15vw] cursor-pointer"
            @click="useModalStore().showVideo()"
          />
        </div>

        <div
          class="flex justify-start gap-[2.5vw] max-sm:gap-[8vw] text-[1.15vw] max-sm:text-[4.2vw] underline font-semibold mb-[4vw] max-sm:mb-5"
        >
          <p class="cursor-pointer" @click="useModalStore().showContacts()">
            Наши контакты
          </p>
          <NuxtLink href="products">Товарная линейка</NuxtLink>
        </div>

        <div class="flex items-center justify-between mr-[1vw] max-sm:mr-[8vw]">
          <p class="font-manrope tracking-wider text-[1.2vw] max-sm:text-[5vw]">
            {{ String(currentIndex).padStart(2, "0") }} /
            {{ String(totalSlides).padStart(2, "0") }}
          </p>
          <div class="flex gap-6">
            <Arrow
              class="w-[6vw] max-sm:w-20 arrow-left cursor-pointer"
              :active="isLeftActive"
              @click="handlePrev"
            />
            <Arrow
              right
              class="w-[6vw] max-sm:w-20 arrow-right cursor-pointer"
              :active="isRightActive"
              @click="handleNext"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
:deep(.swiper-slide) {
  opacity: 0.2;
  transition: opacity ease-out 1s;
}

:deep(.swiper-slide-active) {
  opacity: 0.7;
}
</style>
