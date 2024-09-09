<template>
  <div class="flex items-center justify-between flex-col">
    <Button type="submit" class="mb-6 " label="Login" raised />
    <div class="flex flex-col justify-center items-center">
      <router-link class="hover:text-primary-200 text p-3 underline" to="">
        Forgot Password?
      </router-link>
      <router-link class="hover:text-primary-200 p-3 underline" to="/register">
        Create an Account
      </router-link>
    </div>
  </div>
</template>
<script setup>
import Button from 'primevue/button'
</script>
