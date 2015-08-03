class CreateBooks < ActiveRecord::Migration
  def change
    create_table :books do |t|
      t.string :isbn
      t.string :name
      t.boolean :occupied

      t.timestamps null: false
    end
  end
end
