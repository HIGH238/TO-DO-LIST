// CODE EXPLAINED channel

// Select the Element
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");

//classes name
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

//variables
let LIST, id;
//get item fom localstorage
let data = localStorage.getItem("TODO")
//check if data is not empty
if (data){
    LIST=JSON.parse(data);
    id = LIST.length;
    loadList(LIST);


}else {
        LIST=[]
        id=0;
}

//load items to the user's interface
function loadList(array){
    
    array.forEach(item =>
     {addToDo(item.name,item.id,item.done,item.trash);
        
    });
}
//clear the storage
clear.addEventListener("click" , function(){
    localStorage.clear();
    location.reload();
})

// show todays date 
const options = { weekday: "long", month: "short", day: "numeric" }
const today = new Date();
dateElement.innerHTML = today.toLocaleDateString("en-US", options)

// add to do function
function addToDo(toDo, id, done, trash) {
    if (trash) { return; }
    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";
    const item = `
    <li class="item">
        <i class="fa ${DONE} co" job="complete" id="${id}" ></i> 
        <p class="text ${LINE}">${toDo}</p>
     <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
    </li>
    `;
    const position = "beforeend";
    list.insertAdjacentHTML(position, item);
}

//add an item to list  use the enter key
document.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        const toDo = input.value;
        if (toDo) {
            addToDo(toDo, id, false, false);
            LIST.push({
                name: toDo,
                id: id,
                done: false,
                trash: false
            });
            //add items to localstorage
            localStorage.setItem("TODO", JSON.stringify(LIST));

            id++;

        }
        input.value = "";
    }
})
// complete to do 
function completeToDo(element) {
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

    LIST[element.id].done = LIST[element.id].done ? false : true;
}
//remove to do
function removeToDo(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);

    LIST[element.id].trash = true;
}

// addEventListener
list.addEventListener("click", function (event) {
    const element = event.target;
    const elementJob = element.attributes.job.value;
    if (elementJob == "complete") {
        completeToDo(element);
    } else if (elementJob == "delete") {
        removeToDo(element);
    }
    //add items to localstorage
    localStorage.setItem("TODO", JSON.stringify(LIST));

}
)
