import { useAuthStore } from "~/store/auth";

export async function useDoctors(id) {
  const authStore = useAuthStore();
  const user = JSON.parse(JSON.stringify(authStore.getUser));
  const url = id
    ? `https://postgresapp-e83cc2ceb04b.herokuapp.com/api/getDoctor?id=${id}`
    : "https://postgresapp-e83cc2ceb04b.herokuapp.com/api/doctor";
  try {
    const res = await $fetch(url, {
      method: "GET",
      headers: {
        "x-access-token": user.token,
      },
      params:
          {
            id: id
      }

    });
    return JSON.parse(JSON.stringify(res));
  } catch (e) {
    console.error(e);
  }
}
