class SwapController < ApplicationController

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
    tags = swap.tags
    comments = swap.comments
    modifiedComments = []
    comments.each do |comment|
      modifiedComments << {comment: comment, user: comment.user}
    end
    {swap: swap, user: user, tags: tags, comments: modifiedComments}.to_json
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
