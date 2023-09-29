class CreateBrands < ActiveRecord::Migration[7.0]
  def change
    create_table :brands do |t|
      t.string :name, null: false
      t.text :description
      t.string :country
      t.integer :status, default: 0

      t.timestamps
    end
  end
end
