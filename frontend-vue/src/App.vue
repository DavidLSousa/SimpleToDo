<template>
  <header class="relative">
    <div class="fixed left-0 right-0 top-0 p-4 bg-gray-100 w-full">
      <div class="flex justify-center">
        <div class="flex flex-row w-full sm:max-w-4xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl">
          <h1 class="text-2xl font-bold text-gray-700 flex-1">
            <RouterLink to="/"> Simple ToDo </RouterLink>
          </h1>

          <nav class="font-bold flex flex-row gap-4">
            <RouterLink v-if="!loged" to="/login" class="py-1 px-2">Login</RouterLink>
            <RouterLink v-else to="/perfil" class="py-1 px-2">Perfil</RouterLink>
          </nav>
        </div>
      </div>

    </div>
  </header>

  <RouterView />
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router';
import { onMounted, ref } from 'vue';

const loged = ref(false);

const checkToken = async () => {
  const token = localStorage.getItem('token');

  if (!token) {
    loged.value = false;
    return;
  }

  try {
    const response = await fetch('http://localhost:3000/check-token', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (!response.ok) {
      loged.value = false;
      return;
    }

    loged.value = true;
  } catch (error) {
    loged.value = false;
    console.log(error.message);
  }
};

window.addEventListener("user-logged-out", () => {
  loged.value = false;
});

onMounted(() => {
  checkToken();
});
</script>
