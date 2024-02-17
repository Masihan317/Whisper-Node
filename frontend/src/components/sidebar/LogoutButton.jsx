import { BiLogOut } from "react-icons/bi";
import useLogout from "../../hooks/useLogout";

const LogoutButton = () => {
  const { isLoading, logout } = useLogout()

  return (
    <div className="mt-auto">
      {!isLoading ? (
        <BiLogOut className="w-6 h-6 text-white cursor-pointer" onClick={logout}/>
      ) : (
        <span className="loading loading-spinner"/>
      )}
    </div>
  )
}

export default LogoutButton