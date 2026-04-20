import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../components/frontend/Navbar";

export default function MyRequests() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "https://lifestream-3v6y.onrender.com/api/requests/my-requests",
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setRequests(res.data);
    };

    fetch();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="p-8">
        <h2 className="text-xl font-bold mb-4">My Requests</h2>

        {requests.map((req) => (
          <div key={req._id} className="bg-white p-4 mb-3 shadow rounded">
            <h3>{req.patientName}</h3>
            <p>{req.bloodGroup}</p>
            <p>Status: {req.status}</p>

            {req.acceptedBy && (
              <p className="text-green-600">
                Donor: {req.acceptedBy.name} ({req.acceptedBy.phone})
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}