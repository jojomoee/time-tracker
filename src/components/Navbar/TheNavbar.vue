<template>
  <nav class="bg-gray-100 dark:bg-gray-800 rounded flex flex-col justify-center items-end">
    <MenuButton :isDarkMode="darkModeStore.isDarkMode" @toggleNavbar="toggleNavbar" />
    <div ref="navbar" class="container mx-auto items-center justify-center flex-col hidden"
      :class="{ hidden: !isNavbarOpen }">
      <NavbarItems :isDarkMode="darkModeStore.isDarkMode" @toggleDarkMode="darkModeStore.toggleDarkMode" />
    </div>
  </nav>

  <nav class="flex max-md:hidden">
    <NavbarItems :isDarkMode="darkModeStore.isDarkMode" @toggleDarkMode="darkModeStore.toggleDarkMode" />
  </nav>
</template>

<script setup>
import { useNavbar } from '@/composables/useNavbar';
import MenuButton from './MenuButton.vue';
import NavbarItems from './NavbarItems.vue';
import { useDarkModeStore } from '../../store/darkMode';

const darkModeStore = useDarkModeStore();
const { isNavbarOpen, navbar, toggleNavbar } = useNavbar();
</script>
