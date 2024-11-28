// This ensures the script runs only after the entire page content has loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded event fired'); // Log that the event has fired
  
    // Gets the display element where the expressions and results will be shown
    const display = document.getElementById('display');
    console.log('Display element:', display); // Log the display element
  
    // Select all the buttons that are part of the calculator
    const buttons = document.querySelectorAll('.calculator-button');
    console.log('Calculator buttons:', buttons); // Log all calculator buttons
  
    // Gets the clear button specifically for resetting the expression
    const clearButton = document.getElementById('button-clear');
    console.log('Clear button:', clearButton); // Log the clear button
  
    // Gets the equals button specifically for calculating the result
    const equalsButton = document.getElementById('button-equals');
    console.log('Equals button:', equalsButton); // Log the equals button
  
    // Gets the element that shows the last expression and result after a page refresh
    const lastResultDisplay = document.getElementById('last-result-display');
    console.log('Last result display:', lastResultDisplay); // Log the last result display
  
    // Initialize the current expression to an empty string
    let expression = '';
    console.log('Initial expression:', expression); // Log the initial expression
  
    // Initialize the last evaluated expression to an empty string
    let lastExpression = '';
    console.log('Initial last expression:', lastExpression); // Log the initial last expression
  
    // Function to disable all calculator buttons except the clear button
    function disableButtons() {
      buttons.forEach(button => {
        // Disable all buttons except the clear button
        if (button !== clearButton) {
          button.disabled = true;
          console.log('Disabled button:', button.textContent); // Log each disabled button
        }
      });
    }
  
    // Function to enable all calculator buttons
    function enableButtons() {
      buttons.forEach(button => {
        button.disabled = false;
        console.log('Enabled button:', button.textContent); // Log each enabled button
      });
    }
  
    // Function to update the display element with the current expression
    function updateDisplay() {
      display.textContent = expression; // Set the text content of display to the current expression
      console.log('Updated display:', expression); // Log the updated display content
    }
  
    // Add event listeners to each calculator button to handle clicks
    buttons.forEach(button => {
      button.addEventListener('click', () => {
        // Get the text content of the button, which represents its value
        const value = button.textContent;
        console.log('Button clicked:', value); // Log the clicked button value
        
        // Logic to clear the current expression when the clear button is clicked
        if (button === clearButton) {
          console.log('Clear button clicked'); // Log that the clear button was clicked
          // Reset the expression to an empty string
          expression = '';
          // Update the display to reflect the cleared expression
          updateDisplay();
          // Re-enable all buttons after clearing
          enableButtons();
          return; // Exit the function
        }
  
        // Ensure the first input is a number, not an operator
        if (expression === '' && isNaN(value)) {
          console.log('Invalid first input:', value); // Log invalid input
          return; // Exit the function
        }
  
        // Append the button's value to the expression and update the display
        if (button !== equalsButton) {
          // Add the button value to the expression string
          expression += value;
          console.log('Updated expression:', expression); // Log the updated expression
          // Update the display element to show the current expression
          updateDisplay();
        }
  
        // Evaluate the expression when the equals button is clicked
        if (button === equalsButton) {
          console.log('Equals button clicked'); // Log that the equals button was clicked
          try {
            // Compute the result of the expression using eval
            lastExpression = expression + ' = ' + eval(expression);
            console.log('Evaluated expression:', lastExpression); // Log the evaluated expression
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
            console.error('Evaluation error:', e); // Log the error
            expression = 'Error'; // Set expression to 'Error'
            updateDisplay();
          }
        }
  
        // Prevent padding with extra zeroes, such as 00, 001
        if (expression === '0') {
          expression = '';
          console.log('Prevented padding with zeroes'); // Log zero padding prevention
        }
      });
    });
  
    // Save the last expression to local storage before the page unloads
    window.addEventListener('beforeunload', () => {
      localStorage.setItem('lastExpression', lastExpression); // Save last expression to local storage
      console.log('Saved last expression to local storage:', lastExpression); // Log the saved expression
    });
  
    // Load the last expression from local storage when the page loads
    lastResultDisplay.textContent = localStorage.getItem('lastExpression') || ''; // Set the last result display
    console.log('Loaded last expression from local storage:', lastResultDisplay.textContent); // Log the loaded expression
});
