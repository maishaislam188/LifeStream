import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import Navbar from "../../components/frontend/Navbar";

export default function RequestBlood() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    patientName: "",
    bloodGroup: "",
    location: "",
    phone: "",
    message: "",
    isUrgent: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:5000/api/requests",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Request posted successfully!");
      navigate("/requests");

    } catch (error) {
      console.error(error);
      alert("Failed to post request");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      
      {/* ✅ Navbar fixed at top */}
      <Navbar />

      {/* ✅ Centered Content */}
      <div className="flex flex-1 items-center justify-center px-4 py-10">

        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md space-y-5"
        >
          <h2 className="text-2xl font-bold text-center text-red-600">
            🩸 Post Blood Request
          </h2>

          {/* Patient Name */}
          <input
            type="text"
            name="patientName"
            placeholder="Patient Name"
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            required
          />

          {/* Blood Group */}
          <select
            name="bloodGroup"
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            required
          >
            <option value="">Select Blood Group</option>
            <option>A+</option>
            <option>B+</option>
            <option>O+</option>
            <option>AB+</option>
            <option>A-</option>
            <option>B-</option>
            <option>O-</option>
            <option>AB-</option>
          </select>

          {/* Location */}
          <input
            type="text"
            name="location"
            placeholder="Location"
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            required
          />

          {/* Phone */}
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            required
          />

          {/* Message */}
          <textarea
            name="message"
            placeholder="Message (optional)"
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            rows="3"
          />

          {/* Urgent */}
          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input
              type="checkbox"
              name="isUrgent"
              onChange={handleChange}
            />
            Mark as Urgent 🚨
          </label>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-red-600 text-white py-2 rounded-md font-semibold hover:bg-red-700 transition"
          >
            Submit Request
          </button>
        </form>

      </div>
    </div>
  );
}