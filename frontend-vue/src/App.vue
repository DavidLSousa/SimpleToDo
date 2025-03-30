<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header class="relative">
    <div class="fixed left-0 right-0 top-0 p-4 bg-gray-100 w-full">
      <div class="flex justify-center">
        <div class="flex flex-row w-full sm:max-w-4xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl">
          <h1 class="text-2xl font-bold text-gray-700 flex-1">
            <RouterLink to="/"> Simple ToDo </RouterLink>
          </h1>

          <nav class="font-bold flex flex-row gap-4">
            <RouterLink to="/login" class="py-1 px-2">Login</RouterLink>
            <!-- <RouterLink to="/perfil" class="py-1 px-2">Perfil</RouterLink> -->
          </nav>
        </div>
      </div>

    </div>
  </header>

  <RouterView />
</template>
