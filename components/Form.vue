<script setup lang="ts">
import { useModalStore } from "~/store/modalStore";

const formData = ref({
  name: "",
  phone: "",
  filmName: useModalStore().selectedFilm,
});
</script>

<template>
  <div
    class="fixed inset-0 flex items-center justify-center z-40"
    @click="useModalStore().closeAll()"
  >
    <div
      class="w-full md:max-w-[40vw] mx-4 max-sm:p-6 sm:p-[3.5vw] max-sm:py-10 bg-[#141414] border-[0.5px] border-gray-600"
      @click.stop
    >
      <h2
        class="text-white text-2xl font-bold text-center mb-2 md:mb-[0.6vw] md:text-[1.75vw]"
      >
        ЗАКАЗАТЬ ПЛЕНКУ
      </h2>

      <p
        class="text-gray-300 text-center text-xs mb-6 md:text-[1.2vw] md:leading-[1.5vw]"
      >
        Оставьте ваши данные и мы свяжемся<br />
        с вами в ближайшее время
      </p>

      <form class="space-y-2 md:space-y-[0.5vw]">
        <input
          v-model="formData.name"
          required
          type="text"
          placeholder="Ваше имя"
          class="w-full bg-transparent border border-gray-600 p-3 md:text-[1vw] md:p-[0.9vw] text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
        />

        <input
          v-model="formData.phone"
          required
          type="tel"
          placeholder="Номер вашего телефона"
          class="w-full bg-transparent border border-gray-600 p-3 md:text-[1vw] md:p-[0.9vw] text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
        />

        <input
          v-model="formData.filmName"
          placeholder="Наименование товара"
          type="text"
          class="w-full bg-transparent border border-gray-600 p-3 md:text-[1vw] md:p-[0.9vw] text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
        />

        <Button
          class="!h-[4vw] w-full max-sm:!h-14 !text-[1.25vw] max-md:!text-base !mt-4 md:!mt-[1vw]"
          type="submit"
          >заказать</Button
        >
      </form>
    </div>
  </div>
</template>
