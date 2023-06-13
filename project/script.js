let tasks = [];
function addTask() {
  const taskTitleInput = document.getElementById('taskTitleInput');
  const taskDescriptionInput = document.getElementById('taskDescriptionInput');
  const taskTitle = taskTitleInput.value;
  const taskDescription = taskDescriptionInput.value;
  taskTitleInput.value = '';
  taskDescriptionInput.value = '';

  if (taskTitle !== '' && taskDescription !== '') {
    const task = {
      title: taskTitle,
      description: taskDescription,
      added: new Date(),
      completed: false,
      completedAt: null
    };
    tasks.push(task);
    renderTasks();
  }
}

function renderTasks() {
  const pendingTasksContainer = document.getElementById('pendingTasks');
  const completedTasksContainer = document.getElementById('completedTasks');

  // Clear existing task lists
  pendingTasksContainer.innerHTML = '';
  completedTasksContainer.innerHTML = '';

  tasks.forEach((task, index) => {
    const taskElement = document.createElement('div');
    taskElement.classList.add('task');

    const titleElement = document.createElement('div');
    titleElement.classList.add('title');
    titleElement.textContent = task.title;

    const descriptionElement = document.createElement('div');
    descriptionElement.classList.add('description');
    descriptionElement.textContent = task.description;

    const addedElement = document.createElement('div');
    addedElement.classList.add('added');
    addedElement.textContent = `Added: ${formatDateTime(task.added)}`;

    const buttonsElement = document.createElement('div');
    buttonsElement.classList.add('buttons');

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => deleteTask(index));

    const completeButton = document.createElement('button');
    completeButton.textContent = 'Complete';
    completeButton.addEventListener('click', () => markTaskComplete(index));

    buttonsElement.appendChild(deleteButton);
    buttonsElement.appendChild(completeButton);

    taskElement.appendChild(titleElement);
    taskElement.appendChild(descriptionElement);
    taskElement.appendChild(addedElement);
    taskElement.appendChild(buttonsElement);

    if (task.completed) {
      taskElement.classList.add('completed');
      completedTasksContainer.appendChild(taskElement);
    } else {
      pendingTasksContainer.appendChild(taskElement);
    }
  });
}

// Function to delete a task
function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}


function markTaskComplete(index) {
  tasks[index].completed = true;
  tasks[index].completedAt = new Date();
  renderTasks();
}

// Helper function to format date and time
function formatDateTime(dateTime) {
  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  return dateTime.toLocaleString(undefined, options);
}


renderTasks();
