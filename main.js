// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8]
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9]
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6]
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5]
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6]

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5]
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3]
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4]
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5]
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4]

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4]
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9]
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3]
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3]
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3]

// An array of all the arrays above
const batch = [valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5]


// Add your functions below:
function validateCred(cardArray) {
    // Copy the array to avoid mutation
    const digits = [...cardArray];
    
    // Step 1: Starting from the farthest digit to the right (check digit), iterate to the left
    for (let i = digits.length - 2; i >= 0; i -= 2) {
      // Step 2: Double every other digit (starting from the rightmost)
      digits[i] *= 2;
      // If the doubled digit is greater than 9, subtract 9
      if (digits[i] > 9) {
        digits[i] -= 9;
      }
    }
    
    // Step 3: Sum up all the digits in the credit card number
    const sum = digits.reduce((acc, curr) => acc + curr, 0);
    
    // Step 4: Check if the sum modulo 10 is 0
    return sum % 10 === 0;
  }
  function findInvalidCards(batch) {
      // Array to store invalid cards
      let invalidCards = [];
      
      // Iterate over each array of credit card numbers
      for (let cardArray of batch) {
          // Check if the card is invalid using the validateCred function
          if (!validateCred(cardArray)) {
              // If the card is invalid, add it to the invalidCards array
              invalidCards.push(cardArray);
          }
      }
      
      // Return the array of invalid cards
      return invalidCards;
  }
  
  function idInvalidCardCompanies(invalidCards) {
      let companies = new Set();
      
      for (let cardArray of invalidCards) {
          console.log('Processing card:', cardArray); // Log the current card being processed
          console.log('First digit:', cardArray[0]); // Log the first digit of the card
          
          switch (cardArray[0]) {
              case 3:
                  companies.add('Amex');
                  break;
              case 4:
                  companies.add('Visa');
                  break;
              case 5:
                  companies.add('Mastercard');
                  break;
              case 6:
                  companies.add('Discover');
                  break;
              default:
                  console.log('Company not found');
          }
      }
      
      return [...companies];
  }
  
  function stringToNumbers(cardNumberString) {
      // Remove any non-digit characters from the string
      const cleanString = cardNumberString.replace(/\D/g, '');
      
      // Convert the cleaned string into an array of numbers
      const numbersArray = cleanString.split('').map(Number);
      
      return numbersArray;
  }
  
  // Test the function
  const cardNumberString = '1234-5678-9012-3456';
  const numbersArray = stringToNumbers(cardNumberString);
  
  console.log(numbersArray);
  console.log(validateCred(valid1)); // Should return true
  console.log(validateCred(invalid1)); // Should return false
  console.log(idInvalidCardCompanies([invalid5]));
  
  
  
  
  
  











  // Add event listener to the form for submission
document.getElementById('creditCardForm').addEventListener('submit', function(event) {
    // Prevent the default form submission behavior
    event.preventDefault();
    
    // Get the value of the credit card number input field
    const cardNumber = document.getElementById('cardNumber').value;
    
    // Convert the card number string to an array of numbers
    const cardArray = stringToNumbers(cardNumber);
    
    // Validate the credit card number using the validateCred function
    const isValid = validateCred(cardArray);
    
    // Get the result display element
    const resultDisplay = document.getElementById('result');
    
    // Display the result message based on the validity of the credit card number
    if (isValid) {
        resultDisplay.textContent = 'Valid credit card number!';
        resultDisplay.style.color = 'green';
    } else {
        resultDisplay.textContent = 'Invalid credit card number!';
        resultDisplay.style.color = 'red';
    }
});