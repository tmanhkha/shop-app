FactoryBot.define do
  factory :product do
    name { "MyString" }
    description { "MyText" }
    status { 1 }
    brand { nil }
  end
end
