const input = document.getElementById("input-todo")
const addBtn = document.getElementById("add-btn")
const removeBtn = document.getElementById("remove-btn")
const removeCompletedBtn = document.getElementById("remove-btn-completed")
const ul = document.getElementById("todo-list")
const todoContainer = document.getElementById("todo-container")
let todos = []
let newTodo = ""


//Check for todos in localstorage and render

let todosFromLocalStorage = JSON.parse(localStorage.getItem('todosArray'))
console.log(todosFromLocalStorage)

if (todosFromLocalStorage) {
    todos = todosFromLocalStorage

    for (let i = 0; i < todos.length; i++) {
        newTodo = todos[i]
        addTodos()
    }
}

//Listen for enter in input field and add new tasks 

input.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        getInput()
    }
    
})



//Listen for clicks on add Button and add new tasks 

    addBtn.addEventListener("click", getInput)

    function getInput () {
        if (input.value !== "") {
        
            newTodo = input.value
            todos.push(input.value)
            localStorage.setItem('todosArray', JSON.stringify(todos) )
                
            addTodos()
              
    // Clear input value after submit
        input.value = ""
    
    } 
    
    }



//Function that adds new todos

function addTodos () {

let newLi = document.createElement("li")
newLi.classList.add("todo")

// Add Checkbox

let addCheck = document.createElement('input');
addCheck.type = "checkbox";
addCheck.classList.add("check")

// Add "X" at the end of List item

let newSpan = document.createElement("span")
newSpan.textContent = "x"
newSpan.classList.add("delete")

// Append/Prepend all to new to do item
    
 newLi.innerHTML = newTodo
 newLi.appendChild(newSpan)
 newLi.prepend(addCheck)

 ul.appendChild(newLi)

}


// Toggle complete/incomplete ToDo styling

todoContainer.addEventListener("click", function(e){
    if (e.target.classList.contains("check")) {
    e.target.closest("li").classList.toggle("complete") 
       }                                      
  })  

 // Function that deletes the task when clicking "x"

todoContainer.addEventListener("click", function(e){
    if (e.target.classList.contains("delete") ) {
    let toDelete = e.target.closest("li")  
    
// Loop through the todos array to find the todo equal to the textcontent string and remove it 
    for (let i = todos.length-1; i>= 0; i--) {
            if (todos[i] === toDelete.textContent.slice(0,-1)) {
            todos.splice(i, 1)
              
            } 
        }
// Remove the deleted Todos from LocalStorage
    todosFromLocalStorage = localStorage.setItem('todosArray', JSON.stringify(todos) )
  
// Remove the "Li"
    toDelete.remove()
    } 
   
})

// Delete button functions
      
removeBtn.addEventListener("click", function(){
localStorage.clear()
ul.innerHTML = ""
})


    

      