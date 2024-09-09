<script setup>
import TheRegistration from '../components/Registration/TheRegistration.vue'
import TheThemeToggle from '../components/Theme/TheThemeToggle.vue'


</script>


<template>
  <div>
    <TheThemeToggle />
    <form @submit.prevent="login">
      <TheRegistration />
    </form>
  </div>
</template>
