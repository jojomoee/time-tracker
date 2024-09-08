<template>
  <TheThemeToggle :isDarkMode="darkModeStore.isDarkMode" @toggleDarkMode="darkModeStore.toggleDarkMode" />
  <form @submit.prevent="login">
    <TheLogin />
  </form>
</template>

<script setup>
import TheLogin from '../components/Login/TheLogin.vue';
import TheThemeToggle from '../components/Theme/TheThemeToggle.vue'

import { useDarkModeStore } from '../store/darkMode';

const darkModeStore = useDarkModeStore();
</script>
