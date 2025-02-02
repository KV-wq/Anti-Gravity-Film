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
      <h1 class="text-2xl font-bold mb-6">Управление страницей видеообзора</h1>

      <div v-if="data" class="bg-white p-6 rounded-lg shadow space-y-6">
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >Заголовок</label
            >
            <input v-model="data.title" class="w-full p-2 border rounded" />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >Описание</label
            >
            <textarea
              v-model="data.description"
              rows="4"
              class="w-full p-2 border rounded"
            ></textarea>
          </div>

          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700">Видео</label>
            <div class="aspect-video bg-gray-100 rounded-lg overflow-hidden">
              <video
                :src="data.videoSrc"
                controls
                class="w-full h-full object-contain"
              ></video>
            </div>

            <div class="flex items-center gap-4 mt-4">
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

interface VideoReviewData {
  title: string;
  description: string;
  videoSrc: string;
}

const router = useRouter();
const adminStore = useAdminStore();
const data = ref<VideoReviewData | null>(null);
const videoFileRef = ref<HTMLInputElement | null>(null);
const uploadProgress = ref<number>(0);

onMounted(async () => {
  const response = await fetch("/api/video-review");
  data.value = await response.json();
  document.body.style.overflowY = "scroll";
});

onUnmounted(() => {
  document.body.style.overflow = "hidden";
});

const handleVideoChange = async (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (!input.files?.length) return;

  const file = input.files[0];

  // Проверка размера файла (100MB)
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
      data.value.videoSrc = result.path;
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

const saveChanges = async () => {
  await fetch("/api/video-review", {
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
