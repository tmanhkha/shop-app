import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="relative bg-sidebar h-screen w-64 hidden sm:block shadow-xl">
      <div className="p-6">
        <Link
          to="/"
          className="text-white text-3xl font-semibold uppercase hover:text-gray-300"
        >
          Admin
        </Link>
        <button className="w-full bg-white cta-btn font-semibold py-2 mt-5 rounded-br-lg rounded-bl-lg rounded-tr-lg shadow-lg hover:shadow-xl hover:bg-gray-300 flex items-center justify-center">
          <FontAwesomeIcon icon="fas fa-plus" className="mr-3" />
          New Report
        </button>
      </div>
      <nav className="text-white text-base font-semibold pt-3">
        <Link
          to="/dashboard"
          className="flex items-center active-nav-link text-white py-4 pl-6 nav-item"
        >
          <FontAwesomeIcon icon="fas fa-tachometer-alt" className="mr-3" />
          Dashboard
        </Link>
        <Link
          to="/brand"
          className="flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item"
        >
          <FontAwesomeIcon icon="fa fa-store" className="mr-3" />
          Brand
        </Link>
        <a
          href="forms.html"
          className="flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item"
        >
          <FontAwesomeIcon icon="fas fa-align-left" className="mr-3" />
          Forms
        </a>
      </nav>
    </aside>
  );
}

export default Sidebar;
