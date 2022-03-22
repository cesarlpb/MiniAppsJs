// Refactor and pick better constant/variables names

// Add button to permanently remove todos from completed or when refreshing
// Solve issue: only 3 elements are uploading from LocalStorage
/*
Todo {

    todoId: number
    content: text
    date: new Date().toLocalDateString()
    isCompleted: boolean
    tags: array [dev, coding, etc]

}
*/

//read
let localTodos = localStorage.getItem("todos") 
? JSON.parse(localStorage.getItem(("todos")))
: [];

let parent = document.querySelector("#todo-list");
let count = Object.keys(localTodos).length;
// console.log(count)
for(let i = 1; i<count+1; i++ ){
    let id = `li${i}`;
    // console.log(id)
    let el = localTodos[id];
    
    let li = document.createElement("li");
    li.setAttribute("id", `li${i}`)
    li.innerText = el.content;
    // console.log(el.content)

    let html = `
    <button id="i${i}" class="col-2"><i class="fa-solid fa-check"></i></button>
    `
    li.innerHTML += html;
    parent.appendChild(li)
    console.log(li)
    
    document.querySelector(`#i${i}`).addEventListener('click', function(){
        console.log('clicked ' + `i${count-1}`)
        let todoId = `li${i}`;
        completeTodo(todoId);
        delTodo(todoId);
    });

}
console.log('added')

function addTodo(){
    let newTodo = document.querySelector("#todo").value;
    let li = createTodo(newTodo);
    let parent = document.querySelector("#todo-list");
    parent.appendChild(li);

    let counter = document.querySelectorAll("li").length;
    document.querySelector(`#i${counter-1}`).addEventListener('click', function(){
        // console.log('clicked ' + `i${counter-1}`)
        let todoId = `li${counter-1}`;
        completeTodo(todoId);
        delTodo(todoId);
    });

    //store todos
    let todoId = `li${counter-1}`;
    let Todo = {};

    //read
    let localTodos = localStorage.getItem("todos") 
    ? JSON.parse(localStorage.getItem(("todos")))
    : {};
    
    // console.log(localTodos)
    localTodos [todoId] = {
        "todoId": todoId,
        "content": li.innerText
        }
    localStorage.setItem("todos", JSON.stringify(localTodos))
    // console.log(localTodos)


    document.querySelector("#todo").value = '';
    // console.log('added')
}

function refreshTodo(){
    document.querySelector("#todo").value = '';
    // console.log('deleted!')
}

function delTodo(todoId){

}

function completeTodo(todoId){
    let todo = document.querySelector(`#${todoId}`);
    // console.log(todoId)
    // console.log(todo)
    parent = document.querySelector("#completed-list");
    // console.log(parent);
    let text = todo.innerText;
    console.log(text)

    let el = document.createElement("span");
    el.setAttribute("class", "completed");
    el.innerText = text;

    let outer = document.createElement("span");
    outer.setAttribute("class", "outer");
    outer.appendChild(el)
    todo.innerText = '';

    console.log(el)
    todo.appendChild(outer);
    let btn = document.createElement("button");
    btn.setAttribute("class", "col-2");
    btn.setAttribute("id", `r${todoId.slice(-1)}`);

    let trashIcon = document.createElement("i");
    trashIcon.setAttribute("class", "fa-solid fa-trash");
    btn.appendChild(trashIcon);
    // console.log(btn)
    todo.innerHTML += btn.outerHTML;
    parent.appendChild(todo);

    document.querySelector(`#r${todoId.slice(-1)}`).addEventListener('click', function(){
        // console.log('clicked ' + `i${count-1}`)
        
        // completeTodo(todoId);
        // delTodo(todoId);
        let localTodos = localStorage.getItem("todos") 
        ? JSON.parse(localStorage.getItem(("todos")))
        : [];
        console.log(todoId)
        let wasRemoved = delete localTodos[`li${todoId.slice(-1)}`];
        if(wasRemoved){
            document.querySelector(`#${todoId}`).remove();
            localStorage.setItem("todos", JSON.stringify(localTodos))
        } else {
            console.log('elment not found')
        }
    });
}

function createTodo(todo){
    let counter = document.querySelectorAll("li").length;
    let li = document.createElement("li");
    li.setAttribute("id", `li${counter}`);
    let html = `
    <button id=${"i"+counter} class="col-2"><i class="fa-solid fa-check"></i></button>
    `
    todo += html;
    li.innerHTML = todo;
    return li;
}