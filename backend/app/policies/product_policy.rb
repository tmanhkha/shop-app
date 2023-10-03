# frozen_string_literal: true

class ProductPolicy < ApplicationPolicy
  def index?
    user_has_access?
  end

  def show?
    user_has_access?
  end

  def update?
    user_has_access?
  end

  def create?
    user_has_access?
  end

  def destroy?
    user_has_access?
  end

  def user_has_access?
    user.admin?
  end
end
