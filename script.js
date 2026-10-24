// Select DOM elements
const todoInput = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');

// Load saved tasks from localStorage on startup (Step 4)
document.addEventListener('DOMContentLoaded', getTasks);

// Step 3: Attach click event to Add button
addBtn.addEventListener('click', addTodo);
todoInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        addTodo();
    }
});

// Step 2 & 3: Function to add list items with delete and complete buttons
function addTodo() {
    const taskText = todoInput.value.trim();
    if (taskText === "") return;

    createTaskElement(taskText, false);
    
    // Save to localStorage
    saveLocalTask(taskText, false);

    // Clear input field
    todoInput.value = "";
}

function createTaskElement(text, isCompleted) {
    const li = document.createElement('li');
    if (isCompleted) {
        li.classList.add('completed');
    }

    const span = document.createElement('span');
    span.innerText = text;
    li.appendChild(span);

    const btnContainer = document.createElement('div');
    btnContainer.classList.add('task-buttons');

    // Complete button
    const completeBtn = document.createElement('button');
    completeBtn.innerText = '✓';
    completeBtn.classList.add('complete-btn');
    completeBtn.addEventListener('click', function () {
        li.classList.toggle('completed');
        updateLocalStorage();
    });

    // Delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.innerText = '✕';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', function () {
        li.remove();
        removeLocalTask(text);
    });

    btnContainer.appendChild(completeBtn);
    btnContainer.appendChild(deleteBtn);
    li.appendChild(btnContainer);

    todoList.appendChild(li);
}

// Step 4: LocalStorage Persistence Functions
function saveLocalTask(task, isCompleted) {
    let tasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
    tasks.push({ text: task, completed: isCompleted });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getTasks() {
    let tasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
    tasks.forEach(function(task) {
        createTaskElement(task.text, task.completed);
    });
}

function removeLocalTask(taskText) {
    let tasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
    tasks = tasks.filter(task => task.text !== taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function updateLocalStorage() {
    const liElements = document.querySelectorAll('#todo-list li');
    let tasks = [];
    liElements.forEach(li => {
        tasks.push({
            text: li.querySelector('span').innerText,
            completed: li.classList.contains('completed')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}