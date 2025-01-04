```markdown
# Object Enhancements Exercise Solutions

## Same keys and values ES2015

```javascript
const createInstructor = (firstName, lastName) => ({ firstName, lastName });
```

## Computed Property Names ES2015

```javascript
const favoriteNumber = 42;

const instructor = {
  firstName: "Colt",
  [favoriteNumber]: "That is my favorite!"
};
```

## Object Methods ES2015

```javascript
const instructor = {
  firstName: "Colt",
  sayHi() {
    return "Hi!";
  },
  sayBye() {
    return `${this.firstName} says bye!`;
  }
};
```

## createAnimal Function

```javascript
const createAnimal = (species, verb, noise) => ({
  species,
  [verb]() {
    return noise;
  }
});
```
```
