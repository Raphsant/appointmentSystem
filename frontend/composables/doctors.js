import { useAuthStore } from "~/store/auth";

export async function useDoctors(id) {
  const authStore = useAuthStore();
  const user = JSON.parse(JSON.stringify(authStore.getUser));
  const url = id
    ? "http://localhost:8080/api/doctor"
    : "http://localhost:8080/api/getDoctor";
  try {
    const res = await $fetch(url, {
      method: "GET",
      headers: {
        "x-access-token": user.token,
      },
      body: {
        id,
      },
    });
    return JSON.parse(JSON.stringify(res));
  } catch (e) {
    console.error(e);
  }
}
