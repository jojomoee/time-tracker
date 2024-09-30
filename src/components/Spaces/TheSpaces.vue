<template>
  <div class="flex  items-center justify-start flex-col min-h-screen bg-surface-100 dark:bg-surface-950">
    <div class="w-full md:w-5/6 flex flex-col justify-center ">
      <h1 class="text-5xl m-4 text-surface-700">Spaces</h1>
      <div class="flex mx-4">
        <div class="flex overflow-auto gap-x-3  items-center">
          <SpaceList :spaces="spaces" :selectedSpaceId="selectedSpaceId"
            @update:selectedSpaceId="updateSelectedSpaceId" />
        </div>
        <SpaceAdd class="mx-3" :spaces="spaces" @new-space-created="addSpaceToList" />
      </div>
      <div class="m-4 bg-surface-200 dark:bg-surface-900 rounded-lg">
        <div class="flex justify-between items-center m-4">
          <SpaceTitle :spaces="spaces" :profileName="profileName" :selectedSpaceId="selectedSpaceId" />
          <SpaceMenu :spaces="spaces" :selectedSpaceId="selectedSpaceId" @delete-space="removeSpace" />
        </div>
        <div class="flex flex-col items-center justify-center">
          <div class="flex w-full flex-wrap">
            <SpaceUserList :selectedSpaceId="selectedSpaceId" />
            <SpaceUserAdd />
          </div>
          <SpaceProjectList :projects="projects" />
          <SpaceProjectAdd :selectedSpaceId="selectedSpaceId" @new-project-created="addProjectToList" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, watchEffect } from 'vue'
import SpaceList from './SpaceList.vue'
import SpaceMenu from './SpaceMenu.vue'
// import SpaceSearch from './SpaceSearch.vue' Optional maybe implemented later
import SpaceAdd from './SpaceAdd.vue'
import SpaceTitle from './SpaceTitle.vue'
import SpaceProjectList from './SpaceProjectList.vue'
import SpaceProjectAdd from './SpaceProjectAdd.vue'
import SpaceUserList from './SpaceUserList.vue'
import SpaceUserAdd from './SpaceUserAdd.vue'

import { useSpacesCrud } from '../../composables/spaces/useSpacesCrud.js'
import { useSelectedSpaces } from '../../composables/spaces/useSelectedSpaces';
import { useProjectsCrud } from '../../composables/projects/useProjectsCrud'
import { useUserCrud } from '../../composables/user/useUserCrud'


const { fetchSelectedSpace, selectedSpaceId } = useSelectedSpaces();
const { fetchSpaces, spaces, deleteSpace } = useSpacesCrud();
const { fetchProjects, projects } = useProjectsCrud();
const { fetchUserNameOfSelectedSpace, profileName } = useUserCrud();

const updateSelectedSpaceId = (spaceId) => {
  selectedSpaceId.value = spaceId;
};

const addSpaceToList = (newSpace) => {
  spaces.value.push(newSpace);
};

const removeSpace = async (spaceId) => {
  spaces.value = spaces.value.filter(space => space.id !== spaceId);
  await deleteSpace(selectedSpaceId.value);
};

const addProjectToList = async (newProject) => {
  projects.value.push(newProject)
}


onMounted(async () => {
  await fetchSelectedSpace();
  await fetchSpaces();
  await fetchProjects(selectedSpaceId);
});

watchEffect(() => {
  if (selectedSpaceId.value) {
    fetchProjects(selectedSpaceId);
    fetchUserNameOfSelectedSpace(selectedSpaceId.value);
  }
});

</script>
