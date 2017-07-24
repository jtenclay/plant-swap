class SwapController < ApplicationController

  get '/' do
    swaps = Swap.all
    swaps.to_json
  end

  get '/:id' do
    id = params[:id]
    swap = Swap.find(id)
    swap.to_json
  end

  post '/' do
    request_body = JSON.parse(request.body.read)
    swap = Swap.new(request_body)
    swap.save
    Swap.all.to_json
  end

  patch '/:id' do
    id = params[:id]
    swap = Swap.find(id)
    request_body = JSON.parse(request.body.read)
    swap.update_attributes(request_body)
    swap.save
    Swap.all.to_json
  end

  delete '/:id' do
    id = params[:id]
    swap = Swap.find(id)
    swap.destroy
    Swap.all.to_json
  end
end
