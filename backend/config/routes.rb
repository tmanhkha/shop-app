Rails.application.routes.draw do
  devise_for :clients, controllers: {
    sessions: 'clients/sessions'
  }

  devise_for :users,
             controllers: {
               sessions: 'users/sessions'
             }

  namespace :api do
    namespace :v1 do
      resources :brands
      resources :products do
        resources :cards, only: %i[create destroy]
      end
      resources :clients
      resources :cards, only: :index
      resources :reports, only: :index
    end
  end
end
