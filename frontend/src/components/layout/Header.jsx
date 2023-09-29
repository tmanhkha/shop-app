import { Link, useHistory } from "react-router-dom";
import toast from "react-hot-toast";
import AppConfig from "@/constants/AppConfig.js";
import Button from "@/components/common/Button/index.jsx";
import { logout } from "@/services/auth.js";
import { getUserFromLocalStorage } from "@/utils/authUtils.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import Login from "@/containers/SignIn/index.jsx";
function Header() {
  const history = useHistory();
  const currentUser = getUserFromLocalStorage();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async (e) => {
    e.preventDefault();
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
    <>
      <header className="w-full items-center bg-white py-2 px-6 hidden sm:flex">
        <div className="w-1/2"></div>
        <div className="relative w-1/2 flex justify-end">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="realtive z-10 w-12 h-12 rounded-full overflow-hidden border-4 border-gray-400 hover:border-gray-300 focus:border-gray-300 focus:outline-none"
          >
            <img src="https://source.unsplash.com/uJ8LNVCBjFQ/400x400" />
          </button>
          {isOpen && (
            <button
              onClick={() => setIsOpen(false)}
              className="h-full w-full fixed inset-0 cursor-default"
            ></button>
          )}
          {isOpen && (
            <div className="absolute w-32 bg-white rounded-lg shadow-lg py-2 mt-16">
              <a
                href="#"
                className="block px-4 py-2 account-link hover:text-white"
              >
                Account
              </a>
              <a
                href="#"
                className="block px-4 py-2 account-link hover:text-white"
              >
                Support
              </a>
              <a
                href="#"
                className="block px-4 py-2 account-link hover:text-white"
                onClick={handleLogout}
              >
                Sign Out
              </a>
            </div>
          )}
        </div>
      </header>

      <header className="w-full bg-sidebar py-5 px-6 sm:hidden">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="text-white text-3xl font-semibold uppercase hover:text-gray-300"
          >
            Admin
          </Link>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white text-3xl focus:outline-none"
          >
            {!isOpen && <FontAwesomeIcon icon="fas fa-bars" />}
            {isOpen && <FontAwesomeIcon icon="fas fa-times" />}
          </button>
        </div>

        <nav className={isOpen ? "flex flex-col pt-4" : "hidden flex-col pt-4"}>
          <Link
            to="/dashboard"
            className="flex items-center active-nav-link text-white py-2 pl-4 nav-item"
          >
            <FontAwesomeIcon icon="fas fa-tachometer-alt" className="mr-3" />
            Dashboard
          </Link>
          <Link
            to="/brand"
            className="flex items-center text-white opacity-75 hover:opacity-100 py-2 pl-4 nav-item"
          >
            <FontAwesomeIcon icon="fa fa-store" className="mr-3" />
            Brand
          </Link>
          <a
            href="forms.html"
            className="flex items-center text-white opacity-75 hover:opacity-100 py-2 pl-4 nav-item"
          >
            <FontAwesomeIcon icon="fas fa-align-left" className="mr-3" />
            Forms
          </a>
          <a
            href="#"
            className="flex items-center text-white opacity-75 hover:opacity-100 py-2 pl-4 nav-item"
          >
            <FontAwesomeIcon icon="fas fa-user" className="mr-3" />
            My Account
          </a>
          <a
            href="#"
            className="flex items-center text-white opacity-75 hover:opacity-100 py-2 pl-4 nav-item"
            onClick={handleLogout}
          >
            <FontAwesomeIcon icon="fas fa-sign-out-alt" className="mr-3" />
            Sign Out
          </a>
        </nav>
      </header>
    </>
  );
}

export default Header;
