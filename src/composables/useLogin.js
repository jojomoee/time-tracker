import { ref } from 'vue';
import { supabase } from '../supabase';
import { useRouter } from 'vue-router';

export function useLogin() {
  const email = ref('');
  const password = ref('');
  const errors = ref({});
  const router = useRouter();

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
          errors.value.general = error.message;
          return;
        }

        // Redirect to home or other protected route
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
