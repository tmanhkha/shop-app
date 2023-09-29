class Brand < ApplicationRecord
  validates :name, presence: true
  has_many :products, dependent: :destroy

  enum status: { inactive: 0, active: 1 }
end
