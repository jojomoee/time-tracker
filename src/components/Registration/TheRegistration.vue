<template>
  <div class="flex items-center justify-center min-h-screen bg-surface-100 dark:bg-surface-950">
    <div class="flex justify-center items-center flex-col w-full max-w-md dark:bg-surface-900 rounded-lg shadow-md p-6">
      <h2 class="text-4xl text-center mb-4 dark:text-gray-100 pb-6 pt-3">Create an Account</h2>
      <form class="flex justify-center items-center flex-col" @submit.prevent="register">
        <div>
          <Fluid>
            <FloatLabel class="mb-8">
              <InputText v-model="firstName" type="text" id="first-name" />
              <label for="first-name">First Name</label>
            </FloatLabel>
            <FloatLabel class="mb-8">
              <InputText v-model="lastName" type="text" id="last-name" />
              <label for="last-name">Last Name</label>
            </FloatLabel>
            <FloatLabel class="mb-8">
              <InputText class="w-full" v-model="email" type="email" id="email" />
              <label for="email">Email</label>
            </FloatLabel>
            <FloatLabel class="mb-8">
              <Password v-model="password" id="password" toggleMask promptLabel="Choose a password">
                <template #footer>
                  <ul class="pl-2 ml-2 my-0 leading-normal">
                    <li>At least one lowercase, uppercase, numeric</li>
                    <li>Minimum 8 characters</li>
                  </ul>
                </template>
              </Password>
              <label for="password">Password</label>
            </FloatLabel>
            <p class="pt-4 pb-12 text-center text-xs">By clicking Create account, I agree that I have read and
              accepted
              the <a href="" class="text-blue-600 visited:text-purple-600"> Terms of Use </a>and
              <a href="" class="text-blue-600 visited:text-purple-600">
                Privacy Policy
              </a>
            </p>
          </Fluid>
        </div>
        <!-- Animated red div -->

        <!-- Submit Button and Link -->
        <div class="flex items-center justify-between flex-col">
          <Button type="submit" label="Create account" />
          <div class="flex flex-col justify-center items-center">
            <router-link to="/login" class="p-6 underline hover:text-primary-200">
              Already have an account? Login.
            </router-link>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { useRegister } from '@/composables/useRegister';  // Import the composable
import FloatLabel from 'primevue/floatlabel';
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import Password from "primevue/password";
import Fluid from 'primevue/fluid';

// Track focus state of the password field

const { firstName, lastName, email, password, register } = useRegister();
</script>

<style scoped></style>
