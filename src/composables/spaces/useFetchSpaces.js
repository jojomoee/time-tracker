// Here we just fetch The Space
import { ref } from 'vue';
import { supabase } from '../../supabase';


export function useFetchSpaces() {
  const spaces = ref([]);
  const loading = ref(false);
  const error = ref(null);

  const fetchSpaces = async () => {
    loading.value = true;
    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError) {
        throw userError;
      }
      let { data, error: fetchError } = await supabase
        .from('spaces')
        .select('*')
        .eq('owner_id', user.id);
      if (fetchError) throw fetchError;
      spaces.value = data;
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  return {
    spaces,
    loading,
    error,
    fetchSpaces,
  };
}
