# frozen_string_literal: true

class Product < ApplicationRecord
  belongs_to :brand
  has_many :prices, dependent: :destroy

  enum status: { inactive: 0, active: 1 }
end
