<script setup lang="ts">
import { useModalStore } from "~/store/modalStore";
const { data: contacts } = await useFetch("/api/contacts");
</script>

<template>
  <div
    class="h-screen w-[45vw] max-sm:w-full right-0 top-0 fixed z-30 bg-black"
  >
    <svg
      class="absolute w-[3vw] cursor-pointer right-[2vw] top-[2.2vw] max-sm:w-9 max-sm:top-6 max-sm:right-4"
      @click="useModalStore().hideContacts()"
      viewBox="0 0 24 24"
      fill="none"
      stroke="white"
      stroke-width="1"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>

    <div class="w-[80%] mt-[1vw] mx-auto max-sm:w-[90%] max-sm:mt-4">
      <h2 class="font-nolimits text-[3.5vw] mb-[0.5vw] max-sm:text-4xl">
        контакты
      </h2>
      <p
        class="font-extralight text-[1.1vw] mt-[0.5vw] max-sm:text-lg max-sm:mt-2"
      >
        Телефон:
      </p>
      <p class="text-[1.2vw] max-sm:text-base">{{ contacts.phone }}</p>
      <p
        class="font-extralight text-[1.1vw] mt-[0.5vw] max-sm:text-lg max-sm:mt-2"
      >
        E-mail:
      </p>
      <p class="text-[1.2vw] max-sm:text-base">{{ contacts.email }}</p>
      <p
        class="font-extralight text-[1.1vw] mt-[0.5vw] max-sm:text-lg max-sm:mt-2"
      >
        Адрес:
      </p>
      <p class="text-[1.2vw] max-sm:text-sm">{{ contacts.address }}</p>

      <div class="flex gap-[0.4vw] my-[1vw] max-sm:gap-1 max-sm:my-5">
        <a :href="contacts.social.instagram" target="_blank">
          <img
            src="../assets/images/social-icons/instagram.svg"
            alt="instagram"
            class="bg-[#363636] p-[0.75vw] rounded-full size-[2.75vw] max-sm:p-2 max-sm:size-9"
          />
        </a>
        <a :href="contacts.social.vk" target="_blank">
          <img
            src="../assets/images/social-icons/vk.svg"
            alt="vk"
            class="bg-[#363636] p-[0.65vw] rounded-full size-[2.75vw] max-sm:p-1 max-sm:size-9"
          />
        </a>
        <a :href="contacts.social.facebook" target="_blank">
          <img
            src="../assets/images/social-icons/facebook.svg"
            alt="facebook"
            class="bg-[#363636] p-[0.65vw] rounded-full size-[2.75vw] max-sm:p-1 max-sm:size-9"
          />
        </a>
        <a :href="contacts.social.youtube" target="_blank">
          <img
            src="../assets/images/social-icons/youtube.svg"
            alt="youtube"
            class="bg-[#363636] p-[0.75vw] rounded-full size-[2.75vw] max-sm:p-2 max-sm:size-9"
          />
        </a>
        <a :href="contacts.social.viber" target="_blank">
          <img
            src="../assets/images/social-icons/viber.svg"
            alt="viber"
            class="bg-[#363636] p-[0.75vw] rounded-full size-[2.75vw] max-sm:p-2 max-sm:size-9"
          />
        </a>
      </div>

      <Button
        @click="useModalStore().showForm()"
        class="!text-[1.1vw] !font-light w-[17vw] h-[4vw] mt-[0.4vw] max-sm:w-52 max-sm:h-12 max-sm:!text-sm"
        >обратный звонок</Button
      >
    </div>
    <Map />
  </div>
</template>
