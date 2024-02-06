// app.js

// Constructor function for Product
function Product(name, imagePath) {
    this.name = name;
    this.imagePath = imagePath;
    this.timesShown = 0;
    this.timesClicked = 0;
    Product.allProducts.push(this);
  }
  
  // Static property to keep track of all products
  Product.allProducts = [];
  
  // Function to generate three unique random products
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
  
  // Function to update product stats after user click
  function updateProductStats(product) {
    product.timesShown++;
    product.timesClicked++;
  }
  
  // Function to handle the user's product selection
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
  
  // Number of rounds and current round
  const totalRounds = 25;
  let currentRound = 1;
  
// Event listener for the "View Results" button
document.getElementById('view-results').addEventListener('click', displayResults);

// Function to display voting results
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

  // Optionally, you can also hide the product container if you want
  document.getElementById('product-container').style.display = 'none';
  document.getElementById('view-results').style.display = 'none';
  resultsContainer.style.display = 'block';
}
  
  // Example products
  new Product('Bat Bag', 'images/bag.jpg');
  new Product('Bat Banana', 'images/banana.jpg');
  new Product('Bat Bathroom', 'images/bathroom.jpg');
  new Product('Bat Dog-Duck', 'images/dog-duck.jpg');
  new Product('Bat Boots', 'images/boots.jpg');
  new Product('Bat Breakfast', 'images/breakfast.jpg');
  new Product('Bat Bubblegum', 'images/bubblegum.jpg');
  new Product('Bat Chair', 'images/chair.jpg');
  new Product('Bat Cthulhu', 'images/cthulhu.jpg');
  new Product('Bat Dog-Duck', 'images/dog-duck.jpg');
  new Product('Bat Dragon', 'images/dragon.jpg');
  new Product('Bat Pen', 'images/pen.jpg');
  new Product('Bat Pet-Sweep', 'images/pet-sweep.jpg');
  new Product('Bat Scissors', 'images/scissors.jpg')
  new Product('Bat Shark', 'images/shark.jpg');
  new Product('Bat Sweep', 'images/sweep.png');
  new Product('Bat Tauntaun', 'images/tauntaun.jpg');
  new Product('Bat Unicorn', 'images/unicorn.jpg');
  new Product('Bat Water-Can', 'images/water-can.jpg');
  new Product('Bat Wine-Glass', 'images/wine-glass.jpg');

  
  // Initial display of three random products
  const initialProducts = generateRandomProducts();
  initialProducts.forEach(product => {
    const imgElement = document.createElement('img');
    imgElement.src = product.imagePath;
    imgElement.alt = product.name;
    imgElement.addEventListener('click', () => handleProductSelection(product));
    document.getElementById('product-container').appendChild(imgElement);
  });
  