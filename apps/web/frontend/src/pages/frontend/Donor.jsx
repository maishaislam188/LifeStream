import React, { useState } from "react";
import { FiMapPin, FiPhone } from "react-icons/fi";
import heroImage from "../../assets/hero.jpeg";
import Footer from "../../components/frontend/Footer";
import Navbar from "../../components/frontend/Navbar";

const donorsData = [
  {
    id: 1,
    name: "John Doe",
    bloodGroup: "A+",
    address: "Dhaka",
    phone: "+880 1234 567890",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    id: 2,
    name: "Jane Smith",
    bloodGroup: "B+",
    address: "Chittagong",
    phone: "+880 9876 543210",
    image: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    id: 3,
    name: "Ali Hasan",
    bloodGroup: "O-",
    address: "Sylhet",
    phone: "+880 1122 334455",
    image: "https://randomuser.me/api/portraits/men/3.jpg",
  },
  {
    id: 4,
    name: "Fatema Akter",
    bloodGroup: "AB+",
    address: "Rajshahi",
    phone: "+880 5566 778899",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    id: 1,
    name: "John Doe",
    bloodGroup: "A+",
    address: "Dhaka",
    phone: "+880 1234 567890",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    id: 2,
    name: "Jane Smith",
    bloodGroup: "B+",
    address: "Chittagong",
    phone: "+880 9876 543210",
    image: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    id: 3,
    name: "Ali Hasan",
    bloodGroup: "O-",
    address: "Sylhet",
    phone: "+880 1122 334455",
    image: "https://randomuser.me/api/portraits/men/3.jpg",
  },
  {
    id: 4,
    name: "Fatema Akter",
    bloodGroup: "AB+",
    address: "Rajshahi",
    phone: "+880 5566 778899",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
  },
];

export default function Donors() {
  const [bloodGroup, setBloodGroup] = useState("");
  const [location, setLocation] = useState("");

  const filteredDonors = donorsData.filter(
    (donor) =>
      (bloodGroup === "" || donor.bloodGroup === bloodGroup) &&
      (location === "" ||
        donor.address.toLowerCase().includes(location.toLowerCase()))
  );

  return (
    <div className="font-sans text-gray-900">
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

      {/* Full-width Search */}
      <section className="bg-red-50 py-8 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Search by blood group or location"
            className="flex-1 border border-red-300 rounded px-4 py-3 focus:ring-2 focus:ring-red-400 focus:outline-none"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <button
            className="bg-red-600 text-white px-6 py-3 rounded hover:bg-red-700 transition font-semibold"
            onClick={() => {}}
          >
            Search
          </button>
        </div>
      </section>

      {/* Main Content: Filter Sidebar + Donor Cards */}
      <div className="max-w-7xl mx-auto px-4 py-12 flex flex-col md:flex-row gap-8">
        {/* Left Filter Sidebar */}
        <div className="md:w-1/4 bg-white p-6 rounded-lg shadow-md sticky top-24 h-fit">
          <h2 className="text-xl font-bold mb-4 text-red-600">Filter Donors</h2>

          <div className="flex flex-col gap-4">
            <div>
              <label className="block mb-1 font-semibold">Blood Group</label>
              <select
                className="w-full border border-red-300 rounded px-4 py-2 focus:ring-2 focus:ring-red-400 focus:outline-none"
                value={bloodGroup}
                onChange={(e) => setBloodGroup(e.target.value)}
              >
                <option value="">All Groups</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
              </select>
            </div>

            <div>
              <label className="block mb-1 font-semibold">Location</label>
              <input
                type="text"
                placeholder="Enter location"
                className="w-full border border-red-300 rounded px-4 py-2 focus:ring-2 focus:ring-red-400 focus:outline-none"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            <button
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition font-semibold"
              onClick={() => {}}
            >
              Apply Filters
            </button>
          </div>
        </div>

        {/* Right Donor Cards */}
        <div className="flex-1 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredDonors.length > 0 ? (
            filteredDonors.map((donor) => (
              <div
                key={donor.id}
                className="bg-gradient-to-br from-red-100 to-red-50 rounded-lg shadow-md p-6 hover:shadow-xl transform hover:scale-105 transition duration-300"
              >
                <div className="flex justify-center mb-4">
                  <img
                    src={donor.image}
                    alt={donor.name}
                    className="w-24 h-24 rounded-full border-4 border-red-600 object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold mb-2 text-red-700 text-center">
                  {donor.name}
                </h3>
                <p className="text-center mb-3">
                  <span className="inline-block bg-red-600 text-white px-3 py-1 rounded-full font-semibold">
                    {donor.bloodGroup}
                  </span>
                </p>
                <p className="flex items-center mb-1 text-gray-700 justify-center">
                  <FiMapPin className="mr-2 text-red-500" /> {donor.address}
                </p>
                <p className="flex items-center text-gray-700 justify-center">
                  <FiPhone className="mr-2 text-red-500" /> {donor.phone}
                </p>
              </div>
            ))
          ) : (
            <p className="text-center col-span-4 text-gray-500">
              No donors found matching your search.
            </p>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}