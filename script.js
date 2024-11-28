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
  
    // Function to disable all calculator buttons except the clear button
    function disableButtons() {
        buttons.forEach(button => {
          // Disable all buttons unless it's the clear button
          if (button !== clearButton) button.disabled = true;
        });
      }
    
      // Function to enable all calculator buttons
      function enableButtons() {
        buttons.forEach(button => button.disabled = false);
      }
     // Function to update the display element with the current expression
     function updateDisplay() {
        display.textContent = expression;
      }
    
      // Add event listener to each calculator button to handle clicks
      buttons.forEach(button => {
        button.addEventListener('click', () => {
          // Retrieve the text content of the button, which represents its value
          const value = button.textContent;
          
          // Logic to clear the current expression when the clear button is clicked
          if (button === clearButton) {
            // Reset the expression to an empty string
            expression = '';
            // Update the display to reflect the cleared expression
            updateDisplay();
            // Re-enable all buttons after clearing
            enableButtons();
            return;
          }
    
          // Ensure the first input is a number, not an operator
          if (expression === '' && isNaN(value)) {
            return;
          }
    
          // Append the button's value to the expression and update the display
          if (button !== equalsButton) {
            // Add the button value to the expression string
            expression += value;
            // Update the display element to show the current expression
            updateDisplay();
          }
    
          // Evaluate the expression when the equals button is clicked
          if (button === equalsButton) {
            try {
              // Compute the result of the expression using eval
              // Note: eval should be used carefully in real projects due to security risks
              lastExpression = expression + ' = ' + eval(expression);
              // Update the expression with the result of the evaluation
              expression = eval(expression).toString();
              // Update the display with the result
              updateDisplay();
              // Show the last evaluated expression and result
              lastResultDisplay.textContent = lastExpression;
              // Disable all buttons except the clear button after evaluation
              disableButtons();
            } catch (e) {
              // In case of any errors during evaluation, show 'Error' on the display
              expression = 'Error';
              updateDisplay();
            }
          }
    