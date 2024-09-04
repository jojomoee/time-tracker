<script setup>
import { ref } from 'vue'
import TheLogin from '../components/TheLogin.vue'

const email = ref('')
const password = ref('')

const login = () => {
  // Handle login logic here
  console.log('Email:', email.value)
  console.log('Password:', password.value)
}
</script>


<template>
  <form @submit.prevent="login">
    <TheLogin />
  </form>
</template>
