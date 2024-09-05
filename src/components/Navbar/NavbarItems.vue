<template>

  <ul class="md:flex md:space-x-6 text-whit md:mt-0">
    <li><router-link to="/about"
        class="text-center border-gray-800  p-5 text-gray-900 dark:text-white block md:inline">About</router-link>
    </li>
    <li><router-link to="/"
        class="text-center border-gray-800  p-5 mb-5 text-gray-900 dark:text-white block md:inline">Login</router-link>
    </li>
    <li class="text-center border-gray-800 text-gray-900 dark:text-white block md:inline">
      <button class="text-center mb-5 text-gray-900 dark:text-white" @click="toggleDarkMode">
        {{ isDarkMode ? 'Light Mode' : 'Dark Mode' }}
      </button>
    </li>
  </ul>

</template>

<script setup>
/* Optional: Add any additional logic here if needed */

import { defineEmits, defineProps } from 'vue';

const emits = defineEmits(['toggleDarkMode']);
const props = defineProps({
  isDarkMode: Boolean
});


function toggleDarkMode() {
  emits('toggleDarkMode');
}
</script>

<style scoped>
/* Optional: Customize styles here */
</style>
