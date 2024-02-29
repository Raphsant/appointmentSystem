import { useAuthStore } from "~/store/auth";

class User {
  id: number | undefined;
  email: string;
  roles: any;
  token: any;
  username: string;

  constructor() {
    this.id = undefined;
    this.email = "";
    this.roles = undefined;
    this.token = "No token provided, please sign in";
    this.username = "";
  }
}

export default async function (data: object) {
  const authStore: any = useAuthStore();
  try {
    const res: User = await $fetch("https://postgresapp-e83cc2ceb04b.herokuapp.com/api/auth/signin", {
      method: "POST",
      body: data,
    });
    if (res) {
      console.log(res);
      authStore.addUser(res);
    }
  } catch (e) {
    //@ts-ignore
    console.error(e.message);
  }
}
