import React from 'react'
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa'
import { Link } from 'react-router'

const Footer = () => {
  return (
    <footer className="bg-red-600 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8 items-start">

        {/* About Section */}
        <div className="space-y-3">
          <h2 className="text-2xl font-bold">LifeStream</h2>
          <p className="text-white/80 text-sm leading-relaxed">
            LifeStream is a platform to connect donors and receivers safely.
            Join us to save lives and make a difference in your community.
          </p>
        </div>

        {/* Contact */}
        <div className="md:text-right space-y-3">
          <h4 className="text-xl font-bold">Contact</h4>
          <ul className="text-white/80 text-sm space-y-1">
            <li>Email: support@LifeStream.com</li>
            <li>Phone: +880 1234 567890</li>
          </ul>

          {/* Social Icons */}
          <div className="flex md:justify-end space-x-4 text-lg pt-2">
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
