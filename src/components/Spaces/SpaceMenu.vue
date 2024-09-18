<template>
  <div>
    <Button class="m-2" type="button" severity="secondary" icon="pi pi-ellipsis-v" @click="toggleMenu"
      aria-haspopup="true" :aria-controls="'overlay_menu_' + index" />
    <Menu :ref="setMenuRef" :id="'overlay_menu_' + index" :model="items" :popup="true" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Button from 'primevue/button';
import Menu from 'primevue/menu';

defineProps({
  items: Array,
  index: Number, // unique index for each menu
});

const menu = ref(null); // Single ref to store the menu component

// Set the menu ref manually when the component is mounted
const setMenuRef = (el) => {
  if (el) {
    menu.value = el; // Assign the menu element to the ref
  }
};

const toggleMenu = (event) => {
  if (menu.value) {
    menu.value.toggle(event); // Toggle the menu if the ref is available
  } else {
    console.error('Menu reference is null');
  }
};
</script>
