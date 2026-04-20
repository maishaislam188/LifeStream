import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../components/frontend/Navbar";

export default function MyDonations() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/requests/my-donations",
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
        <h2 className="text-xl font-bold mb-4">My Donations</h2>

        {requests.map((req) => (
          <div key={req._id} className="bg-white p-4 mb-3 shadow rounded">
            <h3>{req.patientName}</h3>
            <p>{req.bloodGroup}</p>
            <p>{req.location}</p>
            <p className="text-blue-600">{req.phone}</p>
          </div>
        ))}
      </div>
    </div>
  );
}