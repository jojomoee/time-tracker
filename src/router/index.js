import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import HomeView from '../views/HomeView.vue'
import FirstLoginView from '../views/FirstLoginView.vue'
import userListView from '../views/userListView.vue'

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
      component: LoginView
    },
    {
      path: '/register',
      name: 'Register',
      component: RegisterView
    },
    {
      path: '/home',
      name: 'Home',
      component: HomeView
    },
    {
      path: '/first-login',
      name: 'first-login',
      component: FirstLoginView
    },

    {
      path: '/user-list',
      name: 'user-list',
      component: userListView
    }

  ]
})

export default router
