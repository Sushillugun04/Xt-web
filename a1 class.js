          function showIconName(iconName) {
            document.getElementById('icon-name').textContent = iconName;
        }
const products = [
            { name: "Test", date: "2024-01-01", size: "1MB" },
              ];

        function displayProducts(filteredProducts) {
            const container = document.getElementById('product-container');
            container.innerHTML = '';

            filteredProducts.forEach(product => {
                const productElement = document.createElement('div');
                productElement.className = 'product';
                
                productElement.innerHTML = `
                    <div class="product-details">
                        <div class="product-name">${product.name}</div>
                        <div class="product-date">Date: ${product.date}</div>
                        <div class="product-size">Size: ${product.size}</div>
                    </div>
                    <a href="#" class="download-btn">Download<span class="icon">
                    <ion-icon name="download-outline"></ion-icon>
                </span></a>
                `;

                container.appendChild(productElement);
            });
        }

        function filterProducts() {
            const searchText = document.getElementById('search-input').value.toLowerCase();
            const filteredProducts = products.filter(product => product.name.toLowerCase().includes(searchText));
            displayProducts(filteredProducts);
        }

        function clearSearch() {
            document.getElementById('search-input').value = '';
            filterProducts();
        }

        // Initial display of all products
        displayProducts(products);
   
