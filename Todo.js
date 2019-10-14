const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos",
    TODO_SHOWING_CN = "toDoShowing";

let toDos = [];


function deleteToDo(event) {
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo) {
        return toDo.id !== parseInt(li.id);
    });
    for (i = 0; i < cleanToDos.length; i++) {
        cleanToDos[i].id = i + 1;
    }
    toDos = cleanToDos;

    saveToDos();
}

function saveToDos() {
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos)); // 배열을 스트링으로 쪼개서 로컬스토리지에저장
}

function paintToDo(text) {
    const li = document.createElement("li");
    const delBtn = document.createElement("button");

    const span = document.createElement("span");
    delBtn.innerText = "❌";
    delBtn.addEventListener("click", deleteToDo);

    const newId = toDos.length + 1;
    span.innerText = text;

    li.appendChild(delBtn);
    li.appendChild(span);
    li.id = newId;
    toDoList.appendChild(li);
    const toDoObj = {
        text: text,
        id: newId
    };
    toDos.push(toDoObj);
    saveToDos();

}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
}

function loadToDos() {
    const loadedToDos = localStorage.getItem(TODOS_LS);

    if (loadedToDos !== null) {
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function(toDo) {
            paintToDo(toDo.text);
        });
    }
}

function init() {
    if (localStorage.getItem(USER_LS) !== null) {
        toDoForm.classList.add(TODO_SHOWING_CN);
    }
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
}

init();