class SwapController < ApplicationController

  get '/' do
    swaps = Swap.all
    modifiedSwaps = []
    swaps.each do |swap|
      modifiedSwaps << {swap: swap, user: swap.user, tags: swap.tags}
    end
    token = params[:token]
    user = User.find_by(token: token)
    if user
      loggedInUser = user
    end
    {swaps: modifiedSwaps, loggedInUser: loggedInUser}.to_json
  end

  get '/:id' do
    id = params[:id]
    swap = Swap.find(id)
    itsUser = swap.user
    tags = swap.tags
    token = params[:token]
    user = User.find_by(token: token)
    comments = swap.comments
    modifiedComments = []
    comments.each do |comment|
      # weed out private responses unless it belongs to the accessing user
      if comment.private
        if (comment.user_id == user.id || itsUser.id == user.id)
          modifiedComments << {comment: comment, user: comment.user}
        end
      else
        modifiedComments << {comment: comment, user: comment.user}
      end
    end
    if user
      loggedInUser = user
    end
    {swap: swap, user: itsUser, tags: tags, comments: modifiedComments, loggedInUser: loggedInUser}.to_json
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
