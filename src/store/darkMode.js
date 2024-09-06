import { defineStore } from 'pinia';
import { ref, onMounted } from 'vue';

export const useDarkModeStore = defineStore('darkMode', () => {
  // Set dark mode to true by default
  const isDarkMode = ref(true);

  // Function to toggle dark mode on or off
  const toggleDarkMode = () => {
    isDarkMode.value = !isDarkMode.value;
    updateDarkMode();
  };

  // Function to apply dark mode to the document
  const updateDarkMode = () => {
    if (isDarkMode.value) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // Apply dark mode by default on app load
  onMounted(() => {
    updateDarkMode();
  });

  return {
    isDarkMode,
    toggleDarkMode,
  };
});
