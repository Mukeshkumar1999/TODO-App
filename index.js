
console.log("Om Ganeshay namah:");

let form = document.getElementById('form');
let textInput = document.getElementById('textInput');
let dateInput = document.getElementById('dateInput');
let msg = document.getElementById('msg');
let textarea = document.getElementById('textarea');
let add = document.getElementById('add');
let tasks = document.getElementById('tasks');




//creat an empty array.
let data = [];

form.addEventListener('submit', (e) => {
    e.preventDefault();
    formValidation();

});


// Get the data  show on screen
let showTasks = () => {

    tasks.innerHTML = '';
    data.map((item, index) => {
        return (tasks.innerHTML += `
        <div id="${index}">
                <span class="fw-bold">${item.text}</span>
                <span class="small text-secondary">${item.date}</span>
                <p>${item.description}</p>

                <span class="option">
                <!-- edit -->
                    <i class="bi bi-pencil-square" onclick="editTask(this)" data-bs-toggle="modal"
                        data-bs-target="#form"></i>
                        <!-- delete -->
                    <i class="bi bi-trash" onclick="deleteTask(this)"></i>
                </span>
            </div>
        `
        );

    });
    resetForm();
};

let resetForm = () => {
    textInput.value = '';
    dateInput.value = '';
    textarea.value = '';
};


//posting the data
let acceptData = () => {
    // adding the tasks inside data array
    data.push({
        text: textInput.value,
        date: dateInput.value,
        description: textarea.value,
    });
    //set value in localstorage.
    localStorage.setItem('tasks', JSON.stringify(data));
    showTasks();

    console.log(data);


};

let formValidation = () => {
    // failure...
    if (textInput.value === '') {
        msg.innerHTML = '* task title cant be blanck';
    }
    else {
        //succes....;
        msg.innerHTML = '';
        acceptData();

        //close the modal after submition

        add.setAttribute('data-bs-dismiss', 'modal');
        add.click();
        // IIFE: Immediately Invoked function Expression
        (() => {
            add.setAttribute('data-bs-dismiss', '');
        })();
    }
};

//delete the task

let deleteTask = (e) => {
    console.log(e.parentElement.parentElement);
    //removing element from dom and removing from ui
    e.parentElement.parentElement.remove();
    //deleting the element from data array
    data.splice(e.parentElement.parentElement.id, 1);
    localStorage.setItem('task', JSON.stringify(data));
    console.log('data array after deletion', data);
};

//Editing a task

let editTask = (e) => {
    let selectedTask = e.parentElement.parentElement;
    textInput.value = selectedTask.children[0].innerHTML;
    dateInput.value = selectedTask.children[1].innerHTML;
    textarea.value = selectedTask.children[2].innerHTML;

    // delete the previous element which you were editing

    deleteTask(e);
};


(() => {
    data = JSON.parse(localStorage.getItem('tasks'));
    showTasks();
})();