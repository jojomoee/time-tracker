<template>
  <div class="flex items-center justify-center flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
    <h1 class="text-center text-gray-900 dark:text-white text-4xl mb-10 "> Time tracker</h1>
    <div class="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h2 class="text-2xl font-bold text-center mb-4 text-gray-900 dark:text-gray-100">Login</h2>
      <form @submit.prevent="login">
        <div class="mb-4">
          <label class="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" for="email">
            Email
          </label>
          <input v-model="email" type="email" id="email"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-white dark:placeholder-white dark:bg-gray-800 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter your email" required />
        </div>
        <div class="mb-6">
          <label class="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" for="password">
            Password
          </label>
          <input v-model="password" type="password" id="password"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-200 dark:text-white dark:placeholder-white dark:bg-gray-800 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter your password" required />
        </div>
        <div class="flex items-center justify-between flex-col">
          <button type="submit"
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Login
          </button>
          <div class="flex flex-col justify-center items-center">
            <a href="#"
              class="mt-5 inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-600">
              Forgot Password?
            </a>

            <router-link to="/register"
              class="mt-5 inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-600">
              New? Create an Account.
            </router-link>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const email = ref('')
const password = ref('')

const login = () => {
  // Handle login logic here
  console.log('Email:', email.value)
  console.log('Password:', password.value)
}
</script>
