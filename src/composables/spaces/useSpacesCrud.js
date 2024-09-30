import { ref } from 'vue';
import { supabase } from '../../supabase';
import { useSession } from '../useSession'
export function useSpacesCrud() {
  const spaceName = ref('');
  const spaceId = ref('');
  const spaces = ref([]);

  // Loading states for each operation
  const isCreating = ref(false);
  const isFetching = ref(false);
  const isUpdating = ref(false);
  const isDeleting = ref(false);
  const { getUserId } = useSession();


  const createSpace = async (spaceName) => {
    if (!spaceName) {
      return null; // Return null if no space name is provided
    }

    isCreating.value = true; // Set loading state to true
    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError) throw userError;

      const { data: newSpace, error: insertError } = await supabase
        .from('spaces')
        .insert([{ name: spaceName, owner_id: user.id }])
        .select()
        .single();

      if (insertError) throw insertError;

      return newSpace; // Return the newly created space
    } catch (error) {
      console.error('Error creating space:', error.message);
      return null; // Return null in case of error
    } finally {
      isCreating.value = false; // Set loading state back to false
    }
  };

  // Fetch spaces
  const fetchSpaces = async () => {
    isFetching.value = true; // Set loading state to true
    const userId = await getUserId();
    try {
      const { data: ownedSpaces, error: ownerError } = await supabase
        .from('spaces')
        .select('*')
        .eq('owner_id', userId);

      if (ownerError) {
        throw ownerError;
      }

      // Fetch spaces where the user is invited (in space_profiles)
      const { data: invitedSpaces, error: inviteError } = await supabase
        .from('space_profiles')
        .select('spaces(*)')  // Fetch the related spaces
        .eq('user_id', userId);

      if (inviteError) {
        throw inviteError;
      }

      // Extract spaces from the invitedSpaces result
      const invitedSpacesList = invitedSpaces.map(profile => profile.spaces);

      // Combine owned and invited spaces
      const allSpaces = [...ownedSpaces, ...invitedSpacesList];


      spaces.value = allSpaces;

    } catch (error) {
      console.error('Error fetching spaces:', error.message);
    } finally {
      isFetching.value = false; // Set loading state back to false
    }
  };

  // Update space
  const updateSpace = async (id, newName) => {
    isUpdating.value = true; // Set loading state to true
    try {
      const { error } = await supabase
        .from('spaces')
        .update({ name: newName })
        .eq('id', id);

      if (error) throw error;

      fetchSpaces(); // Refresh spaces after updating
    } catch (error) {
      console.error('Error updating space:', error.message);
    } finally {
      isUpdating.value = false; // Set loading state back to false
    }
  };

  // Delete space
  const deleteSpace = async (id) => {
    isDeleting.value = true; // Set loading state to true
    try {
      const { error } = await supabase
        .from('spaces')
        .delete()
        .eq('id', id);

      if (error) throw error;

      fetchSpaces(); // Refresh spaces after deleting
    } catch (error) {
      console.error('Error deleting space:', error.message);
    } finally {
      isDeleting.value = false; // Set loading state back to false
    }
  };



  return {
    spaceName,
    spaceId,
    spaces,
    isCreating,
    isFetching,
    isUpdating,
    isDeleting,
    createSpace,
    fetchSpaces,
    updateSpace,
    deleteSpace,
  };
}
