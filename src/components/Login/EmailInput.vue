<template>
  <div>
    <FloatLabel>
      <InputText v-model="localValue" type="email" id="email" />
      <label for="username">Email</label>
    </FloatLabel>
    <p v-if="error" class="text-red-500 text-xs italic">{{ error }}</p>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, computed } from 'vue'
import FloatLabel from "primevue/floatlabel"
import InputText from "primevue/inputtext"

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
