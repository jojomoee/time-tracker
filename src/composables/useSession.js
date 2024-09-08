
import { ref, watch } from 'vue';
import { supabase } from '../supabase';  // Adjust the import path

export function useSession() {
  const isLoggedIn = ref(false);


  const checkLoginStatus = async () => {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) throw error;
      isLoggedIn.value = !!session;
      console.log(isLoggedIn.value)
    } catch (error) {
      console.error('Error fetching session:', error.message);
      isLoggedIn.value = false;
    }
  };


  watch(isLoggedIn, (newValue) => {
    // Watch for changes in isLoggedIn and update UI or perform actions as needed
    console.log('Login status changed:', newValue);
  });

  return {
    isLoggedIn,
    checkLoginStatus
  };
}
