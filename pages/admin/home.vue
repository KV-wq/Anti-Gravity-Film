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
      <h1 class="text-2xl font-bold mb-6">Редактирование главной страницы</h1>

      <div v-if="data" class="space-y-6">
        <!-- Логотип -->
        <div class="bg-white p-6 rounded-lg shadow">
          <h2 class="text-xl font-semibold mb-4">Логотип</h2>
          <div class="space-y-4">
            <div class="w-40 h-40 bg-gray-100 rounded-lg overflow-hidden">
              <img
                :src="data.logoImage"
                alt="Логотип"
                class="w-full h-full object-contain"
              />
            </div>
            <div class="flex items-center gap-4">
              <input
                type="file"
                ref="logoFileRef"
                class="hidden"
                accept="image/*"
                @change="handleLogoChange"
              />
              <button
                @click="logoFileRef?.click()"
                class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Заменить логотип
              </button>
            </div>
          </div>
        </div>

        <!-- Текстовый контент -->
        <div class="bg-white p-6 rounded-lg shadow">
          <h2 class="text-xl font-semibold mb-4">Текстовый контент</h2>
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1"
                >Заголовок (макс. 2 слова)</label
              >
              <input
                v-model="data.hero.title"
                class="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1"
                >Описание</label
              >
              <textarea
                v-model="data.hero.description"
                rows="3"
                class="w-full p-2 border rounded"
              ></textarea>
            </div>
          </div>
        </div>

        <!-- Слайдер -->
        <div class="bg-white p-6 rounded-lg shadow">
          <h2 class="text-xl font-semibold mb-4">Изображения для слайдера</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div
              v-for="(slide, index) in data.slider"
              :key="index"
              class="space-y-2"
            >
              <div class="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                <img
                  :src="slide.image"
                  :alt="'Слайд ' + (index + 1)"
                  class="w-full h-full object-cover"
                />
              </div>
              <div class="flex gap-2">
                <input
                  type="file"
                  :ref="(el) => (fileRefs[index] = el)"
                  class="hidden"
                  accept="image/*"
                  @change="(e) => handleFileChange(e, index)"
                />
                <button
                  @click="fileRefs[index]?.click()"
                  class="flex-1 px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Заменить
                </button>
                <button
                  @click="removeSlide(index)"
                  class="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Удалить
                </button>
              </div>
            </div>

            <div
              v-if="data.slider.length < 5"
              class="aspect-video bg-gray-100 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-200"
              @click="addNewSlide"
            >
              <span class="text-4xl text-gray-400">+</span>
            </div>
          </div>
        </div>

        <!-- Видео превью -->
        <div class="bg-white p-6 rounded-lg shadow mt-6">
          <h2 class="text-xl font-semibold mb-4">Видео превью</h2>
          <div class="space-y-4">
            <div class="aspect-video bg-gray-100 rounded-lg overflow-hidden">
              <video
                :src="data?.previewVideo"
                controls
                class="w-full h-full object-contain"
              ></video>
            </div>
            <div class="flex items-center gap-4">
              <input
                type="file"
                ref="videoFileRef"
                class="hidden"
                accept="video/mp4,video/mov,video/webm"
                @change="handleVideoChange"
              />
              <button
                @click="videoFileRef?.click()"
                class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Заменить видео
              </button>
              <p v-if="uploadProgress" class="text-sm text-gray-600">
                Загрузка: {{ uploadProgress }}%
              </p>
            </div>
            <p class="text-sm text-gray-500">
              Поддерживаемые форматы: MP4, MOV, WEBM. Максимальный размер: 100MB
            </p>
          </div>
        </div>

        <button
          @click="saveChanges"
          class="px-8 py-4 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          Сохранить изменения
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAdminStore } from "../../store/adminStore";

const router = useRouter();
const adminStore = useAdminStore();

interface HomeData {
  hero: {
    title: string;
    description: string;
  };
  slider: {
    image: string;
  }[];
  previewVideo: string;
  logoImage: string;
}

const logoFileRef = ref<HTMLInputElement | null>(null);
const videoFileRef = ref<HTMLInputElement | null>(null);
const uploadProgress = ref<number>(0);
const data = ref<HomeData | null>(null);
const fileRefs = ref<HTMLInputElement[]>([]);

onMounted(async () => {
  const response = await fetch("/api/home");
  data.value = await response.json();
  document.body.style.overflowY = "scroll";
});

onUnmounted(() => {
  document.body.style.overflow = "hidden";
});

const handleLogoChange = async (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (!input.files?.length) return;

  const formData = new FormData();
  formData.append("file", input.files[0]);

  try {
    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const result = await response.json();

    if (result.success && data.value) {
      data.value.logoImage = result.path;
    } else {
      alert(result.error || "Ошибка при загрузке логотипа");
    }
  } catch (error) {
    alert("Ошибка при загрузке логотипа");
    console.error(error);
  }
};

const handleVideoChange = async (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (!input.files?.length) return;

  const file = input.files[0];

  if (file.size > 100 * 1024 * 1024) {
    alert("Файл слишком большой. Максимальный размер: 100MB");
    return;
  }

  const formData = new FormData();
  formData.append("file", file);

  try {
    uploadProgress.value = 0;
    const response = await fetch("/api/upload-video", {
      method: "POST",
      body: formData,
    });

    const result = await response.json();

    if (result.success && data.value) {
      data.value.previewVideo = result.path;
      uploadProgress.value = 100;
      setTimeout(() => {
        uploadProgress.value = 0;
      }, 2000);
    } else {
      alert(result.error || "Ошибка при загрузке видео");
    }
  } catch (error) {
    alert("Ошибка при загрузке видео");
    console.error(error);
  }
};

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
    data.value.slider[index].image = result.path;
  }
};

const removeSlide = (index: number) => {
  if (data.value) {
    data.value.slider = data.value.slider.filter((_, i) => i !== index);
  }
};

const addNewSlide = () => {
  if (data.value && data.value.slider.length < 5) {
    data.value.slider.push({ image: "/images/placeholder.svg" });
  }
};

const saveChanges = async () => {
  await fetch("/api/home", {
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
