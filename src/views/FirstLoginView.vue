<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
    <div class="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex flex-col">
      <h2 class="text-2xl font-bold text-center mb-4 text-gray-900 dark:text-gray-100">Welcome!</h2>
      <p class="text-center mb-4 text-gray-700 dark:text-gray-300">
        Hi {{ email }}, please verify your email to continue. Check your inbox for a confirmation email.
      </p>
      <button @click="resendVerificationEmail"
        class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
        Resend Verification Email
      </button>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { supabase } from '../supabase';
import { useUserStore } from '@/store/user';



const userStore = useUserStore();
const email = userStore.getEmail();
onMounted(async () => {

});

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
