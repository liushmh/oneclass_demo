json.array!(@books) do |book|
  json.extract! book, :id, :isbn, :name, :occupied
  json.url book_url(book, format: :json)
end
