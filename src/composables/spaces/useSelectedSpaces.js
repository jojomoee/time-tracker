import { ref } from 'vue';
import { supabase } from '../../supabase';
import { useSession } from '../useSession';

export function useSelectedSpaces() {
  const { user, checkLoginStatus } = useSession();
  const selectedSpaceId = ref(null);

  // Function to set the selected space ID manually and fetch its details
  const setSelectedSpaceId = async (spaceId) => {
    selectedSpaceId.value = spaceId;
    await fetchSelectedSpace(); // Fetch details for the newly selected space
  };

  const saveSelectedSpace = async (spaceId) => {
    try {
      if (!user.value) {
        await checkLoginStatus();
      }

      const { error } = await supabase
        .from('profiles')
        .update({ selected_space_id: spaceId })
        .eq('id', user.value.id);

      if (error) throw error;

      selectedSpaceId.value = spaceId;
    } catch (error) {
      console.error('Error saving selected space:', error.message);
    }
  };

  const fetchSelectedSpace = async () => {
    try {
      if (!user.value) {
        await checkLoginStatus();
      }

      const { data, error } = await supabase
        .from('profiles')
        .select('selected_space_id')
        .eq('id', user.value.id)
        .single();

      if (error) throw error;

      selectedSpaceId.value = data.selected_space_id;
    } catch (error) {
      console.error('Error fetching selected space:', error.message);
    }
  };

  return {
    selectedSpaceId,
    setSelectedSpaceId,
    saveSelectedSpace,
    fetchSelectedSpace,
  };
}
