import { BrowserRouter as Router, Routes, Route } from "react-router";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import HomePage from "./pages/frontend/Home";


function App() {
  return (
    <Router>
      <Routes>

        <Route index path="/" element={<HomePage />} />


        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;
