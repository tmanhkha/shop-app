# frozen_string_literal: true

FactoryBot.define do
  factory :price do
    price { '9.99' }
    currency { 'MyString' }
    product { nil }
  end
end
