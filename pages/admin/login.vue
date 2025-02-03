<script setup lang="ts">
import { useAdminStore } from "../../store/adminStore";
const password = ref("");
const error = ref("");
const router = useRouter();
const adminStore = useAdminStore();
const config = useRuntimeConfig();

const handleLogin = () => {
  if (password.value === "DFm32r28") {
    const token = Math.random().toString(36).substring(2);
    adminStore.login(token);
    router.push("/admin");
  } else {
    error.value = "Неверный пароль";
  }
};

onMounted(() => {
  adminStore.checkAuth();
  if (adminStore.isAuthenticated) {
    router.push("/admin");
  }
});
</script>
<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center">
    <div class="max-w-md w-full p-8 bg-white rounded-lg shadow-md">
      <h2 class="text-3xl font-bold text-center text-gray-900">Админ-панель</h2>
      <form @submit.prevent="handleLogin" class="mt-8 space-y-6">
        <div>
          <label class="block text-sm font-medium text-gray-700">Пароль</label>
          <input
            v-model="password"
            class="mt-1 w-full px-3 py-2 border rounded-md text-gray-900 text-xl"
          />
        </div>
        <button
          type="submit"
          class="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Войти
        </button>
        <div v-if="error" class="text-red-500 text-center">{{ error }}</div>
      </form>
    </div>
  </div>
</template>
