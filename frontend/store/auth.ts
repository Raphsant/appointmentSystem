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
        id: null,
      },
    };
  },
  persist: true,
  actions: {
    addUser(value: any) {
      this.user.username = value.username;
      this.user.token = value.token;
      this.user.id = value.id
    },
  },
  getters: {
    getUser:  (state) => state.user,
  },
});
