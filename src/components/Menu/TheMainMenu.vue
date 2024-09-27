<template>
  <div>
    <Dock :model="items" :position="position" class="fixed">
      <template #itemicon="{ item }">
        <i v-tooltip.right="item.label" @click="onDockItemClick($event, item)" :class="[
          item.icon,
          'text-2xl p-2 rounded transition-transform duration-300 ease-in-out',
          {
            'scale-110 bg-primary-400 text-black': isActive(item),
            'hover:scale-110 hover:bg-primary-400 hover:text-black': !isActive(item)
          }
        ]"></i>
      </template>
    </Dock>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed, watchEffect } from 'vue';
import Dock from 'primevue/dock';
import { useRouter } from 'vue-router';
import { useSelectedSpaces } from '../../composables/spaces/useSelectedSpaces'; // Assuming you have this composable
import { useSpacesCrud } from '../../composables/spaces/useSpacesCrud.js'

const router = useRouter();

const { selectedSpaceId, fetchSelectedSpace } = useSelectedSpaces(); // Get the selected space ID
const { spaces, fetchSpaces } = useSpacesCrud();
const selectedSpaceName = ref('');

const updateSelectedSpaceName = () => {
  const selectedSpace = spaces.value.find(space => space.id === selectedSpaceId.value);
  selectedSpaceName.value = selectedSpace ? selectedSpace.name : '';
};
const isActive = (item) => {
  // Check if the current route starts with the item's path
  return router.currentRoute.value.path.startsWith(item.path);
};

// Necessary for command in menu to work
const onDockItemClick = (event, item) => {
  if (item.command) {
    item.command();
  }

  event.preventDefault();
};

// Dock items
const items = computed(() => [
  {
    label: 'Home',
    icon: 'pi pi-home',
    path: '/home',
    command: () => { router.push('/home') }
  },
  {
    label: 'Times',
    icon: 'pi pi-calendar-clock',
    path: '/times',
    command: () => { router.push('/times') }
  },
  {
    label: 'Spaces',
    icon: 'pi pi-expand',
    path: '/spaces',
    command: () => {
      if (selectedSpaceId.value) {
        router.push(`/spaces/${selectedSpaceName.value.toLowerCase()}`);
      } else {
        router.push('/spaces');
      }
    }
  },
  {
    label: 'Employees',
    icon: 'pi pi-users',
    path: '/users',
    command: () => { router.push('/users') }
  },
  {
    label: 'Dashboard',
    icon: 'pi pi-chart-bar',
    path: '/dashboard',
    command: () => { router.push('/dashboard') }
  },
  {
    label: 'Settings',
    icon: 'pi pi-cog',
    path: '/settings'
  },
]);

// Dock position, default is bottom for mobile/tablet
const position = ref('bottom');

// Handle dock position based on screen size
const handleResize = () => {
  if (window.innerWidth >= 1024) {
    position.value = 'left';  // Dock on left for desktop
  } else {
    position.value = 'bottom';  // Dock at bottom for tablet/mobile
  }
};

// On component mount, set the initial position and add resize listener
onMounted(async () => {
  handleResize();
  window.addEventListener('resize', handleResize);
  await fetchSelectedSpace();
  await fetchSpaces();
});

watchEffect(() => {
  if (selectedSpaceId.value && spaces.value.length > 0) {
    console.log("aaa")
    updateSelectedSpaceName(); // Call the function to update the selected space name
  }
});
// Clean up event listener on component unmount
onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize);
});
</script>

<script>
// Import Tooltip and register it as a directive
import Tooltip from 'primevue/tooltip';

export default {
  directives: {
    tooltip: Tooltip // Register Tooltip directive locally
  }
};
</script>

<style scoped></style>
