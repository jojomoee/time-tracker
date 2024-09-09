<template>
  <TheThemeToggle class="absolute" />
  <div class="flex items-center justify-center flex-col min-h-screen dark:bg-primary-950">
    <h1 class="text-center text-4xl mb-10">Time Tracker</h1>
    <div class="w-full max-w-md rounded-lg shadow-md p-6 dark:bg-primary-900">
      <h2 class="text-2xl font-bold text-center mb-4 text-gray-900 dark:text-gray-100">Login</h2>
      <form @submit.prevent="handleSubmit">
        <div class="mb-6">
          <EmailInput v-model="email" :error="errors.email" />
        </div>
        <div class="mb-6">
          <PasswordInput v-model="password" :error="errors.password" />
        </div>
        <p v-if="errors.general" class="text-red-500 text-center mb-4">{{ errors.general }}</p>
        <FormButtons />
      </form>
    </div>
  </div>
</template>

<script setup>
import { useLogin } from '@/composables/useLogin'
import EmailInput from './EmailInput.vue'
import PasswordInput from './PasswordInput.vue'
import FormButtons from './FormButtons.vue'
import TheThemeToggle from '../Theme/TheThemeToggle.vue'

// Use the useLogin composable
const { email, password, errors, handleSubmit } = useLogin()
</script>
