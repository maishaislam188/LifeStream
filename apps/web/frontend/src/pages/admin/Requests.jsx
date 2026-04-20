import { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../../components/admin/AdminLayout";

export default function Requests() {
  const [requests, setRequests] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [urgentFilter, setUrgentFilter] = useState("all");
  const [search, setSearch] = useState("");

  const fetchRequests = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "https://lifestream-3v6y.onrender.com/api/admin/requests",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setRequests(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const deleteRequest = async (id) => {
    if (!window.confirm("Delete this request?")) return;

    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `https://lifestream-3v6y.onrender.com/api/admin/requests/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchRequests();
    } catch (error) {
      console.error(error);
    }
  };

  // 🎯 FILTER LOGIC
  const filteredRequests = requests.filter((req) => {
    const matchSearch = req.patientName
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchStatus =
      statusFilter === "all" || req.status === statusFilter;

    const matchUrgent =
      urgentFilter === "all" ||
      (urgentFilter === "urgent" && req.isUrgent) ||
      (urgentFilter === "normal" && !req.isUrgent);

    return matchSearch && matchStatus && matchUrgent;
  });

  // 🎨 STATUS STYLE
  const getStatusStyle = (status) => {
    if (status === "fulfilled") return "bg-green-100 text-green-700";
    if (status === "closed") return "bg-gray-200 text-gray-600";
    return "bg-blue-100 text-blue-700";
  };

  return (
    <AdminLayout>
      <div className="p-6">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
          <h1 className="text-3xl font-bold text-gray-800">
            🩸 Blood Requests
          </h1>

          {/* FILTERS */}
          <div className="flex flex-wrap gap-3">
            <input
              type="text"
              placeholder="Search patient..."
              className="border px-4 py-2 rounded-lg"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <select
              className="border px-4 py-2 rounded-lg"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="fulfilled">Fulfilled</option>
              <option value="closed">Closed</option>
            </select>

            <select
              className="border px-4 py-2 rounded-lg"
              value={urgentFilter}
              onChange={(e) => setUrgentFilter(e.target.value)}
            >
              <option value="all">All</option>
              <option value="urgent">Urgent</option>
              <option value="normal">Normal</option>
            </select>
          </div>
        </div>

        {/* CARDS */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRequests.length > 0 ? (
            filteredRequests.map((req) => (
              <div
                key={req._id}
                className="bg-white rounded-xl shadow-md p-6 border-l-4 border-red-500 hover:shadow-lg transition"
              >
                {/* PATIENT */}
                <h3 className="text-lg font-bold text-red-600 mb-2">
                  👤 {req.patientName}
                </h3>

                {/* BLOOD */}
                <p className="mb-2">
                  🩸 <span className="font-bold text-red-600">{req.bloodGroup}</span>
                </p>

                {/* LOCATION */}
                <p className="mb-1 text-gray-600">📍 {req.location}</p>

                {/* PHONE */}
                <p className="mb-2 font-semibold text-blue-600">
                  📞 {req.phone}
                </p>

                {/* MESSAGE */}
                {req.message && (
                  <p className="text-sm text-gray-500 mb-3">
                    {req.message}
                  </p>
                )}

                {/* STATUS */}
                <span
                  className={`px-3 py-1 text-xs rounded-full font-semibold ${getStatusStyle(
                    req.status
                  )}`}
                >
                  {req.status}
                </span>

                {/* URGENT */}
                {req.isUrgent && (
                  <span className="ml-2 px-3 py-1 text-xs rounded-full bg-red-600 text-white">
                    Urgent
                  </span>
                )}

                {/* DONOR INFO */}
                {req.acceptedBy && (
                  <div className="mt-3 p-3 bg-green-50 rounded">
                    <p className="text-sm font-semibold text-green-700">
                      🤝 Donor: {req.acceptedBy.name}
                    </p>
                    <p className="text-sm text-green-600">
                      📞 {req.acceptedBy.phone}
                    </p>
                  </div>
                )}

                {/* ACTION */}
                <button
                  onClick={() => deleteRequest(req._id)}
                  className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg"
                >
                  Delete Request
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-400">No requests found</p>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}