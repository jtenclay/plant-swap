class TagController < ApplicationController

  post '/' do
    request_body = JSON.parse(request.body.read)
    tag = Tag.new(request_body)
    tag.save
    Tag.all.to_json
  end

  patch '/:id' do
    id = params[:id]
    tag = Tag.find(id)
    request_body = JSON.parse(request.body.read)
    tag.update_attributes(request_body)
    tag.save
    Tag.all.to_json
  end

  delete '/:id' do
    id = params[:id]
    tag = Tag.find(id)
    tag.destroy
    Tag.all.to_json
  end
end
