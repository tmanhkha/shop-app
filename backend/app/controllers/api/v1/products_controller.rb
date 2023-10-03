# frozen_string_literal: true

module Api
  module V1
    class ProductsController < Api::BaseController
      before_action :authenticate_user!
      before_action :find_product, only: %i[show update destroy]

      def index
        products = Product.order(created_at: :desc).page(params[:page]).per(params[:per_page])

        render_collection products, each_serializer: ProductSerializer
      end

      def show
        authorize @product, :show?

        render json: @product, serializer: ProductSerializer
      end

      def create
        product = Product.new(product_params)
        authorize product, :create?

        if product.save
          render json: product, serializer: ProductSerializer, status: :created
        else
          render json: { error: product.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def update
        authorize @product, :update?

        if @product.update(product_params)
          render json: @product, serializer: ProductSerializer, status: :ok
        else
          render json: { error: @product.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def destroy
        authorize @product, :create?

        @product.destroy
        render json: {}, status: :ok
      end

      private

      def product_params
        params.require(:product).permit(:name, :description, :brand_id, :status,
                                        prices_attributes: %i[id price currency _destroy])
      end

      def find_product
        @product = Product.find(params[:id])
      end
    end
  end
end
