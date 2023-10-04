# frozen_string_literal: true

class CardSerializer < ActiveModel::Serializer
  attributes :id, :name, :activation_number, :purchase_details_pin, :created_at

  belongs_to :product

  def created_at
    object.created_at.strftime('%b %d, %Y')
  end
end
