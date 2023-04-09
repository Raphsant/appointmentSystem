<template>
  <div class="bg-neutral-100 m-10 p-10 h-full w-2/5" v-for="doctor in doctors">
    <div class=" flex gap-5 flex-col">
      <div class="grow-1">
        <div class="text-5xl">
          {{doctor.firstName}}
        </div>
        <div class="text-2xl">
          {{doctor.specialty}}
        </div>
        <div>
          schedule
        </div>
      </div>
      <div class="">
        <FormKit
            type="button"
            @click="handleClick(doctor)"
            label="book now"
            :classes="{
      input: 'bg-green-500',
      }"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "appointment"
}
</script>
<script setup>
import {useAuthStore} from "../store/auth";
const doctors = await useDoctors()
const store = useAuthStore();

const handleClick = (e) => {
  return navigateTo(`doctor/${e.id}`)
}


</script>

<style scoped>

</style>