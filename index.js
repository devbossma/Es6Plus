// tring literal

// 1. String literal:
var productName = "IPhone 17 Poro Max"
var productPrice = 1999.89
var productQuantity = 2

var Item = `
Product Name: ${productName}
Price: $ ${productPrice}
Total Price: ${productPrice * productQuantity} 
`
// console.log(Item);

// 2. Object Destructuring

var CardItem = {
    name: productName,
    price: productPrice,
    q: productQuantity
}
function CalculateTotal({ price, q }) {
    return price * q
}

const Total = CalculateTotal(CardItem)
// console.log(Total)

// 3. Arrays Destructuring
var Item_1 = {
    name: "Apple watch",
    price: 100.87,
    q: 1
}
var Item_2 = {
    name: productName,
    price: productPrice,
    q: productQuantity
}
var Item_3 = {
    name: "Ipad 6 pro",
    price: 600.98,
    q: 1
}
const CartItems = [Item_1, Item_2, Item_3]

const [firstItem] = CartItems;
// console.log(firstItem.price)

// 4. Object literal

function ItemRender(name, price, quantity) {
    // Defineding Object Keys
    const Item = { productName: name, productPrice: price, q: quantity }
    console.log(Item)

    // befor ES6
    const SameItemKeys = { name: name, price: price, quantity: quantity }
    console.log(SameItemKeys)

    // with ES6+ or we can assigne default OBJECT KEYS that mutches the arguments
    const newItem = { name, price, quantity }

    // or we can assigne default OBJECT KEYS that mutches the arguments
    console.log(newItem)
}

// ItemRender(productName, productPrice, productQuantity)
/*
// javascript iterable objects list
Array and TypedArray
String
Map
Set
arguments object
*/

// 5. For Of Loop => for (const item in iterable)
let TotalToPay = 0

for (const item of CartItems) {
    var { price, q } = item
    // console.log(`${price} * ${q} `)
    TotalToPay += price * q
}

// console.log(Total)


// 6. Spread Operator
// a. In Arrays 
let newCartItems = [...CartItems, {
    name: "T-shirt",
    price: 15.98,
    q: 2
}]
// console.log(CartItems)
// console.log(newCartItems)

// b. In Objects
let obj_1 = {
    fname: "Bob",
    lname: "Dalen"
}
let obj_2 = {
    ...obj_1,
    mname: "Mark"
}
// console.log(obj_2)

// 7. Rest Operator {useCase: When we don't know how many args that will be passed}
function add(...nums) {
    let total = 0

    for (const num of nums) {
        total += num
    }
    console.log(total)
}

// add(1, 2, 3)

// 8. Arrow Functions 

const add_v2 = (...nums) => {
    let total = 0

    for (const num of nums) {
        total += num
    }
    console.log(total)
}

// add_v2(1, 2, 3)
var Item_4 = {
    name: "Ipad 7 pro",
    price: 600.98,
    q: 3
}
const ItemView = item => console.log(`
Product Name: ${item.name}
Price: $ ${item.price}
Total Price: ${item.price * item.q} 
`)


// ItemView(Item_4)



var numbers = [10, 20, 30, 40];

// array.reduce(callbackFn, initialValue);

// imliment the callbackFn in bothe ways old one and with Arrow value


const sum_1 = numbers.reduce(function total(num_1, num_2) {
    return num_1 + num_2
}, 0);
const sum_2 = numbers.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
// console.log(sum_1);
// console.log(sum_2);


// 9. Default Params

function average(arr = []) {
    if (arr.length <= 0) {
        throw new Error('Error: Division by zero is not allowed.');
    }

    if (!Array.isArray(arr)) {
        throw new Error('Error: average Function only Accepts Array as an argument');
    }
    return arr.reduce((x, y) => x + y, 0) / arr.length
}

// console.log(average(["1", "2", "34"])) // ? challange for you
// console.log(average(numbers))


//  10. Includes()

// check index of an element in array
// Before Es6
numbers = [10, 20, 30, 40, '40'];

// ======== returns the exact index if element exists in array

// console.log(numbers.indexOf(40)) 
// console.log(numbers.indexOf('40'))

// ========= returns [-1] if element non exists in array

// console.log(numbers.indexOf("Unexisting")) 

// with Es6+ we could check if element exist by includes() function

// console.log(numbers.includes(40)) // true
// console.log(numbers.includes("Unexisting")) // false


// 11. Import & Export

import { data } from './toexport.js'
// console.log(data)

// 12. padStart() and padEnd() padding a string until a certain given length

var Title = "title to pad"
const pad = (str) => {
    let len = str.length
    str = str.padStart(len + 1, ' ').padEnd(len + 2, ' ')
    len = str.length
    let padStart = len + 10
    let padEnd = padStart + 10
    console.log(str.padStart(padStart, '=').padEnd(padEnd, '='))
}
// pad('Yassine saber')


// 13. Classes

import { Cart } from './classes.js'
const newCart = new Cart(CartItems)
// console.log(newCart.items)
Cart.clearCart(3) // static call
newCart.getTotal; // geter call {is not a function}
newCart.privateField
newCart.privateField = "Private field changed by Set Method"
newCart.privateField

// newCart.#calculateTotal(); // Property '#calculateTotal' is not accessible outside class 'Cart' because it has a private identifier.
// newCart._protectedMethod();


