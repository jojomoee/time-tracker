<script setup>
import TheUserList from "../components/UserList/TheUserList.vue"
import { supabase } from '../supabase';
import { onMounted } from 'vue';

onMounted(async () => {
  const { data: sessionData, error } = await supabase.auth.getSession();
  if (error) {
    console.error('Error fetching session:', error.message);
  } else if (sessionData.session) {
    console.log(sessionData.session.user.email);
  } else {
    console.error('No user session found');
  }
});
</script>

<template>
  <main>
    <TheUserList />
  </main>
</template>
