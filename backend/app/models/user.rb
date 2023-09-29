# frozen_string_literal: true

class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :validatable,
         :jwt_authenticatable, jwt_revocation_strategy: JwtDenylist

  enum role: { admin: 0, client: 1 }

  after_initialize :set_default_role, if: :new_record?

  private

  def set_default_role
    self.role ||= :client
  end
end
