// curried-add.js

function curriedAdd(...args) {
    // If no arguments are provided, return 0
    if (args.length === 0) {
        return 0;
    }

    // Initialize the sum with the first argument
    let sum = args[0];

    // Define an inner function to handle further additions
    function adder(...nextArgs) {
        if (nextArgs.length === 0) {
            // If called without arguments, return the accumulated sum
            return sum;
        }
        // Add the next number to the sum
        sum += nextArgs[0];
        // Return the adder function for further chaining
        return adder;
    }

    // Return the adder function to allow chaining
    return adder;
}

module.exports = { curriedAdd };
