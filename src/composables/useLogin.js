import { ref } from 'vue'

export function useLogin() {
  const email = ref('')
  const password = ref('')
  const errors = ref({})

  const validateForm = () => {
    errors.value = {}

    if (!email.value) {
      errors.value.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(email.value)) {
      errors.value.email = 'Invalid email address'
    }

    if (!password.value) {
      errors.value.password = 'Password is required'
    } else if (password.value.length < 6) {
      errors.value.password = 'Password must be at least 6 characters long'
    }

    return Object.keys(errors.value).length === 0
  }

  const handleSubmit = () => {
    if (validateForm()) {
      // Your login logic (e.g., API call) goes here
      console.log('Logging in with:', { email: email.value, password: password.value })
    }
  }

  return {
    email,
    password,
    errors,
    handleSubmit,
  }
}
