import { useState } from "react";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { BsChevronLeft } from "react-icons/bs";
import { Link, useNavigate } from "react-router"; // রুট পরিবর্তন করার জন্য
import axios from "axios";

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();

  // ১. সব ইনপুট ডাটা রাখার জন্য State
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
    bloodGroup: "",
  });

  const [error, setError] = useState("");

  // ২. ইনপুট হ্যান্ডেলার ফাংশন
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ৩. ব্যাকএন্ডে ডাটা পাঠানোর ফাংশন
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // পাসওয়ার্ড ম্যাচিং চেক
    if (formData.password !== formData.confirmPassword) {
      return setError("Passwords do not match!");
    }

    // টার্মস অ্যান্ড কন্ডিশন চেক
    if (!isChecked) {
      return setError("Please agree to our Terms & Privacy.");
    }

    try {
      // আপনার ব্যাকএন্ডের সাইন-আপ রুটে ডাটা পাঠানো হচ্ছে
      const res = await axios.post("http://localhost:5000/signup", formData);
      
      if (res.data.success) {
        alert("Registration Successful!");
        navigate("/signin"); // সফল হলে লগইন পেজে নিয়ে যাবে
      }
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">

        <Link to="/" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-4">
          <BsChevronLeft className="size-5" /> Back to home
        </Link>

        <h1 className="text-2xl font-bold text-gray-800 mb-2 text-center">Create Account</h1>
        <p className="text-sm text-gray-500 text-center mb-6">Join and become a blood donor</p>

        {/* এরর মেসেজ দেখানোর জন্য */}
        {error && <p className="text-red-500 text-sm text-center mb-4 bg-red-50 p-2 rounded">{error}</p>}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              name="firstName" // name অবশ্যই আপনার backend ফিল্ডের সাথে মিলতে হবে
              placeholder="First Name"
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
            required
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
            <span onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer">
              {showPassword ? <HiEye /> : <HiEyeOff />}
            </span>
          </div>

          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
            <span onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer">
              {showConfirmPassword ? <HiEye /> : <HiEyeOff />}
            </span>
          </div>

          <select name="gender" onChange={handleChange} className="w-full px-3 py-2 border rounded-md text-gray-500" required>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="others">Others</option>
          </select>

          <select name="bloodGroup" onChange={handleChange} className="w-full px-3 py-2 border rounded-md text-gray-500" required>
            <option value="">Select Blood Group</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
          {/* Location Input */}
<div>
  <input
    type="text"
    name="location"
    placeholder="Enter your location (e.g. Sylhet)"
    className="w-full border border-gray-300 rounded px-4 py-2"
    value={formData.location}
    onChange={handleChange}
    required
  />
</div>

{/* Role Selection (Optional) */}
<div>
  <select
    name="role"
    className="w-full border border-gray-300 rounded px-4 py-2"
    value={formData.role}
    onChange={handleChange}
  >
    <option value="donor">Join as Donor</option>
    <option value="recipient">Join as Recipient</option>
  </select>
</div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={() => setIsChecked(!isChecked)}
            />
            <p className="text-sm text-gray-500">I agree to Terms & Privacy</p>
          </div>

          <button type="submit" className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition">
            Sign Up
          </button>
        </form>

        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <Link to="/signin" className="text-red-600 font-medium">Sign In</Link>
        </p>
      </div>
    </div>
  );
}