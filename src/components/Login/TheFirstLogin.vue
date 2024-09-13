<template>
  <div class="min-h-screen flex items-center justify-center bg-surface-100 dark:bg-surface-950">
    <div class="max-w-md w-full bg-white dark:bg-surface-900 rounded-lg shadow-md p-6 flex flex-col">
      <h2 class="text-2xl font-bold text-center mb-4 ">Welcome!</h2>
      <p class="text-center mb-4 text-gray-700 dark:text-gray-300">
        Hi {{ email }}, please verify your email to continue. Check your inbox for a confirmation email.
      </p>
      <Button label="Resend Verification Email " @click="resendVerificationEmail" />
    </div>
  </div>
</template>

<script setup>
import { supabase } from '../../supabase';
import { useUserStore } from '@/store/user';
import Button from "primevue/button"

const userStore = useUserStore();
const email = userStore.getEmail();


const resendVerificationEmail = async () => {

  const { error } = await supabase.auth.resend({
    type: 'signup',
    email: email,
  })
  if (error) {
    console.error('Error resending verification email:', error.message);
  } else {
    alert('Verification email resent! Please check your inbox.');
  }
};
</script>
