// CONSTRUCTOR FUNCTION for Product
// This function creates instances of the Product object with properties such as name, imagePath, timesShown, and timesClicked.
// Each product instance is pushed into the Product.allProducts array.
function Product(name, imagePath) {
  this.name = name; // String: Represents the name of the product.
  this.imagePath = imagePath; // String: Represents the file path to the product image.
  this.timesShown = 0; // Number: Represents the number of times the product has been shown to the user.
  this.timesClicked = 0; // Number: Represents the number of times the product has been clicked by the user.
  Product.allProducts.push(this);
}

// STATISTIC PROPERTY to keep track of all products
Product.allProducts = []; // Array: Contains all instances of the Product object.

// PRODUCTS - Creating instances of Product
// Multiple instances of the Product object are created with different names and image paths.
// There seems to be a duplicate entry with the name 'Duck Dog-Duck', which might need attention.
new Product('Duck Bag', 'images/bag.jpg');
new Product('Duck Banana', 'images/banana.jpg');
// Other product instances created...

// FUNCTION TO GENERATE three unique random products
// This function selects three unique products randomly from the Product.allProducts array.
// It ensures that no duplicate products are selected.
function generateRandomProducts() {
  const uniqueProducts = []; // Array: Holds the selected unique products.
  while (uniqueProducts.length < 3) {
    const randomIndex = Math.floor(Math.random() * Product.allProducts.length);
    const randomProduct = Product.allProducts[randomIndex]; // Object: A randomly selected product.
    if (!uniqueProducts.includes(randomProduct)) {
      uniqueProducts.push(randomProduct);
    }
  }
  return uniqueProducts;
}

// FUNCTION TO UPDATE PRODUCT stats after user click
// This function increments the timesShown and timesClicked properties of the selected product.
function updateProductStats(product) {
  product.timesShown++; // Incrementing the timesShown property of the product by 1.
  product.timesClicked++; // Incrementing the timesClicked property of the product by 1.
}

// FUNCTION TO HANDLE the user's product selection
// This function updates product stats, generates new random products, updates the UI with these products,
// and increments the current round counter. It also checks if all rounds are completed and displays the results if so.
function handleProductSelection(selectedProduct) {
  updateProductStats(selectedProduct);

  const productContainer = document.getElementById('product-container');
  productContainer.innerHTML = ''; // Clearing the product container.

  const newProducts = generateRandomProducts(); // Array: Holds three new random products.
  newProducts.forEach(product => {
    const imgElement = document.createElement('img'); // DOM Element: Image element to display the product.
    imgElement.src = product.imagePath; // String: URL of the product image.
    imgElement.alt = product.name; // String: Alternate text for the product image.
    imgElement.addEventListener('click', () => handleProductSelection(product)); // Event Listener: Click event to handle product selection.
    productContainer.appendChild(imgElement); // Adding the image element to the product container.
  });

  currentRound++; // Incrementing the current round counter by 1.

  if (currentRound > totalRounds) {
    document.getElementById('view-results').style.display = 'block'; // Displaying the "View Results" button.
  }
}

// EVENT LISTENER for the "View Results" button
// This listens for a click event on the "View Results" button and triggers the displayResults function.
document.getElementById('view-results').addEventListener('click', displayResults);

// FUNCTIONS TO DISPLAY voting results
// This function populates the results container with each product's name, number of votes,
// and the number of times it was shown.
function displayResults() {
  const resultsContainer = document.getElementById('results-container');
  resultsContainer.innerHTML = ''; // Clear previous results

  const results = Product.allProducts.map(product => {
    return `- ${product.name} = ${product.timesClicked} Votes (Seen ${product.timesShown}x).`; // String: Represents the result of each product.
  });

  results.forEach(result => {
    const resultElement = document.createElement('p'); // DOM Element: Paragraph element to display the result.
    resultElement.textContent = result; // Setting the text content of the result element.
    resultsContainer.appendChild(resultElement); // Adding the result element to the results container.
  });

  // OPTION TO HIDE PRODUCT CONTAINER
  document.getElementById('product-container').style.display = 'none'; // Hiding the product container.
  document.getElementById('view-results').style.display = 'none'; // Hiding the "View Results" button.
  resultsContainer.style.display = 'block'; // Displaying the results container.
}

// Number of rounds and current round
// totalRounds is a constant representing the total number of rounds.
// currentRound is a variable representing the current round number.
const totalRounds = 25; // Number: Represents the total number of rounds in the voting session.
let currentRound = 1; // Number: Represents the current round number.

// INITIAL DISPLAY of three random products
// This code block initializes the UI by displaying three random products at the beginning of the session
// and sets up click event listeners for each product image.
const initialProducts = generateRandomProducts(); // Array: Holds three initial random products.
initialProducts.forEach(product => {
  const imgElement = document.createElement('img'); // DOM Element: Image element to display the product.
  imgElement.src = product.imagePath; // String: URL of the product image.
  imgElement.alt = product.name; // String: Alternate text for the product image.
  imgElement.addEventListener('click', () => handleProductSelection(product)); // Event Listener: Click event to handle product selection.
  document.getElementById('product-container').appendChild(imgElement); // Adding the image element to the product container.
});
