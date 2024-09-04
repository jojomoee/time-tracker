<script setup>
import { RouterView } from 'vue-router'
import TheNavbar from './components/TheNavbar.vue'

</script>

<template>
  <header class=" bg-gray-100 dark:bg-gray-900 p-4 shadow-md">
    <TheNavbar />
  </header>


  <RouterView />
</template>

<style scoped></style>
