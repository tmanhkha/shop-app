# frozen_string_literal: true

module Users
  class RegistrationsController < Devise::RegistrationsController
    include RackSessionFix
    respond_to :json

    private

    def respond_with(resource, _opts = {})
      register_success && return if resource.persisted?

      register_failed
    end

    def register_success
      render json: { user: resource }
    end

    def register_failed
      render json: { error: resource.errors.full_messages.to_sentence }, status: :bad_request
    end

    def is_flashing_format? # rubocop:disable Naming/PredicateName
      false
    end
  end
end
