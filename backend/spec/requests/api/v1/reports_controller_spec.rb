# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::V1::ReportsController do
  let(:admin) { create(:user) }

  describe 'GET /api/v1/reports' do
    before do
      sign_in admin
    end

    before do
      create_list(:card, 5)
      create(:card, status: :inactive)
    end

    it 'return success' do
      subject
      expect(response).to have_http_status(:ok)
    end

    it 'return data' do
      subject
      expect(json_response_symbolize).to include(hash_including(
                                                   date: be_kind_of(String),
                                                   total_cards_created: 6,
                                                   total_inactive_cards: 1
                                                 ))
    end
  end
end
