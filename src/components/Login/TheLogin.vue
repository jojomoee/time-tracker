<template>
  <div class="flex items-center justify-center flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
    <h1 class="text-center text-gray-900 dark:text-white text-4xl mb-10">Time Tracker</h1>
    <div class="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
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

// Use the useLogin composable
const { email, password, errors, handleSubmit } = useLogin()

</script>
