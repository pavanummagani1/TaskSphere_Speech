let mainContainer = document.getElementById('mainContainer');
let taskArr = JSON.parse(localStorage.getItem('TASKS'))||[]
if(taskArr&&taskArr.length==0){
    mainContainer.innerHTML = `<span style="display: block; text-align: center; font-size: 20px; color: gray;">ADD TASKS</span>`
}
function displayData(tasks) {
    mainContainer.innerHTML = '';
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
    // console.log(taskArr)
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
    let isExisitingUser = taskArr.filter(element=> ele !== element)
    console.log(isExisitingUser)
    localStorage.setItem('TASKS',JSON.stringify(isExisitingUser))
    taskArr = isExisitingUser;
    displayData(taskArr)
}



if ('webkitSpeechRecognition' in window) {
    const recognition = new webkitSpeechRecognition();
    recognition.continuous = false; // Capture only one phrase
    recognition.lang = 'en-US'; // Set language
  
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