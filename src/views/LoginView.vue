<template>

  <TheThemeToggle />
  <form @submit.prevent="login">
    <TheLogin />
  </form>
</template>

<script setup>
import TheLogin from '../components/Login/TheLogin.vue';
import TheThemeToggle from '../components/Theme/TheThemeToggle.vue'

</script>
