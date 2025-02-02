<script setup lang="ts">
import { Color } from "~/types/color";
import { useAdminStore } from "../../store/adminStore";

const router = useRouter();
const adminStore = useAdminStore();
const data = ref<{ colors: Color[] } | null>(null);
const title = ref("");

const newColor = ref({
  id: "",
  name: "",
  code: "",
  value: "",
  category: "1",
  carImage: "",
  cardImage: "",
});

// Для группировки цветов по категориям
const groupedColors = computed(() => {
  if (!data.value?.colors) return {};

  return data.value.colors.reduce((groups: Record<string, Color[]>, color) => {
    const category = color.category;
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(color);
    return groups;
  }, {});
});

const categoryNames = {
  "1": "Эксклюзивные",
  "2": "Матовые",
  "3": "Глянцевые",
};

onMounted(async () => {
  const response = await fetch("/api/colors");
  data.value = await response.json();
  title.value = data.value.title;
  document.body.style.overflowY = "scroll";
});

onUnmounted(() => {
  document.body.style.overflow = "hidden";
});

const handleFileUpload = async (event: Event, type: "car" | "card") => {
  const input = event.target as HTMLInputElement;
  if (!input.files?.length) return;

  const formData = new FormData();
  formData.append("file", input.files[0]);

  const response = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  });

  const result = await response.json();

  if (result.success) {
    if (type === "car") {
      newColor.value.carImage = result.path;
    } else {
      newColor.value.cardImage = result.path;
    }
  }
};

const addColor = () => {
  if (
    data.value &&
    newColor.value.id &&
    newColor.value.code &&
    newColor.value.carImage &&
    newColor.value.cardImage
  ) {
    data.value.colors.push({ ...newColor.value });
    // Сброс формы
    newColor.value = {
      id: "",
      name: "",
      code: "",
      value: "",
      category: "1",
      carImage: "",
      cardImage: "",
    };
  }
};

const removeColor = (colorId: string) => {
  if (data.value) {
    data.value.colors = data.value.colors.filter(
      (color) => color.id !== colorId
    );
  }
};

const saveChanges = async () => {
  data.value.title = title.value;
  try {
    const response = await fetch("/api/colors", {
      method: "POST",
      body: JSON.stringify(data.value),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();
    if (result.success) {
      alert("Изменения сохранены");
    }
  } catch (error) {
    alert("Ошибка при сохранении");
  }
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
          class="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
        >
          Выйти
        </button>
      </div>
    </nav>

    <div class="max-w-5xl mx-auto mt-6 px-4">
      <h1 class="text-2xl font-bold mb-6">Управление цветами</h1>

      <div class="bg-white p-6 rounded-lg shadow mb-4">
        <p class="ml-1.5 font-semibold">марка авто (заголовок)</p>
        <input
          type="text"
          v-model="title"
          class="w-full p-1 text-lg uppercase"
        />
      </div>

      <!-- Форма добавления -->
      <div class="bg-white p-6 rounded-lg shadow mb-6">
        <h2 class="text-xl font-semibold mb-4">Добавить новый цвет</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >ID</label
            >
            <input
              v-model="newColor.id"
              class="w-full p-2 border rounded"
              placeholder="silver-chrome"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >Код</label
            >
            <input
              v-model="newColor.code"
              class="w-full p-2 border rounded"
              placeholder="TPU-001S"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >Название</label
            >
            <input
              v-model="newColor.name"
              class="w-full p-2 border rounded"
              placeholder="Silver Chrome"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >CSS класс цвета</label
            >
            <input
              v-model="newColor.value"
              class="w-full p-2 border rounded"
              placeholder="bg-zinc-300"
            />
            <div
              :class="[newColor.value, 'w-6 h-6 rounded-full mt-2 border']"
              title="Предпросмотр цвета"
            ></div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >Категория</label
            >
            <select
              v-model="newColor.category"
              class="w-full p-2 border rounded"
            >
              <option value="1">Эксклюзивные</option>
              <option value="2">Матовые</option>
              <option value="3">Глянцевые</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >Фото автомобиля</label
            >
            <input
              type="file"
              @change="(e) => handleFileUpload(e, 'car')"
              accept="image/*"
              class="w-full p-2 border rounded"
            />
            <img
              v-if="newColor.carImage"
              :src="newColor.carImage"
              class="mt-2 h-32 object-contain bg-gray-50 rounded"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >Карточка цвета</label
            >
            <input
              type="file"
              @change="(e) => handleFileUpload(e, 'card')"
              accept="image/*"
              class="w-full p-2 border rounded"
            />
            <img
              v-if="newColor.cardImage"
              :src="newColor.cardImage"
              class="mt-2 h-32 object-contain bg-gray-50 rounded"
            />
          </div>
        </div>

        <button
          @click="addColor"
          class="mt-6 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Добавить цвет
        </button>
      </div>

      <!-- Список цветов по категориям -->
      <div v-if="data" class="space-y-6">
        <div
          v-for="(colors, category) in groupedColors"
          :key="category"
          class="bg-white p-6 rounded-lg shadow"
        >
          <h2 class="text-xl font-semibold mb-4">
            {{ categoryNames[category as keyof typeof categoryNames] }}
          </h2>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div
              v-for="color in colors"
              :key="color.id"
              class="relative p-4 border rounded-lg hover:border-gray-400 transition-colors"
            >
              <button
                @click="removeColor(color.id)"
                class="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full hover:bg-red-600"
                title="Удалить цвет"
              >
                ×
              </button>

              <div class="flex items-center gap-3 mb-3">
                <div
                  :class="[color.value, 'w-6 h-6 rounded-full border']"
                ></div>
                <div>
                  <h3 class="font-medium">{{ color.name }}</h3>
                  <p class="text-sm text-gray-500">{{ color.id }}</p>
                </div>
                <p class="text-sm text-gray-500">{{ color.code }}</p>
              </div>

              <div class="grid grid-cols-2 gap-4">
                <div>
                  <p class="text-sm text-gray-500 mb-1">Авто</p>
                  <img
                    :src="color.carImage"
                    :alt="color.name"
                    class="w-full h-24 object-contain bg-gray-50 rounded"
                  />
                </div>
                <div>
                  <p class="text-sm text-gray-500 mb-1">Карточка</p>
                  <img
                    :src="color.cardImage"
                    :alt="color.name"
                    class="w-full h-24 object-contain bg-gray-50 rounded"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Кнопка сохранения -->
      <button
        @click="saveChanges"
        class="mt-6 w-full px-8 py-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium"
      >
        Сохранить изменения
      </button>
    </div>
  </div>
</template>
