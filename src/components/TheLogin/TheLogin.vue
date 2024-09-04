<template>
  <div class="flex items-center justify-center flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
    <h1 class="text-center text-gray-900 dark:text-white text-4xl mb-10">Time Tracker</h1>
    <div class="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h2 class="text-2xl font-bold text-center mb-4 text-gray-900 dark:text-gray-100">Login</h2>
      <form @submit.prevent="handleSubmit">
        <EmailInput v-model="email" :error="errors.email" />
        <PasswordInput v-model="password" :error="errors.password" />
        <FormButtons />
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import EmailInput from './EmailInput.vue'
import PasswordInput from './PasswordInput.vue'
import FormButtons from './FormButtons.vue'

const email = ref('')
const password = ref('')
const errors = ref({})

// Add your handleSubmit logic
//
const handleSubmit = () => {
  console.log(email.value)
}
</script>
