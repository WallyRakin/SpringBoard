# **Object Enhancements and Destructuring Practice Solutions**

## **Object Destructuring 1**

```javascript
let facts = {numPlanets: 8, yearNeptuneDiscovered: 1846};
let {numPlanets, yearNeptuneDiscovered} = facts;

console.log(numPlanets); // 8
console.log(yearNeptuneDiscovered); // 1846
```
*Logs `8` and `1846` respectively.*

---

## **Object Destructuring 2**

```javascript
let planetFacts = {
  numPlanets: 8,
  yearNeptuneDiscovered: 1846,
  yearMarsDiscovered: 1659
};

let {numPlanets, ...discoveryYears} = planetFacts;

console.log(discoveryYears); // { yearNeptuneDiscovered: 1846, yearMarsDiscovered: 1659 }
```
*Logs an object with `yearNeptuneDiscovered` and `yearMarsDiscovered`.*

---

## **Object Destructuring 3**

```javascript
function getUserData({firstName, favoriteColor="green"}){
  return `Your name is ${firstName} and you like ${favoriteColor}`;
}

console.log(getUserData({firstName: "Alejandro", favoriteColor: "purple"})); // "Your name is Alejandro and you like purple"
console.log(getUserData({firstName: "Melissa"})); // "Your name is Melissa and you like green"
console.log(getUserData({})); // "Your name is undefined and you like green"
```
*Outputs the corresponding strings based on provided arguments.*

---

## **Array Destructuring 1**

```javascript
let [first, second, third] = ["Maya", "Marisa", "Chi"];

console.log(first); // Maya
console.log(second); // Marisa
console.log(third); // Chi
```
*Logs "Maya", "Marisa", and "Chi".*

---

## **Array Destructuring 2**

```javascript
let [raindrops, whiskers, ...aFewOfMyFavoriteThings] = [
  "Raindrops on roses",
  "whiskers on kittens",
  "Bright copper kettles",
  "warm woolen mittens",
  "Brown paper packages tied up with strings"
]

console.log(raindrops); // "Raindrops on roses"
console.log(whiskers); // "whiskers on kittens"
console.log(aFewOfMyFavoriteThings); // ["Bright copper kettles", "warm woolen mittens", "Brown paper packages tied up with strings"]
```
*Logs the first two strings and an array of the remaining items.*

---

## **Array Destructuring 3**

```javascript
let numbers = [10, 20, 30];
[numbers[1], numbers[2]] = [numbers[2], numbers[1]]

console.log(numbers) // [10, 30, 20]
```
*Swaps the second and third elements, resulting in `[10, 30, 20]`.*

---

## **ES2015 Refactoring**

### **ES2015 Object Destructuring**

```javascript
const createInstructor = (firstName, lastName) => ({ firstName, lastName });
```
*Uses shorthand property names with arrow function.*

### **ES2015 Computed Property Names**

```javascript
const favoriteNumber = 42;

const instructor = {
  firstName: "Colt",
  [favoriteNumber]: "That is my favorite!"
};
```
*Utilizes computed property names within object literals.*

### **ES2015 One-Line Array Swap with Destructuring**

```javascript
let arr = [1, 2];
[arr[0], arr[1]] = [arr[1], arr[0]];
```
*Swaps array elements using destructuring assignment.*

### **`raceResults` Function**

```javascript
const raceResults = ([first, second, third, ...rest]) => ({ first, second, third, rest });
```
*Returns an object with first three elements and the rest in an array using destructuring.*

---
