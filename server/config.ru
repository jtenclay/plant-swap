require 'bundler'
Bundler.require

require './models/UserModel'
require './models/TagModel'
require './models/CommentModel'
require './models/SwapModel'

require './controllers/ApplicationController'
require './controllers/UserController'
require './controllers/TagController'
require './controllers/CommentController'
require './controllers/SwapController'

run Sinatra::Application

ActiveRecord::Base.establish_connection(
  adapter: 'postgresql',
  database: 'plant_swap'
)

map('/users'){run UserController}
map('/tags'){run TagController}
map('/comments'){run CommentController}
map('/swaps'){run SwapController}