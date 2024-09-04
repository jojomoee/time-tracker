<!-- src/components/CollapsibleNavbar.vue -->
<template>
  <nav class="top-10 right-10 bg-gray-100 dark:bg-gray-900 rounded ">
    <div class="container mx-auto flex items-center justify-center flex-col">
      <button @click="toggleNavbar" class=" text-white focus:outline-none md:hidden">

        <svg :class="[
          'w-10 h-10',
          isDarkMode ? 'stroke-white' : 'stroke-black'
        ]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </button>
      <div :class="[
        'w-full md:flex md:items-center md:w-auto',
        isNavbarOpen ? 'block' : 'hidden',
      ]">
        <ul class="md:flex md:space-x-6 text-whit md:mt-0">
          <li><router-link to="/about"
              class="text-center mb-5 text-gray-900 dark:text-white block md:inline">About</router-link>
          </li>
          <li><router-link to="/"
              class="text-center mb-5 text-gray-900 dark:text-white block md:inline">Login</router-link></li>

          <li class="text-center">
            <button class="text-center text-gray-900 dark:text-white" @click="toggleDarkMode">
              {{ isDarkMode ? 'Light Mode' : 'Dark Mode' }}
            </button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue';

const isNavbarOpen = ref(false);

function toggleNavbar() {
  isNavbarOpen.value = !isNavbarOpen.value;
}


const isDarkMode = ref(true)

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value
  if (isDarkMode.value) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

if (isDarkMode.value) {
  document.documentElement.classList.add('dark')
}
</script>

<style scoped>
/* Optional: Customize styles here */
</style>
