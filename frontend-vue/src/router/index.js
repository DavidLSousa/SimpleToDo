import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '@/components/LoginPage.vue'
import LogonPage from '@/components/LoginPage.vue'
import MainPage from '@/components/MainPage.vue'

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
      path: '/logon',
      component: LogonPage,
    }
  ],
})

export default router
