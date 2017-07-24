require 'SecureRandom'

class UserController < ApplicationController

  get '/' do
    users = User.all
    users.to_json
  end

  post '/register' do
    response['Access-Control-Allow-Origin'] = '*'
    content_type :json
    request_body = JSON.parse(request.body.read)
    user = User.new(request_body)
    user.token = SecureRandom.hex
    user.save
    user.to_json
  end

  post '/login' do
    response['Access-Control-Allow-Origin'] = '*'
    content_type :json
    request_body = JSON.parse(request.body.read)
    user = User.find_by({username: request_body["username"]})
    if user && user.authenticate(request_body["password"])
      user.to_json
    else
      {error: "Failed!!"}.to_json
    end
  end
end
