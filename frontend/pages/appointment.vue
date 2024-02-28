<template>
<div class="grid grid-cols-3 gap-10 justify-center items-center place-items-center w-full">
  <div class="bg-slate-100 shadow-xl rounded-lg px-6 py-4 h-fit w-[35rem]" v-for="doctor in doctors">
    <div class=" flex gap-5 flex-col">
      <div class="flex flex-col gap-4">
        <div class="p-2 rounded-lg  w-fit flex-col">
          <div class="text-3xl">
            {{ doctor.firstName }} {{doctor.lastName}}
          </div>
          <div class="text-2xl">
            {{ doctor.specialty }}
          </div>
        </div>
        <div class="flex flex-row gap-10 bg-green-400/20 p-2 rounded-lg shadow-xl">
          <div class="flex flex-col" v-if="doctor.schedule?.Monday?.active">
            <div>Lunes</div>
            <div>{{ doctor.schedule?.Monday?.times.startTime }}</div>
            <div>{{ doctor.schedule?.Monday?.times.endTime }}</div>
          </div>
          <div class="flex flex-col" v-if="doctor.schedule?.Tuesday?.active">
            <div>Martes</div>
            <div>{{ doctor.schedule?.Tuesday?.times.startTime }}</div>
            <div>{{ doctor.schedule?.Tuesday?.times.endTime }}</div>
          </div>
          <div class="flex flex-col" v-if="doctor.schedule?.Wednesday?.active">
            <div>Miercoles</div>
            <div>{{ doctor.schedule?.Wednesday?.times.startTime }}</div>
            <div>{{ doctor.schedule?.Wednesday?.times.endTime }}</div>
          </div>
          <div class="flex flex-col" v-if="doctor.schedule?.Thursday?.active">
            <div>Jueves</div>
            <div>{{ doctor.schedule?.Thursday?.times.startTime }}</div>
            <div>{{ doctor.schedule?.Thursday?.times.endTime }}</div>
          </div><div class="flex flex-col" v-if="doctor.schedule?.Friday?.active">
          <div>Viernes</div>
          <div>{{ doctor.schedule?.Friday?.times.startTime }}</div>
          <div>{{ doctor.schedule?.Friday?.times.endTime }}</div>
        </div>
        </div>
      </div>
      <div class="bg-green-400/20 rounded-lg w-fit p-2 shadow-lg">
       <NuxtLink :to="`doctor/${doctor.id}`"><button>Agendar Cita</button></NuxtLink>
      </div>
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

const doctors = await useDoctors();
const store = useAuthStore();

console.log(doctors)

const parseJSONB = (jsonB) => {
  let obj = JSON.parse(jsonB)
}

const handleClick = (e) => {
  return navigateTo(`doctor/${e.id}`)
}


</script>

<style scoped>
#schedule {
  display: flex;
  flex-direction: column-reverse;
}
</style>