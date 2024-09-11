<template>
  <div class="flex items-center flex-col justify-center min-h-screen bg-surface-100 dark:bg-surface-950">
    <div class="flex flex-col items-center justify-center w-full">
      <h1 class="text-4xl text-surface-500 dark:text-primary-400 p-4 mb-12">Time Entries</h1>
      <div class="flex justify-center items-center flex-col w-full">
        <Button label="Advanced Search" class="w-5/6 mb-4" />
        <InputText placeholder=" Search e.g. August or 01.01.2024" class="w-5/6" />
      </div>
    </div>
    <div class="w-5/6">
      <div class="card">
        <DataView :value="times">
          <template #list="slotProps">
            <div class="flex flex-col">
              <div v-for="(time, index) in slotProps.items" :key="index"
                class="pt-4 bg-surface-100 dark:bg-surface-950">
                <div
                  class="flex w-full bg-surface-100 dark:bg-surface-800 rounded-lg border border-surface-200 dark:border-surface-700">
                  <div class="flex w-full justify-between">
                    <div class="p-4 sm:w-60 flex items-center">
                      <p class="w-24 sm:w-48 font-medium text-center text-surface-500 dark:text-surface-500 text-sm">{{
                        time.day
                      }}</p>
                      <p class="text-center sm:hidden block">{{ time.start }} <br> {{ time.end }}</p>
                    </div>
                    <Timeline class="sm:flex hidden" :value="events" layout="horizontal" align="top">
                      <template #content="slotProps">
                        {{ slotProps.item }}
                      </template>
                    </Timeline>
                    <div class="flex justify-center items-end flex-col sm:w-60  mr-4 overflow-hidden">
                      <div class="text-center font-medium text-surface-500 dark:text-surface-500">{{ time.project }}
                      </div>
                      <span class="text-center">{{ time.hours }} hours</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </DataView>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import DataView from 'primevue/dataview'
import Timeline from 'primevue/timeline'
import InputText from 'primevue/inputtext'
import FloatLabel from 'primevue/floatlabel'
import Button from 'primevue/button'

const events = ref(['09:00', '18:00']);

const times = ref([
  {
    day: 'Monday 01.01.2024',
    project: 'Webdev',
    start: '09:00',
    end: '12:00',
    hours: 3,
  },
  {
    day: 'Tuesday 02.01.2024',
    project: 'App Development',
    start: '10:00',
    end: '02:00',
    hours: 4,
  },
  {
    day: 'Wednesday',
    project: 'Backend Integration',
    start: '08:00 AM',
    end: '11:00 AM',
    hours: 3,
  },
  {
    day: 'Thursday',
    project: 'Database Optimization',
    start: '11:00 AM',
    end: '03:00 PM',
    hours: 4,
  },
  {
    day: 'Friday',
    project: 'Testing & QA',
    start: '09:30 AM',
    end: '12:30 PM',
    hours: 3,
  },
  {
    day: 'Monday',
    project: 'Website Redesign',
    start: '09:00 AM',
    end: '12:00 PM',
    hours: 3,
  },
  {
    day: 'Tuesday',
    project: 'App Development',
    start: '10:00 AM',
    end: '02:00 PM',
    hours: 4,
  },
  {
    day: 'Wednesday',
    project: 'Backend Integration',
    start: '08:00 AM',
    end: '11:00 AM',
    hours: 3,
  },
  {
    day: 'Thursday',
    project: 'Database Optimization',
    start: '11:00 AM',
    end: '03:00 PM',
    hours: 4,
  },
  {
    day: 'Friday',
    project: 'Testing & QA',
    start: '09:30 AM',
    end: '12:30 PM',
    hours: 3,
  }

]);
</script>

<style scoped>
/* Optional styles for table responsiveness if needed */
</style>
