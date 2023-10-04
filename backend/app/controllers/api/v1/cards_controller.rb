# frozen_string_literal: true

module Api
  module V1
    class CardsController < Api::BaseController
      before_action :find_product, only: %i[create]
      before_action :find_card, only: %i[destroy]

      def index # rubocop:disable Metrics/AbcSize
        cards = if current_client.present?
                  current_client.cards.active.page(params[:page]).per(params[:per_page])
                else
                  Card.active.page(params[:page]).per(params[:per_page])
                end

        authorize cards, :index?
        render_collection cards, each_serializer: CardSerializer
      end

      def create
        card = @product.cards.new(card_params)
        authorize card, :create?
        card.activation_number = SecureRandom.uuid
        card.purchase_details_pin = SecureRandom.random_number(10_000).to_s.rjust(4, '0')

        if card.save
          render json: card, serializer: CardSerializer, status: :created
        else
          render json: { error: 'Card issuance failed' }, status: :unprocessable_entity
        end
      end

      def destroy
        authorize @card, :destroy?
        @card.inactive!
        render json: {}, status: :ok
      end

      private

      def card_params
        params.require(:card).permit(:name, :client_id)
      end

      def find_card
        @card = Card.find(params[:id])
      end

      def find_product
        @product = Product.find(params[:product_id])
      end
    end
  end
end
