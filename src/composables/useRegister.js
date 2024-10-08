
import { ref } from 'vue';
import { supabase } from '../supabase';
import { useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';
import { useDarkModeStore } from '@/store/darkMode';
import { useUserStore } from '@/store/user';

export function useRegister() {
  const firstName = ref('');
  const lastName = ref('');
  const email = ref('');
  const password = ref('');
  const repeatPassword = ref('');
  const errors = ref({});
  const router = useRouter();
  const darkModeStore = useDarkModeStore();

  const validateForm = () => {
    errors.value = {};

    if (!firstName.value) {
      errors.value.firstName = 'First name is required';
    }

    if (!lastName.value) {
      errors.value.lastName = 'Last name is required';
    }

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

  const register = async () => {
    if (validateForm()) {
      try {
        // Concatenate first name and last name to form full name

        // Register user with Supabase
        const { data, error: authError } = await supabase.auth.signUp({
          email: email.value,
          password: password.value,
          options: {
            data: {
              first_name: firstName.value,
              last_name: lastName.value,
            },
          },
        });

        console.log(data);
        const userStore = useUserStore();
        userStore.setEmail(email.value);

        // Error signing up
        if (authError) {
          console.error('Error creating user:', authError);
          toast.error('There was an error creating your account.', {
            theme: darkModeStore.isDarkMode ? 'dark' : 'light',
            position: "top-right",
          });
          return;
        }


        else {
          console.log('User created and details inserted successfully');
          showSuccessToast();
          setTimeout(() => {
            router.push('/first-login');
          }, 2000);
        }
      } catch (error) {
        console.error('Unexpected error:', error);
        toast.error('An unexpected error occurred.', {
          theme: darkModeStore.isDarkMode ? 'dark' : 'light',
          position: "top-right",
        });
      }
    }
  };



  const showSuccessToast = () => {
    toast.success('Successfully registered!', {
      theme: darkModeStore.isDarkMode ? 'dark' : 'light',
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return {
    firstName,
    lastName,
    email,
    password,
    repeatPassword,
    errors,
    register,
  };
}
