
import { ref } from 'vue';
import { toast } from 'vue3-toastify';
import { supabase } from '../../supabase'; // Adjust the path to your Supabase instance

export function useSpacesCrud() {
  const spaceName = ref('');
  const spaceId = ref('');
  const spaces = ref([]);

  // Loading states for each operation
  const isCreating = ref(false);
  const isFetching = ref(false);
  const isUpdating = ref(false);
  const isDeleting = ref(false);

  // Create space handler
  const createSpace = async () => {
    if (!spaceName.value) {
      toast.error('Please provide a name for the space.');
      return;
    }

    isCreating.value = true; // Set loading state to true
    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError) throw userError;

      const { data: newSpace, error: insertError } = await supabase
        .from('spaces')
        .insert([{ name: spaceName.value, owner_id: user.id }])
        .select()
        .single();

      if (insertError) throw insertError;

      spaceId.value = newSpace.id;
      toast.success('Space created successfully!');
      spaceName.value = '';
    } catch (error) {
      console.error('Error creating space:', error.message);
      toast.error('Failed to create space. Please try again.');
    } finally {
      isCreating.value = false; // Set loading state back to false
    }
  };

  // Fetch spaces
  const fetchSpaces = async () => {
    isFetching.value = true; // Set loading state to true
    try {
      const { data, error } = await supabase
        .from('spaces')
        .select('*');

      if (error) throw error;

      spaces.value = data;
    } catch (error) {
      console.error('Error fetching spaces:', error.message);
      toast.error('Failed to fetch spaces.');
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

      toast.success('Space updated successfully!');
      fetchSpaces(); // Refresh spaces after updating
    } catch (error) {
      console.error('Error updating space:', error.message);
      toast.error('Failed to update space.');
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

      toast.success('Space deleted successfully!');
      fetchSpaces(); // Refresh spaces after deleting
    } catch (error) {
      console.error('Error deleting space:', error.message);
      toast.error('Failed to delete space.');
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
