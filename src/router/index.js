import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegistrationView.vue'
import HomeView from '../views/HomeView.vue'
import FirstLoginView from '../views/FirstLoginView.vue'
import UserListView from '../views/UserListView.vue'
import DashboardView from '../views/DashboardView.vue'
import TimesView from '../views/TimesView.vue'
import SpacesView from '../views/SpacesView.vue'

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
      path: '/first-login',
      name: 'first-login',
      component: FirstLoginView
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
      path: '/times',
      name: 'Times',
      component: TimesView
    },
    {
      path: '/spaces/:id',
      name: 'SpaceDetail',
      component: SpacesView,
      props: true,
    },
    {
      path: '/spaces',
      name: 'Spaces',
      component: SpacesView
    },
    {
      path: '/users',
      name: 'users',
      component: UserListView
    },

  ]
})

export default router
