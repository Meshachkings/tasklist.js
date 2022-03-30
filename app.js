// DEFINE VAR

const form = document.querySelector("#form-task");
const filter = document.querySelector("#filter");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-task");
const taskInput = document.querySelector("#task");

// LOAD ALL EVENT LISTENER

loadEventListeners();

// LOAD ALL EVENT LISTENERS

function loadEventListeners() {
//load from localstorage
    document.addEventListener('DOMContentLoaded', getTasks);
// add task
    form.addEventListener('submit', addTask);
//remove task
    taskList.addEventListener('click', removeTask);
//clear task
    clearBtn.addEventListener('click', clearTask);
//filter task
    filter.addEventListener('keyup', filterTask);

}

//GET TASK FROM LS
function getTasks(){
    let tasks;
    if (localStorage.getItem('tasks')=== null){
        task = []
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task){
        const li = document.createElement('li');
        li.className = "collection-item";
    
        li.appendChild(document.createTextNode(task));
    //CREATE THE LINK 
        const link = document.createElement('a');
        link.className = 'delete-item secondary content right';
        link.innerHTML = '<li class="fa fa-remove"></li>';
    //APPEND LINK TO LI
        li.appendChild(link);
    //APPEND LI TO THE UL
        taskList.appendChild(li);
    
      
    
    })
}

// ADD TASK
function addTask(e) {
    if(taskInput.value ===''){
        alert('Add A Task');
    }

// CREATE LI ELEMENT
    const li = document.createElement('li');
    li.className = "collection-item";

    li.appendChild(document.createTextNode(taskInput.value));
//CREATE THE LINK 
    const link = document.createElement('a');
    link.className = 'delete-item secondary content right';
    link.innerHTML = '<li class="fa fa-remove"></li>';
//APPEND LINK TO LI
    li.appendChild(link);
//APPEND LI TO THE UL
    taskList.appendChild(li);

    //STORE
    storeInLocalStorage(taskInput.value);

//CLEAR INPUT
    taskInput.value = '';




    e.preventDefault();


}
//STORE IN LOCALSTORAGE

function storeInLocalStorage(task){

    let tasks;

    if (localStorage.getItem('tasks')=== null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks))

}

//REMOVE ITEM
function removeTask(e){
    if (e.target.parentElement.classList.contains('delete-item')){
        if (confirm("are you sure?")){
            e.target.parentElement.parentElement.remove();

            removeFromLS(e.target.parentElement.parentElement)
        }
    }
    
}

//REMOVE FROM LS
function removeFromLS(taskItem){
    let tasks;
    console.log(taskItem)
    if (localStorage.getItem('tasks')=== null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task, index){
        if(taskItem.textContent === task){
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}
//CLEAR TASK
function clearTask(){

    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }

    clearTaskFromLS();
}

//CLEAR TASK FROM LS

function clearTaskFromLS(){
    localStorage.clear();
}
//FILTER FUNCTION
function filterTask(e){

    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(function(task){
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1){
            task.style.display = 'block';
        } else{
            task.style.display = 'none';
        }
    });
}