import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useModalStore = defineStore("modal", () => {
  const isFormVisible = ref(false);
  const isContactsVisible = ref(false);
  const isVideoVisible = ref(false);
  const selectedFilm = ref("");

  // Вычисляемое свойство для подложки
  const isOverlayVisible = computed(
    () => isFormVisible.value || isContactsVisible.value || isVideoVisible.value
  );

  // Открытие/закрытие формы
  const showForm = () => {
    isFormVisible.value = true;
  };

  const hideForm = () => {
    isFormVisible.value = false;
  };

  // Открытие/закрытие контактов
  const showContacts = () => {
    isContactsVisible.value = true;
  };

  const hideContacts = () => {
    isContactsVisible.value = false;
  };

  // Закрытие всех модальных окон
  const closeAll = () => {
    isFormVisible.value = false;
    isContactsVisible.value = false;
    isVideoVisible.value = false;
  };

  const setSelectedFilm = (film: string) => {
    selectedFilm.value = film;
  };

  const showVideo = () => {
    isVideoVisible.value = true;
  };

  const hideVideo = () => {
    isVideoVisible.value = false;
  };

  return {
    isFormVisible,
    isContactsVisible,
    isOverlayVisible,
    isVideoVisible,
    selectedFilm,
    showForm,
    hideForm,
    showContacts,
    hideContacts,
    closeAll,
    setSelectedFilm,
    showVideo,
    hideVideo,
  };
});
