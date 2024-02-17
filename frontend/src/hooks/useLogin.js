import { useState } from "react"
import toast from "react-hot-toast";
import { useAuthContext } from '../context/AuthContext';

const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { setAuthUser } = useAuthContext()

  const login = async (username, password) => {
    const success = handleInputError({ username, password })
    if (!success) {
      return
    }

    setIsLoading(true)
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      })

      const data = await res.json()
      if (data.error) {
        throw new Error(data.error)
      }

      localStorage.setItem("whisperer", JSON.stringify(data))
      setAuthUser(data)
    } catch (err) {
      toast.error(err.message)
    } finally {
      setIsLoading(false)
    }
  }
  return { isLoading, login }
}

export default useLogin

const handleInputError = ({ username, password }) => {
  if (!username || !password) {
    toast.error("Please fill in all of the fields.")
    return false
  }

  return true
}