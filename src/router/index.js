import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegistrationView.vue'
import HomeView from '../views/HomeView.vue'
import FirstLoginView from '../views/FirstLoginView.vue'
import UserListView from '../views/UserListView.vue'
import DashboardView from '../views/DashboardView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginView,
      meta: { transition: 'slide-left' },
    },
    {
      path: '/register',
      name: 'Register',
      component: RegisterView,
      meta: { transition: 'slide-left' },
    },
    {
      path: '/home',
      name: 'Home',
      component: HomeView,
    },

    {
      path: '/dashboard',
      name: 'Dashboard',
      component: DashboardView
    },
    {
      path: '/first-login',
      name: 'first-login',
      component: FirstLoginView
    },

    {
      path: '/user-list',
      name: 'user-list',
      component: UserListView
    }

  ]
})

export default router
