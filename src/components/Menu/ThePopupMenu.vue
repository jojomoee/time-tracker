<template>
  <div class="h-100 w-100">
    <!-- Button to toggle the menu -->
    <Button class="absolute right-0 m-4" type="button" icon="pi pi-ellipsis-v" @click="toggle" aria-haspopup="true"
      aria-controls="overlay_menu" />

    <!-- Menu with dynamic dark/light mode item -->
    <Menu ref="menu" id="overlay_menu" :model="menuItems" :popup="true" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import Button from 'primevue/button';
import Menu from 'primevue/menu';
import { useDarkMode } from '@/composables/useDarkMode'; // Import your dark mode composable
import { useLogout } from '@/composables/useLogout'; // Import the logout composable
import { useRouter } from 'vue-router';

const { logout } = useLogout();
const { iconClass, toggleDarkMode, isDarkMode } = useDarkMode();
const router = useRouter();
const menu = ref();

// Use a computed property to dynamically generate the menu items
const menuItems = computed(() => [
  {
    items: [
      {
        // Dynamic label for Dark/Light mode based on the current state
        label: isDarkMode.value ? 'Light Mode' : 'Dark Mode',
        icon: iconClass.value, // Dynamic icon based on mode
        command: () => toggleDarkMode(), // Call toggle function on click
      },
      {
        label: 'Help',
        icon: 'pi pi-question-circle',
      },
      {
        label: 'User Name',
        icon: 'pi pi-user',
      },
      {
        label: 'Sign Out',
        icon: 'pi pi-sign-out',
        command: async () => {
          await logout();  // Call logout function when Sign Out is clicked
          router.push('/login');  // Redirect to the login page after logout
        },
      },
    ],
  },
]);

const toggle = (event) => {
  menu.value.toggle(event);
};
</script>

<style scoped>
/* Add any custom styles here */
</style>
