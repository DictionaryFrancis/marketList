const form = document.getElementById('newItem')
const list = document.getElementById('list')
const itens = []

form.addEventListener('submit', (e) =>{
    e.preventDefault()

    const itemName = e.target.elements['itemName']
    const quantity = e.target.elements['quantity']

    createElement(itemName.value,quantity.value)
    
    itemName.value = ""
    quantity.value = ""
    itemName.focus()

})

function createElement(itemName,quantity){

    console.log(itemName)
    console.log(quantity)

    //Create an element and bring the class with it. Obs:It's not bring the element value 
    const newItem = document.createElement('li')
    newItem.classList.add('item')

    //Create a variable to capture the quantity
    const itemNumber = document.createElement('strong')
    itemNumber.innerHTML = quantity

    //Implement the element value in the variable
    newItem.appendChild(itemNumber)
    newItem.innerHTML += itemName

    //Add name and quantity to the list
    list.appendChild(newItem)

    //Object
    const actualItem = {
        'name':itemName,
        'quantity':quantity
    }

    //Insert new itens on the Object, which will be relocate in the LocalStorage
    itens.push(actualItem)

    localStorage.setItem('itens', JSON.stringify(itens))

}