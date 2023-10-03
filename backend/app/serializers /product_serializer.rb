# frozen_string_literal: true

class ProductSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :status, :created_at

  belongs_to :brand
  has_many :prices

  def created_at
    object.created_at.strftime('%b %d, %Y')
  end
end
