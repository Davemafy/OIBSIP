let todosArr = [];
let todosFromStorage = localStorage.getItem("todos");

const todoList = document.querySelector("#todo-list");
const switcher = document.querySelector("#switch");
let todos = [];

// const observer = new IntersectionObserver((entries) => {
//     entries.forEach((entry) => {
//       if (entry.isIntersecting) {
//         entry.target.classList.remove('animate-in')
//       } else {
//         entry.target.classList.add('animate-in')
//       }
//   })
// })

// Check  localStorage for stored todosArr
if (todosFromStorage) {
    todosArr = JSON.parse(todosFromStorage);
    todosArr.forEach(todo => render(todo));
    reflow();

    // switcher.innerHTML = "<span class='active'>all</span> / pending";
    // switcher.setAttribute("data-switched", true);
}

const todoInput = document.querySelector("#todo-input");
const addtodoBtn = document.querySelector("#add-todo");


switcher.addEventListener("click", () => {
    if (!todos.length) return;

    let switched = switcher.getAttribute("data-switched");
    if (switched == "true") {
        switcher.innerHTML = "<span class='active'>pending</span> / all";
        switcher.setAttribute("data-switched", false);
    } else {
        switcher.innerHTML = "<span class='active'>all</span> / pending";
        switcher.setAttribute("data-switched", true);
    }

    todoList.innerHTML = "";
    todosArr.forEach(todo => {
        render(todo);
    });
    reflow();
});

addtodoBtn.addEventListener("click", e => {
    e.preventDefault();
    // Check For User input
    if (todoInput.value) {
        let timestamp = new Date();
        let newTodo = {
            id: crypto.randomUUID(),
            completed: false,
            value: todoInput.value,
            date: formatDate(
                timestamp.getDay(),
                timestamp.getDate(),
                timestamp.getMonth(),
                timestamp.getFullYear()
            ),
            time: `${timestamp.getHours()}:${timestamp.getMinutes()}:${timestamp.getSeconds()} ${
                timestamp.getHours() > 15 ? "AM" : "PM"
            }`
        };

        clearInput();
        render(newTodo);
        todosArr.push(newTodo);

        reflow();

        localStorage.setItem("todos", JSON.stringify(todosArr));
    }
});

function liveShow() {
    todoList.querySelector("#update-box");
}

function reflow() {
    todos = document.querySelectorAll("[data-todo]");
    let pending = 0;
    todos.forEach(todo => {
    	  console.log(todo.completed)
        !todo.completed && pending++;
        todo.addEventListener("click", handleClick);
    });

    setStatus();
}

function setStatus() {
       document.querySelector("#status").innerText = `${ todos.length || "No"
        }  todo's  left`;
}

// Function append todos to the DO
function render({ id, value, date, time, completed }) {
    let filter = switcher.querySelector(".active").innerText;
    if (filter == "pending" && completed) {
        return;
    }

    let todo = document.createElement("li");
    let infoDiv = document.createElement("div");
    let title = document.createElement("h2");
    let timeStamp = document.createElement("div");
    let dateEl = document.createElement("p");
    let timeEl = document.createElement("p");
    let btnDiv = document.createElement("div");
    let checkBtn = document.createElement("button");
    let deleteBtn = document.createElement("button");

    title.innerText = value;
    dateEl.innerText = date;
    timeEl.innerText = time;

    btnDiv.classList.add("btn-div");
    checkBtn.classList.add("check-btn");
    deleteBtn.classList.add("delete-btn");

    checkBtn.innerHTML = `<svg class="pointer-events-none" viewBox="0 0 24 24" width="17" height="20" fill="currentColor" > <path d="M22.319,4.431,8.5,18.249a1,1,0,0,1-1.417,0L1.739,12.9a1,1,0,0,0-1.417,0h0a1,1,0,0,0,0,1.417l5.346,5.345a3.008,3.008,0,0,0,4.25,0L23.736,5.847a1,1,0,0,0,0-1.416h0A1,1,0,0,0,22.319,4.431Z" /></svg>`;
    deleteBtn.innerHTML = `<p class="pointer-events-none">Delete</p>`;

    todo.classList.add("todo", `${completed && "completed"}`);

    todo.id = id;
    todo.setAttribute("data-todo", "");

    timeStamp.classList.add("timestamp");
    dateEl.classList.add("date");
    title.classList.add("title");
    timeEl.classList.add("time");

    infoDiv.appendChild(title);
    timeStamp.appendChild(dateEl);
    timeStamp.appendChild(timeEl);
    infoDiv.appendChild(timeStamp);
    todo.appendChild(infoDiv);
    btnDiv.appendChild(checkBtn);
    btnDiv.appendChild(deleteBtn);
    todo.appendChild(btnDiv);
    
    //observer.observe(todo)

    if (!completed) {
        todoList.insertAdjacentElement("afterbegin", todo);
    } else {
        todoList.appendChild(todo);
    }
}

todos.forEach(todo => {
    todo.addEventListener("click", handleClick);
});

function clearInput() {
    todoInput.value = "";
}

function handleClick(e) {
    let target = e.target;

    if (target.matches(".check-btn")) {
        markComplete(e.currentTarget, target);
    }

    if (target.matches(".delete-btn")) {
        deleteItem(e.currentTarget);
    }
}

function markComplete(target, check) {
    todoList.innerHTML = "";

    todosArr = todosArr.map(todo => {
        if (todo.id === target.id) {
            todo.completed = todo.completed ? false : true;
        }

        render(todo);
        return todo;
    });

    reflow();

    localStorage.setItem("todos", JSON.stringify(todosArr));
}

function deleteItem(target) {
    let id = target.id.toString();
    todosArr = todosArr.filter(todo => !(todo.id == id));
    target.remove();
    reflow();

    localStorage.setItem("todos", JSON.stringify(todosArr));
}


function formatDate(dayOfWeek, day, month, year) {
    var daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    var months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
    ];

    return daysOfWeek[dayOfWeek] + " " + months[month] + " " + day + " " + year;
}
