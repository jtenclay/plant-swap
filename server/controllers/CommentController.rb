class CommentController < ApplicationController

  post '/' do
    request_body = JSON.parse(request.body.read)
    comment = Comment.new(request_body)
    comment.save
    token = params[:token]
    user = User.find_by(token: token)
    swap_id = comment.swap_id
    swap = Swap.find(swap_id)
    comments = swap.comments.order('created_at ASC')
    modifiedComments = []
    comments.each do |comment|
      # weed out private responses unless it belongs to the accessing user
      if comment.private
        if (comment.user_id == user.id || swap.user_id == user.id)
          modifiedComments << {comment: comment, user: comment.user}
        end
      else
        modifiedComments << {comment: comment, user: comment.user}
      end
    end
    modifiedComments.to_json
  end

  patch '/:id' do
    id = params[:id]
    comment = Comment.find(id)
    request_body = JSON.parse(request.body.read)
    comment.update_attributes(request_body)
    comment.save
    Comment.all.to_json
  end

  delete '/:id' do
    id = params[:id]
    comment = Comment.find(id)
    comment.destroy
    Comment.all.to_json
  end
end
