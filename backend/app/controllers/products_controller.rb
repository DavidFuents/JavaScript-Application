class ProductsController < ApplicationController
  def index 
    products = Product.all 
    render json: products.to_json(:except => [:updated_at, :created_at])
  end 

  def show 
    product = Product.find_by(id: params[:id])
    render json: product.to_json(:except => [:updated_at, :created_at])
  end
end
