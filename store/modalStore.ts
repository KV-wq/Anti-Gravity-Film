// stores/modalStore.ts
import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useModalStore = defineStore("modal", () => {
  const isFormVisible = ref(false);
  const isContactsVisible = ref(false);
  const selectedFilm = ref("");

  // Вычисляемое свойство для подложки
  const isOverlayVisible = computed(
    () => isFormVisible.value || isContactsVisible.value
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
  };

  const setSelectedFilm = (film: string) => {
    selectedFilm.value = film;
  };

  return {
    isFormVisible,
    isContactsVisible,
    isOverlayVisible,
    selectedFilm,
    showForm,
    hideForm,
    showContacts,
    hideContacts,
    closeAll,
    setSelectedFilm,
  };
});
