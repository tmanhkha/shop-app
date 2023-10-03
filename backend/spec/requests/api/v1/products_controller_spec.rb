# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::V1::ProductsController do
  let(:admin) { create(:user) }
  let(:client) { create(:user, :role_client) }
  let(:brand) { create(:brand) }

  describe 'GET /api/v1/products' do
    before do
      create_list(:product, 10)
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

  describe 'GET /api/v1/products/:id' do
    let(:product) { create(:product, name: 'Product name', brand:) }
    let(:id) { product.id }

    before do
      sign_in admin
    end

    it 'return success' do
      subject
      expect(response).to have_http_status(:ok)
    end

    it 'return data' do
      subject
      expect(json_response_symbolize).to a_hash_including(name: 'Product name',
                                                          description: be_kind_of(String),
                                                          status: 'active')
    end
  end

  describe 'POST /api/v1/products' do
    let(:params) { { product: attributes_for(:product, name: 'Product name').merge(brand_id: brand.id) } }

    context 'when user unauthorized' do
      before do
        sign_in client
      end

      it 'return unauthorized' do
        subject
        expect(response).to have_http_status(:unauthorized)
      end
    end

    context 'when user logged in' do
      before do
        sign_in admin
      end

      context 'when create product successfully' do
        it 'return product data' do
          subject
          expect(json_response_symbolize).to a_hash_including(name: 'Product name',
                                                              description: be_kind_of(String),
                                                              status: 'active')
        end
      end

      context 'when name empty' do
        let(:params) { { product: { name: '', brand_id: brand.id } } }

        it 'return error' do
          subject
          expect(json_response_symbolize).to eq({ error: ["Name can't be blank"] })
        end
      end
    end
  end

  describe 'PUT /api/v1/products/:id' do
    let(:product) { create(:product, name: 'Product name') }
    let(:id) { product.id }
    let(:params) { { product: attributes_for(:product, name: 'Update product name') } }

    context 'when user unauthorized' do
      before do
        sign_in client
      end

      it 'return unauthorized' do
        subject
        expect(response).to have_http_status(:unauthorized)
      end
    end

    context 'when user logged in' do
      before do
        sign_in admin
      end

      context 'when update product successfully' do
        it 'return product data' do
          subject
          expect(json_response_symbolize).to a_hash_including(name: 'Update product name',
                                                              description: be_kind_of(String),
                                                              status: 'active')
        end
      end

      context 'when name empty' do
        let(:params) { { product: { name: '' } } }

        it 'return error' do
          subject
          expect(json_response_symbolize).to eq({ error: ["Name can't be blank"] })
        end
      end
    end
  end

  describe 'DELETE /api/v1/products/:id' do
    let!(:product) { create(:product, name: 'Product name') }
    let(:id) { product.id }

    context 'when user unauthorized' do
      before do
        sign_in client
      end

      it 'return unauthorized' do
        subject
        expect(response).to have_http_status(:unauthorized)
      end
    end

    context 'when user logged in' do
      before do
        sign_in admin
      end

      context 'when remove product successfully' do
        it 'remove product' do
          expect { subject }.to change(Product, :count).by(-1)
        end
      end
    end
  end
end
