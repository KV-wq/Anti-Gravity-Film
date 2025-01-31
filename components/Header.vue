<script setup lang="ts">
import { useModalStore } from "~/store/modalStore";

const route = useRoute();

const currentPageTitle = computed(() => {
  switch (route.path) {
    case "/choose-color":
      return "Подобрать цвет";
    case "/products":
      return "Товарная линейка";
    case "/video-review":
      return "Видеообзор";
    default:
      return "";
  }
});
</script>

<template>
  <header class="relative mx-[5vw] mt-[3vw] max-sm:mt-5 z-10">
    <img
      src="../assets/images/icons/burger.svg"
      alt="menu"
      class="w-[3.5vw] max-sm:w-11 max-[330px]:w-8 absolute max-sm:right-0"
    />
    <h2
      class="font-nolimits text-[4vw] leading-10 absolute left-1/2 sm:-translate-x-1/2 max-lg:!leading-5 max-sm:text-6xl max-[410px]:text-5xl max-sm:left-0"
    >
      логотип
    </h2>
    <Button
      @click="useModalStore().showContacts()"
      class="w-[15vw] h-[3.5vw] !text-[1.1vw] absolute right-0 max-sm:hidden"
      >контакты</Button
    >
    <p
      class="text-[1.2vw] top-[4.5vw] absolute tracking-wide max-sm:text-base max-sm:top-12"
    >
      <span class="underline text-secondary"
        ><NuxtLink href="/">Главная</NuxtLink></span
      >&nbsp; / &nbsp;{{ currentPageTitle }}
    </p>
  </header>
</template>
