<template>
  <div class="flex p-4 mt-16 justify-center">
    <div class="bg-gray-100 shadow-lg rounded-lg p-4 w-full sm:max-w-4xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl">
      <h2 v-if="!loged"  class="text-2xl font-bold text-gray-700 mb-4"> Tarefas </h2>
      <h2 v-else class="text-2xl font-bold text-gray-700 mb-4"> Tarefas de {{ user.name }} </h2>

      <div class="flex mb-4">
        <textarea v-model="newToDo" @keyup.enter="addToDo" placeholder="Nova tarefa..."
          class="flex-1 p-1 border rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none overflow-hidden min-h-[40px]"></textarea>
        <button @click="addToDo"
          class="bg-blue-500 text-white px-3 py-1 rounded-r hover:bg-blue-600 cursor-pointer">Add</button>
      </div>

      <ul>
        <li v-for="(tarefa, index) in toDos" :key="index"
          class="flex justify-between items-center bg-gray-50 p-1 rounded mb-2 break-words">
          <span :class="{ 'line-through text-gray-400': tarefa.completed }" class="cursor-pointer break-words w-full"
            @click="toggleToDo(index)">
            {{ tarefa.title }}
          </span>
          <button @click="removeToDo(index)" class="text-red-500 hover:text-red-700 cursor-pointer">❌</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue';

const newToDo = ref('');
const toDos = ref([]);
const loged = ref(false);
const user = reactive({});

// Front
const addToDo = () => {
  if (newToDo.value.trim() !== '') {
    toDos.value.push({
      title: newToDo.value,
      completed: false
    });

    fecthAddToDo();

    newToDo.value = '';
  }
};
const toggleToDo = (index) => {
  fecthToggleToDo(toDos.value[index].id, toDos.value[index].completed);

  toDos.value[index].completed = !toDos.value[index].completed;
};
const removeToDo = (index) => {
  fecthRemoveToDo(toDos.value[index].id);

  toDos.value.splice(index, 1);
};

// API
const fecthGetUserToDos = async (token) => {
    try {
      const response = await fetch('http://localhost:3000/todos', {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message);
      }

      const { todos } = await response.json();
      toDos.value = todos

    } catch (error) {
      console.log(error.message);
    }
};
const fecthAddToDo = async () => {
  try {
    const token = localStorage.getItem('token')

    const response = await fetch('http://localhost:3000/todos', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ title: newToDo.value }),
    })

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message);
    }

    const { allToDos } = await response.json()

    toDos.value = allToDos

    console.log('Tarefa enviada com sucesso!')

  } catch (error) {
    console.log(error.message)
  }
}
const fecthToggleToDo = async (index, currentStatus) => {
  try {
    const token = localStorage.getItem('token')

    const response = await fetch(`http://localhost:3000/todos/${index}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ currentStatus: currentStatus }),
    })

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message);
    }

    console.log('Tarefa atualizada com sucesso!')

  } catch (error) {
    console.log(error.message)
  }
}
const fecthRemoveToDo = async (toDoId) => {
  try {
    const token = localStorage.getItem('token')

    const response = await fetch(`http://localhost:3000/todos/${toDoId}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message);
    }

    console.log('Tarefa deletada com sucesso!')

  } catch (error) {
    console.log(error.message)
  }
}

onMounted(() => {
  const token = localStorage.getItem('token')
  const userStore = JSON.parse(localStorage.getItem('user'))

  if(!token) return

  loged.value = true
  Object.assign(user, userStore);

  fecthGetUserToDos(token);

});
</script>
