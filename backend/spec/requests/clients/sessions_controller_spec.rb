# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Clients::SessionsController do
  describe 'POST /clients/sign_in' do
    context 'when client not exist' do
      let(:params) do
        {
          client: {
            email: 'test@example.com',
            password: 'password'
          }
        }
      end

      it 'return invalid email error' do
        subject
        expect(json_response_symbolize).to eq({ error: 'Your password or email is not correct' })
      end
    end

    context 'when valid password' do
      let(:params) do
        {
          client: {
            email: 'test@example.com',
            password: '123'
          }
        }
      end

      it 'return invalid password error' do
        subject
        expect(json_response_symbolize).to eq({ error: 'Your password or email is not correct' })
      end
    end

    context 'when valid params' do
      before do
        create(:client, email: 'test@example.com', password: '123456')
      end
      let(:params) { { client: { email: 'test@example.com', password: '123456' } } }

      it 'return success' do
        subject
        expect(response).to have_http_status(:ok)
      end

      it 'json response email' do
        subject
        expect(json_response_symbolize).to match(user: a_hash_including(email: be_kind_of(String)))
      end
    end
  end
end
