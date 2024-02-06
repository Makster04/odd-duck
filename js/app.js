// CONSTRUCTOR FUNCTION for Product
function Product(name, imagePath) {
  this.name = name;
  this.imagePath = imagePath;
  this.timesShown = 0;
  this.timesClicked = 0;
  Product.allProducts.push(this);
}

// STATISTIC PROPERTY to keep track of all products
Product.allProducts = [];

// PRODUCTS - Creating instances of Product
new Product('Duck Bag', 'images/bag.jpg');
new Product('Duck Banana', 'images/banana.jpg');
new Product('Duck Bathroom', 'images/bathroom.jpg');
new Product('Duck Dog-Duck', 'images/dog-duck.jpg');
new Product('Duck Boots', 'images/boots.jpg');
new Product('Duck Breakfast', 'images/breakfast.jpg');
new Product('Duck Bubblegum', 'images/bubblegum.jpg');
new Product('Duck Chair', 'images/chair.jpg');
new Product('Duck Cthulhu', 'images/cthulhu.jpg');
new Product('Duck Dog-Duck', 'images/dog-duck.jpg'); // Duplicate name, is this intentional?
new Product('Duck Dragon', 'images/dragon.jpg');
new Product('Duck Pen', 'images/pen.jpg');
new Product('Duck Pet-Sweep', 'images/pet-sweep.jpg');
new Product('Duck Scissors', 'images/scissors.jpg');
new Product('Duck Shark', 'images/shark.jpg');
new Product('Duck Sweep', 'images/sweep.png');
new Product('Duck Tauntaun', 'images/tauntaun.jpg');
new Product('Duck Unicorn', 'images/unicorn.jpg');
new Product('Duck Water-Can', 'images/water-can.jpg');
new Product('Duck Wine-Glass', 'images/wine-glass.jpg');

// FUNCTION TO GENERATE three unique random products
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

// FUNCTION TO UPDATE PRODUCT stats after user click
function updateProductStats(product) {
  product.timesShown++;
  product.timesClicked++;
}

// FUNCTION TO HANDLE the user's product selection
function handleProductSelection(selectedProduct) {
  updateProductStats(selectedProduct);

  const productContainer = document.getElementById('product-container');
  productContainer.innerHTML = '';

  const newProducts = generateRandomProducts();
  newProducts.forEach(product => {
    const imgElement = document.createElement('img');
    imgElement.src = product.imagePath;
    imgElement.alt = product.name;
    imgElement.addEventListener('click', () => handleProductSelection(product));
    productContainer.appendChild(imgElement);
  });

  currentRound++;

  if (currentRound > totalRounds) {
    document.getElementById('view-results').style.display = 'block';
  }
}

// EVENT LISTENER for the "View Results" button
document.getElementById('view-results').addEventListener('click', displayResults);

// FUNCTIONS TO DISPLAY voting results
function displayResults() {
  const resultsContainer = document.getElementById('results-container');
  resultsContainer.innerHTML = ''; // Clear previous results

  const results = Product.allProducts.map(product => {
    return `- ${product.name} = ${product.timesClicked} Votes (Seen ${product.timesShown}x).`;
  });

  results.forEach(result => {
    const resultElement = document.createElement('p');
    resultElement.textContent = result;
    resultsContainer.appendChild(resultElement);
  });

  // OPTION TO HIDE PRODUCT CONTAINER
  document.getElementById('product-container').style.display = 'none';
  document.getElementById('view-results').style.display = 'none';
  resultsContainer.style.display = 'block';
}

// Number of rounds and current round
const totalRounds = 25;
let currentRound = 1;

// INITIAL DISPLAY of three random products
const initialProducts = generateRandomProducts();
initialProducts.forEach(product => {
  const imgElement = document.createElement('img');
  imgElement.src = product.imagePath;
  imgElement.alt = product.name;
  imgElement.addEventListener('click', () => handleProductSelection(product));
  document.getElementById('product-container').appendChild(imgElement);
});
