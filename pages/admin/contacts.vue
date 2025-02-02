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

    <div class="max-w-2xl mx-auto mt-6">
      <h1 class="text-2xl font-bold mb-6">Управление контактами</h1>

      <div v-if="data" class="bg-white p-6 rounded-lg shadow space-y-6">
        <!-- Основные контакты -->
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >Телефон</label
            >
            <input v-model="data.phone" class="w-full p-2 border rounded" />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >E-mail</label
            >
            <input v-model="data.email" class="w-full p-2 border rounded" />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >Адрес</label
            >
            <input v-model="data.address" class="w-full p-2 border rounded" />
          </div>
        </div>

        <!-- Социальные сети -->
        <div>
          <h2 class="text-lg font-semibold mb-4">Ссылки на социальные сети</h2>
          <div class="space-y-4">
            <div v-for="(value, key) in data.social" :key="key">
              <label
                class="block text-sm font-medium text-gray-700 mb-1 capitalize"
              >
                {{ key }}
              </label>
              <input
                v-model="data.social[key]"
                class="w-full p-2 border rounded"
              />
            </div>
          </div>
        </div>

        <button
          @click="saveChanges"
          class="w-full px-8 py-4 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          Сохранить изменения
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAdminStore } from "../../store/adminStore";

interface Social {
  instagram: string;
  vk: string;
  facebook: string;
  youtube: string;
  viber: string;
}

interface ContactsData {
  phone: string;
  email: string;
  address: string;
  social: Social;
}

const router = useRouter();
const adminStore = useAdminStore();
const data = ref<ContactsData | null>(null);

onMounted(async () => {
  const response = await fetch("/api/contacts");
  data.value = await response.json();
  document.body.style.overflowY = "scroll";
});

onUnmounted(() => {
  document.body.style.overflow = "hidden";
});

const saveChanges = async () => {
  await fetch("/api/contacts", {
    method: "POST",
    body: JSON.stringify(data.value),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const logout = () => {
  adminStore.logout();
  router.push("/admin/login");
};

definePageMeta({
  middleware: ["admin"],
});
</script>
