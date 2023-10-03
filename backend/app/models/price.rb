# frozen_string_literal: true

class Price < ApplicationRecord
  belongs_to :product

  validates :price, :currency, presence: true
end
