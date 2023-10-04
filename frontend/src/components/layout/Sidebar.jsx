import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { getUserFromLocalStorage } from "@/utils/authUtils.js";

function Sidebar() {
  const location = useLocation();
  const currentUser = getUserFromLocalStorage();
  return (
    <>
      {currentUser.role === "admin" ? (
        <>
          <aside className="relative bg-sidebar h-screen w-64 hidden sm:block shadow-xl">
            <div className="p-6">
              <Link
                to="/"
                className="text-white text-3xl font-semibold uppercase hover:text-gray-300"
              >
                Admin
              </Link>
            </div>
            <nav className="text-white text-base font-semibold pt-3">
              <Link
                to="/dashboard"
                className={`flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item ${
                  location.pathname.includes("dashboard")
                    ? "active-nav-link"
                    : ""
                }`}
              >
                <FontAwesomeIcon
                  icon="fas fa-tachometer-alt"
                  className="mr-3"
                />
                Dashboard
              </Link>
              <Link
                to="/brand"
                className={`flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item ${
                  location.pathname.includes("brand") ? "active-nav-link" : ""
                }`}
              >
                <FontAwesomeIcon icon="fa fa-store" className="mr-3" />
                Brand
              </Link>
              <Link
                to="/product"
                className={`flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item ${
                  location.pathname.includes("product") ? "active-nav-link" : ""
                }`}
              >
                <FontAwesomeIcon icon="fa fa-box-open" className="mr-3" />
                Product
              </Link>
              <Link
                to="/client"
                className={`flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item ${
                  location.pathname.includes("client") ? "active-nav-link" : ""
                }`}
              >
                <FontAwesomeIcon icon="fa fa-users" className="mr-3" />
                Client
              </Link>
              <Link
                to="/card"
                className={`flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item ${
                  location.pathname.includes("card") ? "active-nav-link" : ""
                }`}
              >
                <FontAwesomeIcon icon="fa fa-credit-card" className="mr-3" />
                Card
              </Link>
            </nav>
          </aside>
        </>
      ) : (
        <>
          <aside className="relative bg-sidebar h-screen w-64 hidden sm:block shadow-xl">
            <div className="p-6">
              <Link
                to="/"
                className="text-white text-3xl font-semibold uppercase hover:text-gray-300"
              >
                Client
              </Link>
            </div>
            <nav className="text-white text-base font-semibold pt-3">
              <Link
                to="/product"
                className={`flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item ${
                  location.pathname.includes("product") ? "active-nav-link" : ""
                }`}
              >
                <FontAwesomeIcon icon="fa fa-box-open" className="mr-3" />
                Product
              </Link>
              <Link
                to="/card"
                className={`flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item ${
                  location.pathname.includes("card") ? "active-nav-link" : ""
                }`}
              >
                <FontAwesomeIcon icon="fa fa-credit-card" className="mr-3" />
                Card
              </Link>
            </nav>
          </aside>
        </>
      )}
    </>
  );
}

export default Sidebar;
