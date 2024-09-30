import { ref } from 'vue';
import { supabase } from '../../supabase';

export function useUserCrud() {
  const profileName = ref(null);
  const profileIds = ref([]);
  const users = ref([]);
  const error = ref(null);
  const loading = ref(false);

  const fetchUserNameOfSelectedSpace = async (spaceId) => {
    loading.value = true;
    error.value = null;
    try {
      const { data, error: fetchError } = await supabase
        .from('spaces')
        .select(`
        owner_id,
        profiles (first_name, last_name)
      `)
        .eq('id', spaceId) // Use space ID to match the specific space
        .single(); // Ensures only one row is returned

      if (fetchError) {
        throw fetchError;
      }
      const profile = data?.profiles;
      profileName.value = profile ? `${profile.first_name} ${profile.last_name}` : null;
    } catch (err) {
      console.error('Error fetching username:', err.message);
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  // Fetch a list of all profiles
  const fetchProfileIds = async () => {
    loading.value = true;
    error.value = null;
    try {
      const { data, error: fetchError } = await supabase
        .from('profiles')
        .select('id'); // Fetches all profiles

      if (fetchError) {
        throw fetchError;
      }
      profileIds.value = data || [];
    } catch (err) {
      console.error('Error fetching profiles:', err.message);
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  const fetchUserEmails = async (userIds) => {
    try {
      // Ensure you're mapping the ids correctly as UUID strings
      const ids = userIds.value.map(user => user.id);

      // Call the Supabase function with the UUID array
      const { data, error } = await supabase.rpc('get_user_emails', { user_ids: ids });

      if (error) {
        throw error;
      }
      console.log(data)
      // Set emails value with the fetched data
      users.value = data || [];
    } catch (err) {
      console.error('Error fetching emails:', err.message);
    }
  };





  return {
    fetchUserEmails,
    users,
    profileName,
    profileIds,   // Expose profiles list
    error,
    loading,
    fetchUserNameOfSelectedSpace,
    fetchProfileIds,  // Expose method to fetch all profiles
  };
}
