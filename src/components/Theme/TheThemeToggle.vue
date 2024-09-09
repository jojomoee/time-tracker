<template>
  <div class="h-100 w-100">
    <div class="absolute right-0 p-4">
      <Button label="Toggle Dark Mode" @click="toggleDarkMode()">
        <i :class="iconClass" />
      </Button>
    </div>

  </div>
</template>

<script setup>
import { useDarkMode } from '@/composables/useDarkMode'; // Adjust the path based on your folder structure
import Button from 'primevue/button';

const { iconClass, toggleDarkMode } = useDarkMode();

</script>
