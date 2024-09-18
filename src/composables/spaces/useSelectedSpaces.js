import { ref, onMounted } from 'vue';
import { supabase } from '../../supabase';
import { useSession } from '../useSession';

export function useSelectedSpaces() {
  const { user, checkLoginStatus } = useSession();  // Import user and checkLoginStatus
  const selectedSpace = ref(null);

  // Function to save the selected space to Supabase
  const saveSelectedSpace = async (spaceId) => {
    try {
      if (!user.value) {
        await checkLoginStatus();  // Ensure the user is logged in
      }

      const { error } = await supabase
        .from('profiles') // Assuming you are using the 'users' table (profiles)
        .update({ selected_space_id: spaceId })
        .eq('id', user.value.id); // Use the user ID to update the selected space

      if (error) throw error;

      selectedSpace.value = spaceId;
    } catch (error) {
      console.error('Error saving selected space:', error.message);
    }
  };

  // Function to fetch the selected space from Supabase
  const fetchSelectedSpace = async () => {
    try {
      if (!user.value) {
        await checkLoginStatus();  // Ensure the user is logged in
      }

      const { data, error } = await supabase
        .from('profiles') // Assuming the table is 'users'
        .select('selected_space_id')
        .eq('id', user.value.id) // Get the selected space based on the logged-in user
        .single();
      console.log(data)

      if (error) throw error;

      selectedSpace.value = data.selected_space_id;
    } catch (error) {
      console.error('Error fetching selected space:', error.message);
    }
  };

  // Fetch selected space on component mount
  //  onMounted(async () => {
  //    await checkLoginStatus();  // Ensure the session is checked
  //    fetchSelectedSpace();  // Fetch the space after checking the login status
  //  });

  return {
    selectedSpace,
    saveSelectedSpace,
    fetchSelectedSpace,
  };
}
