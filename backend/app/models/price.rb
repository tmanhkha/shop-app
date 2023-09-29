# frozen_string_literal: true

class Price < ApplicationRecord
  belongs_to :product

  validates :value, :currency, presence: true
end
