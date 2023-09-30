# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::V1::BrandsController do
  let(:admin) { create(:user) }
  let(:client) { create(:user, :role_client) }

  describe 'GET /api/v1/brands' do
    before do
      create_list(:brand, 10)
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

  describe 'GET /api/v1/brands/:id' do
    let(:brand) { create(:brand, name: 'Brand name') }
    let(:id) { brand.id }

    before do
      sign_in admin
    end

    it 'return success' do
      subject
      expect(response).to have_http_status(:ok)
    end

    it 'return data' do
      subject
      expect(json_response_symbolize).to a_hash_including(name: 'Brand name',
                                                          description: be_kind_of(String),
                                                          country: be_kind_of(String),
                                                          status: 'active')
    end
  end

  describe 'POST /api/v1/brands' do
    let(:params) { { brand: attributes_for(:brand, name: 'Brand name') } }

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

      context 'when create brand successfully' do
        it 'return brand data' do
          subject
          expect(json_response_symbolize).to a_hash_including(name: 'Brand name',
                                                              description: be_kind_of(String),
                                                              country: be_kind_of(String),
                                                              status: 'active')
        end
      end

      context 'when name empty' do
        let(:params) { { brand: { name: '' } } }

        it 'return error' do
          subject
          expect(json_response_symbolize).to eq({ error: ["Name can't be blank"] })
        end
      end
    end
  end

  describe 'PUT /api/v1/brands/:id' do
    let(:brand) { create(:brand, name: 'Brand name') }
    let(:id) { brand.id }
    let(:params) { { brand: attributes_for(:brand, name: 'Update brand name') } }

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

      context 'when update brand successfully' do
        it 'return brand data' do
          subject
          expect(json_response_symbolize).to a_hash_including(name: 'Update brand name',
                                                              description: be_kind_of(String),
                                                              country: be_kind_of(String),
                                                              status: 'active')
        end
      end

      context 'when name empty' do
        let(:params) { { brand: { name: '' } } }

        it 'return error' do
          subject
          expect(json_response_symbolize).to eq({ error: ["Name can't be blank"] })
        end
      end
    end
  end

  describe 'DELETE /api/v1/brands/:id' do
    let!(:brand) { create(:brand, name: 'Brand name') }
    let(:id) { brand.id }

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

      context 'when remove brand successfully' do
        it 'remove brand' do
          expect { subject }.to change(Brand, :count).by(-1)
        end
      end
    end
  end
end
