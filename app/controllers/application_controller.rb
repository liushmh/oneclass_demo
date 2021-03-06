class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  
  private
    def current_user
      uid = session[:current_user_id] != nil ? session[:current_user_id] : 1
      @_current_user = User.find_by(id: uid)
    end
    
    def list_user
      @users = User.all
    end
end
