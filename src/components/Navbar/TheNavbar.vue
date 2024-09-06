<template>
  <nav class="bg-gray-100 dark:bg-gray-800 rounded flex flex-col justify-center items-end">
    <MenuButton :isDarkMode="darkModeStore.isDarkMode" @toggleNavbar="toggleNavbar" />
    <div ref="navbar" class="container mx-auto items-center justify-center flex-col hidden">
      <NavbarItems :isDarkMode="darkModeStore.isDarkMode" @toggleDarkMode="darkModeStore.toggleDarkMode" />
    </div>
  </nav>

  <nav class="flex max-md:hidden">
    <NavbarItems :isDarkMode="darkModeStore.isDarkMode" @toggleDarkMode="darkModeStore.toggleDarkMode" />
  </nav>

</template>

<script setup>
import { ref, onMounted } from 'vue';
import { gsap } from 'gsap';
import MenuButton from './MenuButton.vue';
import NavbarItems from './NavbarItems.vue';
import { useDarkModeStore } from '../../store/darkMode'

const darkModeStore = useDarkModeStore();

const isNavbarOpen = ref(false);
const navbar = ref(null);

function toggleNavbar() {
  isNavbarOpen.value = !isNavbarOpen.value;
  if (isNavbarOpen.value) {
    gsap.to(navbar.value, {
      height: 'auto',
      width: '10rem',
      opacity: 1,
      visibility: 'visible',
      pointerEvents: 'auto',
      display: 'flex',
      duration: 0.5,
      ease: 'power2.out',
      onStart: () => {
        gsap.set(navbar.value, { display: 'flex' });
      }
    });
  } else {
    gsap.to(navbar.value, {
      opacity: 0,
      height: 0,
      pointerEvents: 'none',
      display: 'none',
      duration: 0.5,
      ease: 'power2.in',
      onComplete: () => {
        gsap.set(navbar.value, { visibility: 'hidden' });
      }
    });
  }
}

onMounted(() => {
  gsap.set(navbar.value, { height: 0, opacity: 0, visibility: 'hidden', pointerEvents: 'none' });
});
</script>

<style scoped>
/* Optional: Customize styles here */
</style>
