import { useState } from "react";
import { Link } from "react-router";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { IoChevronBack } from "react-icons/io5";

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">

      {/* Card */}
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">

        {/* Back */}
        <Link
          to="/"
          className="inline-flex items-center text-sm text-gray-500 hover:text-red-600 mb-4"
        >
          <IoChevronBack className="mr-1" />
          Back to home
        </Link>

        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Welcome Back
        </h1>
        <p className="text-sm text-gray-500 mb-6">
          Sign in to continue to LifeStream
        </p>

        {/* Social Buttons */}
        <div className="grid grid-cols-1 gap-3 mb-5">
          <button className="flex items-center justify-center gap-3 py-2 bg-gray-100 rounded-lg hover:bg-gray-200">
            Sign in with Google
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center mb-5">
          <div className="flex-grow border-t"></div>
          <span className="mx-3 text-gray-400 text-sm">Or</span>
          <div className="flex-grow border-t"></div>
        </div>

        {/* Form */}
        <form className="space-y-5">

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email *
            </label>
            <input
              type="email"
              placeholder="info@gmail.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password *
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
              >
                {showPassword ? (
                  <FaEye className="text-gray-500" />
                ) : (
                  <FaEyeSlash className="text-gray-500" />
                )}
              </span>
            </div>
          </div>

          {/* Remember + Forgot */}
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm text-gray-600">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => setIsChecked(!isChecked)}
                className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
              />
              Keep me logged in
            </label>

            <Link
              to="/reset-password"
              className="text-sm text-red-600 hover:text-red-700"
            >
              Forgot password?
            </Link>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 text-white font-semibold rounded-lg bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 transition shadow-md"
          >
            Sign In
          </button>
        </form>

        {/* Footer */}
        <p className="text-sm text-center text-gray-600 mt-6">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-red-600 font-medium hover:text-red-700"
          >
            Sign Up
          </Link>
        </p>

      </div>
    </div>
  );
}