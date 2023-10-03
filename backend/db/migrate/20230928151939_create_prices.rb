class CreatePrices < ActiveRecord::Migration[7.0]
  def change
    create_table :prices do |t|
      t.decimal :price, precision: 10, scale: 2, null: false
      t.string :currency, null: false
      t.references :product, null: false, foreign_key: true

      t.timestamps
    end
  end
end
