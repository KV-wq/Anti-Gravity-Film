<script setup lang="ts">
import { useModalStore } from "~/store/modalStore";

const store = useModalStore();
const router = useRouter();

const menuItems = [
  { name: "Главная", path: "/" },
  { name: "Подобрать цвет", path: "/choose-color" },
  { name: "Товарная линейка", path: "/products" },
  { name: "Видеообзор", path: "/video-review" },
  { name: "Контакты", action: store.showContacts },
];

const handleMenuClick = (item: (typeof menuItems)[0]) => {
  if (item.action) {
    item.action();
  } else {
    router.push(item.path);
  }
  store.hideMenu();
};
</script>

<template>
  <Transition name="slide">
    <div
      v-if="store.isMenuVisible"
      class="fixed inset-y-0 left-0 w-[40vw] max-sm:w-full bg-black z-50 overflow-hidden"
    >
      <!-- Кнопка закрытия -->
      <button
        @click="store.hideMenu"
        class="absolute p-2 w-[3.5vw] cursor-pointer right-[2vw] top-[2.2vw] max-sm:w-12 max-sm:top-6 max-sm:right-4"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>

      <!-- Меню -->
      <nav class="flex flex-col h-full pt-24 px-12">
        <button
          v-for="item in menuItems"
          :key="'path' in item ? item.path : item.name"
          @click="handleMenuClick(item)"
          class="text-white text-2xl lg:text-[2vw] font-nolimits mb-8 text-left hover:text-primary_light transition-colors"
          :class="{ '!text-secondary': item.path == useRoute().path }"
        >
          {{ item.name }}
        </button>
      </nav>
    </div>
  </Transition>
</template>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease-in-out;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(-100%);
}
</style>
