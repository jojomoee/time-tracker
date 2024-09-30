<template>
  <div class="flex justify-center items-baseline">
    <h1 class="text-2xl overflow-x-auto">{{ selectedSpaceName || 'No Space Selected' }}
    </h1>
    <div class=" ml-4 ">
      <p class="text-sm">{{ props.profileName }} </p>
    </div>
  </div>
</template>
<script setup>

import { computed } from 'vue';

const props = defineProps({
  spaces: {
    type: Array,
    required: true,
  },
  selectedSpaceId: {
    type: String
  },
  profileName: {
    type: String
  }
});

const selectedSpaceName = computed(() => {
  const selectedSpace = props.spaces.find(space => space.id === props.selectedSpaceId);
  return selectedSpace ? selectedSpace.name : '';
});
</script>
