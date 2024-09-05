<script setup>
import { RouterView } from 'vue-router'
import TheNavbar from './components/Navbar/TheNavbar.vue'

</script>

<template>
  <header class="absolute top-5 right-5">
    <TheNavbar />
  </header>


  <RouterView />
</template>

<style scoped></style>
