import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../components/frontend/Navbar";

export default function Profile() {
  const [user, setUser] = useState({});
  const [activeTab, setActiveTab] = useState("profile");
  const [myRequests, setMyRequests] = useState([]);
  const [myDonations, setMyDonations] = useState([]);

  const token = localStorage.getItem("token");

  // ================= FETCH PROFILE =================
  const fetchProfile = async () => {
    const res = await axios.get("http://localhost:5000/api/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setUser(res.data);
  };

  // ================= FETCH MY REQUESTS =================
  const fetchMyRequests = async () => {
    const res = await axios.get(
      "http://localhost:5000/api/requests/my-requests",
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setMyRequests(res.data);
  };

  // ================= FETCH MY DONATIONS =================
  const fetchMyDonations = async () => {
    const res = await axios.get(
      "http://localhost:5000/api/requests/my-donations",
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setMyDonations(res.data);
  };

  useEffect(() => {
    fetchProfile();
    fetchMyRequests();
    fetchMyDonations();
  }, []);

  // ================= HANDLE CHANGE =================
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setUser({
      ...user,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // ================= UPDATE PROFILE =================
  const updateProfile = async () => {
    await axios.put("http://localhost:5000/api/auth/me", user, {
      headers: { Authorization: `Bearer ${token}` },
    });

    alert("Profile updated!");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-5xl mx-auto p-6">
        {/* HEADER */}
        <div className="bg-white p-6 rounded-xl shadow mb-6 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-red-600">
              👤 {user.name}
            </h2>
            <p className="text-gray-500">{user.email}</p>
          </div>

          <span
            className={`px-4 py-1 rounded-full text-sm font-semibold ${
              user.isAvailable
                ? "bg-green-100 text-green-600"
                : "bg-gray-200 text-gray-600"
            }`}
          >
            {user.isAvailable ? "Available" : "Not Available"}
          </span>
        </div>

        {/* TABS */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab("profile")}
            className={`px-4 py-2 rounded ${
              activeTab === "profile"
                ? "bg-red-600 text-white"
                : "bg-white shadow"
            }`}
          >
            Profile
          </button>

          <button
            onClick={() => setActiveTab("requests")}
            className={`px-4 py-2 rounded ${
              activeTab === "requests"
                ? "bg-red-600 text-white"
                : "bg-white shadow"
            }`}
          >
            My Requests
          </button>

          <button
            onClick={() => setActiveTab("donations")}
            className={`px-4 py-2 rounded ${
              activeTab === "donations"
                ? "bg-red-600 text-white"
                : "bg-white shadow"
            }`}
          >
            My Donations
          </button>
        </div>

        {/* ================= PROFILE TAB ================= */}
        {activeTab === "profile" && (
          <div className="bg-white p-6 rounded-xl shadow space-y-4">
            <h3 className="text-lg font-semibold">Edit Profile</h3>

            <input
              name="name"
              value={user.name || ""}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              placeholder="Name"
            />

            <input
              value={user.email || ""}
              disabled
              className="w-full border p-2 rounded bg-gray-100"
            />

            <input
              name="phone"
              value={user.phone || ""}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              placeholder="Phone"
            />

            <input
              name="location"
              value={user.location || ""}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              placeholder="Location"
            />

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="isAvailable"
                checked={user.isAvailable || false}
                onChange={handleChange}
              />
              Available as Donor
            </label>

            <button
              onClick={updateProfile}
              className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700"
            >
              Update Profile
            </button>
          </div>
        )}

        {/* ================= MY REQUESTS ================= */}
        {activeTab === "requests" && (
          <div className="grid md:grid-cols-2 gap-4">
            {myRequests.length > 0 ? (
              myRequests.map((req) => (
                <div key={req._id} className="bg-white p-4 rounded shadow">
                  <h3 className="font-bold text-red-600">
                    {req.patientName}
                  </h3>
                  <p>{req.bloodGroup}</p>
                  <p>{req.location}</p>

                  <p className="font-semibold">
                    Status:{" "}
                    <span className="text-blue-600">{req.status}</span>
                  </p>

                  {req.acceptedBy && (
                    <p className="text-green-600">
                      Donor: {req.acceptedBy.name} ({req.acceptedBy.phone})
                    </p>
                  )}
                </div>
              ))
            ) : (
              <p>No requests found</p>
            )}
          </div>
        )}

        {/* ================= MY DONATIONS ================= */}
        {activeTab === "donations" && (
          <div className="grid md:grid-cols-2 gap-4">
            {myDonations.length > 0 ? (
              myDonations.map((req) => (
                <div key={req._id} className="bg-white p-4 rounded shadow">
                  <h3 className="font-bold text-red-600">
                    {req.patientName}
                  </h3>
                  <p>{req.bloodGroup}</p>
                  <p>{req.location}</p>
                  <p className="text-blue-600 font-semibold">
                    📞 {req.phone}
                  </p>
                </div>
              ))
            ) : (
              <p>No donations yet</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}