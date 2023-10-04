# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Client, type: :model do
  describe 'associations' do
    it { is_expected.to have_many(:client_products).dependent(:destroy) }
    it { is_expected.to have_many(:products).through(:client_products) }
    it { is_expected.to have_many(:cards).dependent(:destroy) }
  end
end
