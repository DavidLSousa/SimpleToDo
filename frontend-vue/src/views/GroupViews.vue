<template>
  <div class="bg-gray-100 shadow-lg rounded-lg p-6 w-full min-w-[250px] max-w-full flex-col">
    <div class="flex flex-row justify-between items-center mb-4">
      <h2 v-if="!editMode" class="text-2xl font-bold text-gray-700 cursor-pointer truncate" @click="editMode = true">
        {{ groupName }}
      </h2>
      <input
        v-else
        v-model="groupName"
        @blur="editMode = false"
        @keyup.enter="editMode = false"
        class="text-2xl font-bold text-gray-700 border-b-2 focus:outline-none w-auto max-w-3/4"
        autofocus
      />
      <button
        @click="$emit('removeGroup')"
        class="text-red-500 hover:text-red-700 cursor-pointer"
      >
        ❌
      </button>
    </div>

    <div class="flex mb-4">
      <textarea
        v-model="novaTarefa"
        @keyup.enter="addToDo"
        placeholder="Nova tarefa..."
        class="flex-1 p-2 border rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none overflow-hidden min-h-[40px]"
      ></textarea>
      <button
        @click="addToDo"
        class="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600 cursor-pointer"
      >
        Add
      </button>
    </div>

    <ul>
      <li
        v-for="(tarefa, index) in tarefas"
        :key="index"
        class="flex justify-between items-center bg-gray-50 p-2 rounded mb-2 break-words"
      >
        <span
          :class="{ 'line-through text-gray-400': tarefa.concluida }"
          class="cursor-pointer break-words w-full"
          @click="toggleToDo(index)"
        >
          {{ tarefa.texto }}
        </span>
        <button
          @click="removeToDo(index)"
          class="text-red-500 hover:text-red-700 cursor-pointer"
        >
          ❌
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const novaTarefa = ref('');
const tarefas = ref([]);

const editMode = ref(false);
const groupName = ref("Group Name");

const addToDo = () => {
  if (novaTarefa.value.trim() !== '') {
    tarefas.value.push({ texto: novaTarefa.value, concluida: false });
    novaTarefa.value = '';
  }
};

const toggleToDo = (index) => {
  tarefas.value[index].concluida = !tarefas.value[index].concluida;
};

const removeToDo = (index) => {
  tarefas.value.splice(index, 1);
};
</script>
