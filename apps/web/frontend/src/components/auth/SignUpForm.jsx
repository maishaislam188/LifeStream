import { useState } from "react";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { BsChevronLeft } from "react-icons/bs";
import { Link } from "react-router";

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">

        {/* Back Button */}
        <Link
          to="/"
          className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-4"
        >
          <BsChevronLeft className="size-5" />
          Back to home
        </Link>

        {/* Heading */}
        <h1 className="text-2xl font-bold text-gray-800 mb-2 text-center">
          Create Account
        </h1>
        <p className="text-sm text-gray-500 text-center mb-6">
          Join and become a blood donor
        </p>

        {/* Social Buttons */}
        <div className="grid grid-cols-1 gap-3 mb-5">
          <button className="flex items-center justify-center gap-3 py-2 bg-gray-100 rounded-lg hover:bg-gray-200">
            Sign up with Google
          </button>
        </div>

        {/* Divider */}
        <div className="relative my-4">
          <div className="border-t"></div>
          <span className="absolute left-1/2 -translate-x-1/2 -top-3 bg-white px-2 text-sm text-gray-400">
            OR
          </span>
        </div>

        {/* Form */}
        <form className="space-y-4">
          {/* Name */}
          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="First Name"
              className="w-full px-3 py-2 border rounded-md"
            />
            <input
              type="text"
              placeholder="Last Name"
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>

          {/* Email */}
          <input
            type="email"
            placeholder="Email Address"
            className="w-full px-3 py-2 border rounded-md"
          />

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full px-3 py-2 border rounded-md"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
            >
              {showPassword ? <HiEye /> : <HiEyeOff />}
            </span>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              className="w-full px-3 py-2 border rounded-md"
            />
            <span
              onClick={() =>
                setShowConfirmPassword(!showConfirmPassword)
              }
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
            >
              {showConfirmPassword ? <HiEye /> : <HiEyeOff />}
            </span>
          </div>

          {/* Gender */}

          <div>
            <select
              className="w-full px-3 py-2 border rounded-md text-gray-500 focus:outline-none"
              defaultValue=""
            >
              <option value="" disabled>
                Select Gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="others">Others</option>
            </select>
          </div>

          {/* Blood Group */}
          <div>
            <select
              className="w-full px-3 py-2 border rounded-md text-gray-500 focus:outline-none"
              defaultValue=""
            >
              <option value="" disabled>
                Select Blood Group
              </option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </div>

          {/* Checkbox */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={() => setIsChecked(!isChecked)}
            />
            <p className="text-sm text-gray-500">
              I agree to Terms & Privacy
            </p>
          </div>

          {/* Submit */}
          <button className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition">
            Sign Up
          </button>
        </form>

        {/* Footer */}
        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <Link to="/signin" className="text-red-600 font-medium">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}