// Constructor function for products
function Product(name, imagePath) {
    this.name = name;
    this.imagePath = imagePath;
    this.timesShown = 0;
    this.timesClicked = 0;
  }
  
  // Array to store all products
  const allProducts = [];
  
  // Function to display three unique products
  function displayProducts() {
    const productDisplay = document.getElementById('product-display');
    const products = getRandomProducts();
  
    products.forEach((product, index) => {
      const imgElement = document.getElementById(`product${index + 1}`);
      imgElement.src = product.imagePath;
      imgElement.alt = product.name;
      product.timesShown++;
    });
  }
  
  // Function to get three random products
  function getRandomProducts() {
    const randomProducts = [];
    while (randomProducts.length < 3) {
      const randomIndex = Math.floor(Math.random() * allProducts.length);
      const randomProduct = allProducts[randomIndex];
      if (!randomProducts.includes(randomProduct)) {
        randomProducts.push(randomProduct);
      }
    }
    return randomProducts;
  }
  
  // Function to handle product click
  function handleProductClick(productIndex) {
    const selectedProduct = allProducts[productIndex];
    selectedProduct.timesClicked++;
    displayProducts();
  }
  
  // Function to end the voting session and display results
  function endVotingSession() {
    const productDisplay = document.getElementById('product-display');
    const viewResultsBtn = document.getElementById('viewResultsBtn');
  
    productDisplay.innerHTML = '<p>Voting session has ended. Click "View Results" to see the results.</p>';
    viewResultsBtn.style.display = 'block';
  
    // Remove event listeners
    for (let i = 1; i <= 3; i++) {
      const imgElement = document.getElementById(`product${i}`);
      imgElement.removeEventListener('click', () => handleProductClick(i - 1));
    }
  }
  
  // Function to display results
  function displayResults() {
    const results = document.getElementById('product-display');
    results.innerHTML = '<h2>Results:</h2>';
  
    allProducts.forEach(product => {
      results.innerHTML += `<p>${product.name} had ${product.timesClicked} votes, and was seen ${product.timesShown} times.</p>`;
    });
  }
  
  // Initialize products
  const product1 = new Product('dog-duck', 'images/dog-duck.jpg');
  const product2 = new Product('cat-fish', 'images/cat-fish.jpg');
  const product3 = new Product('bird-banana', 'images/bird-banana.jpg');
  
  // Add products to the array
  allProducts.push(product1, product2, product3);
  
  // Initialize voting rounds
  let votingRounds = 25;
  
  // Display initial products
  displayProducts();
  
  // Add event listeners
  for (let i = 1; i <= 3; i++) {
    const imgElement = document.getElementById(`product${i}`);
    imgElement.addEventListener('click', () => handleProductClick(i - 1));
  }
  
  // Add event listener for View Results button
  const viewResultsBtn = document.getElementById('viewResultsBtn');
  viewResultsBtn.addEventListener('click', () => {
    endVotingSession();
    displayResults();
  });
  