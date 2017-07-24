class Swap < ActiveRecord::Base
  self.table_name = 'swaps'
  belongs_to :coswap, class_name: "Swap", foreign_key: "coswap_id"
  belongs_to :user
  has_many :comments
  has_many :tags
end