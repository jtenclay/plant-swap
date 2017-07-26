class Swap < ActiveRecord::Base
  self.table_name = 'swaps'
  belongs_to :coswap, class_name: "Swap", foreign_key: "coswap_id"
  belongs_to :user
  has_many :comments, :dependent => :delete_all
  has_many :tags, :dependent => :delete_all
end