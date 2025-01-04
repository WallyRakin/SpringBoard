// create-account.js

function createAccount(initialPin, startingBalance = 0) {
    let pin = initialPin;
    let balance = startingBalance;

    const formatBalance = () => `$${balance}`;

    const isValidPin = (inputPin) => inputPin === pin;

    return {
        checkBalance(inputPin) {
            if (!isValidPin(inputPin)) {
                return "Invalid PIN.";
            }
            return formatBalance();
        },

        deposit(inputPin, amount) {
            if (!isValidPin(inputPin)) {
                return "Invalid PIN.";
            }
            balance += amount;
            return `Succesfully deposited $${amount}. Current balance: ${formatBalance()}.`;
        },

        withdraw(inputPin, amount) {
            if (!isValidPin(inputPin)) {
                return "Invalid PIN.";
            }
            if (amount > balance) {
                return "Withdrawal amount exceeds account balance. Transaction cancelled.";
            }
            balance -= amount;
            return `Succesfully withdrew $${amount}. Current balance: ${formatBalance()}.`;
        },

        changePin(inputPin, newPin) {
            if (!isValidPin(inputPin)) {
                return "Invalid PIN.";
            }
            pin = newPin;
            return "PIN successfully changed!";
        },
    };
}

module.exports = { createAccount };
