# frozen_string_literal: true

FactoryBot.define do
  factory :product do
    name { Faker::Name.name }
    description { Faker::Quote.famous_last_words }
    status { :active }
    association :brand
  end
end
