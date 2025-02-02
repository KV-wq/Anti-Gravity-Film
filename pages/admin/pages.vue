<script setup lang="ts">
import { useAdminStore } from "../../store/adminStore";
const router = useRouter();
const adminStore = useAdminStore();

interface Page {
  path: string;
  title: string;
  description: string;
}

interface Pages {
  [key: string]: Page;
}

const pages = ref<Pages | null>(null);

onMounted(async () => {
  const response = await fetch("/api/pages");
  pages.value = await response.json();
  document.body.style.overflowY = "scroll";
});

onUnmounted(() => {
  document.body.style.overflow = "hidden";
});

const saveChanges = async () => {
  await fetch("/api/pages", {
    method: "POST",
    body: JSON.stringify(pages.value),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

definePageMeta({
  middleware: ["admin"],
});
const logout = () => {
  adminStore.logout();
  router.push("/admin/login");
};
</script>

<template>
  <div class="min-h-screen bg-gray-100 text-gray-800 pb-8">
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
    <div class="max-w-4xl mx-auto mt-6">
      <h1 class="text-2xl font-bold mb-6">Управление страницами</h1>

      <div v-if="pages" class="space-y-4">
        <div
          v-for="(page, key) in pages"
          :key="key"
          class="bg-white p-4 rounded-lg shadow"
        >
          <h2 class="text-xl font-semibold mb-4">{{ page.title }}</h2>
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1"
                >Заголовок</label
              >
              <input
                v-model="pages[key].title"
                class="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1"
                >Описание</label
              >
              <textarea
                v-model="pages[key].description"
                rows="3"
                class="w-full p-2 border rounded"
              ></textarea>
            </div>
          </div>
        </div>
      </div>

      <button
        @click="saveChanges"
        class="mt-6 px-8 py-4 bg-indigo-600 text-white rounded hover:bg-indigo-700"
      >
        Сохранить изменения
      </button>
    </div>
  </div>
</template>
