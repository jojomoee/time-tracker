import { ref } from 'vue';
import { supabase } from '../../supabase';

export function useUserCrud() {
  const firstName = ref(null);
  const error = ref(null);
  const loading = ref(false);

  const fetchUsername = async (userId) => {
    loading.value = true;
    error.value = null;
    try {
      const { data, error: fetchError } = await supabase
        .from('profiles')
        .select('first_name')
        .eq('id', userId)
        .single(); // Ensures only one row is returned

      if (fetchError) {
        throw fetchError;
      }
      console.log(data)
      firstName.value = data ? data.first_name : null;
    } catch (err) {
      console.error('Error fetching username:', err.message);
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  return {
    firstName,
    error,
    loading,
    fetchUsername
  };
}
