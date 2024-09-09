<template>
  <TheThemeToggle class="absolute" />
  <div class="flex items-center justify-center flex-col min-h-screen bg-surface-100 dark:bg-surface-950">
    <div
      class="flex items-center justify-center flex-col w-full max-w-md rounded-lg shadow-lg p-6 dark:bg-surface-900 ">
      <h2 class="text-4xl text-center pt-3 pb-6">Login</h2>
      <form class="flex items-center justify-center flex-col  " @submit.prevent="handleSubmit">
        <div class="mb-10">
          <EmailInput v-model="email" :error="errors.email" />
        </div>
        <div class="mb-10">
          <PasswordInput v-model="password" :error="errors.password" />
        </div>
        <p v-if="errors.general" class="text-red-500 text-center mb-4">{{ errors.general }}</p>
        <FormButtons class="mb-6" />
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
