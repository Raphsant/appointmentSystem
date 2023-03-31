<template>
  <div class="bg-neutral-100 m-10 p-10 h-full" v-for="doctor in doctors">
    <div class=" flex gap-10">
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
      <div>
        <FormKit
            type="button"
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
const doctors = await useDoctors()
console.log(doctors)
</script>

<style scoped>

</style>