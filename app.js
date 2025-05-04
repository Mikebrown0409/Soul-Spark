// --- Constants ---
const OPERATORS = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '*': (a, b) => a * b,
    '/': (a, b) => (b === 0 ? NaN : a / b), // Use NaN for internal error representation
};
const MAX_DISPLAY_LENGTH = 12;
const PRECISION = 10;

// --- Calculator Class ---
class Calculator {
    // Private instance fields to hold state
    #displayElement;
    #displayValue = '0';
    #firstOperand = null;
    #operator = null;
    #waitingForSecondOperand = false;

    constructor(displayElement) {
        if (!displayElement) {
            throw new Error("Display element is required for Calculator");
        }
        this.#displayElement = displayElement;
        this.#updateDisplay(); // Initialize display on creation
    }

    // --- Public Interface ---

    inputDigit(digit) {
        // If error state, clear before inputting digit
        if (this.#displayValue === 'Error') {
           this.clear();
        }

        if (this.#waitingForSecondOperand) {
            this.#displayValue = digit;
            this.#waitingForSecondOperand = false;
        } else {
            // Overwrite '0' or append digit
            this.#displayValue = this.#displayValue === '0' ? digit : this.#displayValue + digit;
        }
         // Limit internal length
         this.#displayValue = this.#displayValue.slice(0, MAX_DISPLAY_LENGTH + 4);
        this.#updateDisplay();
    }

    chooseOperator(nextOperator) {
        const inputValue = parseFloat(this.#displayValue);

        // If display isn't a valid number, do nothing
        if (isNaN(inputValue)) return;

        // If an operator exists and we weren't waiting, perform previous calculation
        if (this.#operator && !this.#waitingForSecondOperand) {
             this.#performCalculation();
             // If calculation resulted in error, stop here
             if (this.#displayValue === 'Error') return;
        }

        // Store the number and the new operator
        this.#firstOperand = parseFloat(this.#displayValue); // Update first operand after potential calculation
        this.#operator = nextOperator;
        this.#waitingForSecondOperand = true;
        // Display updates implicitly if #performCalculation ran, or state change doesn't affect display yet.
    }

    calculateResult() {
        // Only calculate if we have an operator and are not waiting (i.e., have both operands)
        if (this.#operator === null || this.#waitingForSecondOperand) {
            return;
        }
        this.#performCalculation();
        this.#operator = null; // Reset operator after equals
        // Keep waitingForSecondOperand false, ready for new input
    }

    clear() {
        this.#displayValue = '0';
        this.#firstOperand = null;
        this.#operator = null;
        this.#waitingForSecondOperand = false;
        this.#updateDisplay();
    }

    // --- Private Helper Methods ---

    #performCalculation() {
        const secondOperand = parseFloat(this.#displayValue);

        // Check if operands and operator are valid
        if (this.#operator === null || isNaN(this.#firstOperand) || isNaN(secondOperand)) {
             console.warn("Invalid state for calculation:", this);
             return; // Should ideally not happen with current guards, but safe check
        }

        let result = NaN; // Default to NaN
        if (this.#operator in OPERATORS) {
            result = OPERATORS[this.#operator](this.#firstOperand, secondOperand);
        }

        if (isNaN(result)) {
             this.#displayValue = 'Error';
        } else {
             // Round and convert back to string for display
            this.#displayValue = String(parseFloat(result.toFixed(PRECISION)));
        }

        // After calculation, the result is displayed, and we're waiting for the next action
        this.#waitingForSecondOperand = false; // Ready for new input or operator
        // Keep the result as the first operand for potential chaining if an operator is pressed next
        this.#firstOperand = parseFloat(this.#displayValue); // Store potentially 'Error' parsed as NaN

        this.#updateDisplay();
    }


    #updateDisplay() {
        let valueToShow = this.#displayValue;
        if (valueToShow.length > MAX_DISPLAY_LENGTH) {
            valueToShow = valueToShow.substring(0, MAX_DISPLAY_LENGTH);
        }
        this.#displayElement.innerText = valueToShow;
        this.#displayElement.classList.toggle('error', valueToShow === 'Error');
    }
}

// --- Initialization and Event Handling ---

function initialize() {
    const calculatorElement = document.querySelector('#calculator');
    const displayElement = document.querySelector('.display');

    if (!calculatorElement || !displayElement) {
        console.error("Calculator UI elements not found!");
        return;
    }

    // Create the calculator instance, linking it to the display
    const calculator = new Calculator(displayElement);

    // Use event delegation on the main calculator container
    calculatorElement.addEventListener('click', (event) => {
        const { target } = event;
        if (!target.matches('div.button')) return; // Ignore non-button clicks

        const value = target.innerText;

        // Route the click to the appropriate calculator method
        if (target.classList.contains('number')) {
            calculator.inputDigit(value);
        } else if (target.classList.contains('operator')) {
            calculator.chooseOperator(value);
        } else if (target.classList.contains('equals')) {
            calculator.calculateResult();
        } else if (value === 'C') {
            calculator.clear();
        }
        // Add decimal handling here if needed
    });

    console.log("Calculator Initialized (OO Approach)");
}

// --- Entry Point ---
document.addEventListener('DOMContentLoaded', initialize); 