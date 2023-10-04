# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Price, type: :model do
  describe 'validations' do
    it { is_expected.to validate_presence_of(:price) }
    it { is_expected.to validate_presence_of(:currency) }
  end

  describe 'associations' do
    it { is_expected.to belong_to(:product) }
  end
end
