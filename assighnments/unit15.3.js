// ES2015 Arrow Functions Shorthand - double function
const double = arr => arr.map(val => val * 2);

// ES2015 Arrow Functions - squareAndFindEvens function
const squareAndFindEvens = numbers => {
  const squares = numbers.map(num => num ** 2);
  const evens = squares.filter(square => square % 2 === 0);
  return evens;
};
