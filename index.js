let mainContainer = document.getElementById('mainContainer');
let title = document.getElementById('title');
let taskArr = JSON.parse(localStorage.getItem('TASKS'))||[]

function displayData(tasks) {
    if (tasks.length === 0) {
        title.style.display = 'block'; 
    } else {
        title.style.display = 'none';
    }
    mainContainer.innerHTML = ``
    mainContainer.appendChild(title);
    tasks.forEach(ele => {
        let itemContainer = document.createElement('div');
        let inputElement = document.createElement('input')
        inputElement.type = 'text'
        inputElement.value = ele.task;
        inputElement.id = `taskInput-${ele.id}`
        inputElement.readOnly = true;


        let updateIcon = document.createElement('span')
        updateIcon.innerHTML = `<i class="fa-solid fa-pen"></i>`
        updateIcon.addEventListener('click',()=>{
            updateTask(ele.id)
        })
        let deleteIcon = document.createElement('span')
        deleteIcon.innerHTML = `<i class="fa-solid fa-trash"></i>`
        deleteIcon.addEventListener('click',()=>{
            removeTask(ele)
        })
        let saveIcon = document.createElement('span')
        saveIcon.innerHTML = `<i class="fa-regular fa-square-check"></i>`
        saveIcon.addEventListener('click',()=>{
            saveTask(ele.id);
        })
        itemContainer.append(inputElement, updateIcon, saveIcon, deleteIcon);
        mainContainer.appendChild(itemContainer)
    })
}

// ADDS TASKS
let taskForm = document.getElementById('taskForm')
taskForm.addEventListener('submit', (event) => {
    event.preventDefault()
    let task = document.getElementById('task').value.trim();
    if(task ===""){
        return alert('Please enter a Task')
    }
    let newId = taskArr.length>0?Number(taskArr[taskArr.length-1].id):0
    let newTask = {
        id:newId+1,
        task
    }
    taskArr.push(newTask)
    localStorage.setItem("TASKS",JSON.stringify(taskArr))
    displayData(taskArr)
    document.getElementById('task').value = ""
})

// Enables the Update option
function updateTask(id){
    let taskInput = document.getElementById(`taskInput-${id}`);
    taskInput.readOnly = false;
    taskInput.focus();
}
function saveTask(id){
    let taskInput = document.getElementById(`taskInput-${id}`).value.trim();
    let taskIndex = taskArr.findIndex(task => task.id === id);
    if (taskIndex !== -1) {
        taskArr[taskIndex].task = taskInput;
    }
    localStorage.setItem('TASKS',JSON.stringify(taskArr))
    displayData(taskArr)
    
}

// DELETES TASK
function removeTask(ele){
    let isExisitingUser = taskArr.filter(element=> element.id !== ele.id)
    console.log(isExisitingUser)
    localStorage.setItem('TASKS',JSON.stringify(isExisitingUser))
    taskArr = isExisitingUser;
    displayData(taskArr)
}



if ('webkitSpeechRecognition' in window) {
    const recognition = new webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.lang = 'en-US';
  
    const micButton = document.getElementById('micButton'); 
  
    micButton.addEventListener('click', () => {
      recognition.start();
      micButton.style.animation = "pulse 1.5s infinite ease-in-out";
    });
  
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      console.log(transcript)
    if (transcript === "") {
        return alert("No task recognized. Please try again.");
    }

    let newId = taskArr.length > 0 ? Number(taskArr[taskArr.length - 1].id) : 0;
    let newTask = {
        id: newId + 1,
        task: transcript
    };

    taskArr.push(newTask);
    localStorage.setItem("TASKS", JSON.stringify(taskArr));

    displayData(taskArr);
    
    };
  
    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
    };
    recognition.onend = ()=>{
          console.log("speech recognition ended");
          micButton.style.animation = "none";
    }
  
  } else {
    alert('Speech recognition is not supported in this browser.');
  }


document.addEventListener('DOMContentLoaded', ()=>displayData(taskArr))