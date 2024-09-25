<script setup>

const handleDeleteSpace = async () => {
  try {
    // Find the space to be deleted
    const spaceToDelete = spaces.value.find(space => space.id === selectedSpaceId.value);

    if (spaceToDelete) {
      await deleteSpace(selectedSpaceId.value);
      deleteDialogVisible.value = false;

      // Remove the deleted space from the local state
      spaces.value = spaces.value.filter(space => space.id !== selectedSpaceId.value);
    } else {
      console.error('Selected space not found for deletion');
    }
  } catch (error) {
    console.error('Error deleting space:', error.message);
  }
};










@spaceDeleted="removeSpace"
const visible = ref(false);

const newSpaceName = ref(''); // Store the name of the new space for deleting


const selectedSpaceName = computed(() => {
  const selectedSpace = props.spaces.value.find(space => space.id === selectedSpaceId.value);
  return selectedSpace ? selectedSpace.name : '';
});

const removeSpace = (deletedSpaceId) => {
  spaces.value = spaces.value.filter(space => space.id !== deletedSpaceId);
};


// Function to select a space, since there would be a short
// Loading time when selecting a space this function isnatanly selects a space also there is a prevous selected
// Space if the selection fails
const selectSpaceFrontend = async (spaceId) => {
  const previousSelectedSpace = selectedSpaceId.value;
  selectedSpaceId.value = spaceId;

  try {
    await saveSelectedSpace(spaceId);
  } catch (error) {
    console.error('Failed to save selected space:', error);
    selectedSpaceId.value = previousSelectedSpace;
  }
};

// Function to save the new space
const saveNewSpace = async () => {
  if (newSpaceName.value.trim() === '') {
    console.error('Space name cannot be empty.');
    return;
  }
  try {
    const newSpace = await createSpace(newSpaceName.value); // Call the modified createSpace
    if (newSpace) {
      visible.value = false; // Close the dialog
      newSpaceName.value = ''; // Clear the input

      // Add the new space to the local state
      spaces.value.push(newSpace); // Assuming spaces is a reactive array
      selectedSpaceId.value = newSpace.id;

      console.log(spaces)
    } else {
      console.error('Failed to create a new space.');
    }
  } catch (error) {
    console.error('Error creating space:', error.message);
  }

};

</script>
