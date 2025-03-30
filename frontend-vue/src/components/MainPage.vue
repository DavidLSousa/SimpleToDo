<template>
  <div class="flex p-4 mt-16 justify-center">
    <div class="bg-gray-100 shadow-lg rounded-lg p-4 w-full sm:max-w-4xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl">
      <h2 class="text-3xl font-semibold text-gray-800 mb-4 text-center">
        Bem-vindo!
      </h2>
      <p class="text-gray-600 mb-4">
        Somos um aplicativo de Lista de Tarefas, projetado para facilitar o gerenciamento do seu dia a dia!
      </p>
      <p class="text-gray-600 mb-4">
        Aqui você pode listar suas tarefas diárias, como:
      </p>
      <ul class="list-disc list-inside text-gray-600 mb-4">
        <li>Academia</li>
        <li>Estudar</li>
        <li>Hora do Almoço</li>
        <li>Trabalhar</li>
        <li>Happy Hour</li>
      </ul>
      <p class="text-gray-600 mb-4">
        E se desejar ser notificado, basta me adicionar à sua tela inicial colocar um horário e eu te lembro ;)
      </p>
      <p class="text-gray-600">
        Complete seu registro rapidinho e comece a organizar seu dia!
      </p>
      <div class="mt-4 flex justify-center">
        <RouterLink to="/registro"
          class="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer">
          Registre-se agora
        </RouterLink>
      </div>

    </div>
  </div>
</template>

<script setup>

import router from '@/router';
import { onMounted } from 'vue';

onMounted(() => {
  const token = localStorage.getItem('token')

  if(!token) return

  router.push('/tarefas')
})

</script>
