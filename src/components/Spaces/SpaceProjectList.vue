<template>
  <ul class="w-full mx-10 ">
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
