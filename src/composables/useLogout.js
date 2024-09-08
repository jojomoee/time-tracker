import { onMounted, watch } from 'vue';
import { supabase } from '../supabase';  // Adjust the import path
import { useSession } from './useSession';

export function useLogout() {

  const { isLoggedIn, checkLoginStatus } = useSession()

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      console.log("logged out")
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
