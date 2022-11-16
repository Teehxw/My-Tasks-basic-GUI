// My Tasks Basic

// HTML Elements
let goBtnEl = document.getElementById('go-btn');
let menuEl = document.getElementById('menu');
let tasksEl = document.getElementById('tasks');

// Global Variables 
let tasks = loadTasks();
displayAll();


// Go Btn - Menu Listener
goBtnEl.addEventListener('click', goBtnHandler);

function goBtnHandler() {
  // Get Menu Selection
  let selection = menuEl.value;

  if (selection === 'add') {
    addTask();
  } else if (selection === 'toggle') {
    toggleTask();
  } else if (selection === 'remove') {
    removeTask();
  } else if (selection === 'clear') {
    clearAll();
  }
}

// MENU FUNCTIONS
function addTask() {
  let description = prompt("Enter Task description:");
  tasks.push(newTask(description));
  tasksEl.innerHTML = `Task Added: ${description}`
  saveTask()
  displayAll();
}

//Toggle completed Status of a task 
function toggleTask() {
  let index = +prompt('Enter # of task: ');
  let task = tasks[index];
  if (task.completed === ''){
    task.completed = 'completed';
  } else {
    task.completed = '';
  }
  saveTask();
  displayAll();
}

function removeTask() {
  let index = +prompt("Enter # of task: ")
  if (index >=0 && index < tasks.length) {
    //Valid Index -> Remove 
    tasks.splice(index, 1);
    saveTask();
    displayAll();
  } else {
    alert('Invalid Task #');
  }
}

function clearAll() {
  tasks = [];
  saveTask();
  displayAll();
}

// HELPER Functions 
//Return a new task object
function newTask(taskDescription){
  return {
    description: taskDescription,
    completed: ''
  }
}

//Display all tasks in global tasks array 
function displayAll(){
 let outputStr = '';
 for (let i=0; i< tasks.length;i++ ){
    outputStr += getTaskHTMLStr(tasks[i],i);
 }
 tasksEl.innerHTML = outputStr;
}

//Get Html for given Task
function getTaskHTMLStr(task,i){
  return `
  <div class = "${task.completed}" >
   ${i}: ${task.description}
  </div>
  `;
}

function saveTask(){
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks(){
  let tasksStr = localStorage.getItem('tasks');
  return JSON.parse(tasksStr) ?? [];
}

