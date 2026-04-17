import { useState } from "react";
import { Link } from "react-router";
import axios from "axios";
import heroImage from "../../assets/hero.jpeg";
import banner from "../../assets/banner.jpg";
import Navbar from "../../components/frontend/Navbar";
import Footer from "../../components/frontend/Footer";
import EmergencyRequests from "../../components/EmergencyRequests";

export default function Home() {
  // মডাল এবং ফর্ম ডেটার জন্য স্টেট
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    bloodGroup: "",
    hospital: "",
    bagsNeeded: "",
    location: "",
    contact: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // ব্যাকএন্ডে ইমার্জেন্সি রিকোয়েস্ট সেভ করা হচ্ছে
      const res = await axios.post("http://localhost:5000/emergency-requests", formData);
      if (res.data.success) {
        alert("Emergency Request Posted Successfully!");
        setShowModal(false);
        window.location.reload(); // নতুন পোস্ট দেখানোর জন্য রিফ্রেশ
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="font-sans text-gray-900">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section
        className="relative flex items-center justify-center h-[80vh] text-center"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="bg-red-900 bg-opacity-60 p-10 rounded max-w-2xl">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Donate Blood, Save Lives
          </h2>
          <p className="text-white mb-6 text-lg">
            Join our community. Become a donor or request blood for those in need.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              to="/signin"
              className="bg-white text-red-600 px-6 py-3 font-semibold rounded hover:bg-gray-100 transition"
            >
              Login / Register
            </Link>
            <Link
              to="/about"
              className="bg-red-500 text-white px-6 py-3 font-semibold rounded hover:bg-red-700 transition"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Emergency Requests Section */}
      <div className="bg-white py-10">
        <div className="max-w-7xl mx-auto px-4">
          <EmergencyRequests />
          
          {/* --- নতুন পোস্ট করার বাটন --- */}
          <div className="mt-8 p-6 border-2 border-dashed border-red-200 rounded-xl bg-red-50 text-center">
             <p className="text-gray-600 mb-4 font-medium">Do you need an emergency blood request? Post your request here.</p>
             <button 
               onClick={() => setShowModal(true)}
               className="bg-red-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-red-700 transition shadow-md"
             >
               Post Emergency Request
             </button>
          </div>
        </div>
      </div>

      {/* --- Emergency Request Modal (Pop-up Form) --- */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-8 rounded-lg shadow-2xl max-w-md w-full relative">
            <button 
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-black text-xl"
            >✕</button>
            <h2 className="text-2xl font-bold text-red-600 mb-6 text-center">Emergency Blood Request</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input name="bloodGroup" placeholder="Blood Group (e.g. A+)" onChange={handleChange} required className="w-full p-2 border rounded" />
              <input name="hospital" placeholder="Hospital Name" onChange={handleChange} required className="w-full p-2 border rounded" />
              <input name="bagsNeeded" placeholder="Bags Needed" type="number" onChange={handleChange} required className="w-full p-2 border rounded" />
              <input name="location" placeholder="Location" onChange={handleChange} required className="w-full p-2 border rounded" />
              <input name="contact" placeholder="Contact Number" onChange={handleChange} required className="w-full p-2 border rounded" />
              <button type="submit" className="w-full bg-red-600 text-white py-3 rounded font-bold hover:bg-red-700 transition">
                Submit Post
              </button>
            </form>
          </div>
        </div>
      )}

      {/* How It Works */}
      <section className="max-w-7xl mx-auto py-20 px-4">
        <h3 className="text-3xl font-bold text-center mb-12">How It Works</h3>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="p-6 bg-red-50 rounded shadow hover:shadow-lg transition">
            <h4 className="text-xl font-semibold mb-2">Register</h4>
            <p>Create an account to donate blood or request it.</p>
          </div>
          <div className="p-6 bg-red-50 rounded shadow hover:shadow-lg transition">
            <h4 className="text-xl font-semibold mb-2">Login</h4>
            <p>Access secure donor or receiver forms after login.</p>
          </div>
          <div className="p-6 bg-red-50 rounded shadow hover:shadow-lg transition">
            <h4 className="text-xl font-semibold mb-2">Donate / Request</h4>
            <p>Submit your info as a donor or request blood safely.</p>
          </div>
        </div>
      </section>

      {/* Why Blood Donation */}
      <section className="bg-red-600 text-white py-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h3 className="text-3xl font-bold mb-4">
            Why Blood Donation Matters
          </h3>
          <p className="text-lg mb-6">
            Blood donation is life-saving. Every donation can save multiple
            lives. Join our platform to make a real impact.
          </p>
          <Link
            to="/donors"
            className="bg-white text-red-600 px-6 py-3 font-semibold rounded hover:bg-gray-100 transition"
          >
            Become a Donor
          </Link>
        </div>
      </section>

      {/* Get Involved */}
      <section className="max-w-7xl mx-auto py-20 px-4">
        <h3 className="text-3xl font-bold text-center mb-12">Get Involved</h3>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="flex justify-center">
            <img
              src={banner}
              alt="Blood Donation"
              className="w-80 rounded shadow-lg"
            />
          </div>
          <div>
            <p className="text-lg mb-4">
              Register as a donor and securely provide your details. Patients
              can request blood, but only after login.
            </p>
            <p className="text-lg mb-6">
              Help save lives. Every donation counts. Join our blood donation
              community now.
            </p>
            <Link
              to="/signin"
              className="bg-red-600 text-white px-6 py-3 font-semibold rounded hover:bg-red-700 transition"
            >
              Register / Login
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}