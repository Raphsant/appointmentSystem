<template>
  <div class="flex h-full">
    <div
        class="bg-neutral-100 m-6 h-120 rounded-xl flex flex-col justify-center items-center w-fit p-5 shadow-md grow">
      <ul class="flex flex-row gap-5 grow">
        <li>
          <div class="text-green-800 font-light p-2 rounded-xl shadow-2xl hover:bg-green-600 hover:text-white">
            <NuxtLink to="/">Inicio</NuxtLink>
          </div>
        </li>
        <li>
          <div class="text-green-800 font-light p-2 rounded-xl shadow-2xl hover:bg-green-600 hover:text-white">
            <NuxtLink to="/appointment">
              Crear Cita
            </NuxtLink>
          </div>
        </li>
        <li>
          <div class="text-green-800 font-light p-2 rounded-xl shadow-2xl hover:bg-green-600 hover:text-white"><NuxtLink to="/myapts">
            Mis Citas
          </NuxtLink>
          </div>
        </li>
        <li>
          <NuxtLink to="/profile"><div class="text-green-800 font-light p-2 rounded-xl shadow-2xl hover:bg-green-600 hover:text-white">
            Mi Perfil
          </div></NuxtLink>
        </li>
      </ul>
    </div>
    <div class="bg-neutral-100 m-6 h-120 rounded-xl flex flex-col justify-center items-center w-fit p-5 shadow-md">
      <ul class="flex flex-row gap-5">
        <li>
          <div class="text-green-800 font-light p-2 rounded-xl shadow-2xl hover:bg-green-600 hover:text-white"
               v-if="!token">
            <NuxtLink to="/login">Iniciar Sesion</NuxtLink>
          </div>
          <div class="text-green-800 font-light p-2 rounded-xl shadow-2xl hover:bg-green-600 hover:text-white"
               v-if="token" @click="handleSignOut">
            Cerrar Sesion
          </div>
        </li>
        <li>
          <NuxtLink to="signup"><div class="text-green-800 font-light p-2 rounded-xl shadow-md hover:bg-green-600 hover:text-white">Registro
          </div></NuxtLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {useAuthStore} from "../store/auth";

export default {
  name: "navbar"
}

const authStore = useAuthStore();
const user = JSON.parse(JSON.stringify(authStore.getUser));


</script>
<script setup>


const {token} = user;

function handleSignOut() {
  authStore.$reset()
  return navigateTo("/login")
}
</script>

<style scoped>

</style>