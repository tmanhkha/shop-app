# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::V1::ClientsController do
  let(:admin) { create(:user) }
  let(:client) { create(:client) }

  describe 'GET /api/v1/clients' do
    before do
      create_list(:client, 10)
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

  describe 'GET /api/v1/clients/:id' do
    let(:client) { create(:client, email: 'test@example.com') }
    let(:id) { client.id }

    before do
      sign_in admin
    end

    it 'return success' do
      subject
      expect(response).to have_http_status(:ok)
    end

    it 'return data' do
      subject
      expect(json_response_symbolize).to a_hash_including(email: 'test@example.com')
    end
  end

  describe 'POST /api/v1/clients' do
    let(:params) { { client: attributes_for(:client, email: 'test@example.com') } }

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

      context 'when create client successfully' do
        it 'return client data' do
          subject
          expect(json_response_symbolize).to a_hash_including(email: 'test@example.com')
        end
      end

      context 'when name empty' do
        let(:params) { { client: { email: '' } } }

        it 'return error' do
          subject
          expect(json_response_symbolize).to eq({ error: ["Email can't be blank", "Password can't be blank"] })
        end
      end
    end
  end

  describe 'PUT /api/v1/clients/:id' do
    let(:client) { create(:client, email: 'test@example.com') }
    let(:id) { client.id }
    let(:params) { { client: attributes_for(:client, email: 'test1@example.com') } }

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

      context 'when update client successfully' do
        it 'return client data' do
          subject
          expect(json_response_symbolize).to a_hash_including(email: 'test1@example.com')
        end
      end

      context 'when name empty' do
        let(:params) { { client: { email: '' } } }

        it 'return error' do
          subject
          expect(json_response_symbolize).to eq({ error: ["Email can't be blank"] })
        end
      end
    end
  end

  describe 'DELETE /api/v1/clients/:id' do
    let!(:new_client) { create(:client, email: 'test1@example.com') }
    let(:id) { new_client.id }

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

      context 'when remove client successfully' do
        it 'remove client' do
          expect { subject }.to change(Client, :count).by(-1)
        end
      end
    end
  end
end
