let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');

openShopping.addEventListener('click', ()=>{
    body.classList.add('active');
})
closeShopping.addEventListener('click', ()=>{
    body.classList.remove('active');
})

let products = [
    {
        id: 1,
        name: 'Bittersweet Chocolate ',
        image: '1.jpg',
        price: 120000
    },
    {
        id: 2,
        name: 'Milk Chocolate ',
        image: '2.jpg',
        price: 120000
    },
    {
        id: 3,
        name: 'Dark Chocolate',
        image: '3.jpg',
        price: 220000
    },
    {
        id: 4,
        name: 'Gianduja Chocolate',
        image: '4.jpg',
        price: 123000
    },
    {
        id: 5,
        name: 'White Chocolate',
        image: '5.jpg',
        price: 320000
    },
    {
        id: 6,
        name: 'Couverture Chocolate',
        image: '6.jpg',
        price: 120000
    }
];
let listCards  = [];
function initApp(){
    products.forEach((value, key) =>{
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img src="image/${value.image}">
            <div class="title">${value.name}</div>
            <div class="price">${value.price.toLocaleString()}</div>
            <button id="myBtn" onclick="addToCard(${key})">Add To Card</button>`;
        list.appendChild(newDiv);
    })
}
initApp();
function addToCard(key){
    if(listCards[key] == null){
        // copy product form list to list card
        listCards[key] = JSON.parse(JSON.stringify(products[key]));
        listCards[key].quantity = 1;
    }
    reloadCard();
}
function reloadCard(){
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;
    listCards.forEach((value, key)=>{
        totalPrice = totalPrice + value.price;
        count = count + value.quantity;
        if(value != null){
            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
                <div><img src="image/${value.image}"/></div>
                <div>${value.name}</div>
                <div>${value.price.toLocaleString()}</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${count < 8 ? value.quantity + 1 : null})">+</button>
                </div>`;
               
                 listCard.appendChild(newDiv);
        }
    })
    total.innerText = totalPrice.toLocaleString();
    if(count <= 8)
    quantity.innerText = count;
    
}

function changeQuantity(key, quantity){
    if(quantity === null){
        return null;
    }
    if(quantity == 0){
        delete listCards[key];
    }
    else{
      if(quantity <= 8)
        listCards[key].quantity = quantity;
        listCards[key].price = quantity * products[key].price;
    }
    reloadCard();
}