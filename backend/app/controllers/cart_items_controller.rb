class CartItemsController < ApplicationController
  def show 
    cart_item = CartItem.find_by(product_id: params[:product_id])
    
    if cart_item.cart_id == session[:cart_id]
      render json: cart_item.to_json(:except => [:updated_at, :created_at])
    else 
      render json: {message: 'unauthorized.'}
    end
  end

  def create 
    cart_item = CartItem.create(cart_item_params)

    render json: cart_item.to_json(:except => [:updated_at, :created_at])
  end

  # def update
  #   chosen_product = Product.find(params[:product_id])
  
  #   if current_cart.products.include?(chosen_product)
  #     @line_item = current_cart.line_items.find_by(:product_id => chosen_product)
  #     # @line_item.quantity += 1
  #   else
  #     @item = CartItem.new
  #     @item.cart = current_cart
  #     @item.product = chosen_product
  #   end

  #   @item.save

  #   render json: current_cart.products.to_json(:except => [:updated_at, :created_at])
  # end

  def destroy
    cart = Cart.find_by(id: params[:cart_id])

    product = CartItem.find(params[:id])
    product.destroy
  
    render json: cart.products.to_json(:except => [:updated_at, :created_at])
  end  
  
  private
    def cart_item_params
      params.require(:cart_item).permit(:quantity, :product_id, :cart_id)
    end
end
