import { ref, onMounted, watch } from 'vue';
import { supabase } from '../supabase';  // Adjust the import path

export function useLogout() {
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

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      await checkLoginStatus();  // Update login status after logout
    } catch (error) {
      console.error('Error logging out:', error.message);
    }
  };

  onMounted(() => {
    checkLoginStatus();  // Check login status on mount
  });

  watch(isLoggedIn, (newValue) => {
    // Watch for changes in isLoggedIn and update UI or perform actions as needed
    console.log('Login status changed:', newValue);
  });

  return {
    isLoggedIn,
    logout,
    checkLoginStatus
  };
}
