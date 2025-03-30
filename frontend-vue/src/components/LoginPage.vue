<template>
  <div class="flex p-4 mt-16 justify-center">
    <div class="bg-gray-100 shadow-lg rounded-lg p-6 w-full sm:max-w-4xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl">
      <h2 class="text-2xl font-bold text-center mb-4">Login</h2>
      <form @submit.prevent="handleLogin" class="space-y-4">
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
          Entrar
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const email = ref('');
const password = ref('');

const handleLogin = () => {
  console.log("Email:", email.value);
  console.log("Senha:", password.value);
};
</script>
