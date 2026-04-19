import { Link, useNavigate, useLocation } from "react-router";

export default function AdminLayout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/signin");
  };

  const navItem = (path, label) => {
    const isActive = location.pathname === path;

    return (
      <Link
        to={path}
        className={`block px-4 py-2 rounded-lg transition ${
          isActive
            ? "bg-red-600 text-white"
            : "text-gray-300 hover:bg-gray-800 hover:text-white"
        }`}
      >
        {label}
      </Link>
    );
  };

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* SIDEBAR */}
      <div className="w-64 bg-gray-900 text-white flex flex-col justify-between">

        {/* TOP */}
        <div className="p-6">
          <h2 className="text-2xl font-bold text-red-500 mb-8">
            🛠 Admin Panel
          </h2>

          <nav className="space-y-3">
            {navItem("/admin", "📊 Dashboard")}
            {navItem("/admin/users", "👥 Users")}
            {navItem("/admin/requests", "🩸 Requests")}
          </nav>
        </div>

        {/* BOTTOM (LOGOUT) */}
        <div className="p-6 border-t border-gray-800">
          <button
            onClick={handleLogout}
            className="w-full bg-red-600 hover:bg-red-700 py-2 rounded-lg font-semibold transition"
          >
            🚪 Logout
          </button>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col">

        {/* HEADER */}
        <div className="bg-white shadow px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-700">
            Admin Dashboard
          </h1>

          {/* USER INFO */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center font-bold text-red-600">
              A
            </div>
            <span className="text-gray-700 font-medium">Admin</span>
          </div>
        </div>

        {/* PAGE CONTENT */}
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
}