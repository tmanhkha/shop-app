# frozen_string_literal: true

require 'rails_helper'

RSpec.describe BrandPolicy, type: :policy do
  let(:admin) { User.new(role: :admin) }
  let(:client) { User.new(role: :client) }

  subject { described_class }

  permissions '.scope' do
    it 'returns all brands' do
      expect(BrandPolicy::Scope.new(admin, Brand).resolve).to eq Brand.all
    end
  end

  permissions :show?, :create?, :update?, :destroy? do
    let(:brand) { create(:brand) }

    it 'allows access for an admin ' do
      expect(subject).to permit(admin, brand)
    end

    it 'denies access for a client' do
      expect(subject).not_to permit(client, brand)
    end
  end
end
