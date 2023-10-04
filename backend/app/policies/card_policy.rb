# frozen_string_literal: true

class CardPolicy < ApplicationPolicy
  def index?
    admin_has_access? || client_has_access?
  end

  def create?
    client_has_access?
  end

  def destroy?
    client_has_access?
  end

  def admin_has_access?
    user.is_a? User
  end

  def client_has_access?
    user.is_a? Client
  end
end
