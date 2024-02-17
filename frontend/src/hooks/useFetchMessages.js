import { useEffect, useState } from 'react'
import toast from "react-hot-toast";
import useConversation from "../zustand/useConversation"

const useFetchMessages = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { messages, setMessages, selectedConversation } = useConversation()

  useEffect(() => {
    const getMessages = async () => {
      setIsLoading(true)
      try {
        const res = await fetch(`/api/messages/${selectedConversation._id}`)

        const data = await res.json()
        if (data.error) {
          throw new Error(data.error)
        }

        setMessages(data)
      } catch (err) {
        toast.error(err.message)
      } finally {
        setIsLoading(false)
      }
    }

    if (selectedConversation?._id) {
      getMessages()
    }
  }, [selectedConversation?._id, setMessages])

  return { isLoading, messages }
}

export default useFetchMessages