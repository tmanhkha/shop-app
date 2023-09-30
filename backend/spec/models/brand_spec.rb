# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Brand, type: :model do
  describe 'validations' do
    it { is_expected.to validate_presence_of(:name) }
  end

  describe 'associations' do
    it { is_expected.to have_many(:products).dependent(:destroy) }
  end

  describe 'enums' do
    it { is_expected.to define_enum_for(:status).with_values(inactive: 0, active: 1) }
  end
end
