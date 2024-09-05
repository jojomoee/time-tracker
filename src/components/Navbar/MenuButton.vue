<template>
  <div>
    <button @click="$emit('toggleNavbar')" class="text-white p-2 focus:outline-none md:hidden">
      <svg :class="[
        'w-10 h-10',
        isDarkMode ? 'stroke-white' : 'stroke-black'
      ]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
      </svg>
    </button>
  </div>
</template>

<script setup>

defineProps({
  isDarkMode: Boolean
});

defineEmits(['toggleNavbar']);
</script>

<style scoped>
/* Optional: Customize styles here */
</style>
