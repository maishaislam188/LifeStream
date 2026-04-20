import { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../../components/admin/AdminLayout";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [availabilityFilter, setAvailabilityFilter] = useState("all");

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/admin/users",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUsers(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const deleteUser = async (id) => {
    if (!window.confirm("Delete this user?")) return;

    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `http://localhost:5000/api/admin/users/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchUsers();
    } catch (error) {
      console.error(error);
    }
  };

  // 🔥 Toggle Availability (optional but powerful)
  const toggleAvailability = async (user) => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `http://localhost:5000/api/admin/users/${user._id}`,
        { isAvailable: !user.isAvailable },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchUsers();
    } catch (error) {
      console.error(error);
    }
  };

  // 🎯 FILTER LOGIC
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase());

    const matchesRole =
      roleFilter === "all" || user.role === roleFilter;

    const matchesAvailability =
      availabilityFilter === "all" ||
      (availabilityFilter === "available" && user.isAvailable) ||
      (availabilityFilter === "not_available" && !user.isAvailable);

    return matchesSearch && matchesRole && matchesAvailability;
  });

  // 🎨 ROLE STYLE
  const getRoleStyle = (role) => {
    if (role === "admin") return "bg-purple-100 text-purple-700";
    if (role === "donor") return "bg-green-100 text-green-700";
    return "bg-blue-100 text-blue-700";
  };

  // 🎨 AVAILABILITY STYLE
  const getAvailabilityStyle = (status) => {
    return status
      ? "bg-green-100 text-green-700"
      : "bg-gray-200 text-gray-600";
  };

  return (
    <AdminLayout>
      <div className="p-6">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
          <h1 className="text-3xl font-bold text-gray-800">
            👥 Users Management
          </h1>

          {/* FILTERS */}
          <div className="flex gap-3 flex-col sm:flex-row flex-wrap">
            <input
              type="text"
              placeholder="Search..."
              className="border px-4 py-2 rounded-lg focus:ring-2 focus:ring-red-400"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <select
              className="border px-4 py-2 rounded-lg"
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
            >
              <option value="all">All Roles</option>
              <option value="admin">Admin</option>
              <option value="donor">Donor</option>
              <option value="patient">Patient</option>
            </select>

            <select
              className="border px-4 py-2 rounded-lg"
              value={availabilityFilter}
              onChange={(e) => setAvailabilityFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="available">Available</option>
              <option value="not_available">Not Available</option>
            </select>
          </div>
        </div>

        {/* TABLE */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">

              <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
                <tr>
                  <th className="px-6 py-4 text-left">User</th>
                  <th className="px-6 py-4 text-left">Email</th>
                  <th className="px-6 py-4 text-left">Role</th>
                  <th className="px-6 py-4 text-left">Availability</th>
                  <th className="px-6 py-4 text-center">Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <tr
                      key={user._id}
                      className="border-t hover:bg-gray-50 transition"
                    >
                      {/* USER */}
                      <td className="px-6 py-4 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center font-bold text-red-600">
                          {user.name.charAt(0)}
                        </div>
                        {user.name}
                      </td>

                      {/* EMAIL */}
                      <td className="px-6 py-4 text-gray-500">
                        {user.email}
                      </td>

                      {/* ROLE */}
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getRoleStyle(user.role)}`}>
                          {user.role}
                        </span>
                      </td>

                      {/* AVAILABILITY */}
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getAvailabilityStyle(user.isAvailable)}`}>
                          {user.isAvailable ? "Available" : "Not Available"}
                        </span>
                      </td>

                      {/* ACTION */}
                      <td className="px-6 py-4 text-center flex gap-2 justify-center">
                        <button
                          onClick={() => toggleAvailability(user)}
                          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs"
                        >
                          Toggle
                        </button>

                        <button
                          onClick={() => deleteUser(user._id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-10 text-gray-400">
                      No users found
                    </td>
                  </tr>
                )}
              </tbody>

            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}