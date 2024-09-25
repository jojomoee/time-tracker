<template>
  <div>
    <h1 class="m-2 text-2xl overflow-x-auto">{{ selectedSpaceName || 'No Space Selected' }}
    </h1>
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
  }
});

const selectedSpaceName = computed(() => {
  const selectedSpace = props.spaces.find(space => space.id === props.selectedSpaceId);
  return selectedSpace ? selectedSpace.name : '';
});
</script>
