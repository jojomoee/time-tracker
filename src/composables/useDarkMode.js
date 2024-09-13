import { ref, onMounted } from 'vue';

export function useDarkMode() {
  const isDarkMode = ref(true); // Default dark mode
  const iconClass = ref('pi pi-sun'); // Default icon

  // Check system preference or saved preference
  function initDarkMode() {
    const savedPreference = localStorage.getItem('darkMode');

    if (savedPreference !== null) {
      isDarkMode.value = savedPreference === 'true'; // Use saved preference
    } else {
      const userPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      isDarkMode.value = userPrefersDark;
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

    // Save preference to localStorage
    localStorage.setItem('darkMode', isDarkMode.value);
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
