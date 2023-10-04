# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::V1::CardsController do
  let(:admin) { create(:user) }
  let(:client) { create(:client) }
  let(:product) { create(:product) }
  let(:product_id) { product.id }
  let(:card) { create(:card) }

  describe 'GET /api/v1/cards' do
    before do
      create_list(:card, 10)
      sign_in admin
    end

    it 'return success' do
      subject
      expect(response).to have_http_status(:ok)
    end

    it 'return data' do
      subject
      expect(json_response_symbolize[:collection].length).to eq 10
    end

    context 'when use pagination' do
      let(:params) { { page: 1, per_page: 2 } }

      it 'return data with pagination' do
        subject
        expect(json_response_symbolize[:collection].length).to eq 2
        expect(json_response_symbolize[:pagination][:total_pages]).to eq 5
        expect(json_response_symbolize[:pagination][:total_entries]).to eq 10
      end
    end
  end

  describe 'POST /api/v1/products/:product_id/cards' do
    let(:params) { { card: attributes_for(:card, name: 'Card name', client_id: client.id) } }

    context 'when user unauthorized' do
      before do
        sign_in admin
      end

      it 'return unauthorized' do
        subject
        expect(response).to have_http_status(:unauthorized)
      end
    end

    context 'when user logged in' do
      before do
        sign_in client
      end

      context 'when create card successfully' do
        it 'return card data' do
          subject
          expect(json_response_symbolize).to a_hash_including(name: 'Card name',
                                                              activation_number: be_kind_of(String))
        end
      end

      context 'when name empty' do
        let(:params) { { card: { name: '' } } }

        it 'return error' do
          subject
          expect(json_response_symbolize).to eq({ error: 'Card issuance failed' })
        end
      end
    end
  end

  describe 'DELETE /api/v1/products/:product_id/cards/:id' do
    let!(:card) { create(:card, name: 'Card name') }
    let(:id) { card.id }

    context 'when user unauthorized' do
      before do
        sign_in admin
      end

      it 'return unauthorized' do
        subject
        expect(response).to have_http_status(:unauthorized)
      end
    end

    context 'when user logged in' do
      before do
        sign_in client
      end

      context 'when remove card successfully' do
        it 'remove card' do
          expect { subject }.to(change { card.reload.status })
        end
      end
    end
  end
end
