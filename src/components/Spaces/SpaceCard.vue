<template>
  <div
    :class="['rounded-lg cursor-pointer hover:bg-surface-300',
      space.id === selectedSpaceId ? 'bg-primary-400 dark:bg-primary-400 text-black' : 'bg-surface-200 dark:bg-surface-900']"
    @click="selectSpaceFrontend(space.id)">
    <div class="overflow-auto p-2 h-full w-full">
      <p class="text-nowrap">{{ space.name }}</p>
    </div>
  </div>

</template>

<script setup>

defineProps({
  space: Object,
  selectedSpaceId: String,
  index: Number, // pass index from the loop
  selectSpaceFrontend: Function,
});




</script>
