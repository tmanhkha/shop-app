class CreateProducts < ActiveRecord::Migration[7.0]
  def change
    create_table :products do |t|
      t.string :name, null: false
      t.text :description
      t.integer :status, default: 0
      t.references :brand, null: false, foreign_key: true

      t.timestamps
    end
  end
end
