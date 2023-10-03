# frozen_string_literal: true

class ClientSerializer < ActiveModel::Serializer
  attributes :id, :email, :created_at, :payout_rate

  has_many :products

  def created_at
    object.created_at.strftime('%b %d, %Y')
  end
end
