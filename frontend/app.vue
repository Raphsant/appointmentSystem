<template>
  <div class="font-custom">
    <NuxtLayout>
      <NuxtPage/>
    </NuxtLayout>
  </div>
</template>
<script>
import Login from "./pages/login";
import '@formkit/themes/genesis'

export default {
  components: {Login}
}
</script>
<style lang="css">
html {
  background: #dcfce7;
}
</style>
