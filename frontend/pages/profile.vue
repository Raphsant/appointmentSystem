<script setup>
import {useAuthStore} from "~/store/auth";

const authStore = useAuthStore();
const user = JSON.parse(JSON.stringify(authStore.getUser));
const userInfo = ref(await getUserProfile());
const userForm = ref({
  firstName: userInfo.value.firstName,
  lastName: userInfo.value.lastName,
  email: userInfo.value.email
})
const isEditFormActive = ref(false)
const isLoading = ref(false)


async function getUserProfile() {
  const url = `http://localhost:8080/api/user/profile`;
  try {
    const {pending, data: res} = await useLazyAsyncData(() => $fetch(url, {
      method: "GET",
      headers: {
        "x-access-token": user.token,
      },
      params: {
        userId: user.id
      }
    }));
    if (res) console.log(res)
    return res;
  } catch (e) {
    console.error(e);
    return [];
  }
}

async function updateUserProfile() {
  const url = `http://localhost:8080/api/user/update`;
  try {
    isLoading.value = true;
    const res = await $fetch(url, {
      method: "POST",
      headers: {
        "x-access-token": user.token,
      },
      params: {
        userId: user.id
      },
      body: {
        ...userForm.value
      }
    });

    await refreshNuxtData();
    isLoading.value = false;
    isEditFormActive.value = false;

  } catch (e) {
    console.error(e);
    return [];
  }
}

</script>

<template>
  <div class="w-screen p-10 flex justify-center items-center">
    <div
        class="bg-cream w-[30rem] h-[30rem] flex flex-col justify-around text-center items-center rounded-lg shadow-2xl gap-1">
      <div class="text-2xl">
        <span>Ficha de Paciente</span>
      </div>
      <div class="space-y-2">
        <div>Cedula de identidad:</div>
        <div>{{ userInfo.id }}</div>
      </div>
      <div class="space-y-2">
        <div>Nombre Completo:</div>
        <div v-if="!isEditFormActive">{{ userInfo.firstName }} {{ userInfo.lastName }}</div>
        <input class="p-1 rounded-md bg-gray-100 shadow-inner shadow-black/20 w-[10rem]" v-if="isEditFormActive"
               v-model="userForm.firstName"> <input
          class="p-1 rounded-md bg-gray-100 shadow-inner shadow-black/20 w-[10rem]" v-if="isEditFormActive"
          v-model="userForm.lastName">
      </div>
      <div class="space-y-2">
        <div>Correo Electronico:</div>
        <div v-if="!isEditFormActive">
          {{ userInfo.email }}
        </div>
        <input class="p-1 rounded-md bg-gray-100 shadow-inner shadow-black/20 w-[10rem]" v-if="isEditFormActive"
               v-model="userForm.email">

        <div class="pt-10 space-x-2" :class="[{'flex' : isEditFormActive}]">
          <button @click="isEditFormActive = !isEditFormActive" class="bg-green-300 px-2 py-1 rounded-lg shadow-md"
                  :class="[{'bg-orange-300' : isEditFormActive}]">
            {{ isEditFormActive ? "Cancelar" : "Editar" }}
          </button>
          <button v-if="isEditFormActive" @click="updateUserProfile"
                  class="flex justify-center items-center bg-green-300 px-2 py-1 rounded-lg shadow-md">
            <svg v-if="isLoading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-green-900"
                 xmlns="http://www.w3.org/2000/svg" fill="none"
                 viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {{ isLoading ? "Guardando..." : "Guardar" }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>