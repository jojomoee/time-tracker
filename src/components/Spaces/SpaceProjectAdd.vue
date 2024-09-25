<template>
  <div>
    <Button icon="pi pi-plus" rounded class="m-4" @click="visible = true" />

    <Dialog v-model:visible="visible" modal header="Add a new Project" :style="{ width: '25rem' }">
      <div class="flex items-center gap-4 mb-4">
        <label for="projetName" class="font-semibold w-24">Name:</label>
        <InputText id="projectName" class="flex-auto" autocomplete="off" v-model="newProjectName" />
      </div>
      <div class="flex justify-end gap-2">
        <Button type="button" label="Cancel" severity="secondary" @click="visible = false"></Button>
        <Button type="button" label="Save" @click="saveNewProject"></Button>
      </div>
    </Dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import { useProjectsCrud } from '../../composables/projects/useProjectsCrud'


const newProjectName = ref('');
const visible = ref(false);
const emit = defineEmits(['new-project-created']);
const { createProject } = useProjectsCrud();

const props = defineProps({
  selectedSpaceId: {
    type: String
  }
});


const saveNewProject = async () => {
  if (newProjectName.value.trim() === '') {
    console.error('Space name cannot be empty.');
    return;
  }
  try {
    const newProject = await createProject(props.selectedSpaceId, newProjectName);
    if (newProject) {
      visible.value = false;
      newProjectName.value = '';
      emit('new-project-created', newProject); // Emit event with the new space
    } else {
      console.error('Failed to create a new Project.');
    }
  } catch (error) {
    console.error('Error creating project:', error.message);
  }
};
</script>
