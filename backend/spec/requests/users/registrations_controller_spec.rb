# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Users::RegistrationsController do
  describe 'POST /users' do
    context 'when invalid email' do
      let(:params) do
        {
          user: {
            email: 'invalid',
            password: 'password'
          }
        }
      end

      it 'return invalid email error' do
        subject
        expect(json_response_symbolize).to eq({ error: 'Email is invalid' })
      end
    end

    context 'when valid password' do
      let(:params) do
        {
          user: {
            email: 'test@example.com',
            password: '123'
          }
        }
      end

      it 'return invalid password error' do
        subject
        expect(json_response_symbolize).to eq({ error: 'Password is too short (minimum is 6 characters)' })
      end
    end

    context 'when valid params' do
      let(:params) { { user: attributes_for(:user) } }

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
