// UI vars
const form = document.querySelector('form#task-form');
const inputForm = document.querySelector('input#task');
const taskList = document.querySelector('ul.collection');
const clear = document.getElementsByClassName('clear-tasks')[0];
const filterInput = document.getElementById('filter');

loadEventListeners();

function loadEventListeners() {
    document.addEventListener('DOMContentLoaded', getTasks)
    form.addEventListener('submit', addTask);
    clear.addEventListener('click', clearTask);
    taskList.addEventListener('click', delTask);
    filterInput.addEventListener('keyup', filterTask)
}

function getTasks() {
    let tasks;

    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
        tasks.forEach(function(task) {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.innerText = task;
            a.className = 'delete-item secondary-content';
            a.setAttribute('href', '#');
            a.innerHTML = '<i class="fa fa-remove"></i>';
            li.className = "collection-item";
            li.appendChild(document.createTextNode(task));
            li.appendChild(a);
            taskList.appendChild(li);
        })
    }
}

function addTask(e) {
    e.preventDefault();
    if (inputForm.value.length == 0) {
        alert('Please Enter a Task');
    } else {
        // add the li task
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.innerText = inputForm.value;
        a.className = 'delete-item secondary-content';
        a.setAttribute('href', '#');
        a.innerHTML = '<i class="fa fa-remove"></i>';
        li.className = "collection-item";
        li.appendChild(document.createTextNode(inputForm.value));
        li.appendChild(a);
        taskList.appendChild(li);
        // Store task in local storage:
        StoreTaskInLocalStorage(inputForm.value)


        inputForm.value = '';


    }
}

function StoreTaskInLocalStorage(input) {

    let tasks;
    storage = localStorage.getItem('tasks');

    if (storage === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(storage);
    }
    tasks.push(input);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function delTask(e) {
    if (confirm('Are you sure you want to delete this task?')) {
        if (e.target.className === 'fa fa-remove') {
            e.target.parentElement.parentElement.remove();
            RemoveTaskFromLocalStorage(e.target.parentElement.parentElement)
        }
    }

    e.preventDefault()
}

function RemoveTaskFromLocalStorage(taskItem) {
    let tasks;

    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task, index) {
        if (taskItem.textContent === task) {
            tasks.splice(index, 1);
        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));

}


function clearTask(e) {

    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }
    localStorage.clear();

    e.preventDefault();
}

function filterTask(e) {
    const text = filterInput.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(function(task) {
        const item = task.firstChild.textContent;
        if (item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    });


    e.preventDefault();
}

let val;

val = form;
val = inputForm;
val = clear[0];
val = taskList.innerText;
// val = classList
// val = filterTask


console.log(val)