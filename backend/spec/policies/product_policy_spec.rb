# frozen_string_literal: true

require 'rails_helper'

RSpec.describe ProductPolicy, type: :policy do
  let(:admin) { User.new }
  let(:client) { Client.new }

  subject { described_class }

  permissions '.scope' do
    it 'returns all products' do
      expect(ProductPolicy::Scope.new(admin, Product).resolve).to eq Product.all
    end
  end

  permissions :create?, :update?, :destroy? do
    let(:product) { create(:product) }

    it 'allows access for an admin ' do
      expect(subject).to permit(admin, product)
    end

    it 'denies access for a client' do
      expect(subject).not_to permit(client, product)
    end
  end
end
