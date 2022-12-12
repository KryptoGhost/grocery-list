// ***list your variables 
const alert = document.querySelector(".alert");
const grocery = document.getElementById("grocery");
const submitBtn = document.querySelector(".submit-btn");
const form = document.querySelector(".grocery-form");
const list = document.querySelector(".grocery-list");
const container =document.querySelector(".grocery-container");
const clearBtn = document.querySelector(".clear-btn")
//create edit variables
let editflag = false;
let editElement;
let editID;

//add eventy listener
form.addEventListener("submit", addItem);
clearBtn.addEventListener("click", clearItem);

//*** functions
function addItem(e) {
    e.preventDefault();
    const value = grocery.value;
    
    if (value && !editflag) {
        const element = document.createElement("article");
        element.classList.add("grocery-item");
        element.innerHTML = `<p class="groceryItem">${value}</p>
        <div class="btn-container">
          <button class="btn-edit"><i class="fas fa-edit"></i></button>
          <button class="btn-delete"><i class="fas fa-trash"></i></button>
        </div>`;

        //edit btn here
        const editBtn = element.querySelector(".btn-edit");
        editBtn.addEventListener("click", editItem);
        //delete btn here
        const deletebtn = element.querySelector(".btn-delete");
        deletebtn.addEventListener("click", deleteItem);
        
        list.appendChild(element);
        container.classList.add("show-grocery");
        displayAlert("Item was added", "success");
        setbackToDefault();
    }
    else if (value && editflag) {
        editElement.innerHTML = value;
        displayAlert("value added", "success");
        setbackToDefault();
    }
    else {
        displayAlert("please add an item", "danger");
    }
}
// display alert function
function displayAlert(text, action) {
    alert.textContent = text;
    alert.classList.add(`alert-${action}`);

    setTimeout(function() {
    alert.textContent = "";
    alert.classList.remove(`alert-${action}`);
    }, 1000)
}
//set back to default
function setbackToDefault() {
    grocery.value = "";
    submitBtn.textContent = "submit";
}
// clear btn function
function clearItem() {
    const groceryItem = document.querySelectorAll(".grocery-item");
    if (groceryItem.length > 0) {
        groceryItem.forEach(item => {
            list.removeChild(item)
        })
    }
    container.classList.remove("show-grocery");
    displayAlert("empty list", "danger");
    setbackToDefault();
}
//edit btn function
function editItem(e) {
    const element = e.currentTarget.parentElement.parentElement;
    //target the paragragh to be edited
    //editElement = document.querySelector(".groceryItem");
     editElement = e.currentTarget.parentElement.previousElementSibling;
    grocery.value = editElement.innerHTML;
    editflag = true;
    submitBtn.textContent = "edit";
    editID = element.dataset.id;
}
// delete btn function
function deleteItem(e) {
const element = e.currentTarget.parentElement.parentElement;
list.removeChild(element);

if (list.children.length === 0) {
    container.classList.remove("show-grocery");
}
displayAlert("item removed", "danger");
setbackToDefault();
}