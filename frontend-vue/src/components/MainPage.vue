<template>
  <div class="flex p-4 mt-16">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
      <GroupViews
        v-for="group in groups"
        :key="group.id"
        @removeGroup="removeGroup(group.id)"
        class="flex"
      />
    </div>
  </div>


  <button class="relative cursor-pointer" @click="addGroup">
    <span class="fixed right-0 bottom-0 pt-1 pb-3 px-4 m-3 text-center font-bold text-3xl bg-gray-700 rounded-full">
      +
    </span>
  </button>
</template>

<script setup>
import { ref } from 'vue';
import GroupViews from '../views/GroupViews.vue';

const groups = ref([{ id: Date.now() }]);

function addGroup() {
  groups.value.push({ id: Date.now() });
}

function removeGroup(id) {
  groups.value = groups.value.filter(group => group.id !== id);
}
</script>
