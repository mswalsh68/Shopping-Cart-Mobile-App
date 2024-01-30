import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://shopping-cart-2a272-default-rtdb.firebaseio.com/"
}
const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")

const inputField = document.querySelector("#input-field")
const addBtn = document.querySelector("#add-button")
const shoppingList = document.querySelector("#shopping-list")

addBtn.addEventListener("click", function(){
    let inputValue = inputField.value
    push(shoppingListInDB, inputValue)
    clearInputField()
})



onValue(shoppingListInDB, function(snapshot){

    if(snapshot.exists()){

        let itemsArray = Object.entries(snapshot.val())
        clearShoppingList()
        
        
        for (let i = 0; i < itemsArray.length; i++) {
            let currentItem = itemsArray[i]
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]
            
            addToShoppingList(currentItem)
        }
        
    }else{
        shoppingList.innerHTML = "No items here... yet"
    }
        
    

})

function clearShoppingList(){
    shoppingList.innerHTML = ""
}

function clearInputField(){
    inputField.value = ""
}

function addToShoppingList(item){
    let itemID = item[0]
    let itemValue = item[1]
    let newEl = document.createElement("li")
    newEl.textContent = itemValue
    
    
    newEl.addEventListener("click", function(){
        let exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}`)
        remove(exactLocationOfItemInDB)
    })
    
    shoppingList.append(newEl)
}

