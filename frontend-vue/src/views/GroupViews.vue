<template>
  <div class="bg-gray-100 shadow-lg rounded-lg p-6 w-full min-w-[250px] max-w-full flex-col">
    <div class="flex flex-row justify-between items-center mb-4">
      <h2 v-if="!editMode" class="text-2xl font-bold text-gray-700 cursor-pointer truncate" @click="editMode = true">
        {{ groupName }}
      </h2>
      <input
        v-else
        v-model="groupName"
        @blur="updateGroupName"
        @keyup.enter="updateGroupName"
        class="text-2xl font-bold text-gray-700 border-b-2 focus:outline-none w-auto max-w-3/4"
        autofocus
      />
      <button @click="removeGroup" class="text-red-500 hover:text-red-700 cursor-pointer">❌</button>
    </div>

    <div class="flex mb-4">
      <textarea
        v-model="newToDo"
        @keyup.enter="addToDo"
        placeholder="Nova tarefa..."
        class="flex-1 p-2 border rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none overflow-hidden min-h-[40px]"
      ></textarea>
      <button @click="addToDo" class="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600 cursor-pointer">Add</button>
    </div>

    <ul>
      <li v-for="(tarefa, index) in toDos" :key="index" class="flex justify-between items-center bg-gray-50 p-2 rounded mb-2 break-words">
        <span
          :class="{ 'line-through text-gray-400': tarefa.completed }"
          class="cursor-pointer break-words w-full"
          @click="toggleToDo(index)"
        >
          {{ tarefa.text }}
        </span>
        <button @click="removeToDo(index)" class="text-red-500 hover:text-red-700 cursor-pointer">❌</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import { v4 as uuidv4 } from 'uuid';

const newToDo = ref('');
const toDos = ref([]);
const editMode = ref(false);
const groupName = ref("Novo Grupo");
const groupId = ref(uuidv4());

const STORAGE_KEY = `group_${groupId.value}`;

const loadToDos = () => {
  const savedTarefas = localStorage.getItem(STORAGE_KEY);
  if (savedTarefas) {
    const groupData = JSON.parse(savedTarefas);
    groupName.value = groupData.group;
    toDos.value = groupData.tarefas;
  }
};

const saveToDos = () => {
  const groupData = {
    group: groupName.value,
    tarefas: toDos.value
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(groupData));
};

const addToDo = () => {
  if (newToDo.value.trim() !== '') {
    toDos.value.push({ text: newToDo.value, completed: false });
    newToDo.value = '';
    saveToDos();
  }
};

const toggleToDo = (index) => {
  toDos.value[index].completed = !toDos.value[index].completed;
  saveToDos();
};

const removeToDo = (index) => {
  toDos.value.splice(index, 1);
  saveToDos();
};

const updateGroupName = () => {
  saveGroupName();
  editMode.value = false;
};

const saveGroupName = () => {
  const groupData = {
    group: groupName.value,
    tarefas: toDos.value
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(groupData));
};

const emit = defineEmits(['removeGroup']);

const removeGroup = () => {
  localStorage.removeItem(STORAGE_KEY);

  emit('removeGroup');
};

watch(toDos, saveToDos, { deep: true });

onMounted(() => {
  loadToDos();
});
</script>
