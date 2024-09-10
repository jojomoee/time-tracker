import { ref, onMounted } from 'vue';

export function useDarkMode() {
  const isDarkMode = ref(true); //default dark mode
  const iconClass = ref('pi pi-sun'); // Default icon

  // Check system preference or saved preference
  function initDarkMode() {
    const userPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (userPrefersDark) {
      isDarkMode.value = true
    } else {
      isDarkMode.value = false
    }
    applyDarkMode();
  }

  function applyDarkMode() {
    const element = document.querySelector('html');

    if (isDarkMode.value) {
      element.classList.add('dark');
      element.classList.add('p-dark');
      iconClass.value = 'pi pi-moon'; // Moon icon for dark mode
    } else {
      element.classList.remove('dark');
      element.classList.remove('p-dark');
      iconClass.value = 'pi pi-sun'; // Sun icon for light mode
    }
  }

  function toggleDarkMode() {
    isDarkMode.value = !isDarkMode.value;
    applyDarkMode();
  }

  // Initialize dark mode when the component is mounted
  onMounted(() => {
    initDarkMode();
  });

  // Return the state and function
  return {
    isDarkMode,
    iconClass,
    toggleDarkMode,
  };
}
