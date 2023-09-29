import { Link, useHistory } from "react-router-dom";
import toast from "react-hot-toast";
import AppConfig from "@/constants/AppConfig.js";
import Button from "@/components/common/Button/index.jsx";
import { logout } from "@/services/auth.js";
import { getUserFromLocalStorage } from "@/utils/authUtils.js";
function Header() {
  const history = useHistory();
  const currentUser = getUserFromLocalStorage();

  const handleLogout = async () => {
    const response = await logout();

    if (response) {
      toast.success("Logout Successfully");
      history.push({
        pathname: AppConfig.ROUTES.LOGIN,
      });
    } else {
      toast.error(response.error);
    }
  };

  return (
    <nav className="flex items-center justify-between flex-wrap bg-gray-100 p-6">
      <div className="flex items-center flex-shrink-0 text-black mr-6">
        <Link to="/" className="font-semibold text-xl tracking-tight">
          Shop
        </Link>
      </div>
      {currentUser ? (
        <>
          <div className="flex lg:flex lg:items-center lg:w-auto gap-2">
            <div>
              <Link
                to="sign_up"
                className="inline-block text-sm px-4 py-2 leading-none border rounded text-blue-400 border-blue-400 hover:text-blue-500 mt-4 lg:mt-0"
              >
                Request new card
              </Link>
            </div>
            <div>
              <Button label="Logout" onClick={handleLogout} />
            </div>
          </div>
        </>
      ) : (
        <div className="flex lg:flex lg:items-center lg:w-auto gap-2">
          <div>
            <Link
              to="sign_up"
              className="inline-block text-sm px-4 py-2 leading-none border rounded text-blue-400 border-blue-400 hover:text-blue-500 mt-4 lg:mt-0"
            >
              Sign Up
            </Link>
          </div>
          <div>
            <Link
              to="sign_in"
              className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent bg-blue-400 hover:bg-blue-500 mt-4 lg:mt-0"
            >
              Sign In
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Header;
