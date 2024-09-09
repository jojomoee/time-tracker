<template>
  <div>
    <TheThemeToggle />
    <form @submit.prevent="login">
      <TheLogin />
    </form>

  </div>
</template>

<script setup>
import TheLogin from '../components/Login/TheLogin.vue';
import TheThemeToggle from '../components/Theme/TheThemeToggle.vue'

</script>
