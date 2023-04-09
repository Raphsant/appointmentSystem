<template>
  <div class="flex gap-5 flex-col">
    <div class="flex justify-center items-center">
      <div>
        Bienvenido al sistema de citas de Servidiap C.A
      </div>
    </div>
    <FormKit type="form"
             @submit="login"
             submit-label="Entrar"
             :submit-attrs="{
    inputClass: 'my-input-class',
    wrapperClass: 'my-wrapper-class',
    'data-theme': `dark`,
    ignore: false
  }">
      <div class="flex flex-col">
        <div class="">
          <FormKit type="text"
                   name="username"
                   id="username"
                   placeholder="Usuario"
                   :classes="{
  outer: 'mb-5',
      label: 'block mb-1 font-bold text-sm',
      inner: 'max-w-md rounded-lg mb-1 overflow-hidden focus-within:border-green-600 ',
      input: 'w-full h-10 px-3 border-none text-base placeholder-black-300 ',
      help: 'text-xs text-gray-500'
}"/>
        </div>
        <div>
          <FormKit type="text"
                   name="password"
                   id="password"
                   placeholder="Contraseña"
                   :classes="{
  outer: 'mb-5',
      label: 'block mb-1 font-bold text-sm',
      inner: 'max-w-md rounded-lg mb-1 overflow-hidden focus-within:border-green-600',
      input: 'w-full h-10 px-3 border-none text-base placeholder-black-300',
      help: 'text-xs text-gray-500'
}"/>
        </div>
      </div>
    </FormKit>
  </div>


</template>

<script setup lang="ts">

import {useAuthStore} from "~/store/auth";
import {storeToRefs} from 'pinia'
import useSignInTS from "~/composables/useSignInTS";

const authStore = useAuthStore();

async function login(data: any) {
  try {
    await useSignInTS(data)
    await new Promise((r) => setTimeout(r, 1000))
    return navigateTo("/")
  } catch (e) {
    console.error(e)
  } finally {
    console.log(JSON.parse((JSON.stringify(authStore.getUser))));
  }
}
</script>

<style>
[data-type="submit"] .formkit-input {
  background: white !important;
  color: mediumseagreen !important;
  filter: drop-shadow(0 0.3rem 0.1rem rgba(0, 0, 0, 0.27)) !important;
  font-size: 1rem;
}

[data-type="text"] .formkit-input {
  background: white !important;

  color: black;
}

[data-type="text"] .formkit-inner {
  background: white !important;
  filter: drop-shadow(0rem 0rem 1rem rgba(0, 0, 0, 0.27)) !important;
  color: black;
}
</style>