// CONSTRUCTOR FUNCTION for Product
// This function creates instances of the Product object with provided name and image path,
// initializing their timesShown and timesClicked properties to 0, and pushes them into Product.allProducts array.
function Product(name, imagePath) {
  this.name = name;
  this.imagePath = imagePath;
  this.timesShown = 0;
  this.timesClicked = 0;
  Product.allProducts.push(this);
}

// Array to store all instances of Product objects
Product.allProducts = [];

// PRODUCTS - Creating instances of Product
// Multiple instances of the Product object are created with different names and image paths.
// There seems to be a duplicate entry with the name 'Duck Dog-Duck', which might need attention.
// Instances are created using the Product constructor function.
new Product('Duck Bag', 'images/bag.jpg');
new Product('Duck Banana', 'images/banana.jpg');
new Product('Duck Bathroom', 'image/bathroom.jpg'); 
new Product('Duck Boots', 'images/boots.jpg');
new Product('Duck Breakfast', 'images/breakfast.jpg');
new Product('Duck Bubblegum', 'images/bubblegum.jpg');
new Product('Duck Chair', 'images/chair.jpg');
new Product('Duck Cthulhu', 'images/cthulhu.jpg');
new Product('Duck Dragon', 'images/dragon.jpg');
new Product('Duck Pen', 'images/pen.jpg');
new Product('Duck Pet Sweep', 'images/pet-sweep.jpg');
new Product('Duck Scissors', 'images/scissors.jpg');
new Product('Duck Shark', 'images/shark.jpg');
new Product('Duck Sweep', 'images/sweep.png');
new Product('Duck Tauntaun', 'images/tauntaun.jpg');
new Product('Duck Unicorn', 'images/unicorn.jpg');
new Product('Duck Water Can', 'images/water-can.jpg');
new Product('Duck Wine Glass', 'images/wine-glass.jpg');

// FUNCTION TO GENERATE three unique random products
// This function selects three unique products randomly from the Product.allProducts array.
// It ensures that no duplicate products are selected.
function generateRandomProducts() {
  const uniqueProducts = [];
  while (uniqueProducts.length < 3) {
    const randomIndex = Math.floor(Math.random() * Product.allProducts.length);
    const randomProduct = Product.allProducts[randomIndex];
    if (!uniqueProducts.includes(randomProduct)) {
      uniqueProducts.push(randomProduct);
    }
  }
  return uniqueProducts;
}

// Function to update the timesShown and timesClicked properties of a product
function updateProductStats(product) {
  product.timesShown++;
  product.timesClicked++;
}

// Function to handle the selection of a product
function handleProductSelection(selectedProduct) {
  // Update product statistics
  updateProductStats(selectedProduct);

  // Clear product container
  const productContainer = document.getElementById('product-container');
  productContainer.innerHTML = '';

  // Generate new set of random products
  const newProducts = generateRandomProducts();
  // Display new products
  newProducts.forEach(product => {
    const imgElement = document.createElement('img');
    imgElement.src = product.imagePath;
    imgElement.alt = product.name;
    imgElement.addEventListener('click', () => handleProductSelection(product));
    productContainer.appendChild(imgElement);
  });

  // Increment current round
  currentRound++;

  // Show results if all rounds completed
  if (currentRound > totalRounds) {
    document.getElementById('view-results').style.display = 'block';
  }
}

// Event listener for displaying results
document.getElementById('view-results').addEventListener('click', displayResults);

// Function to display the results in a chart
function displayResults() {
  const resultsContainer = document.getElementById('results-container');
  resultsContainer.innerHTML = '';

  // Extract product names, votes, shhwon from Product.allProducts array
  const productNames = Product.allProducts.map(product => product.name);
  const votes = Product.allProducts.map(product => product.timesClicked);
  const views = Product.allProducts.map(product => product.timesShown)

  // Create canvas element for the chart
  const ctx = document.createElement('canvas');
  ctx.id = 'results-chart'; // Add an ID to the canvas for later reference
  resultsContainer.appendChild(ctx);

  // Create a chart using Chart.js library
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: productNames,
      datasets: [{
        label: 'Votes',
        data: votes,
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      },
      {
        label: 'Viewed',
        data: views,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
      }]

    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });

  // Hide product container and display results container
  document.getElementById('product-container').style.display = 'none';
  document.getElementById('view-results').style.display = 'none';
  resultsContainer.style.display = 'block';
}

// Total rounds for the voting
const totalRounds = 25;
// Current round counter
let currentRound = 1;

// Initial products for the first round
const initialProducts = generateRandomProducts();
// Display initial products
initialProducts.forEach(product => {
  const imgElement = document.createElement('img');
  imgElement.src = product.imagePath;
  imgElement.alt = product.name;
  imgElement.addEventListener('click', () => handleProductSelection(product));
  document.getElementById('product-container').appendChild(imgElement);
});