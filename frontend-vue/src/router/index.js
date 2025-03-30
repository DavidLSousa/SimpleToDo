import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '@/components/LoginPage.vue'
import RegisterPage from '@/components/RegisterPage.vue'
import MainPage from '@/components/MainPage.vue'
import ToDoPage from '@/components/ToDoPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: MainPage,
    },
    {
      path: '/login',
      component: LoginPage,
    },
    {
      path: '/registro',
      component: RegisterPage,
    },
    {
      path:'/tarefas',
      component: ToDoPage
    }
  ],
})

export default router
