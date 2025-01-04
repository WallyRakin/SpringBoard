# **Big-O Notation Practice Solutions**

## **Step One: Simplifying Expressions**

1. **O(n + 10)**  
   **Simplified:** O(n)  
   *The linear term n dominates as n grows, making the constant 10 insignificant.*

2. **O(100 * n)**  
   **Simplified:** O(n)  
   *Constants are removed in Big-O notation, so 100 * n simplifies to O(n).*

3. **O(25)**  
   **Simplified:** O(1)  
   *This represents constant time complexity since it doesn't depend on input size.*

4. **O(n² + n³)**  
   **Simplified:** O(n³)  
   *The higher-order term n³ dominates as n increases, overshadowing n².*

5. **O(n + n + n + n)**  
   **Simplified:** O(n)  
   *Multiple linear terms combine to a single O(n) in Big-O notation.*

6. **O(1000 * log(n) + n)**  
   **Simplified:** O(n)  
   *For large n, the linear term n grows faster than log(n), making it the dominant term.*

7. **O(1000 * n * log(n) + n)**  
   **Simplified:** O(n log n)  
   *The n log(n) term grows faster than the linear n, so it dominates the expression.*

8. **O(2ⁿ + n²)**  
   **Simplified:** O(2ⁿ)  
   *Exponential growth (2ⁿ) outpaces polynomial growth (n²), making it the dominant term.*

9. **O(5 + 3 + 1)**  
   **Simplified:** O(1)  
   *The sum of constants remains a constant time complexity.*

10. **O(n + √n + n² + n * log(n)¹⁰)**  
    **Simplified:** O(n²)  
    *The quadratic term n² is the highest order, dominating all other terms.*

---

## **Step Two: Calculating Time Complexity**

1. **`logUpTo(n)`**
    ```javascript
    function logUpTo(n) {
      for (let i = 1; i <= n; i++) {
        console.log(i);
      }
    }
    ```
    **Time Complexity:** O(n)  
    *The function has a single loop that runs n times, resulting in linear time complexity.*

2. **`logAtLeast10(n)`**
    ```javascript
    function logAtLeast10(n) {
      for (let i = 1; i <= Math.max(n, 10); i++) {
        console.log(i);
      }
    }
    ```
    **Time Complexity:** O(n)  
    *For n ≥ 10, the loop runs n times; for n < 10, it runs a constant number of times, but asymptotically it's O(n).*

3. **`logAtMost10(n)`**
    ```javascript
    function logAtMost10(n) {
      for (let i = 1; i <= Math.min(n, 10); i++) {
        console.log(i);
      }
    }
    ```
    **Time Complexity:** O(1)  
    *The loop runs at most 10 times, regardless of the input size, resulting in constant time complexity.*

4. **`onlyElementsAtEvenIndex(array)`**
    ```javascript
    function onlyElementsAtEvenIndex(array) {
      let newArray = [];
      for (let i = 0; i < array.length; i++) {
        if (i % 2 === 0) {
          newArray.push(array[i]);
        }
      }
      return newArray;
    }
    ```
    **Time Complexity:** O(n)  
    *The function iterates through the entire array once, performing constant-time operations in each iteration.*

5. **`subtotals(array)`**
    ```javascript
    function subtotals(array) {
      let subtotalArray = [];
      for (let i = 0; i < array.length; i++) {
        let subtotal = 0;
        for (let j = 0; j <= i; j++) {
          subtotal += array[j];
        }
        subtotalArray.push(subtotal);
      }
      return subtotalArray;
    }
    ```
    **Time Complexity:** O(n²)  
    *The nested loops result in quadratic time complexity as each element requires summing all previous elements.*

6. **`vowelCount(str)`**
    ```javascript
    function vowelCount(str) {
      let vowelCount = {};
      const vowels = "aeiouAEIOU";
    
      for (let char of str) {
        if(vowels.includes(char)) {
          if(char in vowelCount) {
            vowelCount[char] += 1;
          } else {
            vowelCount[char] = 1;
          }
        }
      }
    
      return vowelCount;
    }
    ```
    **Time Complexity:** O(n)  
    *The function iterates through the string once, performing constant-time operations for each character.*

---

## **Part 3 - Short Answer**

1. **True or false: n² + n is O(n²).**  
   **True.** The n² term dominates, so n² + n is O(n²).

2. **True or false: n² * n is O(n³).**  
   **True.** n² * n equals n³, which is O(n³).

3. **True or false: n² + n is O(n).**  
   **False.** n² grows faster than n, so n² + n is not O(n).

4. **What’s the time complexity of the .indexOf array method?**  
   **O(n).** It performs a linear search through the array elements.

5. **What’s the time complexity of the .includes array method?**  
   **O(n).** Similar to .indexOf, it searches through the array linearly.

6. **What’s the time complexity of the .forEach array method?**  
   **O(n).** It iterates through each element once, performing a constant-time operation.

7. **What’s the time complexity of the .sort array method?**  
   **O(n log n).** Most efficient sorting algorithms used by .sort have this complexity.

8. **What’s the time complexity of the .unshift array method?**  
   **O(n).** It adds an element to the beginning, requiring all existing elements to be shifted.

9. **What’s the time complexity of the .push array method?**  
   **O(1).** It adds an element to the end in constant time.

10. **What’s the time complexity of the .splice array method?**  
    **O(n).** Depending on the number of elements added or removed, it may require shifting elements.

11. **What’s the time complexity of the .pop array method?**  
    **O(1).** It removes the last element in constant time.

12. **What’s the time complexity of the Object.keys() function?**  
    **O(n).** It iterates over each key in the object to create an array of keys.

### **BONUS**

1. **What’s the space complexity of the Object.keys() function?**  
   **O(n).** It creates an array containing all the keys, scaling linearly with the number of keys.
