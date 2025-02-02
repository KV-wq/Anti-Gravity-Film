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
      <h1 class="text-2xl font-bold mb-6">Управление товарами</h1>

      <div v-if="data" class="space-y-6">
        <!-- Заголовок страницы -->
        <div class="bg-white p-6 rounded-lg shadow">
          <h2 class="text-xl font-semibold mb-4">Заголовок страницы</h2>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >Заголовок (макс. 2 слова)</label
            >
            <input
              v-model="data.title"
              class="w-full p-2 border rounded"
              placeholder="Например: товарная линейка"
            />
          </div>
        </div>

        <!-- Товары -->
        <div class="bg-white p-6 rounded-lg shadow">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-xl font-semibold">Товары</h2>
            <button
              @click="addProduct"
              class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Добавить товар
            </button>
          </div>

          <div class="space-y-6">
            <div
              v-for="(product, index) in data.products"
              :key="product.id"
              class="border rounded-lg p-4"
            >
              <div class="flex justify-between items-start mb-4">
                <h3 class="text-lg font-medium">Товар {{ index + 1 }}</h3>
                <button
                  @click="removeProduct(index)"
                  class="text-red-600 hover:text-red-800"
                >
                  Удалить
                </button>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div
                  class="aspect-video bg-gray-100 rounded-lg overflow-hidden"
                >
                  <img
                    :src="product.image"
                    :alt="product.name"
                    class="w-full h-full object-cover"
                  />
                </div>

                <div class="space-y-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">
                      Изображение
                    </label>
                    <input
                      type="file"
                      :ref="(el) => (fileRefs[index] = el)"
                      class="hidden"
                      accept="image/*"
                      @change="(e) => handleFileChange(e, index)"
                    />
                    <button
                      @click="fileRefs[index]?.click()"
                      class="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      Заменить фото
                    </button>
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">
                      Название
                    </label>
                    <input
                      v-model="product.name"
                      class="w-full p-2 border rounded"
                    />
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">
                      Подзаголовок
                    </label>
                    <input
                      v-model="product.subtitle"
                      class="w-full p-2 border rounded"
                    />
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">
                      Цена
                    </label>
                    <input
                      v-model.number="product.price"
                      type="number"
                      class="w-full p-2 border rounded"
                    />
                  </div>
                </div>
              </div>
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

interface Product {
  id: string;
  image: string;
  name: string;
  subtitle: string;
  price: number;
}

interface ProductsData {
  title: string;
  products: Product[];
}

const router = useRouter();
const adminStore = useAdminStore();
const data = ref<ProductsData | null>(null);
const fileRefs = ref<HTMLInputElement[]>([]);

onMounted(async () => {
  const response = await fetch("/api/products");
  data.value = await response.json();
  document.body.style.overflowY = "scroll";
});

onUnmounted(() => {
  document.body.style.overflow = "hidden";
});

const handleFileChange = async (event: Event, index: number) => {
  const input = event.target as HTMLInputElement;
  if (!input.files?.length) return;

  const formData = new FormData();
  formData.append("file", input.files[0]);

  const response = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  });

  const result = await response.json();

  if (result.success && data.value) {
    data.value.products[index].image = result.path;
  }
};

const addProduct = () => {
  if (data.value) {
    data.value.products.push({
      id: Date.now().toString(),
      image: "/images/placeholder.jpg",
      name: "Новый товар",
      subtitle: "Подзаголовок",
      price: 0,
    });
  }
};

const removeProduct = (index: number) => {
  if (data.value) {
    data.value.products = data.value.products.filter((_, i) => i !== index);
  }
};

const saveChanges = async () => {
  await fetch("/api/products", {
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
