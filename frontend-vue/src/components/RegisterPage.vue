<template>
  <div class="flex p-4 mt-16 justify-center">
    <div class="bg-gray-100 shadow-lg rounded-lg p-6 w-full sm:max-w-4xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl">
      <h2 class="text-2xl font-bold text-center mb-4">Registro</h2>
      <form @submit.prevent="handleRegister" class="space-y-4">
        <div>
          <label for="name" class="block text-gray-700">Nome</label>
          <input v-model="name" type="text" id="name"
            class="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300" required />
        </div>
        <div>
          <label for="email" class="block text-gray-700">Email</label>
          <input v-model="email" type="email" id="email"
            class="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300" required />
        </div>
        <div>
          <label for="password" class="block text-gray-700">Senha</label>
          <input v-model="password" type="password" id="password"
            class="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300" required />
        </div>
        <button type="submit" class="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600">
          Registrar
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import router from '@/router';
import { onMounted } from 'vue';

onMounted(() => {
  const token = localStorage.getItem('token')

  if(!token) return

  router.push('/tarefas')
})

const name = ref('');
const email = ref('');
const password = ref('');

const handleRegister = async () => {
  const user = { name: name.value, email: email.value, password: password.value }

  try {
    const response = await fetch('http://localhost:3000/register', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message);
    }

    console.log('Resgistro feito com sucesso')

  } catch (error) {
    console.log(error.message)
  }

};


</script>
