<template>
  <ul class="md:flex md:space-x-6 text-white md:mt-0">
    <li>
      <router-link to="/about" class="text-center border-gray-800 p-5 text-gray-900 dark:text-white block md:inline">
        About
      </router-link>
    </li>
    <li>
      <router-link v-if="!isLoggedIn" to="/login"
        class="text-center border-gray-800 p-5 mb-5 text-gray-900 dark:text-white block md:inline">
        Login
      </router-link>
      <button v-if="isLoggedIn" @click="handleLogout"
        class="text-center border-gray-800 p-5 mb-5 text-gray-900 dark:text-white block md:inline">
        Logout
      </button>
    </li>
    <li class="text-center border-gray-800 text-gray-900 dark:text-white block md:inline">
      <button class="text-center mb-5 text-gray-900 dark:text-white" @click="toggleDarkMode">
        {{ isDarkMode ? 'Light Mode' : 'Dark Mode' }}
      </button>
    </li>
  </ul>
</template>

<script setup>
import { useNavbar } from '@/composables/useNavbar';
import { defineEmits, defineProps } from 'vue';

const { isLoggedIn, logout } = useNavbar();
const emits = defineEmits(['toggleDarkMode']);
defineProps({
  isDarkMode: Boolean
});

function toggleDarkMode() {
  emits('toggleDarkMode');
}

async function handleLogout() {
  await logout();
}
</script>

<style scoped>
/* Optional: Customize styles here */
</style>
