<template>
  <div>
    <Button type="button" severity="secondary" icon="pi pi-cog" @click="toggleMenu" aria-haspopup="true"
      aria-controls="overlay_menu" />
    <Menu :ref="setMenuRef" id="overlay_menu" :model="menuItems" :popup="true" />

    <Dialog v-model:visible="deleteDialogVisible" modal header="Confirm Delete" :style="{ width: '25rem' }">
      <span class="text-surface-500 dark:text-surface-400 block mb-8">
        Are you sure you want to delete the space: {{ selectedSpaceName }}?
      </span>
      <div class="flex justify-end gap-2">
        <Button type="button" label="Cancel" severity="secondary" @click="deleteDialogVisible = false"></Button>
        <Button type="button" label="Delete" severity="danger" @click="handleDeleteSpace"></Button>
      </div>
    </Dialog>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import Button from 'primevue/button';
import Menu from 'primevue/menu';
import Dialog from 'primevue/dialog';


const deleteDialogVisible = ref(false);

const menu = ref(null);


const props = defineProps({
  spaces: {
    type: Array,
    required: true,
  },
  selectedSpaceId: {
    type: String
  }
});

const emit = defineEmits(['delete-space'])

const setMenuRef = (el) => {
  if (el) {
    menu.value = el; // Assign the menu element to the ref
  }
};

const menuItems = ref([
  {
    label: 'Edit',
    icon: 'pi pi-pencil',
  },
  {
    label: 'Delete',
    icon: 'pi pi-trash',
    command: () => showDeleteDialog(props.selectedSpaceId),
  },
]);

const toggleMenu = (event) => {
  if (menu.value) {
    menu.value.toggle(event);
  } else {
    console.error('Menu reference is null');
  }
};

const showDeleteDialog = () => {
  deleteDialogVisible.value = true;
};


const handleDeleteSpace = () => {
  emit('delete-space', props.selectedSpaceId);
  deleteDialogVisible.value = false;
};

const selectedSpaceName = computed(() => {
  const selectedSpace = props.spaces.find(space => space.id === props.selectedSpaceId);
  return selectedSpace ? selectedSpace.name : 'Unnamed Space';
});

</script>
