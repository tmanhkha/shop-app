# frozen_string_literal: true

module Api
  module V1
    class BrandsController < Api::BaseController
      before_action :authenticate_user!
      before_action :find_brand, only: %i[show update destroy]

      def index
        brands = Brand.order(created_at: :desc).page(params[:page]).per(params[:per_page])

        render_collection brands, each_serializer: BrandSerializer
      end

      def show
        authorize @brand, :show?

        render json: @brand, serializer: BrandSerializer
      end

      def create
        brand = Brand.new(brand_params)
        authorize brand, :create?

        if brand.save
          render json: brand, serializer: BrandSerializer, status: :created
        else
          render json: { error: brand.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def update
        authorize @brand, :update?

        if @brand.update(brand_params)
          render json: @brand, serializer: BrandSerializer, status: :ok
        else
          render json: { error: @brand.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def destroy
        authorize @brand, :create?

        @brand.destroy
        render json: {}, status: :ok
      end

      private

      def brand_params
        params.require(:brand).permit(:name, :description, :country, :status)
      end

      def find_brand
        @brand = Brand.find(params[:id])
      end
    end
  end
end
