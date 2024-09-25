<template>
  <div
    :class="['flex justify-between items-start text-xl p-2 rounded-lg cursor-pointer hover:bg-surface-300',
      space.id === selectedSpaceId ? 'bg-primary-500 dark:bg-primary-500 text-black' : 'bg-surface-200 dark:bg-surface-900']"
    @click="selectSpaceFrontend(space.id)">
    <div class="overflow-auto p-2 h-full w-full flex flex-col items-start justify-start text-left">
      <p class="">{{ space.name }}</p>
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
