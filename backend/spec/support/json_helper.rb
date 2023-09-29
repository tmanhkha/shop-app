# frozen_string_literal: true

module JsonHelper
  extend ActiveSupport::Concern

  def json_response
    JSON(response.body)
  end

  def json_response_symbolize
    JSON.parse(response.body, symbolize_names: true)
  end
end

RSpec.configure { |config| config.include JsonHelper, type: :request }
