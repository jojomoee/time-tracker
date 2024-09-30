<template>
  <Button class="text-sm" size="small" label="add User" @click="visible = true" />
  <Dialog v-model:visible="visible" modal header="Add new User" :style="{ width: '25rem' }">
    <div class="flex items-center gap-4 mb-4">
      <label for="email" class="font-semibold w-24">Email</label>
      <InputText type="email" id="email" class="flex-auto" autocomplete="off" v-model="email" />
    </div>
    <div class="flex justify-end gap-2">
      <Button type="button" label="Cancel" severity="secondary" @click="visible = false"></Button>
      <Button type="button" label="Add" @click="addNewUserToSpace"></Button>
    </div>
  </Dialog>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Button from 'primevue/button';
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import { useUserCrud } from '../../composables/user/useUserCrud'
import { useSelectedSpaces } from '../../composables/spaces/useSelectedSpaces';
import { supabase } from '../../supabase'

const { fetchUserEmails, profileIds, fetchProfileIds, users } = useUserCrud();
const { fetchSelectedSpace, selectedSpaceId } = useSelectedSpaces();
const email = ref('');
const visible = ref(false);

onMounted(async () => {
  await fetchProfileIds();
  await fetchUserEmails(profileIds);
  await fetchSelectedSpace();
})

const addNewUserToSpace = async () => {
  try {
    const user = users.value.find(u => u.email === email.value);
    if (!user) {
      throw new Error('User not found');
    }

    const userId = user.user_id
    const spaceId = selectedSpaceId.value
    const role = 'editor'; // or whatever role you want to assign

    const { error: insertError } = await supabase
      .from('space_profiles')
      .insert([
        { space_id: spaceId, user_id: userId, role: role, status: 'active' } // Example status
      ]);

    if (insertError) throw insertError;

    visible.value = false; // Close dialog on success
    email.value = ''; // Reset the email field
    console.log('User added successfully to the space!');
  } catch (err) {
    console.error(err.message);
    alert(err.message);
  }
};
</script>
