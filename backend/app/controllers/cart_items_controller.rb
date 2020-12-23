class CartItemsController < ApplicationController
  def update
    chosen_product = Product.find(params[:product_id])
    current_cart = @current_cart
  
    if current_cart.products.include?(chosen_product)
      @line_item = current_cart.line_items.find_by(:product_id => chosen_product)
      # @line_item.quantity += 1
    else
      @item = CartItem.new
      @item.cart = current_cart
      @item.product = chosen_product
    end

    @item.save

    render text: 'Successful added to cart.'
  end

  def destroy
    @item = CartItem.find(params[:id])
    @item.destroy

    render text: 'Succesful removed from cart.'
  end  
  
  private
    def line_item_params
      params.require(:cart_item).permit(:quantity, :product_id, :cart_id)
    end
end
