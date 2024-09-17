<template>
  <div class="flex items-center justify-center flex-col min-h-screen bg-surface-100 dark:bg-surface-950">
    <div>
      <h1>Projects for Space: {{ selectedSpace?.name }}</h1>
      <ul>
        <li v-for="project in projects" :key="project.id">{{ project.name }}</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, watchEffect, onMounted } from 'vue';
import { supabase } from '../../supabase';
import { useSelectedSpace } from '../../composables/spaces/useSelectedSpace';

// Space store and project state
const projects = ref([]);

// Use the custom composable for selected space
const { selectedSpace, fetchSelectedSpace } = useSelectedSpace();

// Fetch projects based on selected space
const fetchProjects = async () => {
  if (selectedSpace.value) {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('space_id', selectedSpace.value);

      if (error) throw error;
      projects.value = data;
    } catch (error) {
      console.error('Error fetching projects:', error.message);
    }
  }
};

// Watch for changes in the selected space and fetch projects
watchEffect(() => {
  fetchProjects();
});

onMounted(async () => {
  await fetchSelectedSpace(); // Ensure the space is fetched on mount
});
</script>
