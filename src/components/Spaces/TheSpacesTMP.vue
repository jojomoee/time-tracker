<!-- Space Creation Form -->
<form @submit.prevent="createSpace" class="mb-6">
        <div class="mb-4">
          <label for="spaceName" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Space Name
          </label>
          <input v-model="spaceName" type="text" id="spaceName" placeholder="Enter space name"
            class="mt-1 block w-full p-2 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md"
            required />
        </div>
        <Button label="Create Space" type="submit" />
      </form>






<!-- Project Creation Form -->

<form @submit.prevent="createProject" class="mb-6" v-if="spaceId">
        <div class="mb-4">
          <label for="projectName" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Project Name
          </label>
          <input v-model="projectName" type="text" id="projectName" placeholder="Enter project name"
            class="mt-1 block w-full p-2 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md"
            required />
        </div>
        <Button label="Create Project" type="submit" />
      </form>

<!-- Task Creation Form -->
<form @submit.prevent="createTask" v-if="projectId">
        <div class="mb-4">
          <label for="taskName" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Task Name
          </label>
          <input v-model="taskName" type="text" id="taskName" placeholder="Enter task name"
            class="mt-1 block w-full p-2 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md"
            required />
        </div>
        <Button label="Create Task" type="submit" />
      </form>
</div>

<script setup>

// Project form fields
const projectName = ref('');
const projectId = ref(''); // This will be set after creating a project

// Task form fields
const taskName = ref('');
// Create project handler
const createProject = async () => {
  if (!projectName.value || !spaceId.value) {
    toast.error('Please provide a name and select a space for the project.');
    return;
  }

  try {
    const { data: newProject, error: insertError } = await supabase
      .from('projects')
      .insert([{ name: projectName.value, space_id: spaceId.value }])
      .select()
      .single(); // Insert a single row and get the inserted data

    if (insertError) {
      throw insertError;
    }

    projectId.value = newProject.id; // Save the newly created project ID
    toast.success('Project created successfully!');
    projectName.value = '';
  } catch (error) {
    console.error('Error creating project:', error.message);
    toast.error('Failed to create project. Please try again.');
  }
};

// Create task handler
const createTask = async () => {
  if (!taskName.value || !projectId.value) {
    toast.error('Please provide a name and select a project for the task.');
    return;
  }

  try {
    const { error: insertError } = await supabase
      .from('tasks')
      .insert([{ name: taskName.value, project_id: projectId.value }]);

    if (insertError) {
      throw insertError;
    }

    toast.success('Task created successfully!');
    taskName.value = '';
  } catch (error) {
    console.error('Error creating task:', error.message);
    toast.error('Failed to create task. Please try again.');
  }
};
</script>
