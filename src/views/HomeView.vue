<template>
  <TheThemeToggle :isDarkMode="darkModeStore.isDarkMode" @toggleDarkMode="darkModeStore.toggleDarkMode" />
  <main>
    <TheHome />
  </main>
</template>

<script setup>
import TheHome from '../components/Home/TheHome.vue'
import TheThemeToggle from '../components/Theme/TheThemeToggle.vue'

import { useDarkModeStore } from '../store/darkMode';

const darkModeStore = useDarkModeStore();
</script>
