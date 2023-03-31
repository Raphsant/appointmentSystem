<template>
  <Navbar/>
<slot/>
</template>

<script>
import Navbar from "../components/navbar";
export default {
  name: "default",
  components: {Navbar}
}
</script>

<style scoped>

</style>