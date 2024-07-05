const form = document.querySelector('#todo-form');
const input = document.querySelector('#todo-input');
const list = document.querySelector('#todo-list');

let tasks = [];
const tasksFromLocalStorage = JSON.parse(localStorage.getItem('tasks'));


function renderTasksOnPageLoad() {
  tasks = tasksFromLocalStorage || [];
  tasks.forEach(task => {
    renderTasks(task.title, task.isCompleted);
  });

}

Window.onload = renderTasksOnPageLoad();


function renderTasks(taskTitle, isCompleted = false) {
  const li = document.createElement('li');

  const inputCheckBox = document.createElement('input');
  inputCheckBox.setAttribute('type', 'checkbox');
  inputCheckBox.checked = isCompleted;
  if (isCompleted) {
    li.style.textDecoration = 'line-through';
  }

  inputCheckBox.addEventListener('change', (e) => {
    if (e.target.checked) {
      li.style.textDecoration = 'line-through';
      tasks.find(task => task.title === taskTitle).isCompleted = true;
      localStorage.setItem('tasks', JSON.stringify(tasks));
    } else {
      li.style.textDecoration = 'none';
      tasks.find(task => task.title === taskTitle).isCompleted = false;
      localStorage.setItem('tasks', JSON.stringify(tasks));

    }
  
  });

  const span = document.createElement('span');
  span.textContent = taskTitle;

  const button = document.createElement('button');
  button.textContent = 'Delete';
  button.addEventListener('click', (event) => {
    li.remove();
    // list.removeChild(event.target.parentElement);
    tasks.splice(tasks.findIndex(task => task.title === taskTitle), 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));

  });

  li.appendChild(inputCheckBox);
  li.appendChild(span);
  li.appendChild(button);





  list.appendChild(li);

  input.value = '';
}



form.addEventListener('submit', (e) => {
  e.preventDefault();

  const taskTitle = input.value;

  if (taskTitle.length < 3) {
    alert('Task title must be at least 3 characters long');
    return;
  }

  tasks.push({
    title: taskTitle,
    isCompleted: false
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));

  renderTasks(taskTitle);

  
});