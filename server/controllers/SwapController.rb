class SwapController < ApplicationController

  # get '/' do
  #   # join all swaps with the user they belong to
  #   # also rename swaps.id to swap_id so that it doesn't get overwritten by users.id
  #   swaps = Swap.find_by_sql "SELECT sw.id AS swap_id, sw.*, users.* FROM swaps AS sw JOIN users ON sw.user_id = users.id"
  #   # overwrite the tokens
  #   swaps.each do |swap|
  #     swap[:token] = 0
  #   end
  #   swaps.to_json
  # end

  get '/' do
    swaps = Swap.all
    modifiedSwaps = []
    swaps.each do |swap|
      modifiedSwaps << {swap: swap, user: swap.user, tags: swap.tags}
    end
    modifiedSwaps.to_json
  end

  get '/:id' do
    id = params[:id]
    swap = Swap.find(id)
    user = swap.user
    {swap: swap, user: user}.to_json
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
