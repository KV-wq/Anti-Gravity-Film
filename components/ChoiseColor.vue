<script setup lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useModalStore } from "~/store/modalStore";
import { Color } from "../types/color";
import { useCarStore } from "../store/carStore";

const carStore = useCarStore();
const { data: colors } = await useFetch("/api/colors");

const selectedCategory = ref("3");
const filteredColors = computed(() => {
  return colors.value.colors.filter(
    (color: Color) => color.category === selectedCategory.value
  );
});

// Делаем selectedColor computed, чтобы реагировать на изменения в store
const selectedColor = computed({
  get: () => carStore.selectedColor,
  set: (value) => {
    carStore.setSelectedColor(value);
    // Находим и устанавливаем соответствующую машину
    const selectedColorObj = colors.value.colors.find(
      (color: Color) => color.name === value
    );
    if (selectedColorObj) {
      carStore.setSelectedCar(selectedColorObj);
    }
  },
});

// Инициализация начальных значений

if (filteredColors.value.length > 0) {
  selectedColor.value = filteredColors.value[0].name;
}

// Следим за изменением категории
watch(selectedCategory, (newCategory) => {
  const firstColorInCategory = colors.value.colors.find(
    (color: Color) => color.category === newCategory
  );

  if (firstColorInCategory) {
    selectedColor.value = firstColorInCategory.name;
  }
});

// Следим за изменением selectedCar в store
watch(
  () => carStore.selectedCar,
  (newCar) => {
    if (newCar) {
      // Обновляем категорию если нужно
      selectedCategory.value = newCar.category;
      // Обновляем выбранный цвет
      carStore.setSelectedColor(newCar.name);
    }
  },
  { deep: true }
);

const colorGroups = computed(() => {
  const groups = [];
  const filtered = filteredColors.value;

  for (let i = 0; i < filtered.length; i += 10) {
    groups.push(filtered.slice(i, i + 10));
  }

  return groups;
});

const order = () => {
  useModalStore().setSelectedFilm(selectedColor.value);
  useModalStore().showForm();
};

const swiperOptions = {
  modules: [Navigation],
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  slidesPerView: 1,
};
</script>

<template>
  <div class="flex flex-col justify-end gap-[1.2vw] max-sm:gap-3">
    <h1
      class="text-[2.75vw] leading-[3.2vw] font-bold uppercase max-sm:text-2xl"
    >
      {{ colors.title }}
    </h1>

    <div class="w-full h-px bg-white"></div>

    <h2 class="text-[2vw] max-sm:text-xl">Подобрать цвет</h2>

    <select
      v-model="selectedCategory"
      class="px-4 py-5 max-sm:px-3 max-sm:py-3 w-full rounded bg-black text-white border text-lg border-white"
    >
      <option value="3">Глянцевые</option>
      <option value="2">Матовые</option>
      <option value="1">Эксклюзивные</option>
    </select>

    <div class="relative">
      <button
        class="swiper-button-prev !text-secondary absolute -left-6 top-1/2 translate-y-[25%] z-10 !w-8 !h-8"
      />
      <button
        class="swiper-button-next !text-secondary absolute -right-6 top-1/2 translate-y-[25%] z-10 !w-8 !h-8"
      />

      <Swiper v-bind="swiperOptions" class="w-full max-sm:!pl-4 sm:!pl-1 !py-1">
        <SwiperSlide v-for="(group, index) in colorGroups" :key="index">
          <div class="grid grid-cols-5 w-full gap-4 max-sm:w-10/12">
            <label
              v-for="color in group"
              :key="color.id"
              class="relative cursor-pointer"
            >
              <input
                type="radio"
                :value="color.name"
                v-model="selectedColor"
                :name="color.id"
                class="sr-only"
              />
              <div
                class="rounded-full size-[2.7vw] max-sm:size-10 transition-all duration-200"
                :class="[
                  color.value,
                  selectedColor === color.name
                    ? 'ring-2 ring-secondary ring-offset-2 ring-offset-black'
                    : '',
                ]"
              ></div>
            </label>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>

    <Button
      class="font-bold text-white !text-[1.3vw] w-full h-[4.7vw] max-sm:h-[55px] max-sm:!text-base"
      @click="order"
    >
      Заказать
    </Button>
  </div>
</template>

<style scoped>
:deep(.swiper-button-next),
:deep(.swiper-button-prev) {
  color: theme("colors.secondary");
}

:deep(.swiper-button-disabled) {
  opacity: 0.35;
}

@media (max-width: 640px) {
  :deep(.swiper-button-next)::after,
  :deep(.swiper-button-prev)::after {
    font-size: 7vw;
  }

  :deep(.swiper-button-prev) {
    left: -22px;
  }

  :deep(.swiper-button-next) {
    right: -22px;
  }
}
@media (min-width: 640px) {
  :deep(.swiper-button-next)::after,
  :deep(.swiper-button-prev)::after {
    font-size: 2.5vw;
  }

  :deep(.swiper-button-prev) {
    left: -2.5vw;
  }

  :deep(.swiper-button-next) {
    right: -2.5vw;
  }
}
</style>
