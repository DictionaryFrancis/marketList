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
    } else{

        actualItem.id = itens.length

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

    //Add name and quantity to the list
    list.appendChild(newItem)
}