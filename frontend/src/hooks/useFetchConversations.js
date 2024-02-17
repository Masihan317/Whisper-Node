import { useEffect, useState } from "react"
import toast from "react-hot-toast";

const useFetchConversations = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [conversations, setConversations] = useState([])

  useEffect(() => {
    const getConversations = async () => {
      setIsLoading(true)
      try {
        const res = await fetch("/api/users")

        const data = await res.json()
        if (data.error) {
          throw new Error(data.error)
        }

        setConversations(data)
      } catch (err) {
        toast.error(err.message)
      } finally {
        setIsLoading(false)
      }
    }

    getConversations()
  }, [])

  return { isLoading, conversations }
}

export default useFetchConversations