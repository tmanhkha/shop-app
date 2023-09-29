FactoryBot.define do
  factory :price do
    value { "9.99" }
    currency { "MyString" }
    product { nil }
  end
end
