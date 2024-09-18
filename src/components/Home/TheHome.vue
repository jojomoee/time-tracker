<template>
  <div class="flex items-center justify-center flex-col min-h-screen bg-surface-100 dark:bg-surface-950">
    <div v-if="spaces">
      <h1>Projects for Space: {{ spaces.name }}</h1>
      <ul>
        <li v-for="project in projects" :key="project.id">{{ project.name }}</li>
      </ul>
    </div>
    <div v-else>
      <p>Loading space...</p>
    </div>
  </div>
</template>

<script setup>
import { ref, watchEffect, onMounted } from 'vue';
import { supabase } from '../../supabase';
import { useSelectedSpaces } from '../../composables/spaces/useSelectedSpaces';

// Project state and space details
const projects = ref([]);
const spaces = ref(null);

// Use the custom composable for selected space
const { selectedSpace, fetchSelectedSpace } = useSelectedSpaces();

// Fetch space details
const fetchSpaceDetails = async () => {
  try {
    if (!selectedSpace.value) return;
    const { data, error } = await supabase
      .from('spaces')
      .select('name')
      .eq('id', selectedSpace.value)
      .single();

    if (error) throw error;

    spaces.value = data; // Store the fetched space details
  } catch (error) {
    console.error('Error fetching space details:', error.message);
  }
};

// Fetch projects based on the selected space
const fetchProjects = async () => {
  try {
    if (!selectedSpace.value) return;
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('space_id', selectedSpace.value);

    if (error) throw error;
    projects.value = data;
  } catch (error) {
    console.error('Error fetching projects:', error.message);
  }
};

// Watch for changes in selectedSpace and fetch space/projects data
watchEffect(() => {
  if (selectedSpace.value) {
    fetchSpaceDetails();
    fetchProjects();
  }
});

onMounted(async () => {
  await fetchSelectedSpace(); // Ensure the space is fetched on mount
});
</script>
