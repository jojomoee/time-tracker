<template>
  <h1 class="text-2xl m-4 ">Projects</h1>
  <ul class="w-full">
    <li class="m-4 border rounded p-2 border-surface-500 flex justify-between cursor-pointer"
      v-for="project in projects" :key="project.id">
      {{ project.name }}
    </li>
  </ul>
</template>

<script setup>


defineProps({
  projects: Object
});
</script>
