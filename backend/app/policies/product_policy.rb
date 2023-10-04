# frozen_string_literal: true

class ProductPolicy < ApplicationPolicy
  def index?
    true
  end

  def show?
    true
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
    user.is_a? User
  end
end
