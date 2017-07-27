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
    # save swap
    request_body = JSON.parse(request.body.read)
    p request_body['swap']
    swap = Swap.new(request_body['swap'])
    swap.save
    # save tags
    tags = request_body['tags']
    tags.each do |tag|
      # don't save empty tags
      unless tag["name"] == ''
        new_tag = Tag.new(tag)
        new_tag.swap_id = swap.id
        new_tag.save
      end
    end
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

  patch '/:id' do
    id = params[:id]
    swap = Swap.find(id)
    request_body = JSON.parse(request.body.read)
    swap.update_attributes(request_body['swap'])
    swap.save
    # update tags
    swap.tags.each do |tag|
      tag.destroy
    end
    tags = request_body['tags']
    tags.each do |tag|
      new_tag = Tag.new(tag)
      new_tag.swap_id = swap.id
      new_tag.save
    end
    {swap: swap, tags: swap.tags}.to_json
  end

  patch '/:id/open_or_close' do
    id = params[:id]
    swap = Swap.find(id)
    request_body = JSON.parse(request.body.read)
    swap.update_attributes(request_body)
    swap.save
    swap.to_json
  end

  delete '/:id' do
    id = params[:id]
    swap = Swap.find(id)
    swap.destroy
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
end
