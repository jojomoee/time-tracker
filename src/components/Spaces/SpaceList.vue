<template>
  <SpaceCard v-for="(space, index) in spaces" :key="space.id" :space="space" :selectedSpaceId="selectedSpaceId"
    :index="index" :selectSpaceFrontend="selectSpaceFrontend" />
</template>

<script setup>
import { useRouter } from 'vue-router'; // Import useRouter
import { computed, watch } from 'vue';
import SpaceCard from './SpaceCard.vue';
import { useSelectedSpaces } from '../../composables/spaces/useSelectedSpaces';

const { saveSelectedSpace } = useSelectedSpaces();
const router = useRouter(); // Initialize the router

const props = defineProps({
  spaces: {
    type: Array,
    required: true,
  },
  selectedSpaceId: {
    type: String,
    default: null
  }
});

const emit = defineEmits(['update:selectedSpaceId']); // Define emit for the event

// Computed property for selected space name
const selectedSpaceName = computed(() => {
  if (!props.selectedSpaceId) return ''; // Return empty string if no selectedSpaceId
  const selectedSpace = props.spaces.find(space => space.id === props.selectedSpaceId);
  return selectedSpace ? selectedSpace.name : '';
});

const selectSpaceFrontend = async (spaceId) => {
  const previousSelectedSpace = props.selectedSpaceId; // Store the previous selected space
  emit('update:selectedSpaceId', spaceId); // Emit the event to update selectedSpaceId
  try {
    await saveSelectedSpace(spaceId); // Save the selected space
    router.push(`/spaces/${selectedSpaceName.value.toLowerCase()}`); // Change the URL to spaces/{spaceName}
  } catch (error) {
    console.error('Failed to save selected space:', error);
    emit('update:selectedSpaceId', previousSelectedSpace); // Emit the previous selected space in case of an error
  }
};


// Optional: Watch for selectedSpaceId changes to update the URL if needed
watch(() => props.selectedSpaceId, (newId) => {
  if (newId) {
    const spaceName = selectedSpaceName.value.toLowerCase();
    if (spaceName) {
      router.push(`/spaces/${spaceName}`);
    }
  }
});

</script>
