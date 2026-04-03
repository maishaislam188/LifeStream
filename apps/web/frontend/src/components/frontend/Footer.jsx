import React from 'react'
import { FaFacebook, FaInstagram, FaSnapchat, FaTwitter } from 'react-icons/fa'
import { Link } from 'react-router'

const Footer = () => {
  return (
    <footer className="bg-red-600 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* About Section */}
        <div>
          <img
            src="/logo.png"
            alt="BloodDonate Logo"
            className="h-20 w-auto object-contain"
          />
          <p className="text-white/80 text-sm">
            LifeStream is a platform to connect donors and receivers safely.
            Join us to save lives and make a difference in your community.
          </p>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-xl font-bold mb-4">Contact</h4>
          <ul className="space-y-2 text-white/80 text-sm">
            <li>Email: support@LifeStream.com</li>
            <li>Phone: +880 1234 567890</li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h4 className="text-xl font-bold mb-4">Follow Us</h4>
          <div className="flex space-x-4 text-white">
            <a href="#" className="hover:text-red-200 transition">
              <FaFacebook />
            </a>
            <a href="#" className="hover:text-red-200 transition">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-red-200 transition">
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-red-500 mt-12 pt-6 text-center text-white/80 text-sm">
        &copy; 2026 LifeStream. All Rights Reserved.
      </div>
    </footer>
  )
}

export default Footer