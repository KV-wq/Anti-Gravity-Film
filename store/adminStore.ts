import { defineStore } from "pinia";

interface AdminState {
  isAuthenticated: boolean;
  token: string | null;
}

export const useAdminStore = defineStore("admin", {
  state: (): AdminState => ({
    isAuthenticated: false,
    token: null,
  }),
  actions: {
    login(token: string) {
      this.isAuthenticated = true;
      this.token = token;
      localStorage.setItem("admin_token", token);
    },
    logout() {
      this.isAuthenticated = false;
      this.token = null;
      localStorage.removeItem("admin_token");
    },
    checkAuth() {
      const token = localStorage.getItem("admin_token");
      if (token) {
        this.isAuthenticated = true;
        this.token = token;
      }
    },
  },
});
