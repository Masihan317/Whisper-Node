import { useEffect } from "react"
import useFetchMessages from "../../hooks/useFetchMessages"
import MessageSkeleton from "../skeletons/MessageSkeleton"
import Message from "./Message"

const Messages = () => {
  const { isLoading, messages } = useFetchMessages()

  useEffect(() => {
     
  }, [])

  return (
    <div className="px-4 flex-1 overflow-auto">
      {isLoading && [1, 2, 3].map((_, index) => <MessageSkeleton key={index} />)}
      {!isLoading && messages.length === 0 && (
        <p className="text-center">Send a message to start the conversation.</p>
      )}
      {!isLoading && messages.length > 0 && messages.map((message) => <Message key={message._id} message={message} />)}
    </div>
  )
}

export default Messages