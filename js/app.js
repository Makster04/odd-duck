'use strict';

console.log('I am loaded!!');

const ctx = document.getElementById('myChart');
let clearButton = document.getElementById('start-over');
clearButton.addEventListener('click', function () {
  clearData();
});

let dataFromStorage = fetchData();
console.log('here is our data', dataFromStorage);
let products = [];
let image1 = document.getElementById('image1');
let image2 = document.getElementById('image2');
let image3 = document.getElementById('image3');

if (dataFromStorage) {
    products = dataFromStorage;
    let product1 = products[0];
    console.log('HERE IS PRODUCT FROM STORAGE', product1);
    let product2 = products[1];
    let product3 = products[2];

    image1.setAttribute('src', product1.url);
    image2.setAttribute('src', product2.url);
    image3.setAttribute('src', product3.url);
    product1.timesShown++;
    product1.setAttribute('alt', product1.name);
    image2.setAttribute('alt', product2.name);
    image3.setAttribute('alt', product3.name);
    product2.timesShown++;
    product3.timesShown++;

} else {

let product1 = new Product('images/bag.jpg', 'Duck Bag');
console.log('Here IS PRODUCT FROM CONSTRUCTOR', product1);
let product2 = new Product('images/banana.jpg', 'Duck Banana');
let product3 = new Product('images/bathroom.jpg', 'Duck Bathroom'); 
let product4 = new Product('images/boots.jpg', 'Duck Boots');
let product5 = new Product('images/breakfast.jpg', 'Duck Breakfast');
let product6 = new Product('images/bubblegum.jpg', 'Duck Bubblegum');
let product7 = new Product('images/chair.jpg', 'Duck Chair');
let product8 = new Product('images/cthulhu.jpg', 'Duck Cthulhu');
let product9 = new Product('images/dragon.jpg', 'Duck Dragon');
let product10 = new Product('images/pen.jpg', 'Duck Pen');
let product11 = new Product('images/pet-sweep.jpg', 'Duck Pet Sweep');
let product12 = new Product('images/scissors.jpg', 'Duck Scissors');
let product13 = new Product('images/shark.jpg', 'Duck Shark');
let product14 = new Product('images/sweep.png', 'Duck Sweep');
let product15 = new Product('images/tauntaun.jpg', 'Duck Tauntaun');
let product16 = new Product('images/unicorn.jpg', 'Duck Unicorn');
let product17 = new Product('images/water-can.jpg', 'Duck Water Can');
let product18 = new Product('images/wine-glass.jpg', 'Duck Wine Glass');

products.push(product1, product2, product3, product4, product5, product6, product7, product8, product9, product10, product11, product12, product13, product14, product15, product16, product17, product18);

  // render the product onto the page / add the name
  image1.setAttribute('src', product1.url);
  image2.setAttribute('src', product2.url);
  image3.setAttribute('src', product3.url);
  product1.timesShown++;
  image1.setAttribute('alt', product1.name);
  image2.setAttribute('alt', product2.name);
  image3.setAttribute('alt', product3.name);
  product2.timesShown++;
  product3.timesShown++;
}

// constructor function -> 'this' is the object we are creating.
function Product(url, name) {
  this.url = url;
  this.name = name;
  this.clicks = 0;
  this.timesShown = 0;
}
// methods will not be present on object pulled from localStorage.
Product.prototype.sayName = function() {
  console.log(this.name);
}


// add an event listener that runs some code when a product picture is clicked.
let productImages = document.getElementById('products');

// when might you remove the event listener from the ProductImages HTML element
// prodcutImages.removeEventListener()

productImages.addEventListener('click', function(event) {
  event.preventDefault();
  console.log(event.target.alt); // event.target -> whatever element was interacted with.

  // add 1 to number of clicks
    // search our array of prdoducts for the product object that matched the alt
  findProduct(event.target.alt);

  // show 3 different images after a picture is clicked.
  renderNewProducts();
  saveData(products);
  console.log(getNames());
  console.log(getClicks());
  console.log(getViews());
});

function findProduct(alt) {
  for (let i =0; i< products.length; i++) {
    if (products[i].name === alt) {
      products[i].clicks++;
    }
  }
  console.log(products);
}

function renderNewProducts() {
  // generate a random index betwee 0 and the length of our products array
  let index1 = Math.floor(Math.random() * products.length);
  let index2 = Math.floor(Math.random() * products.length);
  let index3 = Math.floor(Math.random() * products.length);
  while(index1 === index2 || index1 === index3 || index2 === index3) {
    index1 = Math.floor(Math.random() * products.length);
    index2 = Math.floor(Math.random() * products.length);
    index3 = Math.floor(Math.random() * products.length);
  }
  let randomProduct1 = products[index1];
  let randomProduct2 = products[index2];
  let randomProduct3 = products[index3];
  console.log(randomProduct1.name, randomProduct2.name, randomProduct3.name, image1.alt, image2.alt, image3.alt);

  // render the product onto the page / add the name
  image1.setAttribute('src', randomProduct1.url);
  image2.setAttribute('src', randomProduct2.url);
  image3.setAttribute('src', randomProduct3.url);
  randomProduct1.timesShown++;
  image1.setAttribute('alt', randomProduct1.name);
  image2.setAttribute('alt', randomProduct2.name);
  image3.setAttribute('alt', randomProduct3.name);
  randomProduct2.timesShown++;
  randomProduct3.timesShown++;
}

// get an array of all timesShown from the products array.
function getNames() {
  let names = [];
  for (let i = 0; i < products.length; i++) {
    names.push(products[i].name)
  }
  return names;
}

// get an array of all timesClicked from the products array.
function getClicks() {
  let clicks = [];
  for (let i = 0; i < products.length; i++) {
    clicks.push(products[i].clicks);
  }
  return clicks;
}

// get an array of all product names from the products array.
function getViews() {
  let views = [];
  for (let i = 0; i < products.length; i++) {
    views.push(products[i].timesShown);
  }
  return views;
}

let button = document.getElementById('result-button');
button.addEventListener('click', viewChart);

function saveData(data) {
    localStorage.setItem('productData', JSON.stringify(data));
  }
  
  function fetchData() {
    return JSON.parse(localStorage.getItem('productData'));
  }
  
  function clearData() {
    localStorage.clear();
  }

function viewChart() {
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: getNames(),
      datasets: [{
        label: '# of Clicks',
        data: getClicks(),
        borderWidth: 1
      }, {
        label: '# of Views',
        data: getViews(),
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
}