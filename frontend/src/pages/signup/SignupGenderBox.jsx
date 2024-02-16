const SignupGenderBox = () => {
  return (
    <div className="flex space-x-10 justify-between">
      <div className="form-control">
        <label className="label gap-2 cursor-pointer">
          <span className="label-text">Male</span>
          <input type="checkbox" className="checkbox border-slate-900"></input>
        </label>
      </div>
      <div className="form-control">
        <label className="label gap-2 cursor-pointer">
          <span className="label-text">Female</span>
          <input type="checkbox" className="checkbox border-slate-900"></input>
        </label>
      </div>
    </div>
  )
}

export default SignupGenderBox