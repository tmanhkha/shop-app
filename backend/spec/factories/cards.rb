# frozen_string_literal: true

FactoryBot.define do
  factory :card do
    name { Faker::Name.name }
    activation_number { SecureRandom.uuid }
    purchase_details_pin { SecureRandom.random_number(10_000).to_s.rjust(4, '0') }
    association :product
    association :client
  end
end
