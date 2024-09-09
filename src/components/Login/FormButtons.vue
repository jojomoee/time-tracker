<template>
  <div class="flex items-center justify-between flex-col">
    <Button type="submit" label="Login" raised />
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
</template>
<script setup>
import Button from 'primevue/button'
</script>
