<template>
  <div class="mb-6">
    <label class="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" for="password">
      Password
    </label>
    <input v-model="localValue" type="password" id="password"
      class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-white dark:placeholder-white dark:bg-gray-800 leading-tight focus:outline-none focus:shadow-outline"
      placeholder="Enter your password" required />
    <p v-if="error" class="text-red-500 text-xs italic">{{ error }}</p>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, computed } from 'vue'

const props = defineProps({
  modelValue: String,
  error: String
})
const emit = defineEmits(['update:modelValue'])

// Use a computed property to handle the prop and emit updates
const localValue = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})
</script>
