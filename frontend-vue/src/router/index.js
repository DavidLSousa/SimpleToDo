import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '@/components/LoginPage.vue'
import RegisterPage from '@/components/RegisterPage.vue'
import MainPage from '@/components/MainPage.vue'
import ToDoPage from '@/components/ToDoPage.vue'
import PerfilPage from '@/components/PerfilPage.vue'

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
    },
    {
      path:'/perfil',
      component: PerfilPage
    }
  ],
})

export default router
