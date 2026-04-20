import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { BsChevronLeft } from "react-icons/bs";

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
    bloodGroup: "",
    location: "",   // ✅ added
    phone: "",      // ✅ added
    role: "patient",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!isChecked) {
      setError("Please accept terms & conditions");
      return;
    }

    if (formData.role === "donor" && !formData.bloodGroup) {
      setError("Donor must select blood group");
      return;
    }

    try {
      const payload = {
        name: formData.firstName + " " + formData.lastName,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        bloodGroup: formData.bloodGroup,
        gender: formData.gender,
        location: formData.location, // ✅ added
        phone: formData.phone,       // ✅ added
      };

      await axios.post("https://lifestream-3v6y.onrender.com/api/auth/register", payload);

      navigate("/signin");

    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">

        <Link
          to="/"
          className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-4"
        >
          <BsChevronLeft className="size-5" />
          Back to home
        </Link>

        <h1 className="text-2xl font-bold text-center mb-2">
          Create Account
        </h1>
        <p className="text-sm text-gray-500 text-center mb-4">
          Join and become a blood donor
        </p>

        {error && (
          <p className="text-red-500 text-sm text-center mb-3">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Role */}
          <div className="flex gap-4">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="radio"
                name="role"
                value="patient"
                checked={formData.role === "patient"}
                onChange={handleChange}
              />
              Patient
            </label>

            <label className="flex items-center gap-2 text-sm">
              <input
                type="radio"
                name="role"
                value="donor"
                checked={formData.role === "donor"}
                onChange={handleChange}
              />
              Donor
            </label>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              name="firstName"
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

          <input
            type="text"
            name="location"
            placeholder="Location"
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
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
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
            >
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
            <span
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
            >
              {showConfirmPassword ? <HiEye /> : <HiEyeOff />}
            </span>
          </div>

          <select
            name="gender"
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
            required
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="others">Others</option>
          </select>

          <select
            name="bloodGroup"
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
            required={formData.role === "donor"}
          >
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

          <button
            type="submit"
            className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition"
          >
            Sign Up
          </button>
        </form>

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