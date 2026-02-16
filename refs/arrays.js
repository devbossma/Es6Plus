/*Arrays Methodes in JavaScript */
let items = [];
const obj = {
    a: 1,
    b: 2,
    c: 3
};


/*##### Pre-ES6 #####*/

/* A. Mutator Methods (modify the original array) */
// 1. push() - Add to end

items = [1, 2];
items.push(3, 4);     // returns new length: 4
console.log(items);  // [1,2,3,4]

// 2. pop() - Remove from end

items.pop();
console.log(items); // returns [ 1, 2, 3 ]

// 3. unshift() - Add to beginning

items.unshift(0);
console.log(items) // returns [ 0, 1, 2, 3 ]

// 4. shift() - Remove from beginning

items.shift()
console.log(items) // returns [1, 2, 3 ]

// 5. splice() - Add / remove anywhere(the Swiss Army knife)

items = [1, 2, 3, 4, 5];
// Remove 2 elements starting at index 1

console.log(items.splice(1, 2)); // returns [2, 3]
console.log(items) // returns [1, 4, 5]

// Insert without removing
items.splice(1, 0, 'a', 'b'); // returns []
console.log(items) // returns [ 1, 'a', 'b', 4, 5 ]


// Replace
items.splice(2, 1, 'x');      // returns ['b']
console.log(items);           // [1,'a','x',4,5]


// 6. reverse() - Reverse order

items = [1, 2, 3];
items.reverse();       // returns [3,2,1]
console.log(items);    // [3,2,1] (original modified!)

// 7. sort() - Sort elements
items = [3, 1, 4, '20', 10];
items.sort((a, b) => a - b);         // returns [ 1, 3, 4, 10, '20' ]
items.sort((a, b) => b - a);         // returns [ '20', 10, 4, 3, 1 ]
// console.log(items);    

const students = [
    { name: "Jane", age: 16 },
    { name: "Mark", age: 19 },
    { name: "Kent", age: 14 },
];

// Sort by age in ascending order
students.sort((a, b) => a.age - b.age);

console.log(students) // Returned Result: [{ name: "Kent", age: 14 }, { name: "Jane", age: 16 }, { name: "Mark", age: 19 }]

/* B. Accessor Methods (return new array, don't modify original) */

// 1. concat() - Merge arrays

const arr1 = [1, 2];
const arr2 = [3, 4];
arr1.concat(arr2);        // returns [1,2,3,4]
arr1.concat(5, 6);         // returns [1,2,5,6]
arr1.concat([7, 8], 9);    // returns [1,2,7,8,9]
console.log(arr1);        // still [1,2] (unchanged)

// 2. slice() - Extract portion
console.log('=+=+ Slice +=+=')

items = [1, 2, 3, 4, 5];
console.log(items.slice(1, 3));      // returns [2,3] (index 1 to 3-1)
console.log(items.slice(2));        // returns [3,4,5] (from index 2 to end)
console.log(items.slice(-2));       // returns [4,5] (last 2)
console.log(items.slice());         // returns [1,2,3,4,5] (shallow copy)

console.log(items)


// 3. join() - Create string from array

items = ['Hello', 'World'];
console.log(items.join());          // 'Hello,World'
console.log(items.join(' '));       // 'Hello World'
console.log(items.join('-'));       // 'Hello-World'

// 4. toLocaleString() - Locale - specific string

const date = [new Date()];
console.log(date.toLocaleString('en-US')); // US format     2/16/2026, 10:29:44 PM
console.log(date.toLocaleString('de-DE')); // German format 16.2.2026, 22:29:44
console.log(date.toLocaleString('fr-FR')); // France format 16/02/2026 22:29:44

// 4. map() - Transform each element

items = [1, 2, 3, 4, 5];
console.log(items.map(x => 'a' + x)); // [ 'a1', 'a2', 'a3', 'a4', 'a5' ]

// 5. filter() - Keep elements that pass test

items = [1, 2, 3, 4, 5];
console.log("OddscNumbers: ", items.filter(x => x % 2 !== 0)) // OddscNumbers:  [ 1, 3, 5 ]

// 6. every() - Check if ALL elements pass test
items = [10, 20, 30, 40, 50];
console.log(items.every(x => x % 2 == 0)); // True All elements are Even Numbers

// 7. some() - Check if AT LEAST ONE passes test

let result = items.some(x => x > 20);  // true
console.log(result);
result = items.some(x => x > 500);  // false
console.log(result);

// 8.reduce() - Accumulate values


const sum = items.reduce((accumulator, current) => {
    return accumulator + current;
}, 0);
console.log(sum) // result: 150

// 9. reduceRight() - Reduce from right to left

items = [[1], [2], [3]];
result = items.reduceRight((acc, curr) => acc.concat(curr));
console.log(result); // [ 3, 2, 1 ]

/*##### ES6 (ES2015) #####*/



// 1. Array.from() : Creates arrays from array-like or iterable objects.

// From string
items = Array.from('hello');
// console.log(items) // ['h','e','l','l','o']



// With mapping function
items = Array.from([1, 2, 3], x => x * 2); // [2,4,6]

// From Set
items = Array.from(new Set([1, 2, 2, 3])); // [1,2,3]


// 2. Array.of(): Creates arrays with given arguments (unlike new Array() which behaves differently with one number argument).

items = Array.of(7);       // [7]
// console.log(items)
items = Array.of(1, 2, 3);   // [1,2,3]
// console.log(items)

// Compare with Array constructor
items = new Array(7);

// console.log(items.length); // 7 empty items
items.forEach(e => {
    // console.log(e); // nothing to be print (empty)
    // console.log(typeof e); // no Dta Types (empty)
});
// console.log(items) // [ <7 empty items> ]
items = new Array(1, 2, 3);  // [1,2,3]
items.forEach(e => {
    // console.log(typeof e);
});
// console.log(items)

/*
## 3. array.forEach(callbackFn, thisArg);
### Description: 

** The JavaScript forEach() method is an array iteration method 
** that executes a provided callback function once for each element in an array,
** in ascending-index order.
** 
** ### Syntax:  array.forEach(callbackFn, thisArg);
** 
** ### The callbackFn function can accept up to three arguments: 
** 
** 1. element (required): The current element being processed in the array.
** 2. index (optional): The index of the current element.
** 3. array (optional): A reference to the entire array forEach() was called upon. 
*/
const names = ['John', 'Jane', 'Jim'];

names.forEach((name, index, arr) => {
    // console.log(`${name} is at position ${index} in [${arr}]`);
});

// Output:
// John is at position 0 in [John,Jane,Jim]
// Jane is at position 1 in [John,Jane,Jim]
// Jim is at position 2 in [John,Jane,Jim]


/*
## 4. find() & findIndex()
 Find first element/index matching condition.
*/

let numbers = [5, 12, 8, 130, 44];

let element = numbers.find(x => x > 10);
// console.log(element)                             // 12

let index = numbers.findIndex(x => x > 10);
// console.log(index)                               // 1

/*
## 5. fill() & findIndex()
** The fill() method modifies the original array and accepts up to three arguments: 
** value, 
** start (optional) starting index included, 
** and end (optional). ending index excluded
*/

// original array [5, 12, 8, 130, 44]
// array indices  [0, 1,  2,  3,   4]

numbers = [5, 12, 8, 130, 44];
numbers.fill('x');
// console.log(numbers) // output: [ 'x', 'x', 'x', 'x', 'x' ]

numbers = [5, 12, 8, 130, 44]
numbers.fill('x', 2);
// console.log(numbers) // output: [ 5, 12, 'x', 'x', 'x' ]

numbers = [5, 12, 8, 130, 44]
numbers.fill('x', 2, 4);
// console.log(numbers) // output: [ 5, 12, 'x', 'x', 44 ]

/*
** ## 6. copyWithin()
** The JavaScript copyWithin() method is a mutating method that shallow 
** copies a portion of an array to another location within the same array,
** without modifying the array's length. 
** 
** Syntax: arr.copyWithin(target, start, end)
** ### target (required): The zero-based index at which to start copying the sequence to (destination index). If negative, it counts from the end of the array.
** ### start (optional): The zero-based index from which to start copying elements (source index). It is inclusive. If omitted, it defaults to 0. If negative, it counts from the end of the array.
** ### end (optional): The zero-based index at which to stop copying elements. It is non-inclusive (the element at this index is not copied). If omitted, it defaults to the array's length, copying through the end of the array. If negative, it counts from the end of the array. 
*/

numbers = [1, 2, 3, 4, '5', '6', 'x', 'x',];

// Copy elements from index 0 to the beginning (target index 0)
numbers.copyWithin(0, 4, 6);
//  (4) start copy from index 4
//  (6) end copying befor index 6
//  (0) write the copy starting from index 0
// console.log(numbers) // ['5', '6', 3, 4,'5', '6', 'x', 'x'] 

/*
## 7. entries(), keys(), values()
*/

/*
** Object.keys(obj)
** Description: Returns a new array containing all the keys (property names) of the object as strings.
** Resulting Array Content: ['key1', 'key2', 'key3']
*/
items = Object.keys(obj);
// console.log("Object Keys: ", items)


/*
** Object.values(obj)
** Description: Returns a new array containing all the property values of the object.
** Resulting Array Content: ['value1', 'value2', 'value3']
*/
items = Object.values(obj);
// console.log("Object Values: ", items)


/*
** Object.entries(obj)
** Description: Returns a new array where each element is a key-value pair represented as a small array [key, value].
** Resulting Array Content: [['key1', 'value1'], ['key2', 'value2'], ['key3', 'value3']]
*/
items = Object.entries(obj);
// console.log("Object Entries: ", items)


/*
** To create an array of objects from key-value pairs (e.g., for data manipulation):
** You can combine Object.keys() with Array.prototype.map().
** Resulting Array Content:
[
  { key: 'a', value: 1 },
  { key: 'b', value: 2 },
  { key: 'c', value: 3 }
]
*/
const arrayOfObjects = Object.keys(obj).map(key => {
    return {
        key: key,
        value: obj[key]
    };
});

// console.log("Array of Objects", arrayOfObjects)


/*#####     ES7 (ES2016)  #####*/


/* 
** ## 1. includes():   Checks if array contains element (better than indexOf for NaN).

*/

items = [1, 2, 3, 4, '5', '6', 'x', 'x', NaN];


// console.log(items.includes(2));    // true
// console.log(items.indexOf(NaN))    // -1
// console.log(items.includes(NaN));  // true (indexOf would return -1)

/*##### ES8 (ES2017) & ES9 (ES2018)   ######*/
// No new array methods


/*##### ES8 ES10 (ES2019) ######*/


/*
** ## flat(): Flattens nested arrays to specified depth.
** ### Syntax: array.flat([depth]);
** ### Parameters:
** depth (Optional): Specifies how deep a nested array structure should be flattened. 
** It defaults to 1 if not provided. 
*/

// Default Depth (1): As the default depth is 1, only the first level of nesting is removed.
const nestedArray = [1, 2, [3, 4, [5, 6]]];
const flatOnce = nestedArray.flat();
// console.log(flatOnce);                      // Expected output: [1, 2, 3, 4, [5, 6]] 

// Specified Depth:
const flatTwice = nestedArray.flat(2);
// console.log(flatTwice);                         // Expected output: [1, 2, 3, 4, 5, 6]

// Flattening All Levels:
const deeplyNested = [1, [2, [3, [4, [5]]]]];
const fullyFlat = deeplyNested.flat(Infinity);
// console.log(fullyFlat);                         // Expected output: [1, 2, 3, 4, 5]                   


// Removing Empty Slots:
const sparseArray = [1, 2, , [4, , 6], 7];
// console.log(sparseArray.flat());                   // Expected output: [1, 2, 4, 6, 7]

/* flatMap(): Maps then flattens one level (like map + flat(1)).
** ## Syntax: array.flatMap(callbackFunc, thisArg)
** ## Params: 
** > callbackFunc: A function to execute for each element in the array, which can return an array of new elements or a single non-array value.
** > thisArg (optional): A value to use as this when executing the callback function. 
*/


// Example 1: Flattening nested results from a mapping operation
const sentences = ["it's Sunny in", "", "California"];

// Using map() results in a nested array:
const wordsMap = sentences.map((x) => x.split(" "));
// console.log(wordsMap) // [ [ "it's", 'Sunny', 'in' ], [ '' ], [ 'California' ] ]

// Using flatMap() returns a single-level array:
const wordsFlatMap = sentences.flatMap((x) => x.split(" "));

// console.log(wordsFlatMap) // [ "it's", 'Sunny', 'in', '', 'California' ]


// Example 2: Filtering and mapping simultaneously
const users = [{ "isAllowed": true, "userId": 14 }, { "isAllowed": false, "userId": 14 }, { "isAllowed": true, "userId": 24 }];

// Get all allowed user IDs using flatMap
const alloweWithMapOnly = users.map(u => u.isAllowed ? [u.userId] : []);
// console.log(alloweWithMapOnly) // [ [ 14 ], [], [ 24 ] ]
// then flat
// console.log(alloweWithMapOnly.flat()) // [ 14, 24 ]


// Combined map() and flat() 
const allowedUserIds = users.flatMap(u => u.isAllowed ? [u.userId] : []);

// console.log(allowedUserIds);
// Output: [14, 24]

/*#####  ES11 (ES2020) #####*/
// No new array methods - introduced globalThis, optional chaining, nullish coalescing.


/*##### ES12 (ES2021) #####*/

/*
** ## 1. at(): 
** The primary advantage of at() is its support for negative integers. 
** A negative index counts backward from the last element.
** ### Syntax: arrayOrString.at(index).
** ### Return Value: It returns the element at the specified index. 
*/

const fruits = ["apple", "banana", "pear", "orange"];

// Get the last item using .at()
const lastItem = fruits.at(-1);
// console.log(lastItem); // Output: "orange"

// Get the second item using .at()
const secondItem = fruits.at(1);
// console.log(secondItem); // Output: "banana"

/*
## 2. findLast() & findLastIndex():
** iterate through an array in reverse order (from the end to the beginning) 
** to find the first element that satisfies a provided testing function. 
** ### Syntax: 
** > array.findLast(callbackFn, thisArg);
** > array.findLastIndex(callbackFn, thisArg);
** ### Args:  
** 1. callbackFn: A function to execute on each value in the array. It takes three arguments:
**    >> element: The current element being processed.
**    >> index: The index of the current element.
**    >> array: The array on which the method was called.
**
** 2. thisArg (optional): An optional value to use as this when executing the callbackFn. 
*/

// 1. findLast() Example:
numbers = [1, 2, 3, 4, 5, 6, 7, 8];

const lastEven = numbers.findLast(element => element % 2 === 0);

// console.log(lastEven); // Output: 8

// 2. findLastIndex() Example:
numbers = [1, 2, 3, 4, 5, 6, 7, 8];

const lastIndexGreaterThanFive = numbers.findLastIndex(element => element > 5);

// console.log(lastIndexGreaterThanFive); // Output: 7 (the index of the value 8)

/*
** ## Array.prototype.toReversed(), toSorted(), toSpliced(), with()
** New immutable array methods (return new array, don't modify original).
*/

const arr = [1, 3, 2];

// New immutable methods
// console.log(arr.toReversed());  // [2,3,1] (arr unchanged)
// console.log(arr.toSorted());    // [1,2,3] (arr unchanged)
// console.log(arr.toSpliced(1, 1, 4)); // [1,4,2] (arr unchanged)
// console.log(arr.with(1, 5));     // [1,5,2] (arr unchanged)

// Old mutable versions
// console.log(arr.reverse());     // modifies original
// console.log(arr.sort());        // modifies original
// console.log(arr.splice(1, 1, 4)); // modifies original
// console.log(arr[1] = 5);        // modifies original


/*
** ## groupBy() & groupByToMap() (Stage 4)
**  Group array elements by key.
*/

const array = [1, 2, 3, 4, 5];
let nums = Object.groupBy(array, n => n % 2 == 0 ? 'even' : 'odd')
// console.log(nums) // [Object: null prototype] { odd: [ 1, 3, 5 ], even: [ 2, 4 ] }
let standardObj = { ...nums } //  odd: [ 1, 3, 5 ], even: [ 2, 4 ] }
// console.log(standardObj)


const map = Map.groupBy(array, num => num % 2);
// console.log(map) // Map(2) { 1 => [ 1, 3, 5 ], 0 => [ 2, 4 ] }




const inventory = [
    { name: 'apples', category: 'fruits', quantity: 5 },
    { name: 'bananas', category: 'fruits', quantity: 2 },
    { name: 'potatoes', category: 'vegetables', quantity: 10 },
    { name: 'carrots', category: 'vegetables', quantity: 8 }
];

// Using Object.groupBy()
const groupedByObject = Object.groupBy(inventory, (item) => {
    return item.category;
});

// console.log(groupedByObject);
// Output:
// {
//   'fruits': [ { name: 'apples', ... }, { name: 'bananas', ... } ],
//   'vegetables': [ { name: 'potatoes', ... }, { name: 'carrots', ... } ]
// }

// Using Map.groupBy()
const groupedByMap = Map.groupBy(inventory, (item) => {
    return item.category;
});

// console.log(groupedByMap);
// Output (Map structure):
// Map(2) {
//   'fruits' => [ { name: 'apples', ... }, { name: 'bananas', ... } ],
//   'vegetables' => [ { name: 'potatoes', ... }, { name: 'carrots', ... } ]
// }
