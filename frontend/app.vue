<template>
  <div class="">
    <NuxtLayout>
      <NuxtPage/>
    </NuxtLayout>
  </div>
</template>
<script setup>
import Login from "./pages/login";
import '@formkit/themes/genesis'
import { useAuthStore } from "~/store/auth";
const authStore = useAuthStore();
const user = JSON.parse(JSON.stringify(authStore.getUser));
console.log(user)


</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200..1000;1,200..1000&display=swap');
html {
  background: rgba(166, 186, 253, 0.38);
  font-family: "Nunito", sans-serif;
}
</style>

//  background: #dcfce7;