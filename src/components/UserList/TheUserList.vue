<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
    <div class="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <div class="flex justify-center flex-col">
        <h1 class="text-center text-gray-900 dark:text-white text-2xl">Users List</h1>
        <ul>
          <li class="text-center text-gray-900 dark:text-white text-2xl" v-for="user in users" :key="user.id">
            {{ user.first_name }} {{ user.last_name }} - {{ user.email }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { supabase } from '../../supabase'

export default {
  name: 'UsersList',
  setup() {
    const users = ref([])

    const fetchUsers = async () => {
      const { data, error } = await supabase
        .from('users') // Your table name
        .select('*')   // Select all columns

      if (error) {
        console.error('Error fetching users:', error)
      } else {
        users.value = data // Assign data to the users ref
      }
    }

    // Fetch users when the component is mounted
    onMounted(() => {
      fetchUsers()

    })

    return { users }
  }
}
</script>
