/* 
======================
==    Selecotrs     ==
======================
*/
const todoInput    = document.querySelector(".todo-input")  ;
const todoButton   = document.querySelector(".todo-button") ;
const todoList     = document.querySelector(".todo-list")   ;
const filterOption = document.querySelector(".filter-todo") ;


/* 
=============================
==    Event Listeners      ==
=============================
*/
document.addEventListener("DOMContentLoaded",getTodos) ;
todoButton.addEventListener("click",addTodo) ; 
todoList.addEventListener("click",completeOrDelete) ;
filterOption.addEventListener("change",filter);



/* 
=====================
==    Function     ==
=====================
*/
function addTodo(e)
{
  e.preventDefault();

  if(todoInput.value != "")
  {
    let myDiv = document.createElement("div") ;
    myDiv.classList.add("todo") ;
  
    let myli = document.createElement("li") ;
    myli.classList.add("todo-item") ;
    myli.appendChild(document.createTextNode(todoInput.value)) ;
  
    // save to local storage 
    saveLocalTodos(todoInput.value) ;
  
    let completedButton = document.createElement("button") ;
    completedButton.classList.add("complete-btn") ;
    completedButton.innerHTML = "<i class = 'fas fa-check'></i>" ;
  
  
    let trashButton = document.createElement("button") ;
    trashButton.classList.add("trash-btn") ;
    trashButton.innerHTML = "<i class = 'fas fa-trash'></i>" ;
  
  
    myDiv.appendChild(myli) ;
    myDiv.appendChild(completedButton) ;
    myDiv.appendChild(trashButton) ;
  
    todoList.appendChild(myDiv) ;
    todoInput.value = "" ;
  }

}


function completeOrDelete(e)
{
  const todo = e.target.parentElement;
  if(e.target.classList.contains("trash-btn"))
  {
      todo.classList.add("fall") ;
      removeLocalTodos(todo);
      todo.addEventListener("transitionend" , () => {
        todo.remove();
      })
  }

  if(e.target.classList.contains("complete-btn"))
  {
    e.target.parentElement.classList.toggle("completed");
  }
}

function filter(e){
  const todos = todoList.children ;
  
  Array.from(todos).forEach((todo) => {
    switch(e.target.value){

      case "all":
        todo.style.display = "flex" ;
      break;

      case "completed":
        if(todo.classList.contains("completed"))
        {
          todo.style.display = "flex" ;
        }
        else
        {
          todo.style.display = "none" ;
        }
      break;

      case "uncompleted":
        if(!todo.classList.contains("completed"))
        {
          todo.style.display = "flex" ;
        }
        else
        {
          todo.style.display = "none" ;
        }
      break;

    }
  });

}

function saveLocalTodos(todo)
{
  let todos ;

  // Check 
  if(localStorage.getItem("todos"))
  {
    // if local storage already have todos get it as String 
    todos =  JSON.parse(window.localStorage.getItem("todos")) ;
  }
  else
  {
    // if local storage Don't have todos Create Empty Array
    todos = [] ;
  }
  todos.push(todo) ;
  localStorage.setItem("todos",JSON.stringify(todos)) ;

}

function getTodos()
{
  let todos ;

  // Check 
  if(localStorage.getItem("todos"))
  {
    // if local storage already have todos get it as String 
    todos =  JSON.parse(window.localStorage.getItem("todos")) ;
  }
  else
  {
    // if local storage Don't have todos Create Empty Array
    todos = [] ;
  }

  todos.forEach((todo) =>{
    let myDiv = document.createElement("div") ;
    myDiv.classList.add("todo") ;
  
    let myli = document.createElement("li") ;
    myli.classList.add("todo-item") ;
    myli.appendChild(document.createTextNode(todo)) ;
  
    let completedButton = document.createElement("button") ;
    completedButton.classList.add("complete-btn") ;
    completedButton.innerHTML = "<i class = 'fas fa-check'></i>" ;
  
    let trashButton = document.createElement("button") ;
    trashButton.classList.add("trash-btn") ;
    trashButton.innerHTML = "<i class = 'fas fa-trash'></i>" ;
  
  
    myDiv.appendChild(myli) ;
    myDiv.appendChild(completedButton) ;
    myDiv.appendChild(trashButton) ;
  
    todoList.appendChild(myDiv) ;
  })

}

function removeLocalTodos(todo){
  let todos ;
    // Check 
    if(localStorage.getItem("todos"))
    {
      // if local storage already have todos get it as String 
      todos =  JSON.parse(window.localStorage.getItem("todos")) ;
    }
    else
    {
      // if local storage Don't have todos Create Empty Array
      todos = [] ;
    }
    const todoIndex = todo.children[0].innerText;
    console.log(todos) ;
    todos.splice(todos.indexOf(todoIndex),1) ;
    localStorage.setItem("todos",JSON.stringify(todos)) ;
    console.log(todos) ;
}