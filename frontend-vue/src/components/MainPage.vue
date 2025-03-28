<template>
  <div class="flex p-4 mt-16">
    <div class="bg-gray-100 shadow-lg rounded-lg p-6 w-full min-w-[250px] max-w-full flex-col">
      <h2 class="text-2xl font-bold text-gray-700 mb-4"> Tarefas </h2>

      <div class="flex mb-4">
        <textarea v-model="newToDo" @keyup.enter="addToDo" placeholder="Nova tarefa..."
          class="flex-1 p-2 border rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none overflow-hidden min-h-[40px]"></textarea>
        <button @click="addToDo"
          class="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600 cursor-pointer">Add</button>
      </div>

      <ul>
        <li v-for="(tarefa, index) in toDos" :key="index"
          class="flex justify-between items-center bg-gray-50 p-2 rounded mb-2 break-words">
          <span :class="{ 'line-through text-gray-400': tarefa.completed }" class="cursor-pointer break-words w-full"
            @click="toggleToDo(index)">
            {{ tarefa.text }}
          </span>
          <button @click="removeToDo(index)" class="text-red-500 hover:text-red-700 cursor-pointer">❌</button>
        </li>
      </ul>
    </div>
  </div>

</template>

<script setup>
import { ref } from 'vue';

const newToDo = ref('');
const toDos = ref([]);

const addToDo = () => {
  if (newToDo.value.trim() !== '') {
    toDos.value.push({
      text: newToDo.value,
      completed: false
    });
    newToDo.value = '';
  }
};

const toggleToDo = (index) => {
  toDos.value[index].completed = !toDos.value[index].completed;
};

const removeToDo = (index) => {
  toDos.value.splice(index, 1);
};

</script>
