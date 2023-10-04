# frozen_string_literal: true

require 'rails_helper'

RSpec.describe ClientPolicy, type: :policy do
  let(:admin) { User.new }
  let(:client) { Client.new }

  subject { described_class }

  permissions '.scope' do
    it 'returns all clients' do
      expect(ClientPolicy::Scope.new(admin, Client).resolve).to eq Client.all
    end
  end

  permissions :show?, :create?, :update?, :destroy? do
    let(:new_client) { create(:client) }

    it 'allows access for an admin ' do
      expect(subject).to permit(admin, new_client)
    end

    it 'denies access for a client' do
      expect(subject).not_to permit(client, new_client)
    end
  end
end
