import { useState } from 'react'
import toast from "react-hot-toast";
import { useAuthContext } from '../context/AuthContext';

const useSignup = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { setAuthUser } = useAuthContext()

  const signup = async ({ fullName, username, password, confirmPassword, gender }) => {
    const success = handleInputError({ fullName, username, password, confirmPassword, gender })
    if (!success) {
      return
    }
    
    setIsLoading(true)
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, username, password, confirmPassword, gender })
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
  return { isLoading, signup }
}

export default useSignup

const handleInputError = ({ fullName, username, password, confirmPassword, gender }) => {
  if (!fullName || !username || !password || !confirmPassword || !gender) {
    toast.error("Please fill in all of the fields.")
    return false
  }

  if (password !== confirmPassword) {
    toast.error("Passwords do not match.")
    return false
  }

  if (password.length < 6) {
    toast.error("Password must be at least 6 characters.")
    return false
  }

  return true
}