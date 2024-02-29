import { useAuthStore } from "~/store/auth";

export default async function (data) {
  const authStore = useAuthStore();
  try {
    console.log("trying");
    const res = await $fetch("https://postgresapp-e83cc2ceb04b.herokuapp.com/api/auth/signin", {
      method: "POST",
      body: data,
    });
    const user = {
      id: res.id,
      email: res.email,
      roles: res.roles,
      token: res.accessToken,
      username: res.username,
    };

    if (user) {
      authStore.addUser(user);
    }
  } catch (e) {
    console.error(e.message);
  }
}
