# frozen_string_literal: true

FactoryBot.define do
  factory :brand do
    name { 'MyString' }
    description { 'MyText' }
    country { 'MyString' }
  end
end
