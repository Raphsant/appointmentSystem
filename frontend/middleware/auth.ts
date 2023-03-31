import { useAuthStore } from "~/store/auth";
import { navigateTo } from "#app";

export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore();
  const user = JSON.parse(JSON.stringify(authStore.getUser));

  function isAuthenticated() {
    return user.token;
  }

  async function checkValidToken() {
    try {
      const res = await $fetch("http://localhost:8080/api/auth/validate", {
        method: "GET",
        headers: {
          "x-access-token": user.token,
        },
      });
      return res == "OK";
    } catch (e) {
      console.error(e);
    }
  }

  if (!isAuthenticated()) {
    return navigateTo("/login");
  }
  if (!checkValidToken()) {
    authStore.$reset();
    return navigateTo("/login");
  }
});
