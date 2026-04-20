import React from "react";
import { Link, useNavigate } from "react-router";
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user")); // ✅ get user

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/signin");
  };

  return (
    <header className="bg-red-600 text-white shadow-md sticky top-0 w-full z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <h1 className="text-2xl md:text-3xl font-bold tracking-wide">
          LifeStream
        </h1>

        {/* Nav Links */}
        <nav className="space-x-6 flex items-center">
          <Link to="/" className="hover:text-gray-200 transition">
            Home
          </Link>

          <Link to="/about" className="hover:text-gray-200 transition">
            About
          </Link>

          {/* ✅ SHOW ONLY IF LOGGED IN */}
          {token && (
            <>
              <Link to="/donors" className="hover:text-gray-200 transition">
                Donors
              </Link>

              <Link
                to="/request-blood"
                className="hover:text-gray-200 transition"
              >
                Request Blood
              </Link>

              <Link to="/requests" className="hover:text-gray-200 transition">
                Requests
              </Link>
            </>
          )}

          {/* ✅ RIGHT SIDE */}
          {!token ? (
            // ❌ NOT LOGGED IN
            <Link
              to="/signin"
              className="bg-white text-red-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition"
            >
              Login / Register
            </Link>
          ) : (
            // ✅ LOGGED IN
            <div className="flex items-center gap-4">
              {/* USER INFO (CLICKABLE) */}
              <Link
                to="/profile"
                className="flex items-center gap-2 hover:text-gray-200"
              >
                <FaUserCircle className="text-2xl" />
                <span className="font-medium">{user?.name || "User"}</span>
              </Link>

              {/* LOGOUT BUTTON */}
              <button
                onClick={handleLogout}
                className="bg-white text-red-600 px-3 py-1 rounded-md text-sm hover:bg-gray-100 transition"
              >
                Logout
              </button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
