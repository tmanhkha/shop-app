# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Product, type: :model do
  describe 'validations' do
    it { is_expected.to validate_presence_of(:name) }
  end

  describe 'associations' do
    it { is_expected.to have_many(:prices).dependent(:destroy) }
    it { is_expected.to belong_to(:brand) }
  end

  describe 'enums' do
    it { is_expected.to define_enum_for(:status).with_values(inactive: 0, active: 1) }
  end

  describe 'accepts_nested_attributes' do
    it { is_expected.to accept_nested_attributes_for(:prices).allow_destroy(true) }
  end
end
