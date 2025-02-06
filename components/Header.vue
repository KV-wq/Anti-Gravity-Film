<script setup lang="ts">
import { useModalStore } from "~/store/modalStore";
const { data: homeData } = await useFetch("/api/home");

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
      class="w-[3.5vw] max-sm:w-11 max-[330px]:w-8 absolute max-sm:right-0 cursor-pointer"
      @click="useModalStore().showMenu()"
    />
    <NuxtLink href="/">
      <img
        :src="homeData.logoImage"
        class="cursor-pointer active:scale-95 transition-transform h-[7vw] sm:-translate-y-[1.5vw] absolute left-1/2 sm:-translate-x-1/2 -translate-y-2 max-sm:h-14 w-auto max-sm:left-0"
      />
    </NuxtLink>
    <Button
      @click="useModalStore().showContacts()"
      class="w-[15vw] h-[3.5vw] !text-[1.1vw] absolute right-0 max-sm:hidden"
      >контакты</Button
    >
    <p
      class="text-[1.2vw] top-[4.5vw] absolute tracking-wide max-sm:text-base max-sm:top-14"
    >
      <span class="underline text-secondary"
        ><NuxtLink href="/">Главная</NuxtLink></span
      >&nbsp; / &nbsp;{{ currentPageTitle }}
    </p>
  </header>
</template>
