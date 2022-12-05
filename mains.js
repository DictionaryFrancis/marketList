const form = document.getElementById('newItem')
const list = document.getElementById('list')
//verify if has itens, if not return a empty array
//Transform in parse, because localStorage read as string
const itens = JSON.parse(localStorage.getItem("itens")) || []

itens.forEach((element) =>{
    createElement(element)
})

form.addEventListener('submit', (e) =>{
    e.preventDefault()

    const itemName = e.target.elements['itemName']
    const quantity = e.target.elements['quantity']

    //Find an existence item in the array
    const isThere = itens.find(element => element.itemName === itemName.value)
    
    const actualItem = {
        "itemName": itemName.value,
        "quantity": quantity.value
    }        
    
    
    if(isThere) {
        actualItem.id = isThere.id
        refreshElement(actualItem)

        itens[itens.findIndex(element=> element.id === isThere.id)] = actualItem
    } else{

        actualItem.id = itens[itens.length - 1] ? (itens[itens.length - 1]).id + 1 : 0;

        createElement(actualItem)
    
    
        //Insert new itens on the Object, which will be relocate in the LocalStorage
        itens.push(actualItem)
    }



    localStorage.setItem('itens', JSON.stringify(itens))
    
    itemName.value = ""
    quantity.value = ""
    itemName.focus()

})

function createElement(item){
    //Create an element and bring the class with it. Obs:It's not bring the element value 
    const newItem = document.createElement('li')
    newItem.classList.add('item')

    //Create a variable to capture the quantity
    const itemNumber = document.createElement('strong')
    itemNumber.innerHTML = item.quantity
    itemNumber.dataset.id = item.id

    //Implement the element value in the variable
    newItem.appendChild(itemNumber)
    newItem.innerHTML += item.itemName

    newItem.appendChild(deleteBtn(item.id))

    //Add name and quantity to the list
    list.appendChild(newItem)
}


function refreshElement(item) {
    //Refresh itens, adding the quantity that was wrote
    document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantity
}

function deleteBtn(id){
    const elementBtn = document.createElement('button')
    elementBtn.innerText = "X"

    elementBtn.addEventListener('click', function(){
        deleteElement(this.parentNode,id)
    })

    return elementBtn
}

function deleteElement(tag,id){
    tag.remove()
    
    //remove item from Array
    itens.splice(itens.findIndex(element=> element.id === id),1)

    console.log(itens)

    //write again in the LocalStorage
    localStorage.setItem("itens",JSON.stringify(itens))
}
