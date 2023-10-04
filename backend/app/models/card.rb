# frozen_string_literal: true

class Card < ApplicationRecord
  belongs_to :product
  belongs_to :client

  validates :name, presence: true

  enum status: { active: 0, inactive: 1 }
end
