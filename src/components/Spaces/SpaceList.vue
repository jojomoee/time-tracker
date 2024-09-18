<template>
  <div class="min-h-screen flex items-center justify-center bg-surface-100 dark:bg-surface-950">
    <div class="h-5/6 w-5/6 items-center flex justify-center flex-wrap mt-2">
      <SpaceCard v-for="(space, index) in spaces" :key="space.id" :space="space" :selectedSpace="selectedSpace"
        :index="index" :selectSpace="selectSpace" />
      <Button label="Add a Space" />
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import Button from 'primevue/button';
import SpaceCard from './SpaceCard.vue';
import { useSelectedSpaces } from '../../composables/spaces/useSelectedSpaces';
import { useSpacesCrud } from '../../composables/spaces/useSpacesCRUD';

const { selectedSpace, fetchSelectedSpace, saveSelectedSpace } = useSelectedSpaces();
const { spaces, fetchSpaces } = useSpacesCrud();

// Temporarily store the previous selected space for potential rollback
onMounted(() => {
  fetchSelectedSpace(); // Fetch selected space from db
  fetchSpaces(); // Fetch spaces from db
});

const selectSpace = async (spaceId) => {
  const previousSelectedSpace = selectedSpace.value; // Store the previous space before selecting a new one
  selectedSpace.value = spaceId; // Optimistically update the UI

  try {
    await saveSelectedSpace(spaceId); // Save the selected space to the DB
  } catch (error) {
    console.error('Failed to save selected space:', error);
    // Revert to the previous space if saving fails
    selectedSpace.value = previousSelectedSpace;
  }
};
</script>
