# frozen_string_literal: true

require 'rails_helper'

RSpec.describe CardPolicy, type: :policy do
  let(:admin) { User.new }
  let(:client) { Client.new }

  subject { described_class }

  permissions '.scope' do
    it 'returns all cards' do
      expect(CardPolicy::Scope.new(admin, Card).resolve).to eq Card.all
    end
  end

  permissions :create?, :destroy? do
    let(:card) { create(:card) }

    it 'allows access for an admin ' do
      expect(subject).not_to permit(admin, card)
    end

    it 'denies access for a client' do
      expect(subject).to permit(client, card)
    end
  end
end
