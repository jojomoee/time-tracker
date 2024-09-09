import { ref } from 'vue';

export function useDarkMode() {
  const isDarkMode = ref(true); // Default to dark mode
  const iconClass = ref('pi pi-sun'); // Default icon

  function toggleDarkMode() {
    const element = document.querySelector('html');
    if (!isDarkMode.value) {
      element.classList.remove('dark');
      element.classList.remove('p-dark');
      iconClass.value = 'pi pi-sun'; // Sun icon for light mode
    } else {
      element.classList.add('dark');
      element.classList.add('p-dark');
      iconClass.value = 'pi pi-moon'; // Moon icon for dark mode
    }
    isDarkMode.value = !isDarkMode.value;
  }

  // Return the state and function
  return {
    isDarkMode,
    iconClass,
    toggleDarkMode,
  };
}
