let cartInfo;

document.addEventListener('DOMContentLoaded', () => {
  function createCart() {
    fetch('http://localhost:3000/carts', { method: 'POST' })
      .then(response => response.json())
      .then(cart => { cartInfo = cart.id })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  createCart();
  fetchProducts();
  displayCart();
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
        .then(product => {
          let products = document.getElementById('product-list')
          products.innerHTML = ''

          let productPage = document.getElementById('product-show-page');

          productPage.innerHTML = '';
          productPage.innerHTML +=
            `<div class="row mt-5 pt-5">
              <div class="col-6"> 
                <img src="https://${product.img_src_lg}" class="card-img-top" alt="" style="width: 450px; height: 450px;">
              </div>
              <div class="col-6">
                <h2 class="product-title">${product.name}</h2>
                <p class="product-color">${product.color}</p>
                <p class="product-description"><small>${product.description}</small></p>
                <p class="product-price">$${product.price}</p>
                <div class="row mt-5 float-right">
                  <button id="atc-button" type="button" class="btn btn-success btn-sm">Add to cart</button><button id="close-product-page" type="button" class="btn btn-outline-dark btn-sm ml-2">Keep shopping</button>
                </div>
              </div>
            </div>`
            
          addToCart(product);
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

  function addToCart(product) {
    document.getElementById('atc-button').addEventListener('click', () => {
      fetch('http://localhost:3000/cart_items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }, 
        body: JSON.stringify({ product_id: product.id, cart_id: cartInfo })
      })
        .then(response => response.json())
        .then(cartItem => {
          let numberOfItems = document.querySelectorAll('#amount-in-cart');
          
          numberOfItems.forEach(counter => {
            let num = counter.innerText;
            num = Number(num) + 1;
            counter.innerHTML = num.toString(); 

            if (Number(num) == 1) {
              document.getElementById('pluralize').innerHTML = ' item';
            } else {
              document.getElementById('pluralize').innerHTML = ' items';
            }
          })
      })
    })
  }
}
  
function displayCart() {
  let cartButton = document.getElementById('cart-btn')

  cartButton.addEventListener('click', () => {
    function displayItems() {
      let cartBody = document.getElementById('cart-body');
      cartBody.innerHTML = '';

      let subtotal = document.getElementById('subtotal');
      subtotal.innerHTML = '0';

      fetch(`http://localhost:3000/carts/${cartInfo}`)
        .then(response => response.json())
        .then(cartItem => {
          cartItem.forEach(json => {
            console.log(json)
            fetch(`http://localhost:3000/products/${json.product_id}`)
              .then(response => response.json())
              .then(product => {
                let cartBody = document.getElementById('cart-body');
                cartBody.innerHTML +=
                  `<tr>
                  <td>
                    <img src="https://${product.img_src_lg}" style="width: 45px; height: 45px;">
                  </td>
                  <td>${product.name}</td>
                  <td>1</td>
                  <td>$${product.price}</td>
                  <td>
                    <button type="button" class="close" id="remove-product">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </td>
                <tr>
                    `
                let subtotal = document.getElementById('subtotal');
                num = subtotal.innerText;
                num = Number(num) + product.price;
                subtotal.innerHTML = num.toString();

                let removeProduct = document.getElementById('remove-product');
                removeProduct.addEventListener('click', () => {
                  fetch(`http://localhost:3000/cart_items/${json.id}`, {
                    method: 'DELETE',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ cart_id: cartInfo })
                  })
                    .then(response => response.json())
                    .then(cart => {
                      let numberOfItems = document.querySelectorAll('#amount-in-cart');
          
                      numberOfItems.forEach(counter => {
                        let num = counter.innerText;
                        if (Number(num) > 0) {
                          num = Number(num) - 1;
                          counter.innerHTML = num.toString();
                        } else {
                          num = 0;
                          counter.innerHTML = num.toString();
                        }

                        if (Number(num) == 1) {
                          document.getElementById('pluralize').innerHTML = ' item';
                        } else {
                          document.getElementById('pluralize').innerHTML = ' items';
                        }
                      })
                      displayItems();
                    })
                })
              })
          })
        })
    }
    displayItems();
  })
}