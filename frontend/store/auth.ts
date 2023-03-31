// store/filters.ts
import { defineStore } from "pinia";
export const useAuthStore = defineStore({
  id: "auth-store",
  state: () => {
    return {
      user: {
        username: "no username",
        isAdmin: false,
        token: null,
      },
    };
  },
  persist: true,
  actions: {
    addUser(value: any) {
      this.user.username = value.username;
      this.user.token = value.token;
    },
  },
  getters: {
    getUser: (state) => state.user,
  },
});
