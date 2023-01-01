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
let editElement = "";

//add eventy listener
form.addEventListener("submit", clickItem);
clearBtn.addEventListener("click", clearItem);

//*** functions
function clickItem(e) {
    e.preventDefault();
    if(editflag) editItem();
    else addItem();
}

function addItem() {
    const value = grocery.value;
    
    if(!value) {
        displayAlert("please add an item", 'danger');
        return;
    }

    //wrapper div for list item and btns
    const wrapper = document.createElement("div");
    wrapper.classList.add('groceryWrapper');

    //list items
    const item = document.createElement("p");
    item.classList.add('groceryItem');
    item.innerHTML = value;

    //container for btns
    const btnContainer = document.createElement("div");
    btnContainer.classList.add("btn-container");

    // edit and delete btns
    const editBtn  = document.createElement("button");
    editBtn.classList.add('btn-edit');
    editBtn.innerHTML = `<i class="fas fa-edit"></i>`

    const deleteBtn  = document.createElement("button");
    deleteBtn.classList.add('btn-delete');
    deleteBtn.innerHTML = `<i class="fas fa-trash"></i>`

    //append the btns to the btn container
    btnContainer.appendChild(editBtn);
    btnContainer.appendChild(deleteBtn);

    // append all in wrapper
    wrapper.appendChild(item);
    wrapper.appendChild(btnContainer);

    //append it to list 
    list.appendChild(wrapper);
    //container.classList.add("show-grocery");

    grocery.value = "";

    //eventlisteners on the buttons
    deleteBtn.addEventListener("click", deleteItem);
    editBtn.addEventListener("click", editIt);

    displayAlert("item added", "success");
    toggleClearBtn();
}

//display alert
function displayAlert(text, action) {
    alert.textContent = text;
    alert.classList.add(`alert-${action}`);
    
    setTimeout(function() {
        alert.textContent = "";
        alert.classList.remove(`alert-${action}`);
    }, 1000)
}

//delete btn function
function deleteItem(e) {
    const del = e.currentTarget.parentElement.parentElement;
    list.removeChild(del);

    displayAlert("item deleted", "danger");
    toggleClearBtn();
}

//edit btn function
function editIt(e) {
    editElement = e.currentTarget.parentNode.parentNode.firstChild;
    const itemText = editElement.innerHTML;
    grocery.value = itemText;
    editflag = true;
    submitBtn.innerHTML = 'edit';
    console.log('shake');
}

//edit function itself
function editItem() {
    editElement.innerHTML = grocery.value;
    grocery.value = "";
    editflag = false;
    submitBtn.innerHTML = 'submit';
}

//clearitem function
function clearItem() {
    while (list.firstChild) {
        list.removeChild(list.firstChild)
    }

    toggleClearBtn();
}

function toggleClearBtn() {
    if (list.hasChildNodes()) {
        clearBtn.style.display = "block";
      } else clearBtn.style.display = "none";
}