// This ensures the script runs only after the entire page content has loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded event fired');
  
    // Get the display element where the expressions and results will be shown
    const display = document.getElementById('display');
    console.log('Display element:', display);
  
    // Select all the buttons that are part of the calculator
    const buttons = document.querySelectorAll('.calculator-button');
    console.log('Calculator buttons:', buttons);
  
    // Get the clear button specifically for resetting the expression
    const clearButton = document.getElementById('button-clear');
    console.log('Clear button:', clearButton);
  
    // Get the equals button specifically for calculating the result
    const equalsButton = document.getElementById('button-equals');
    console.log('Equals button:', equalsButton);
  
    // Get the element that shows the last expression and result after a page refresh
    const lastResultDisplay = document.getElementById('last-result-display');
    console.log('Last result display:', lastResultDisplay);
  
    // Initialize the current expression to an empty string
    let expression = '';
    console.log('Initial expression:', expression);
  
    // Initialize the last evaluated expression to an empty string
    let lastExpression = '';
    console.log('Initial last expression:', lastExpression);
  
    // Function to disable all calculator buttons except the clear button
    function disableButtons() {
      buttons.forEach(button => {
        // Disable all buttons except the clear button
        if (button !== clearButton) {
          button.disabled = true;
          console.log('Disabled button:', button.textContent);
        }
      });
    }
  
    // Function to enable all calculator buttons
    function enableButtons() {
      buttons.forEach(button => {
        button.disabled = false;
        console.log('Enabled button:', button.textContent);
      });
    }
  
    // Function to update the display element with the current expression
    function updateDisplay() {
      display.textContent = expression;
      console.log('Updated display:', expression);
    }
  
    // Add event listeners to each calculator button to handle clicks
    buttons.forEach(button => {
      button.addEventListener('click', () => {
        // Get the text content of the button, which represents its value
        const value = button.textContent;
        console.log('Button clicked:', value);
        
        // Logic to clear the current expression when the clear button is clicked
        if (button === clearButton) {
          console.log('Clear button clicked');
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
          console.log('Invalid first input:', value);
          return;
        }
  
        // Append the button's value to the expression and update the display
        if (button !== equalsButton) {
          // Add the button value to the expression string
          expression += value;
          console.log('Updated expression:', expression);
          // Update the display element to show the current expression
          updateDisplay();
        }
  
        // Evaluate the expression when the equals button is clicked
        if (button === equalsButton) {
          console.log('Equals button clicked');
          try {
            // Compute the result of the expression using eval
            // Note: eval should be used carefully in real projects due to security risks
            lastExpression = expression + ' = ' + eval(expression);
            console.log('Evaluated expression:', lastExpression);
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
            console.error('Evaluation error:', e);
            expression = 'Error';
            updateDisplay();
          }
        }
  
        // Prevent padding with extra zeroes, such as 00, 001
        if (expression === '0') {
          expression = '';
          console.log('Prevented padding with zeroes');
        }
      });
    });
  
    // Save the last expression to local storage before the page unloads
    window.addEventListener('beforeunload', () => {
      localStorage.setItem('lastExpression', lastExpression);
      console.log('Saved last expression to local storage:', lastExpression);
    });
  
    // Load the last expression from local storage when the page loads
    lastResultDisplay.textContent = localStorage.getItem('lastExpression') || '';
    console.log('Loaded last expression from local storage:', lastResultDisplay.textContent);
});
