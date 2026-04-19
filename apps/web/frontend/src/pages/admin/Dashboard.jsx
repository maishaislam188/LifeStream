import { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../../components/admin/AdminLayout";

export default function Dashboard() {
  const [stats, setStats] = useState({});

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "http://localhost:5000/api/admin/stats",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setStats(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchStats();
  }, []);

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">

        <Card title="Donors" value={stats.totalDonors} />
        <Card title="Patients" value={stats.totalPatients} />
        <Card title="Requests" value={stats.totalRequests} />
        <Card title="Urgent" value={stats.urgentRequests} />
        <Card title="Pending" value={stats.pendingRequests} />

      </div>
    </AdminLayout>
  );
}

function Card({ title, value }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow text-center">
      <h3 className="text-gray-500">{title}</h3>
      <p className="text-2xl font-bold text-red-600">{value || 0}</p>
    </div>
  );
}