// This event listener ensures the script runs only after the full page content is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Cache the display element where expressions and results will be shown
    const display = document.getElementById('display');
    // Select all buttons that form part of the calculator
    const buttons = document.querySelectorAll('.calculator-button');
    // Cache the clear button specifically for clearing the expression
    const clearButton = document.getElementById('button-clear');
    // Cache the equals button specifically for calculating the result
    const equalsButton = document.getElementById('button-equals');
    // Cache the element that shows the last expression and result after page refresh
    const lastResultDisplay = document.getElementById('last-result-display');
    // Initialize the current expression to an empty string
    let expression = '';
    // Initialize the last evaluated expression to an empty string
    let lastExpression = '';
  