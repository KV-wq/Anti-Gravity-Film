import { useAdminStore } from "~/store/adminStore";

export default defineNuxtRouteMiddleware((to) => {
  const adminStore = useAdminStore();
  const config = useRuntimeConfig();

  if (
    !adminStore.isAuthenticated &&
    to.path.startsWith("/admin") &&
    to.path !== "/admin/login"
  ) {
    return navigateTo("/admin/login");
  }
});
