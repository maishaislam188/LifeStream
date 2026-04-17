import { Link } from "react-router";
import Navbar from "../../components/frontend/Navbar";
import Footer from "../../components/frontend/Footer";
import heroImage from "../../assets/hero.jpeg";
import banner from "../../assets/banner.avif";

export default function About() {
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
                        About Our Platform
                    </h2>
                    <p className="text-white mb-6 text-lg">
                        Learn more about our mission, vision, and how we are helping save lives
                        through blood donation.
                    </p>
                </div>
            </section>

            {/* Our Mission */}
            <section className="max-w-7xl mx-auto py-20 px-4 text-center">
                <h3 className="text-3xl font-bold mb-6">Our Mission</h3>
                <p className="text-lg max-w-3xl mx-auto">
                    Our mission is to create a secure and efficient platform where blood
                    donors and recipients can connect. We aim to reduce the delay
                    in finding blood during emergencies and ensure that no life is lost
                    due to unavailability.
                </p>
            </section>

            {/* What We Do */}
            <section className="bg-red-50 py-20 px-4">
                <div className="max-w-7xl mx-auto text-center">
                    <h3 className="text-3xl font-bold mb-12">What We Do</h3>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="p-6 bg-white rounded shadow hover:shadow-lg transition">
                            <h4 className="text-xl font-semibold mb-2">Connect Donors</h4>
                            <p>
                                We help donors register and make themselves available for those
                                in urgent need.
                            </p>
                        </div>
                        <div className="p-6 bg-white rounded shadow hover:shadow-lg transition">
                            <h4 className="text-xl font-semibold mb-2">Request Blood</h4>
                            <p>
                                Patients can easily request blood and find matching donors
                                quickly and safely.
                            </p>
                        </div>
                        <div className="p-6 bg-white rounded shadow hover:shadow-lg transition">
                            <h4 className="text-xl font-semibold mb-2">Ensure Safety</h4>
                            <p>
                                We prioritize secure access and proper validation for all users
                                on the platform.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Image + Description */}
            <section className="max-w-7xl mx-auto py-20 px-4">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div className="flex justify-center">
                        <img
                            src={banner}
                            alt="Blood Donation"
                            className="w-80 rounded shadow-lg"
                        />
                    </div>
                    <div>
                        <h3 className="text-3xl font-bold mb-4">Why Choose Us?</h3>
                        <p className="text-lg mb-4">
                            Our platform is designed to be simple, fast, and reliable. We
                            ensure that users can easily navigate and perform actions without
                            confusion.
                        </p>
                        <p className="text-lg mb-6">
                            Whether you are a donor or someone in need, we provide a trusted
                            system to help save lives efficiently.
                        </p>
                        <Link
                            to="/signin"
                            className="bg-red-600 text-white px-6 py-3 font-semibold rounded hover:bg-red-700 transition"
                        >
                            Join Now
                        </Link>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <Footer />
        </div>
    );
}