<template>
  <button class="absolute right-0 p-5 text-center mb-5 text-gray-900 dark:text-white" @click="toggleDarkMode">
    <i :class="isDarkMode ? 'fas fa-sun' : 'fas fa-moon'"></i>
  </button>
</template>

<script setup>
import { defineEmits, defineProps } from 'vue';

const emits = defineEmits(['toggleDarkMode']);
defineProps({
  isDarkMode: Boolean
});

function toggleDarkMode() {
  emits('toggleDarkMode');
}
</script>

<style scoped>
.fa-sun,
.fa-moon {
  font-size: 1.5rem;
}
</style>
