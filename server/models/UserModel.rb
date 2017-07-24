class User < ActiveRecord::Base
  self.table_name = 'users'
  has_many :swaps
  has_many :comments
  has_secure_password
end