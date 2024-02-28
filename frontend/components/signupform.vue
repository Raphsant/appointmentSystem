<script setup>

const signupForm = ref({
  firstName: "",
  lastName: "",
  id: "",
  email: "",
  username: "",
  password: "",
  role: "User"

})

const isLoading = ref(false);

async function signup(data) {
  try {
    isLoading.value = true;
    const res = await $fetch("http://localhost:8080/api/auth/signup", {
      method: "POST",
      body: data
    })
    await new Promise((r) => setTimeout(r, 1000))
    if (res) {
      isLoading.value = false;
      navigateTo("/")
    }

  } catch (e) {
    console.error(e)
  }
  console.log(signupForm.value)
}


</script>

<template>

  <div class="flex gap-5 flex-col">
    <div class="flex justify-center items-center">
      <div>
        Bienvenido al sistema de citas de Servidiap C.A
      </div>
    </div>
    <FormKit type="form"
             @submit="signup"
             submit-label="Registrar"
             :submit-attrs="{
    inputClass: 'my-input-class',
    wrapperClass: 'my-wrapper-class',
    'data-theme': `dark`,
    ignore: false
  }">
      <div class="flex flex-col">
        <div class="">
          <FormKit type="text"
                   name="id"
                   id="id"
                   placeholder="Numero de cedula"
                   :classes="{
  outer: 'mb-5',
      label: 'block mb-1 font-bold text-sm',
      inner: 'max-w-md rounded-lg mb-1 overflow-hidden focus-within:border-green-600 ',
      input: 'w-full h-10 px-3 border-none text-base placeholder-black-300 ',
      help: 'text-xs text-gray-500'
}"/>
        </div>
        <div class="">
          <FormKit type="text"
                   name="firstName"
                   id="firstName"
                   placeholder="Nombre"
                   :classes="{
  outer: 'mb-5',
      label: 'block mb-1 font-bold text-sm',
      inner: 'max-w-md rounded-lg mb-1 overflow-hidden focus-within:border-green-600 ',
      input: 'w-full h-10 px-3 border-none text-base placeholder-black-300 ',
      help: 'text-xs text-gray-500'
}"/>
        </div>
        <div class="">
          <FormKit type="text"
                   name="lastName"
                   id="lastName"
                   placeholder="Apellido"
                   :classes="{
  outer: 'mb-5',
      label: 'block mb-1 font-bold text-sm',
      inner: 'max-w-md rounded-lg mb-1 overflow-hidden focus-within:border-green-600 ',
      input: 'w-full h-10 px-3 border-none text-base placeholder-black-300 ',
      help: 'text-xs text-gray-500'
}"/>
        </div>
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
        <div class="">
          <FormKit type="text"
                   name="email"
                   id="email"
                   placeholder="correo electronico"
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

<style scoped>

</style>