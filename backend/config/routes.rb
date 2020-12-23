Rails.application.routes.draw do
  resources :carts
  resources :products
  resources :cart_items
end
