# frozen_string_literal: true

module Api
  class BaseController < ActionController::API
    include Pundit::Authorization

    respond_to :json

    rescue_from Pundit::NotAuthorizedError, with: :user_not_authorized
    rescue_from Pundit::NotDefinedError, with: :record_not_found
    rescue_from ActiveRecord::RecordNotFound do
      render json: { error: 'Record not found' }, status: :not_found
    end

    def authenticate_user!(_options = {})
      head :unauthorized unless signed_in?
    end

    def render_collection(collection, options = nil)
      options ||= {}
      options.reverse_merge!(
        json: collection,
        adapter: :json,
        root: :collection,
        meta_key: :pagination,
        meta: pagination(collection)
      )

      render options
    end

    def pagination(collection)
      {
        current_page: collection.respond_to?(:current_page) ? collection.current_page : 1,
        total_pages: collection.respond_to?(:total_pages) ? collection.total_pages : 1,
        total_entries: collection.respond_to?(:total_count) ? collection.total_count : collection.length,
        has_more: collection.respond_to?(:last_page?) && !collection.last_page?
      }
    end

    def user_not_authorized
      render json: { message: 'You are not authorized to perform this action.' }, status: :unauthorized
    end

    def record_not_found
      render json: { message: 'not found' }, status: :not_found
    end
  end
end
