import { ref } from 'vue';
import { supabase } from '../supabase';

export function useSpaces() {
  const spaces = ref([]);
  const projects = ref([]);
  const tasks = ref([]);
  const loading = ref(false);
  const error = ref(null);

  const fetchSpaces = async () => {
    loading.value = true;
    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError) {
        throw userError;
      }
      let { data, error: fetchError } = await supabase
        .from('spaces')
        .select('*')
        .eq('owner_id', user.id);;
      if (fetchError) throw fetchError;
      spaces.value = data;
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  const fetchProjects = async (spaceId) => {
    loading.value = true;
    try {
      let { data, error: fetchError } = await supabase
        .from('projects')
        .select('*')
        .eq('space_id', spaceId);
      if (fetchError) throw fetchError;
      projects.value = data;
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  const fetchTasks = async (projectId) => {
    loading.value = true;
    try {
      let { data, error: fetchError } = await supabase
        .from('tasks')
        .select('*')
        .eq('project_id', projectId);
      if (fetchError) throw fetchError;
      tasks.value = data;
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  return {
    spaces,
    projects,
    tasks,
    loading,
    error,
    fetchSpaces,
    fetchProjects,
    fetchTasks,
  };
}
