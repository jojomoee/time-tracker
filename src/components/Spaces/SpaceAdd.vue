<template>
  <div>
    <Button severity="" icon="pi pi-plus" rounded @click="visible = true" />
    <Dialog v-model:visible="visible" modal header="Add a new Space" :style="{ width: '25rem' }">
      <span class="text-surface-500 dark:text-surface-400 block mb-8">e.g. Person, Project or Company</span>
      <div class="flex items-center gap-4 mb-4">
        <label for="spaceName" class="font-semibold w-24">Name</label>
        <InputText id="spaceName" class="flex-auto" autocomplete="off" v-model="newSpaceName" />
      </div>
      <div class="flex justify-end gap-2">
        <Button type="button" label="Cancel" severity="secondary" @click="visible = false"></Button>
        <Button type="button" label="Save" @click="saveNewSpace"></Button>
      </div>
    </Dialog>
  </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue'
import Button from 'primevue/button';
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import { useSpacesCrud } from '../../composables/spaces/useSpacesCrud'

const { createSpace } = useSpacesCrud();
const emit = defineEmits(['new-space-created']);

const visible = ref(false);
const newSpaceName = ref('');

const saveNewSpace = async () => {
  if (newSpaceName.value.trim() === '') {
    console.error('Space name cannot be empty.');
    return;
  }
  try {
    const newSpace = await createSpace(newSpaceName.value);
    if (newSpace) {
      visible.value = false;
      newSpaceName.value = '';
      emit('new-space-created', newSpace); // Emit event with the new space
    } else {
      console.error('Failed to create a new space.');
    }
  } catch (error) {
    console.error('Error creating space:', error.message);
  }
};
</script>
