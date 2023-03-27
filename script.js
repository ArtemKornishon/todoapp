const form = document.querySelector('#form');
const taskInput = document.querySelector('#taskInput');
const task_list = document.querySelector('#task_list');

let tasks = [];

if (localStorage.getItem('tasks')) {
    tasks = JSON.parse(localStorage.getItem('tasks'));
}

tasks.forEach(function (task){
   renderTask(task);
})

form.addEventListener('submit', addTask);

task_list.addEventListener('click', deleteTask);

task_list.addEventListener('click', doneTask);

function addTask(event) {

    event.preventDefault()

    const taskText = taskInput.value

    const newTask = {
        id: Date.now(),
        text: taskText,
        done: false
    };

    tasks.push(newTask)

    saveToLocalStorage()

    const cssClass = newTask.done ? 'task_list-title task-title--done' : 'task_list-title';

    const taskHTML = 
        `<li id="${newTask.id}" class="task_list-item"><span class="${cssClass}">${newTask.text}</span>
            <div class="task-list__buttons">
                <button type="button" data-action="done" class="btn-action">
                    <img src="./svg/tick.svg" alt="Done" width="18" height="18">
                </button>
                <button type="button" data-action="delete" class="btn-action">
                    <img src="./svg/cross.svg" alt="Done" width="18" height="18">
                </button>
            </div>
        </li>`

    task_list.insertAdjacentHTML('beforeend', taskHTML);


    taskInput.value = "";
    taskInput.focus();

    saveToLocalStorage()
}

function deleteTask(event) {

    if (event.target.dataset.action === 'delete') {
    const parentNode = event.target.closest('.task_list-item');

        const id = parentNode.id;
        
        const index = tasks.findIndex(function (task) {
                return task.id == id
        });

        tasks.splice(index, 1)

        saveToLocalStorage()

    parentNode.remove()
    }
}

function doneTask(event) {
    if (event.target.dataset.action === 'done') {
        const parentNode = event.target.closest('.task_list-item');

        const id = parentNode.id;

        const task = tasks.find(function (task){
            if (task.id == id) {
                return true
            }
        })

        task.done = !task.done

        saveToLocalStorage()

        const taskTitle = parentNode.querySelector('.task_list-title');
        taskTitle.classList.toggle('task-title--done');
        }
}

function saveToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

function renderTask(task) {
    const cssClass = task.done ? 'task_list-title task-title--done' : 'task_list-title';

    const taskHTML = 
        `<li id="${task.id}" class="task_list-item"><span class="${cssClass}">${task.text}</span>
            <div class="task-list__buttons">
                <button type="button" data-action="done" class="btn-action">
                    <img src="./svg/tick.svg" alt="Done" width="18" height="18">
                </button>
                <button type="button" data-action="delete" class="btn-action">
                    <img src="./svg/cross.svg" alt="Done" width="18" height="18">
                </button>
            </div>
        </li>`

    task_list.insertAdjacentHTML('beforeend', taskHTML);
}