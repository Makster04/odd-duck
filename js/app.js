'use strict';

console.log('I am loaded!!');

const ctx = document.getElementById('myChart');

let products = [];
let image1 = document.getElementById('image1');
let image2 = document.getElementById('image2');
let image3 = document.getElementById('image3');

function Product(url, name) {
    this.url = url;
    this.name = name;
    this.clicks = 0;
    this.timesShown = 0;
}

let product1 = new Product('images/bag.jpg', 'Duck Bag');
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

renderNewProducts();

function renderNewProducts() {
    let indices = getRandomIndices(3);

    for (let i = 0; i < indices.length; i++) {
        let randomProduct = products[indices[i]]; // corrected typo here
        let imageElement = getImageElement(i + 1);
        imageElement.setAttribute('src', randomProduct.url);
        imageElement.setAttribute('alt', randomProduct.name);
        randomProduct.timesShown++;
    }
}

function getRandomIndices(count) {
    let indices = [];
    while (indices.length < count) {
        let index = Math.floor(Math.random() * products.length);
        if (!indices.includes(index)) {
            indices.push(index);
        }
    }
    return indices;
}

function getImageElement(index) {
    switch (index) {
        case 1:
            return image1;
        case 2:
            return image2;
        case 3:
            return image3;
        default:
            return null;
    }
}

let productImages = document.querySelectorAll('.product-image');

productImages.forEach(image => {
    image.addEventListener('click', function(event) {
        event.preventDefault();
        console.log(event.target.alt);
        findProduct(event.target.alt);
        renderNewProducts();
        console.log(getNames());
        console.log(getClicks());
        console.log(getViews());
    });
});

function findProduct(alt) {
    for (let i = 0; i < products.length; i++) {
        if (products[i].name === alt) {
            products[i].clicks++;
        }
    }
    console.log(products);
}

function getNames() {
    let names = [];
    for (let i = 0; i < products.length; i++) {
        names.push(products[i].name)
    }
    return names;
}

function getClicks() {
    let clicks = [];
    for (let i = 0; i < products.length; i++) {
        clicks.push(products[i].clicks);
    }
    return clicks;
}

function getViews() {
    let views = [];
    for (let i = 0; i < products.length; i++) {
        views.push(products[i].timesShown);
    }
    return views;
}

let button = document.getElementById('result-button');
button.addEventListener('click', viewChart);

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

