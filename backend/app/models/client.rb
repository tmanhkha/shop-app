# frozen_string_literal: true

class Client < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :validatable,
         :jwt_authenticatable, jwt_revocation_strategy: JwtDenylist

  has_many :client_products, dependent: :destroy
  has_many :products, through: :client_products
  has_many :cards, dependent: :destroy
end
