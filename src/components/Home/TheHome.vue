<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
    <div class="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <div class="flex justify-center flex-col">
        <h1 class="text-center text-gray-900 dark:text-white text-2xl">Home</h1>
        <LogoutButton />
      </div>
    </div>
  </div>
</template>

<script setup>
import LogoutButton from '../Navigation/LogoutButton.vue'
</script>
