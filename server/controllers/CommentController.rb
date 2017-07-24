class CommentController < ApplicationController

  post '/' do
    request_body = JSON.parse(request.body.read)
    comment = Comment.new(request_body)
    comment.save
    swap_id = comment.swap_id
    swap = Swap.find(swap_id)
    comments = swap.comments
    modifiedComments = []
    comments.each do |comment|
      modifiedComments << {comment: comment, user: comment.user}
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
