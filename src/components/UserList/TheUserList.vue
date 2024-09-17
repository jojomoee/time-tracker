<template>
  <div>
    <h1>Select a Space</h1>
    <ul>
      <li v-for="space in spaces" :key="space.id" @click="selectSpace(space)">
        {{ space.name }}
      </li>
    </ul>

    <div v-if="selectedSpace">
      <h2>Projects in {{ selectedSpace.name }}</h2>
      <ul>
        <li v-for="project in projects" :key="project.id" @click="selectProject(project)">
          {{ project.name }}
        </li>
      </ul>
    </div>

    <div v-if="selectedProject">
      <h3>Tasks in {{ selectedProject.name }}</h3>
      <ul>
        <li v-for="task in tasks" :key="task.id">
          {{ task.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useSpaces } from '../../composables/useSpaces';

const { spaces, selectedSpace, projects, tasks, fetchSpaces, fetchProjects, fetchTasks } = useSpaces();

const selectedProject = ref(null);

const selectSpace = (space) => {
  selectedSpace.value = space;
  fetchProjects(space.id);
};

const selectProject = (project) => {
  selectedProject.value = project;
  fetchTasks(project.id);
};

onMounted(() => {
  fetchSpaces();
});
</script>
