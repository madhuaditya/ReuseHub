import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
        {/* <div className="w-full h-1 bg-amber-700"></div> */}
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        {/* Left Section - Branding */}
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-semibold">ReuseHub</h2>
          <p className="text-sm text-gray-400">Helping students reuse & share items.</p>
        </div>

        {/* Center Section - Navigation Links */}
        <div className="flex space-x-6 my-4 md:my-0">
          <Link to="/privacy" className="text-gray-400 hover:text-white">Privacy Policy</Link>
          <Link to="/terms" className="text-gray-400 hover:text-white">Terms of Service</Link>
          <Link to="/feedback" className="text-gray-400 hover:text-white">Feedback</Link>
        </div>

        {/* Right Section - Social Media Links */}
        <div className="flex space-x-4">
          <a to="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
          <FaTwitter />
          </a>
          <a to="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
          <FaFacebook />
          </a>
          <a to="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
           <FaGithub />
          </a>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="text-center text-gray-500 text-sm mt-4">
        © {new Date().getFullYear()} ReuseHub. All rights reserved.
               Created by the 🤍 
      </div>
      <div></div>
    </footer>
  );
}
