# frozen_string_literal: true

class Brand < ApplicationRecord
  has_many :products, dependent: :destroy

  validates :name, presence: true

  enum status: { inactive: 0, active: 1 }
end
