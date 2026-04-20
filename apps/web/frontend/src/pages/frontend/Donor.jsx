import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiMapPin, FiPhone } from "react-icons/fi";
import { useNavigate } from "react-router";
import heroImage from "../../assets/hero.jpeg";
import Footer from "../../components/frontend/Footer";
import Navbar from "../../components/frontend/Navbar";

export default function Donors() {
  const navigate = useNavigate();

  // Input states
  const [blood, setBlood] = useState("");
  const [location, setLocation] = useState("");

  // Applied filters
  const [filterBlood, setFilterBlood] = useState("");
  const [filterLocation, setFilterLocation] = useState("");

  // Donors from backend
  const [donorsData, setDonorsData] = useState([]);

  // Fetch donors
  useEffect(() => {
    const fetchDonors = async () => {
      try {
        const res = await axios.get("https://lifestream-3v6y.onrender.com/api/donors");
        setDonorsData(res.data);
      } catch (err) {
        console.error("Error fetching donors", err);
      }
    };

    fetchDonors();
  }, []);

  // Filter logic
  const filteredDonors = donorsData.filter((donor) => {
    const matchesBlood =
      filterBlood === "" || donor.bloodGroup === filterBlood;

    const matchesLocation =
      filterLocation === "" ||
      donor.location?.toLowerCase().includes(filterLocation.toLowerCase());

    return matchesBlood && matchesLocation;
  });

  return (
    <div className="font-sans text-gray-900 min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section
        className="relative flex items-center justify-center h-[50vh] text-center"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="bg-red-900 bg-opacity-60 p-10 rounded max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Find Blood Donors Near You
          </h2>
          <p className="text-white mb-6 text-lg">
            Search for donors or register yourself to help save lives.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12 flex gap-8">

        {/* Sidebar */}
        <div className="w-[280px] bg-white p-6 rounded-lg shadow-md sticky top-24 h-fit">
          <h2 className="text-xl font-bold mb-4 text-red-600">Search Donors</h2>

          <div className="flex flex-col gap-4">

            {/* Blood Group */}
            <div>
              <label className="block mb-1 font-semibold">Blood Group</label>
              <select
                className="w-full border border-red-300 rounded px-4 py-2"
                value={blood}
                onChange={(e) => setBlood(e.target.value)}
              >
                <option value="">All Groups</option>
                <option value="A+">A+</option>
                <option value="B+">B+</option>
                <option value="O+">O+</option>
                <option value="AB+">AB+</option>
                <option value="A-">A-</option>
                <option value="B-">B-</option>
                <option value="O-">O-</option>
                <option value="AB-">AB-</option>
              </select>
            </div>

            {/* Location */}
            <div>
              <label className="block mb-1 font-semibold">Location</label>
              <input
                type="text"
                placeholder="Enter location"
                className="w-full border border-red-300 rounded px-4 py-2"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            {/* Search Button */}
            <button
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition font-semibold"
              onClick={() => {
                setFilterBlood(blood);
                setFilterLocation(location);
              }}
            >
              Search
            </button>
          </div>
        </div>

        {/* Right Content */}
        <div className="flex-1 min-h-[500px]">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredDonors.length > 0 ? (
              filteredDonors.map((donor) => (
                <div
                  key={donor._id}
                  className="bg-gradient-to-br from-red-100 to-red-50 rounded-lg shadow-md p-6 hover:shadow-xl transform hover:scale-105 transition duration-300"
                >
                  <div className="flex justify-center mb-4">
                    <img
                      src={
                        donor.image ||
                        "https://img.freepik.com/premium-vector/male-profile-icon_1076610-16621.jpg"
                      }
                      alt={donor.name}
                      className="w-24 h-24 rounded-full border-4 border-red-600 object-cover"
                    />
                  </div>

                  <h3 className="text-xl font-bold mb-2 text-red-700 text-center">
                    {donor.name}
                  </h3>

                  <p className="text-center mb-3">
                    <span className="bg-red-600 text-white px-3 py-1 rounded-full font-semibold">
                      {donor.bloodGroup}
                    </span>
                  </p>

                  <p className="flex items-center justify-center text-gray-700">
                    <FiMapPin className="mr-2 text-red-500" />
                    {donor.location || "N/A"}
                  </p>

                  <p className="flex items-center justify-center text-gray-700 mb-4">
                    <FiPhone className="mr-2 text-red-500" />
                    {donor.phone || "N/A"}
                  </p>

                  <a
                    href={`tel:${donor.phone}`}
                    className="block text-center bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-red-700 transition"
                  >
                    Request
                  </a>
                </div>
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-20 bg-red-50 rounded-lg shadow-md min-h-[300px]">
                <h3 className="text-2xl font-bold text-red-600 mb-2">
                  No donors found
                </h3>
                <p className="text-gray-500 text-center max-w-xs">
                  Sorry, we couldn’t find any donors matching your filter.
                </p>
              </div>
            )}
          </div>

          {/* Be a Donor */}
          <div className="mt-12 bg-red-50 rounded-lg shadow-md py-10 flex flex-col items-center justify-center">
            <h2 className="text-2xl font-bold text-red-600 mb-3">
              Want to Save Lives?
            </h2>

            <p className="text-gray-600 mb-6 text-center max-w-md">
              Join our community of heroes. Register yourself as a blood donor
              and help people in need.
            </p>

            <button
              onClick={() => navigate("/profile")}
              className="bg-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition"
            >
              Be a Donor
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}