import { ref } from 'vue';
import { supabase } from '../supabase';  // Adjust the import path

export function useSession() {
  const isLoggedIn = ref(false);
  const user = ref(null);  // Add user state

  const checkLoginStatus = async () => {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) throw error;

      isLoggedIn.value = !!session;
      user.value = session ? session.user : null; // Set the user if logged in
    } catch (error) {
      console.error('Error fetching session:', error.message);
      isLoggedIn.value = false;
      user.value = null;
    }
  };

  // Function to fetch only the userId
  const getUserId = async () => {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) throw error;

      return session?.user?.id || null; // Return user ID or null if not logged in
    } catch (error) {
      console.error('Error fetching userId:', error.message);
      return null;
    }
  };

  return {
    isLoggedIn,
    user,
    checkLoginStatus,
    getUserId // Return the new function to get the userId
  };
}
