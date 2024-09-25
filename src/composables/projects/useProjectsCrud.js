import { ref } from 'vue';
import { supabase } from '../../supabase';



export function useProjectsCrud() {
  const projects = ref([]);
  const projectId = ref('')

  const fetchProjects = async (selectedSpaceId) => {
    try {
      if (!selectedSpaceId.value) return;
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('space_id', selectedSpaceId.value);

      if (error) throw error;
      projects.value = data;
    } catch (error) {
      console.error('Error fetching projects:', error.message);
    }
  };


  const createProject = async (selectedSpaceId, projectName) => {
    if (!projectName.value || !selectedSpaceId) {
      console.error("please provide a name")
      return;
    }
    try {
      const { data: newProject, error: insertError } = await supabase
        .from('projects')
        .insert([{ name: projectName.value, space_id: selectedSpaceId }])
        .select()
        .single(); // Insert a single row and get the inserted data
      if (insertError) {
        throw insertError;
      }
      projectId.value = newProject.id; // Save the newly created project ID
      projectName.value = '';
      return newProject
    } catch (error) {
      console.error('Error creating project:', error.message);
    }
  };

  return {
    projects,
    projectId,
    fetchProjects,
    createProject
  }
}
