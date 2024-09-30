<template>
  <div class="mx-4">
    <ul v-if="users.length" class="flex gap-2">
      <li class="border border-primary-400 p-2 rounded-lg text-sm" v-for="user in users" :key="user.id">
        {{ user.first_name }} {{ user.last_name }}
      </li>
    </ul>
    <p v-else>No users in this space.</p>
  </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue';
import { supabase } from '../../supabase';

const users = ref([]); // To store the list of users
const props = defineProps({
  selectedSpaceId: {
    type: String
  }
});

const fetchSpaceUsers = async (spaceId) => {
  try {
    // Query to fetch users in this space by joining `space_profiles` and `profiles`
    const { data, error } = await supabase
      .from('space_profiles')
      .select(`
        profiles (id, first_name, last_name)
      `)
      .eq('space_id', spaceId); // Match the current space ID

    if (error) {
      throw error;
    }

    // Extract the user information from the profiles join
    users.value = data.map(profile => profile.profiles);
  } catch (err) {
    console.error('Error fetching users:', err.message);
  }
};

// Fetch users when the component is mounted
watchEffect(() => {
  if (props.selectedSpaceId) {
    fetchSpaceUsers(props.selectedSpaceId);
  }
});

</script>
