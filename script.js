// Refactor and pick better constant/variables names

//read
let localTodos = localStorage.getItem("todos") 
? JSON.parse(localStorage.getItem(("todos")))
: [];

let parent = document.querySelector("#todo-list");
let count = Object.keys(localTodos).length;
// console.log(count)
for(let i = 0; i<count; i++ ){
    let id = `li${i}`;
    // console.log(id)
    let el = localTodos[id];
    
    let li = document.createElement("li");
    li.setAttribute("id", `li${i}`)
    li.innerText = el.content;
    // console.log(el.content)

    let html = `
    <button id="i${+count-1}" class="col-2"><i class="fa-solid fa-check"></i></button>
    `
    li.innerHTML += html;
    parent.appendChild(li)
    console.log(li)
    document.querySelector(`#i${count-1}`).addEventListener('click', function(){
        // console.log('clicked ' + `i${counter-1}`)
        let todoId = `li${count-1}`;
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
    console.log(localTodos)


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

    todo.innerText = '';
    todo.appendChild(el);
    parent.appendChild(todo);
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