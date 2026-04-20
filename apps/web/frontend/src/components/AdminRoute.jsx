import { Navigate } from "react-router";

export default function AdminRoute({ children }) {
  const user = JSON.parse(localStorage.getItem("user"));

  // ❌ Not logged in
  if (!user) {
    return <Navigate to="/signin" />;
  }

  // ❌ Not admin → go home
  if (user.role !== "admin") {
    return <Navigate to="/" />;
  }

  // ✅ Admin
  return children;
}