# **Object Destructuring and Enhancements Practice Solutions**

## **Quick Question #1**

**What does the following code return?**

```javascript
new Set([1,1,2,2,3,4])
```

**Answer:**  
It returns a `Set` containing `{1, 2, 3, 4}` because `Set` only stores unique values.

---

## **Quick Question #2**

**What does the following code return?**

```javascript
[...new Set("referee")].join("")
```

**Answer:**  
It returns the string `"ref"` by removing duplicate characters from "referee".

---

## **Quick Question #3**

**What does the Map `m` look like after running the following code?**

```javascript
let m = new Map();
m.set([1,2,3], true);
m.set([1,2,3], false);
```

**Answer:**  
Map `m` contains two distinct entries because each array `[1,2,3]` is a different reference:
- `{ [1,2,3] => true }`
- `{ [1,2,3] => false }`

---

## **hasDuplicate**

**Write a function called `hasDuplicate` which accepts an array and returns true or false if that array contains a duplicate.**

**Answer:**

```javascript
const hasDuplicate = arr => new Set(arr).size !== arr.length;
```
*This function returns `true` if duplicates are found by comparing the `Set` size with the array length.*

---

## **vowelCount**

**Write a function called `vowelCount` which accepts a string and returns a map where the keys are vowels and the values are the count of the vowels in the string.**

**Answer:**

```javascript
const vowelCount = str => {
  const vowels = "aeiouAEIOU";
  const map = new Map();
  for (let char of str) {
    if (vowels.includes(char)) {
      const lower = char.toLowerCase();
      map.set(lower, (map.get(lower) || 0) + 1);
    }
  }
  return map;
};
```
*This function iterates through the string, counts each vowel, and stores the counts in a `Map`.*

---
