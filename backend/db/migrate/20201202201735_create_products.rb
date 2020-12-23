class CreateProducts < ActiveRecord::Migration[6.0]
  def change
    create_table :products do |t|
      t.string :name
      t.string :color
      t.string :description
      t.integer :price
      t.string :category
      t.string :img_src_sm
      t.string :img_src_lg

      t.timestamps
    end
  end
end
