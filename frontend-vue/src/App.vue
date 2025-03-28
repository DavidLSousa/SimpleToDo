<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>

  <header class="relative">
    <div class="fixed left-0 right-0 top-0 flex items-center justify-between p-4  bg-gray-100">
      <h1 class="text-2xl font-bold text-gray-700">Simple ToDo</h1>
      <nav class="font-bold flex flex-row gap-4">
        <RouterLink to="/login" class="py-1 px-2">
          login
        </RouterLink>

        <button>
          Sync
        </button>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

