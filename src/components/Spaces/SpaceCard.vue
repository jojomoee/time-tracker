<template>
  <div
    :class="['h-48 w-48 flex justify-between items-start m-3 rounded-lg cursor-pointer hover:bg-surface-300',
      space.id === selectedSpace ? 'bg-primary-500 dark:bg-primary-500 text-black' : 'bg-surface-200 dark:bg-surface-900']"
    @click="selectSpace(space.id)">
    <div class="p-2 h-full w-full flex flex-col items-start justify-start text-left">
      <h1 class="text-2xl">{{ space.name }}</h1>
      <h3>Projects</h3>
    </div>

    <!-- Pass the index to ensure each menu is uniquely identified -->
    <SpaceMenu :index="index" :items="menuItems" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import SpaceMenu from './SpaceMenu.vue';

defineProps({
  space: Object,
  selectedSpace: String,
  index: Number, // pass index from the loop
  selectSpace: Function,
});

const menuItems = ref([
  {
    label: 'Edit',
    icon: 'pi pi-pencil',
  },
  {
    label: 'Delete',
    icon: 'pi pi-trash',
  }
]);
</script>
