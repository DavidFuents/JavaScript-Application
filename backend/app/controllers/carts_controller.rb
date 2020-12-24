class CartsController < ApplicationController
  def show 
    cart = Cart.find_by(id: params[:id])
   
    if session[:cart_id] = cart.id
      products = cart.cart_items
      render json: products.to_json(:except => [:updated_at, :created_at]) 
    else 
      render json: { message: 'Unauthorized.'}
    end 
  end

  def create
    cart = Cart.create
    session[:cart_id] = cart.id 
    
    render json: cart.to_json(:except => [:updated_at, :created_at])
  end 
  
  def destroy 
    @cart = @current_cart
    @cart.destroy
    session[:cart_id] = nil
  end 
end
