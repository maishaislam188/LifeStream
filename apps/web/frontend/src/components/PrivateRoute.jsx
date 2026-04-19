import { Navigate } from "react-router";

export default function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");

  // ❌ not logged in
  if (!token) {
    return <Navigate to="/signin" replace />;
  }

  // ✅ logged in
  return children;
}