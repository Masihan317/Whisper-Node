import SignupGenderBox from "./SignupGenderBox"
import { Link } from 'react-router-dom'
import { useState } from 'react';
import useSignup from "../../hooks/useSignup";

const Signup = () => {
  const [input, setInput] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: ""
  })

  const { isLoading, signup } = useSignup()

  const handleGenderBox = (gender) => {
    setInput({...input, gender})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await signup(input)
  }

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg blackdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          Sign Up
          <span className="text-blue-500"> Whisper Node</span>
        </h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="label">
              <span className="text-base label-text">Full Name</span>
            </label>
            <input type="text" placeholder="name" className="w-full input input-bordered h-10"
              value={input.fullName}
              onChange={(e) => setInput({...input, fullName: e.target.value})}
            />
          </div>
          <div>
            <label className="label">
              <span className="text-base label-text">Username</span>
            </label>
            <input type="text" placeholder="username" className="w-full input input-bordered h-10"
              value={input.username}
              onChange={(e) => setInput({...input, username: e.target.value})}
            />
          </div>
          <div>
            <label className="label">
              <span className="text-base label-text">Password</span>
            </label>
            <input type="password" placeholder="password" className="w-full input input-bordered h-10"
              value={input.password}
              onChange={(e) => setInput({...input, password: e.target.value})}
            />
          </div>
          <div>
            <label className="label">
              <span className="text-base label-text">Confirm Password</span>
            </label>
            <input type="password" placeholder="confirm password" className="w-full input input-bordered h-10"
              value={input.confirmPassword}
              onChange={(e) => setInput({...input, confirmPassword: e.target.value})}
            />
          </div>
          <SignupGenderBox onBoxChange={handleGenderBox} selectedGender={input.gender} />
          <Link to={"/login"} className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block">
            Already have an account?
          </Link>
          <div>
            <button className="btn btn-block btn-sm mt-2" disabled={isLoading}>
              {isLoading ? <span className="loading loading-spinner"/> : "Sign Up"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signup