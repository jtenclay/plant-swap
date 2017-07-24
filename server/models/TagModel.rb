class Tag < ActiveRecord::Base
  self.table_name = 'tags'
  belongs_to :swap
end