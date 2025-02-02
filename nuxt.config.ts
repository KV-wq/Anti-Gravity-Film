export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: false },
  css: ["@/assets/css/index.css", "swiper/css"],
  modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt"],
  plugins: ["@/plugins/gsap.client.ts", "@/plugins/meta.ts"],
  pinia: {
    storesDirs: ["./stores/**", "/stores/**"],
  },
  app: {
    pageTransition: false,
    layoutTransition: false,
  },
  runtimeConfig: {
    public: {
      adminPassword: "",
      apiBase: process.env.NUXT_PUBLIC_API_BASE || "/",
    },
  },
});
