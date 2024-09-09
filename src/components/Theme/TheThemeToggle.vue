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
import { onMounted, ref } from 'vue';
import Button from 'primevue/button'

const isDarkMode = ref(true); // Default to dark mode
const iconClass = ref('pi pi-sun'); // Default icon

function toggleDarkMode() {
  const element = document.querySelector('html');
  if (isDarkMode.value) {
    element.classList.remove('dark');
    element.classList.remove('my-app-dark');
    iconClass.value = 'pi pi-sun'; // Sun icon for light mode
  } else {
    element.classList.add('dark');
    element.classList.add('my-app-dark');
    iconClass.value = 'pi pi-moon'; // Moon icon for dark mode
  }
  isDarkMode.value = !isDarkMode.value;
}

// Enable dark mode by default if desired
onMounted(() => {
  const element = document.querySelector('html');
  element.classList.add('dark');
  element.classList.add('my-app-dark');
  iconClass.value = 'pi pi-moon'; // Set default icon
});
</script>
