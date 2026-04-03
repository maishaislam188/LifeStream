import React from "react";
import { Link } from "react-router";

const Navbar = () => {
  return (
    <header className="bg-red-600 text-white shadow-md sticky top-0 w-full z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4">

        {/* Logo */}
        <img
          src="/logo.png"
          alt="BloodDonate Logo"
          className="h-20 w-auto object-contain"
        />

        {/* Nav Links */}
        <nav className="space-x-6 flex items-center">
          <Link to="/" className="hover:text-gray-200 transition">
            Home
          </Link>
          <Link to="/about" className="hover:text-gray-200 transition">
            About
          </Link>
          <Link to="/donors" className="hover:text-gray-200 transition">
            Donors
          </Link>

          {/* Button */}
          <Link
            to="/signin"
            className="bg-white text-red-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition"
          >
            Login / Register
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;