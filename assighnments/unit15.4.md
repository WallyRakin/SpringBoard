```markdown
# **ES2015 Refactoring Practice**

## **1. Refactor `filterOutOdds`**

```javascript
const filterOutOdds = (...nums) => nums.filter(num => num % 2 === 0);
```

## **2. `findMin`**

```javascript
const findMin = (...args) => Math.min(...args);
```

## **3. `mergeObjects`**

```javascript
const mergeObjects = (obj1, obj2) => ({ ...obj1, ...obj2 });
```

## **4. `doubleAndReturnArgs`**

```javascript
const doubleAndReturnArgs = (arr, ...args) => [...arr, ...args.map(num => num * 2)];
```

## **5. `removeRandom`**

```javascript
const removeRandom = items => items.filter((_, idx) => idx !== Math.floor(Math.random() * items.length));
```

## **6. `extend`**

```javascript
const extend = (array1, array2) => [...array1, ...array2];
```

## **7. `addKeyVal`**

```javascript
const addKeyVal = (obj, key, val) => ({ ...obj, [key]: val });
```

## **8. `removeKey`**

```javascript
const removeKey = (obj, key) => {
  const { [key]: _, ...newObj } = obj;
  return newObj;
};
```

## **9. `combine`**

```javascript
const combine = (obj1, obj2) => ({ ...obj1, ...obj2 });
```

## **10. `update`**

```javascript
const update = (obj, key, val) => ({ ...obj, [key]: val });
```
```
