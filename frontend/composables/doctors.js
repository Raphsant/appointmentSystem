import { useAuthStore } from "~/store/auth";

export async function useDoctors() {
  const authStore = useAuthStore();
  const user = JSON.parse(JSON.stringify(authStore.getUser));
  try {
    const res = await $fetch("http://localhost:8080/api/doctor", {
      method: "GET",
      headers: {
        "x-access-token": user.token,
      },
    });
    return JSON.parse(JSON.stringify(res));
  } catch (e) {
    console.error(e);
  }
}
