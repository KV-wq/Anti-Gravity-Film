<script setup lang="ts">
import { useAdminStore } from "../../store/adminStore";
const router = useRouter();
const adminStore = useAdminStore();

definePageMeta({
  middleware: ["admin"],
});

const logout = () => {
  adminStore.logout();
  router.push("/admin/login");
};
</script>
<template>
  <div class="min-h-screen bg-gray-100 text-gray-800">
    <nav class="bg-white shadow-sm p-4">
      <div class="max-w-7xl mx-auto flex justify-between items-center">
        <h1
          class="text-xl font-bold cursor-pointer"
          @click="() => router.push('/admin')"
        >
          Админ-панель
        </h1>
        <button
          @click="logout"
          class="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
        >
          Выйти
        </button>
      </div>
    </nav>

    <div class="max-w-7xl mx-auto py-6 px-4">
      <div class="bg-white shadow rounded-lg p-6">
        <h2 class="text-xl font-semibold mb-4">Панель управления</h2>

        <div class="flex flex-col gap-5">
          <NuxtLink
            href="/admin/pages"
            class="bg-gray-100 rounded-md p-4 font-semibold text-lg"
            >Title и Description страниц</NuxtLink
          >
          <NuxtLink
            href="/admin/home"
            class="bg-gray-100 rounded-md p-4 font-semibold text-lg"
            >Главная страница</NuxtLink
          >
          <NuxtLink
            href="/admin/choose-color"
            class="bg-gray-100 rounded-md p-4 font-semibold text-lg"
            >Подбор цвета</NuxtLink
          >
          <NuxtLink
            href="/admin/products"
            class="bg-gray-100 rounded-md p-4 font-semibold text-lg"
            >Товарная линейка</NuxtLink
          >
          <NuxtLink
            href="/admin/video-review"
            class="bg-gray-100 rounded-md p-4 font-semibold text-lg"
            >Видеообзор</NuxtLink
          >
          <NuxtLink
            href="/admin/contacts"
            class="bg-gray-100 rounded-md p-4 font-semibold text-lg"
            >Контакты</NuxtLink
          >
        </div>
      </div>
    </div>
  </div>
</template>
