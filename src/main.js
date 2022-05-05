let form = document.getElementById("form");
let textInput = document.getElementById("textInput");
let dateInput = document.getElementById("dateInput");
let textarea = document.getElementById("textarea");
let msg = document.getElementById("msg");
let tasks = document.getElementById("tasks");
let add = document.getElementById("add");

let data = [];

form.addEventListener("submit", (e) => {
  e.preventDefault();
  formValidation();
});

let acceptData = () => {
    data.push({
        text: textInput.value,
        date: dateInput.value,
        description: textarea.value,
    });
    //collect the data from the inputs then pushes then inside the local storage. After that, add the items.
    localStorage.setItem("data", JSON.stringify(data));
    console.log(data);
    createTask();
};

let resetForm = () => {
    textInput.value = "";
    dateInput.value = "";
    textarea.value = "";
};

let createTask = () => {
    tasks.innerHTML = "";
    data.map((x,y) => {
        return (
            tasks.innerHTML += `
            <div id=${y}>
                <span class="fw-bold">${x.text}</span>
                <span class="small text-secondary">${x.date}</span>
                  <p>${x.description}</p>

                <span class="options">
                  <i onClick="editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit"></i>
                  <i onClick="deleteTask(this); createTask()" class="fas fa-trash-alt"></i>
                </span>
            </div>
            `);
    });
    resetForm();
};

let formValidation = () => {
    if (textInput.value === "") {
        console.log("failure");
        msg.innerHTML = "Task cannot be blank";
    } else {
        console.log("Success");
        msg.innerHTML = "";
        acceptData();
        add.setAttribute("data-bs-dismiss", "modal");
        add.click();

        (() => {
            add.setAttribute("data-bs-dismiss", "");
        })();
    }
};