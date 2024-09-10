<template>

  <div class="flex items-center justify-center min-h-screen bg-surface-100 dark:bg-surface-950">
    <div class="w-5/6">

      <div class="absolute flex justify-between sm:5/6 w-4/6 mt-4 mb-2 border border-surface-800 rounded-lg">
        <div class="w-full overflow-x-auto">
          <div class="flex justify-between">
            <div v-for="month in months" :key="month" class="min-w-max p-2 sm:bg-surface-900 text-white rounded-lg">
              {{ month }}
            </div>
          </div>
        </div>
      </div>
      <div class="flex">
      </div>
      <div class="card mt-20">
        <DataView :value="times">
          <template #list="slotProps">
            <div class="flex flex-col">
              <div v-for="(time, index) in slotProps.items" :key="index"
                class="pt-4 bg-surface-100 dark:bg-surface-950">
                <div
                  class="flex w-full bg-surface-100 dark:bg-surface-800 rounded-lg border border-surface-200 dark:border-surface-700">
                  <div class="flex w-full justify-between">
                    <div class="p-4 sm:w-60 flex items-center">
                      <p class="w-24 sm:w-48 font-medium text-center text-surface-500 dark:text-surface-400 text-sm">{{
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
                      <div class="text-center font-medium text-surface-500 dark:text-surface-400">{{ time.project }}
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
import Button from 'primevue/button'
import Timeline from 'primevue/timeline'
import DatePicker from 'primevue/datepicker'

const events = ref(['09:00', '18:00']);

const months = ref([
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]);
// Sample time-tracking data
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
