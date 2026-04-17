import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { IoChevronBack } from "react-icons/io5";
import axios from "axios";

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
     const res = await axios.post('http://localhost:5000/signin', formData);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      
      // SignInForm.jsx এর ভেতর পরিবর্তন করুন
if (res.data.success) {
  localStorage.setItem('user', JSON.stringify(res.data.user));
  navigate('/donors'); // এখন সরাসরি ডোনার পেজে যাবে
}
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">

        <Link to="/" className="inline-flex items-center text-sm text-gray-500 hover:text-red-600 mb-4">
          <IoChevronBack className="mr-1" />
          Back to home
        </Link>

        <h1 className="text-2xl font-bold text-gray-800 mb-2">Welcome Back</h1>
        <p className="text-sm text-gray-500 mb-6">Sign in to continue to LifeStream</p>

        {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
            <input
              type="email"
              name="email"
              placeholder="info@gmail.com"
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password *</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
                required
              />
              <span onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer">
                {showPassword ? <FaEye className="text-gray-500" /> : <FaEyeSlash className="text-gray-500" />}
              </span>
            </div>
          </div>

          <button type="submit" className="w-full py-3 text-white font-semibold rounded-lg bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 transition shadow-md">
            Sign In
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-6">
          Don't have an account?{" "}
          <Link to="/signup" className="text-red-600 font-medium hover:text-red-700">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}