# frozen_string_literal: true

module Api
  module V1
    class ClientsController < Api::BaseController
      before_action :authenticate_user!
      before_action :find_client, only: %i[show update destroy]

      def index
        clients = Client.order(created_at: :desc).page(params[:page]).per(params[:per_page])

        render_collection clients, each_serializer: ClientSerializer
      end

      def show
        authorize @client, :show?

        render json: @client, serializer: ClientSerializer
      end

      def create
        client = Client.new(client_params)
        authorize client, :create?

        if client.save
          render json: client, serializer: ClientSerializer, status: :created
        else
          render json: { error: client.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def update
        authorize @client, :update?

        if @client.update(client_params)
          render json: @client, serializer: ClientSerializer, status: :ok
        else
          render json: { error: @client.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def destroy
        authorize @client, :create?

        @client.destroy
        render json: {}, status: :ok
      end

      private

      def client_params
        params.require(:client).permit(:email, :password, :payout_rate, product_ids: [])
      end

      def find_client
        @client = Client.find(params[:id])
      end
    end
  end
end
