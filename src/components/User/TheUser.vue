<template>
  <div class="flex  items-center justify-start flex-col min-h-screen bg-surface-100 dark:bg-surface-950">
    <div class="w-full md:w-5/6 flex flex-col justify-center">
      <h1 class="text-5xl m-4 text-surface-700">Users</h1>
      <h2>{{ firstName }}</h2>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useUserCrud } from '../../composables/user/useUserCrud.js'
import { useSession } from '../../composables/useSession.js'


const { firstName, error, loading, fetchUsername } = useUserCrud();
const { user, checkLoginStatus } = useSession();

onMounted(async () => {
  await checkLoginStatus()
  console.log(user)
  await fetchUsername(user.value.id)
  console.log(firstName)
})
</script>
