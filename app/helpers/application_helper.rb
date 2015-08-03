require 'thread'
module ApplicationHelper
    class AdminMgrSingleton
        include Singleton
        def initialize
            @semaphore = Mutex.new
            @latest_access_date = Date.today
            @occupy_info = Hash.new
        end
        
        def occupyBook(user, book)
            if(user.admin && !book.occupied)
                @semaphore.synchronize {
                    if Date.today != @latest_access_date
                        @latest_access_date = Date.today
                        @occupy_info = Hash.new
                        @occupy_info[user.id] = 5
                    else
                        if !@occupy_info.has_key?(user.id)
                            @occupy_info[user.id] = 5
                        end
                    end
                    if @occupy_info[user.id] > 0
                        @occupy_info[user.id] -= 1
                        book.update({occupied:true})
                        return true
                    end
                }
            end
            return false
        end
    end
end
