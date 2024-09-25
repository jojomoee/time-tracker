<template>
  <div class="flex  items-center justify-start flex-col min-h-screen bg-surface-100 dark:bg-surface-950">
    <div class="w-full md:w-5/6 flex flex-col justify-center">
      <h1 class="text-5xl m-4 text-surface-700">Spaces</h1>
      <div class="flex mx-4 items-center justify-between ">
        <SpaceAdd :spaces="spaces" @new-space-created="addSpaceToList" />
        <SpaceSearch />
      </div>
      <div class="flex overflow-auto gap-x-3 m-4">
        <SpaceList :spaces="spaces" :selectedSpaceId="selectedSpaceId"
          @update:selectedSpaceId="selectedSpaceId = $event" />
      </div>
      <div class="flex justify-between mx-4 bg-surface-200 dark:bg-surface-900 rounded-lg">
        <SpaceTitle :spaces="spaces" :selectedSpaceId="selectedSpaceId" />
        <SpaceMenu :spaces="spaces" :selectedSpaceId="selectedSpaceId" @delete-space="removeSpace" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import SpaceList from './SpaceList.vue'
import SpaceMenu from './SpaceMenu.vue'
import SpaceSearch from './SpaceSearch.vue'
import SpaceAdd from './SpaceAdd.vue'
import SpaceTitle from './SpaceTitle.vue'

import { useSpacesCrud } from '../../composables/spaces/useSpacesCrud.js'
import { useSelectedSpaces } from '../../composables/spaces/useSelectedSpaces';


const { fetchSelectedSpace, selectedSpaceId } = useSelectedSpaces();
const { fetchSpaces, spaces, deleteSpace } = useSpacesCrud();

const addSpaceToList = (newSpace) => {
  spaces.value.push(newSpace);
};

const removeSpace = async (spaceId) => {
  spaces.value = spaces.value.filter(space => space.id !== spaceId);
  await deleteSpace(selectedSpaceId.value);
};


onMounted(async () => {
  await fetchSelectedSpace();
  await fetchSpaces();
});

</script>
