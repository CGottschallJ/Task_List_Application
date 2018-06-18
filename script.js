'use strict';

//Definining UI Variables

//taskForm
const taskForm = document.querySelector('#task-form');

//taskList
const taskList = document.querySelector('.collection');

//clearButton
const clearButton = document.querySelector('.clear-tasks');

//filterInput
const filterInput = document.querySelector('#filter');

//taskInput
const taskInput = document.querySelector('#task');


//Load All Event Listeners
loadEventListeners();

//Create all Event Listeners
function loadEventListeners(){  

  //DOM Load Event
  document.addEventListener('DOMContentLoaded', getListItems)

  //Add Task Event
  taskForm.addEventListener('submit', addTaskItem);

  //Remove Task Event
  taskList.addEventListener('click', removeTaskItem);

  //Remove All Tasks
  clearButton.addEventListener('click', removeAllTasks);

  //Filter Tasks
  filterInput.addEventListener('keyup', filterTasks);

}

function getListItems() {
  let tasks;
  if(localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(task => {
    //create List Item
    const listItem = document.createElement('li');
    //create class attribute for listItem
    listItem.className = 'collection-item';
    //create Text Node
    const listText = document.createTextNode(task);
    //append to listItem
    listItem.appendChild(listText);
    //create deleteLink Icon
    const deleteLink = document.createElement('a');
    //create class attribute for deleteLink
    deleteLink.className = 'delete-item secondary-content';
    //creating HTML icon
    deleteLink.innerHTML = '<i class="fa fa-times"></i>';  // ->>>> cannot get the link showing <i class="fa fa-remove" />
    //appending deleteLink to listItem
    listItem.appendChild(deleteLink)
    //appending listItem to collection
    taskList.appendChild(listItem);
  })
}


function addTaskItem(e) {
  const taskLabel = document.querySelector('#task-label');
  e.preventDefault();
  if(taskInput.value === '') {
    taskLabel.innerText = 'Please Enter A Task First';
  } else {
    //create List Item
    const listItem = document.createElement('li');
    //create class attribute for listItem
    listItem.className = 'collection-item';
    //create Text Node
    const listText = document.createTextNode(taskInput.value);
    //append to listItem
    listItem.appendChild(listText);
    //create deleteLink Icon
    const deleteLink = document.createElement('a');
    //create class attribute for deleteLink
    deleteLink.className = 'delete-item secondary-content';
    //creating HTML icon
    deleteLink.innerHTML = '<i class="fa fa-times"></i>';  // ->>>> cannot get the link showing <i class="fa fa-remove" />
    //appending deleteLink to listItem
    listItem.appendChild(deleteLink)
    //appending listItem to collection
    taskList.appendChild(listItem);

    //Store Task in Local Storage
    storeTaskInLocalStorage(taskInput.value);

    taskInput.value = '';
    taskLabel.innerText = 'New Task';
  }
}

function storeTaskInLocalStorage(task) {
  let tasks;
  if(localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTaskItem(e) {
  if(e.target.parentElement.classList.contains('delete-item')){
    e.target.parentElement.parentElement.remove()
    
    //remove from Local Storage
    removeTaskFromLocalStorage(e.target.parentElement.parentElement);
  }
}

function removeTaskFromLocalStorage(taskItem){
  let tasks;
  if(localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach((task, index) => {
    if(taskItem.textContent === task){
      tasks.splice(index, 1)
    }
    console.log(tasks)
  });

  localStorage.setItem('tasks', JSON.stringify(tasks))
}
 
function removeAllTasks(){
  //taskList.innerHTML = '';

  while(taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

  clearAllFromLocalStorage();
}

function clearAllFromLocalStorage() {
  localStorage.clear();
}

function filterTasks(e) {
  const filterText = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach(item => {
    const itemText = item.firstChild.textContent.toLowerCase();
    if(itemText.indexOf(filterText) != -1) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  })
}

