# frozen_string_literal: true

class Product < ApplicationRecord
  belongs_to :brand
  has_many :prices, dependent: :destroy
  has_many :client_products, dependent: :destroy
  has_many :clients, through: :client_products
  has_many :cards, dependent: :destroy

  validates :name, presence: true

  enum status: { inactive: 0, active: 1 }

  accepts_nested_attributes_for :prices, allow_destroy: true, reject_if: proc { |attributes|
                                                                           attributes['price'].blank?
                                                                         }
end
