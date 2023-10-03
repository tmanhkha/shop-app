Rails.application.routes.draw do
  devise_for :clients, controllers: {
    sessions: 'clients/sessions',
  }

  devise_for :users,
             controllers: {
               sessions: 'users/sessions',
             }

  namespace :api do
    namespace :v1 do
      resources :brands
      resources :products
      resources :clients
    end
  end
end
