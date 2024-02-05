// Product constructor function
function Product(name, imagePath) {
    this.name = name;
    this.imagePath = imagePath;
    this.timesShown = 0;
    this.timesClicked = 0;
  }
  
  // Array to hold all products
  const allProducts = [];
  
  // Function to generate random products
  function generateRandomProducts() {
    const productContainer = document.getElementById('product-container');
    productContainer.innerHTML = ''; // Clear previous products
  
    for (let i = 0; i < 3; i++) {
      const randomIndex = Math.floor(Math.random() * allProducts.length);
      const product = allProducts[randomIndex];
      
      // Display product image
      const imgElement = document.createElement('img');
      imgElement.src = `img/${product.imagePath}`;
      imgElement.alt = product.name;
      imgElement.addEventListener('click', () => handleProductClick(product));
      
      product.timesShown++;
      productContainer.appendChild(imgElement);
    }
  
    if (allProducts.every(product => product.timesClicked >= 25)) {
      // If 25 selections have been made for each product, show 'View Results' button
      document.getElementById('view-results-btn').style.display = 'block';
    }
  }
  
  // Function to handle product click
  function handleProductClick(product) {
    product.timesClicked++;
    generateRandomProducts(); // Generate new products after a click
  }
  
  // Function to show results
  function showResults() {
    const resultsContainer = document.getElementById('product-container');
    resultsContainer.innerHTML = ''; // Clear previous products
  
    allProducts.forEach(product => {
      const resultText = `${product.name} had ${product.timesClicked} votes, and was seen ${product.timesShown} times.`;
      const resultElement = document.createElement('p');
      resultElement.textContent = resultText;
      resultsContainer.appendChild(resultElement);
    });
  }
  
  // Initial setup
  allProducts.push(new Product('Product1', 'product1.jpg'));
  allProducts.push(new Product('Product2', 'product2.jpg'));
  allProducts.push(new Product('Product3', 'product3.jpg'));
  
  generateRandomProducts(); // Initial generation of random products
  
  // Event listener for 'View Results' button
  document.getElementById('view-results-btn').addEventListener('click', showResults);
  