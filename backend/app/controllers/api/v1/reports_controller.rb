# frozen_string_literal: true

module Api
  module V1
    class ReportsController < Api::BaseController
      before_action :authenticate_user!

      def index
        result = []
        date_range = (0..7).map { |days_ago| days_ago.days.ago.all_day }.reverse
        date_range.each do |day_range|
          total_cards_created = Card.where(created_at: day_range).count
          total_inactive_cards = Card.inactive.where(created_at: day_range).count
          result << { date: day_range.first.to_date, total_cards_created:, total_inactive_cards: }
        end
        render json: result
      end
    end
  end
end
