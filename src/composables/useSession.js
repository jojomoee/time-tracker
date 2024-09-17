
import { ref, watch } from 'vue';
import { supabase } from '../supabase';  // Adjust the import path

export function useSession() {
  const isLoggedIn = ref(false);
  const user = ref(null);  // Add user state

  const checkLoginStatus = async () => {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) throw error;
      //For Login 
      isLoggedIn.value = !!session;

      user.value = session ? session.user : null; // Set the user if logged in
    } catch (error) {
      console.error('Error fetching session:', error.message);
      isLoggedIn.value = false;
      user.value = null;
    }
  };

  //  watch(isLoggedIn, (newValue) => {
  //    console.log('Login status changed:', newValue);
  //  });

  return {
    isLoggedIn,
    user, // Return the user object
    checkLoginStatus
  };
}
