import { BrowserRouter as Router, Routes, Route } from "react-router";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import HomePage from "./pages/frontend/Home";
import Donor from "./pages/frontend/Donor";
import About from "./pages/frontend/About";
import RequestBlood from "./pages/frontend/RequestBlood";
import Requests from "./pages/frontend/Requests";
import PrivateRoute from "./components/PrivateRoute";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminUsers from "./pages/admin/Users";
import AdminRequests from "./pages/admin/Requests";
import AdminRoute from "./components/AdminRoute";
import Profile from "./pages/frontend/Profile";
import MyRequests from "./pages/frontend/MyRequests";
import MyDonations from "./pages/frontend/MyDonations";

function App() {
  return (
    <Router>
      <Routes>
        {/* 🔐 ADMIN ROUTES */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <AdminRoute>
              <AdminUsers />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/requests"
          element={
            <AdminRoute>
              <AdminRequests />
            </AdminRoute>
          }
        />
        <Route index path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        {/* 🔒 PROTECTED ROUTES */}
        <Route
          path="/donors"
          element={
            <PrivateRoute>
              <Donor />
            </PrivateRoute>
          }
        />
        <Route
          path="/request-blood"
          element={
            <PrivateRoute>
              <RequestBlood />
            </PrivateRoute>
          }
        />
        <Route
          path="/requests"
          element={
            <PrivateRoute>
              <Requests />
            </PrivateRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="/my-requests"
          element={
            <PrivateRoute>
              <MyRequests />
            </PrivateRoute>
          }
        />
        <Route
          path="/my-donations"
          element={
            <PrivateRoute>
              <MyDonations />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
