<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
    <div class="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h2 class="text-2xl font-bold text-center mb-4 text-gray-900 dark:text-gray-100">Register</h2>
      <form @submit.prevent="register">
        <div class="mb-4">
          <label class="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" for="first-name">
            First Name
          </label>
          <input v-model="firstName" type="text" id="first-name"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-white dark:placeholder-white dark:bg-gray-800 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter your first name" required />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" for="last-name">
            Last Name
          </label>
          <input v-model="lastName" type="text" id="last-name"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-white dark:placeholder-white dark:bg-gray-800 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter your last name" required />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" for="email">
            Email
          </label>
          <input v-model="email" type="email" id="email"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-white dark:placeholder-white dark:bg-gray-800 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter your email" required />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" for="password">
            Password
          </label>
          <input v-model="password" type="password" id="password"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-white dark:placeholder-white dark:bg-gray-800 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter your password" required />
        </div>
        <div class="mb-6">
          <label class="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" for="repeat-password">
            Repeat Password
          </label>
          <input v-model="repeatPassword" type="password" id="repeat-password"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-white dark:placeholder-white dark:bg-gray-800 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Repeat your password" required />
        </div>
        <div class="flex items-center justify-between flex-col">
          <button type="submit"
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Register
          </button>
          <div class="flex flex-col justify-center items-center">
            <router-link to="/"
              class="mt-5 inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-600">
              Already have an account? Login.
            </router-link>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { supabase } from '../../supabase' // Import the Supabase client

const firstName = ref('')
const lastName = ref('')
const email = ref('')
const password = ref('')
const repeatPassword = ref('')

const register = async () => {
  // Check if passwords match
  if (password.value !== repeatPassword.value) {
    alert('Passwords do not match!')
    return
  }

  try {
    // Insert new user into the Supabase users table
    const { data, error } = await supabase
      .from('users')
      .insert([
        {
          first_name: firstName.value,
          last_name: lastName.value,
          email: email.value,
          password: password.value // Remember to hash the password in a real application
        }
      ])

    if (error) {
      console.error('Error creating user:', error)
      alert('There was an error creating your account.')
    } else {
      console.log('User created successfully:', data)
      alert('Registration successful!')
      // You can also redirect to another page after successful registration
    }
  } catch (error) {
    console.error('Unexpected error:', error)
    alert('An unexpected error occurred.')
  }
}
</script>
