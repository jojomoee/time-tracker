<template>
  <router-link to="/login" v-if="isLoggedIn" @click="logout"
    class="text-center border-gray-800 p-5 mb-5 text-gray-900 dark:text-white block md:inline">
    Logout
  </router-link>
</template>

<script setup>

import { useLogout } from '@/composables/useLogout'

const { isLoggedIn, logout } = useLogout()
</script>
