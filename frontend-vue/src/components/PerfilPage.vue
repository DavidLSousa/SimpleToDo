<template>
    <div class="flex p-4 mt-16 justify-center">
    <div class="bg-gray-100 shadow-lg rounded-lg p-6 w-full sm:max-w-4xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl">
      <h2 class="text-2xl font-bold text-center mb-4">{{ user.name }}</h2>

      <h3>Email: {{ user.email }}</h3>
      <h4>Id: {{ user.id }}</h4>

      <button @click="logout" class="w-full bg-red-400 text-black p-2 mt-4 rounded-lg hover:bg-blue-600 cursor-pointer">
        Logout
      </button>


    </div>
  </div>
</template>
<script setup>
import router from '@/router';
import { reactive } from 'vue';

const user = reactive({})

const userStore = JSON.parse(localStorage.getItem('user'))

Object.assign(user, userStore);

const logout = () => {
  // Remover dados do localStorage
  localStorage.removeItem('token');
  localStorage.removeItem('user');

  // Disparar evento global para atualizar o estado no App.vue
  window.dispatchEvent(new Event("user-logged-out"));

  // Redirecionar para a página inicial
  router.push('/');
};
</script>
