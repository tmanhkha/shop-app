# frozen_string_literal: true

FactoryBot.define do
  factory :user do
    email { Faker::Internet.email }
    password { Faker::Internet.password(min_length: 8) }
    role { :admin }

    trait :role_client do
      role { :client }
    end
  end
end
