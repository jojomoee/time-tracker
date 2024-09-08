import { ref } from 'vue';
import { supabase } from '../supabase';
import { useRouter } from 'vue-router';
import { useSession } from '@/composables/useSession'

export function useLogin() {
  const email = ref('');
  const password = ref('');
  const errors = ref({});
  const router = useRouter();

  const { checkLoginStatus } = useSession();

  const validateForm = () => {
    errors.value = {};

    if (!email.value) {
      errors.value.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email.value)) {
      errors.value.email = 'Invalid email address';
    }

    if (!password.value) {
      errors.value.password = 'Password is required';
    } else if (password.value.length < 6) {
      errors.value.password = 'Password must be at least 6 characters long';
    }

    return Object.keys(errors.value).length === 0;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        const { error } = await supabase.auth.signInWithPassword({
          email: email.value,
          password: password.value,
        });

        if (error) {
          if (error.status === 400) {
            console.error('400 Bad Request:', error.message);

            // Check if the error is related to an unconfirmed email
            if (error.message.includes('Email not confirmed')) {
              errors.value.general = 'Please verify your email. Check your inbox for the confirmation email.';
              return;
            }

            // Check if the error is related to wrong password or invalid credentials
            if (error.message.includes('Invalid login credentials')) {
              errors.value.general = 'Wrong password or email. Please try again.';
              return;
            }

            // Default message for other 400 errors
            errors.value.general = 'Please verify your Email, if the problem persists contact support.';
            return;
          }

          return;
        }

        //to update Login button to Logout
        await checkLoginStatus();
        router.push('/home');
      } catch (err) {
        console.error(err);
        errors.value.general = 'An error occurred, please try again';
      }
    }
  };

  return {
    email,
    password,
    errors,
    handleSubmit,
  };
}
