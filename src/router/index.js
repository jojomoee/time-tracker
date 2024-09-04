import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import AboutView from '../views/AboutView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/about',
      name: 'About',
      component: AboutView
    },
    {
      path: '/',
      name: 'Login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'Register',
      component: RegisterView
    }
  ]
})

export default router
