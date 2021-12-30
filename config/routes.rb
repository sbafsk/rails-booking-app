# frozen_string_literal: true

Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get 'bookings/index'    
      post 'bookings/create'
      delete 'bookings/:id', to: 'bookings#destroy'
    end
  end


  root 'react#index'
  get '/listado', to: 'react#index'

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
