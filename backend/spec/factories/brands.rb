# frozen_string_literal: true

FactoryBot.define do
  factory :brand do
    name { Faker::Name.name }
    description { Faker::Quote.famous_last_words }
    country { Faker::Address.state_abbr }
    status { :active }
  end
end
