<script setup>
defineProps({
  msg: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="flex justify-center">
    <h1 class="text-orange-700 text-2xl">{{ msg }}</h1>
  </div>
</template>

<style scoped></style>
