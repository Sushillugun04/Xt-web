// Sample products data
const productsData = [
  { name: "A1", image: "path_to_A1_image.png" },
  { name: "A2", image: "path_to_A2_image.png" },
  { name: "A3", image: "path_to_A3_image.png" },
  { name: "A4", image: "path_to_A4_image.png" },
  { name: "A5", image: "path_to_A5_image.png" }
];

// Function to initialize product data with counts from localStorage or default values
function initializeProductsData() {
  const storedData = JSON.parse(localStorage.getItem('productsData'));
  if (storedData) {
    productsData.forEach(product => {
      const storedProduct = storedData.find(p => p.name === product.name);
      if (storedProduct) {
        product.likeCount = storedProduct.likeCount;
        product.visitCount = storedProduct.visitCount;
      } else {
        product.likeCount = 0;
        product.visitCount = 0;
      }
    });
  } else {
    productsData.forEach(product => {
      product.likeCount = 0;
      product.visitCount = 0;
    });
  }
}

// Function to save product data to localStorage
function saveProductsData() {
  localStorage.setItem('productsData', JSON.stringify(productsData));
}

// Function to create product elements
function createProductElement(product) {
  const productElement = document.createElement('div');
  productElement.classList.add('product');
  productElement.dataset.name = product.name;
  productElement.innerHTML = `
    <img src="${product.image}" alt="${product.name}">
    <h3>${product.name}</h3>
    <button class="like-btn">Like</button>
    <button class="visit-btn">Visit</button>
    <div class="count">
      <span class="like-count">Likes: ${product.likeCount}</span>
      <span class="visit-count">Visits: ${product.visitCount}</span>
    </div>
  `;
  return productElement;
}

// Function to display products
function displayProducts(filteredProducts) {
  const productsContainer = document.getElementById('productsContainer');
  productsContainer.innerHTML = '';
  filteredProducts.forEach(product => {
    const productElement = createProductElement(product);
    productsContainer.appendChild(productElement);
  });
}

// Event listener for buttons
document.addEventListener('DOMContentLoaded', () => {
  initializeProductsData();
  displayProducts(productsData);
});

document.addEventListener('click', event => {
  if (event.target.classList.contains('like-btn')) {
    const productName = event.target.parentElement.dataset.name;
    const productIndex = productsData.findIndex(product => product.name === productName);
    if (productIndex !== -1) {
      productsData[productIndex].likeCount++;
      const likeCountElement = document.querySelector(`.product[data-name="${productName}"] .like-count`);
      likeCountElement.textContent = `Likes: ${productsData[productIndex].likeCount}`;
      saveProductsData();
    }
  }
  if (event.target.classList.contains('visit-btn')) {
    const productName = event.target.parentElement.dataset.name;
    const productIndex = productsData.findIndex(product => product.name === productName);
    if (productIndex !== -1) {
      productsData[productIndex].visitCount++;
      const visitCountElement = document.querySelector(`.product[data-name="${productName}"] .visit-count`);
      visitCountElement.textContent = `Visits: ${productsData[productIndex].visitCount}`;
      saveProductsData();
    }
  }
});

// Event listener for search input
const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('input', () => {
  const searchText = searchInput.value.trim().toLowerCase();
  const filteredProducts = productsData.filter(product => product.name.toLowerCase().includes(searchText));
  displayProducts(filteredProducts);
});

