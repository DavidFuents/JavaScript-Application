document.addEventListener('DOMContentLoaded', () => {
  fetchProducts();
})

function fetchProducts() {
  fetch('http://localhost:3000/products')
    .then(response => response.json())
    .then(json => {
      displayProducts(json);
    })
}

function displayProducts(json) {
  json.forEach(product => document.getElementById('product-list').innerHTML +=
    `<div class="col"> 
      <div id="${product.id}" class="product-card card">
          <img src="https://${product.img_src_sm}" class="card-img-top mx-auto" alt="" style="width: 150px; height: 150px;">
                <div class="middle">
                      <div class="text">
                            <div class="card-body">
                              <h6 class="card-title product-title">${product.name}</h6>
                              <p class="card-subtitle mb-2 text-muted product-color"><small>${product.color}</small></p>
                            </div>
                      </div>
                </div>
        </div>
    </div>`)
  
  productShowPage();
} 

function productShowPage() {
  document.querySelectorAll('.product-card').forEach(product => {
    product.addEventListener('click', () => {
      fetch(`http://localhost:3000/products/${product.id}`)
        .then(response => response.json())
        .then(json => {
          let products = document.getElementById('product-list')
          products.innerHTML = ''

          let productPage = document.getElementById('product-show-page');

          productPage.innerHTML = '';
          productPage.innerHTML +=
            `<div class="row">
              <div class="col-6"> 
                <img src="https://${json.img_src_lg}" class="card-img-top" alt="" style="width: 450px; height: 450px;">
              </div>
              <div class="col-6">
                <h2 class="product-title">${json.name}</h2>
                <p class="product-color">${json.color}</p>
                <p class="product-description"><small>${json.description}</small></p>
                <p class="product-price">$${json.price}</p>
                <div class="row mt-5 float-right">
                  <button id="atc-button" type="button" class="btn btn-success btn-sm">Add to cart</button><button id="close-product-page" type="button" class="btn btn-outline-dark btn-sm ml-2">Keep shopping</button>
                </div>
              </div>
            </div>`
            
          addToCart(json.id);
          closeProductPage();
        })
    })
  })

  function closeProductPage() {
    document.getElementById('close-product-page').addEventListener('click', () => {
      document.getElementById('product-show-page').innerHTML = '';
        fetchProducts();
    })
  }

  function addToCart(productId) {
    document.getElementById('atc-button').addEventListener('click', () => {
      console.log('adding to cart...');
      fetch('http://localhost:3000/cart_items', { method: 'POST' })
        .then(response => response.json())
        .then(json => {
          fetch(`http://localhost:3000/cart_items/${json.id}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ product_id: productId })
          })
            .then(response => response.json())
            .then(json => {
              console.log(json)
            })
        })
      })
    }
  }
  
function displayCart() {
  
} 