import { Link } from "react-router";
import heroImage from "../../assets/hero.jpeg";
import banner from "../../assets/banner.jpg";
import Navbar from "../../components/frontend/Navbar";
import Footer from "../../components/frontend/Footer";

export default function Home() {
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
            Join our community. Become a donor or request blood for those in
            need.
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
            to="/login"
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
          <div>
            <img
              src={banner}
              alt="Blood Donation"
              className="rounded shadow-lg"
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
              to="/login"
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
