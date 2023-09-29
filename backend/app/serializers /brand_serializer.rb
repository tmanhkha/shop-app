# frozen_string_literal: true

class BrandSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :country, :status, :created_at

  def created_at
    object.created_at.strftime('%b %d, %Y')
  end
end
