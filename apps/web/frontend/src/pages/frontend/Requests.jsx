import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../components/frontend/Navbar";

export default function Requests() {
  const [requests, setRequests] = useState([]);

  // ✅ Get user + role
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role;

  const fetchRequests = async () => {
    try {
      const res = await axios.get("https://lifestream-3v6y.onrender.com/api/requests");
      setRequests(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleStatus = async (id, status) => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `https://lifestream-3v6y.onrender.com/api/requests/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchRequests();
    } catch (error) {
      console.error(error);
      alert("Failed to update");
    }
  };

  // ✅ ONLY PENDING REQUESTS
  const pendingRequests = requests.filter(
    (req) => req.status === "pending"
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-10">
        <h2 className="text-3xl font-bold text-red-600 mb-8 text-center">
          Blood Requests
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {pendingRequests.length > 0 ? (
            pendingRequests.map((req) => (
              <div
                key={req._id}
                className="bg-white p-6 rounded-xl shadow-md border-l-4 border-red-500 hover:shadow-xl transition"
              >
                {/* PATIENT NAME */}
                <h3 className="text-lg font-bold mb-2 text-red-600">
                  🩸 {req.patientName}
                </h3>

                {/* BLOOD GROUP */}
                <p className="mb-2">
                  <span className="font-semibold">Blood:</span>{" "}
                  <span className="text-red-600 font-bold">
                    {req.bloodGroup}
                  </span>
                </p>

                {/* LOCATION */}
                <p className="mb-2 text-gray-700">
                  📍 {req.location}
                </p>

                {/* PHONE */}
                <p className="mb-3 text-lg font-bold text-blue-600">
                  📞 {req.phone}
                </p>

                {/* URGENT TAG */}
                {req.isUrgent && (
                  <span className="inline-block bg-red-600 text-white px-3 py-1 rounded text-sm mb-2">
                    Urgent
                  </span>
                )}

                {/* MESSAGE */}
                <p className="text-gray-600 text-sm mb-3">
                  {req.message}
                </p>

                {/* STATUS */}
                <p className="mb-3 font-semibold">
                  Status:{" "}
                  <span className="text-blue-600">
                    {req.status}
                  </span>
                </p>

                {/* DONOR INFO */}
                {req.acceptedBy && (
                  <p className="text-green-600 font-semibold mb-2">
                    Donor: {req.acceptedBy.name} (
                    {req.acceptedBy.phone})
                  </p>
                )}

                {/* CALL BUTTON */}
                <a
                  href={`tel:${req.phone}`}
                  className="block text-center bg-blue-600 text-white py-2 rounded-lg mb-3 hover:bg-blue-700 transition"
                >
                  📞 Call Patient
                </a>

                {/* ========================= */}
                {/* ROLE BASED ACTION BUTTONS */}
                {/* ========================= */}

                {role === "donor" && (
                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        handleStatus(req._id, "fulfilled")
                      }
                      className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
                    >
                      Accept
                    </button>

                    <button
                      onClick={() =>
                        handleStatus(req._id, "closed")
                      }
                      className="flex-1 bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 transition"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-20">
              <h3 className="text-xl font-semibold text-gray-600">
                No pending requests found
              </h3>
              <p className="text-gray-400 mt-2">
                All blood requests are already processed.
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}