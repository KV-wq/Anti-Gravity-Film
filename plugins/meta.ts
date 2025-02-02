export default defineNuxtPlugin(async () => {
  const route = useRoute();
  const { data: pages } = await useFetch("/api/pages");

  watch(
    () => route.path,
    async (newPath) => {
      const currentPage = Object.values(pages.value as any).find(
        (page: any) => page.path === newPath
      );

      if (currentPage) {
        useHead({
          title: currentPage.title,
          meta: [
            {
              name: "description",
              content: currentPage.description,
            },
          ],
        });
      }
    },
    { immediate: true }
  );
});
