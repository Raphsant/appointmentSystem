<template>
  <div class="font-custom">
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
<style lang="css">
html {
  background: rgba(19, 20, 23, 0.28);
}
</style>

//  background: #dcfce7;