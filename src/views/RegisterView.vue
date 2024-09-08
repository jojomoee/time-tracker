<script setup>
import TheRegistration from '../components/Registration/TheRegistration.vue'
import TheThemeToggle from '../components/Theme/TheThemeToggle.vue'
import { useDarkModeStore } from '../store/darkMode';

const darkModeStore = useDarkModeStore();

</script>


<template>
  <TheThemeToggle :isDarkMode="darkModeStore.isDarkMode" @toggleDarkMode="darkModeStore.toggleDarkMode" />
  <form @submit.prevent="login">
    <TheRegistration />
  </form>
</template>
