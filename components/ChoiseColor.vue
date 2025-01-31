<script setup lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useModalStore } from "~/store/modalStore";

const colors = [
  // Эксклюзивные цвета
  { id: "black-chrome", value: "bg-zinc-900", category: "1" },
  { id: "silver-chrome", value: "bg-zinc-300", category: "1" },
  { id: "gold-chrome", value: "bg-yellow-600", category: "1" },
  { id: "rose-gold", value: "bg-pink-300", category: "1" },
  { id: "bronze", value: "bg-amber-700", category: "1" },
  { id: "purple-chrome", value: "bg-purple-600", category: "1" },
  { id: "blue-chrome", value: "bg-blue-600", category: "1" },
  { id: "green-chrome", value: "bg-green-600", category: "1" },
  { id: "teal-chrome", value: "bg-teal-500", category: "1" },
  { id: "red-chrome", value: "bg-red-600", category: "1" },
  { id: "copper-chrome", value: "bg-orange-800", category: "1" },
  { id: "platinum", value: "bg-gray-200", category: "1" },
  { id: "titanium", value: "bg-gray-400", category: "1" },
  { id: "pearl-white", value: "bg-slate-50", category: "1" },
  { id: "chameleon", value: "bg-purple-400", category: "1" },
  { id: "holographic", value: "bg-indigo-400", category: "1" },

  // Матовые цвета
  { id: "matte-black", value: "bg-black", category: "2" },
  { id: "matte-white", value: "bg-white", category: "2" },
  { id: "matte-gray", value: "bg-gray-500", category: "2" },
  { id: "matte-red", value: "bg-red-500", category: "2" },
  { id: "matte-blue", value: "bg-blue-500", category: "2" },
  { id: "matte-green", value: "bg-green-500", category: "2" },
  { id: "matte-yellow", value: "bg-yellow-500", category: "2" },
  { id: "matte-orange", value: "bg-orange-500", category: "2" },
  { id: "matte-purple", value: "bg-purple-500", category: "2" },
  { id: "matte-brown", value: "bg-amber-800", category: "2" },
  { id: "matte-navy", value: "bg-blue-900", category: "2" },
  { id: "matte-olive", value: "bg-olive-700", category: "2" },
  { id: "matte-burgundy", value: "bg-red-900", category: "2" },
  { id: "matte-silver", value: "bg-gray-300", category: "2" },
  { id: "matte-bronze", value: "bg-amber-600", category: "2" },
  { id: "matte-gold", value: "bg-yellow-700", category: "2" },
  { id: "matte-pink", value: "bg-pink-500", category: "2" },

  // Глянцевые цвета
  { id: "gloss-black", value: "bg-black", category: "3" },
  { id: "gloss-white", value: "bg-white", category: "3" },
  { id: "gloss-silver", value: "bg-gray-200", category: "3" },
  { id: "gloss-red", value: "bg-red-500", category: "3" },
  { id: "gloss-blue", value: "bg-blue-500", category: "3" },
  { id: "gloss-navy", value: "bg-blue-900", category: "3" },
  { id: "gloss-yellow", value: "bg-yellow-400", category: "3" },
  { id: "gloss-orange", value: "bg-orange-500", category: "3" },
  { id: "gloss-green", value: "bg-green-500", category: "3" },
  { id: "gloss-teal", value: "bg-teal-500", category: "3" },
  { id: "gloss-purple", value: "bg-purple-500", category: "3" },
  { id: "gloss-pink", value: "bg-pink-500", category: "3" },
  { id: "gloss-brown", value: "bg-amber-800", category: "3" },
  { id: "gloss-burgundy", value: "bg-red-900", category: "3" },
  { id: "gloss-gold", value: "bg-yellow-600", category: "3" },
  { id: "gloss-bronze", value: "bg-amber-600", category: "3" },
  { id: "gloss-graphite", value: "bg-gray-700", category: "3" },
  { id: "gloss-pearl", value: "bg-slate-50", category: "3" },
];

const selectedCategory = ref("1");
const selectedColor = ref(colors[0].value);

const filteredColors = computed(() => {
  return colors.filter((color) => color.category === selectedCategory.value);
});

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
      Марка Авто Пример
    </h1>

    <div class="w-full h-px bg-white"></div>

    <h2 class="text-[2vw] max-sm:text-xl">Подобрать цвет</h2>

    <select
      v-model="selectedCategory"
      class="px-4 py-5 max-sm:px-3 max-sm:py-3 w-full rounded bg-black text-white border text-lg border-white"
    >
      <option value="1">Эксклюзивные</option>
      <option value="2">Матовые</option>
      <option value="3">Глянцевые</option>
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
                :value="color.value"
                v-model="selectedColor"
                :name="color.id"
                class="sr-only"
              />
              <div
                class="rounded-full size-[2.7vw] max-sm:size-10 transition-all duration-200"
                :class="[
                  color.value,
                  selectedColor === color.value
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
