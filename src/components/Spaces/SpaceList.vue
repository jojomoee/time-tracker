<template>
  <SpaceCard v-for="(space, index) in spaces" :key="space.id" :space="space" :selectedSpaceId="selectedSpaceId"
    :index="index" :selectSpaceFrontend="selectSpaceFrontend" />
</template>

<script setup>
import SpaceCard from './SpaceCard.vue';
import { useSelectedSpaces } from '../../composables/spaces/useSelectedSpaces'

const { saveSelectedSpace } = useSelectedSpaces();

const props = defineProps({
  spaces: {
    type: Array,
    required: true,
  },
  selectedSpaceId: {
    type: String
  }
});

const emit = defineEmits(['update:selectedSpaceId']); // Define emit for the event

const selectSpaceFrontend = async (spaceId) => {
  const previousSelectedSpace = props.selectedSpaceId; // Store the previous selected space
  emit('update:selectedSpaceId', spaceId);
  try {
    await saveSelectedSpace(spaceId); // Save the selected space
    emit('update:selectedSpaceId', spaceId); // Emit the event to update selectedSpaceId
  } catch (error) {
    console.error('Failed to save selected space:', error);
    emit('update:selectedSpaceId', previousSelectedSpace); // Emit the previous selected space in case of an error
  }
};


</script>
