class CartsController < ApplicationController
  def show 
    @cart = @current_cart
    render json: cart.to_json(:except => [:updated_at, :created_at])
  end
  
  def destroy 
    @cart = @current_cart
    @cart.destroy
    session[:cart_id] = nil
  end 
end
