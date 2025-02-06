import React from "react";
import { Link } from "react-router-dom";
const MaintenancePage = ({ title }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-600 text-center p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md">
        <h1 className="text-3xl font-bold text-red-500">{title}</h1>
        <p className="text-gray-700 mt-4">
          Sorry for the inconvenience. This page is currently under maintenance. 🚧  
          We’ll be back soon with updates!
        </p>
        <div className="mt-6">
          <span className="inline-block w-8 h-8 border-4 border-blue-500 border-dotted rounded-full animate-spin"></span>
        </div>
        <h1 className="text-center text-1.5xl py-1.5 text-blue-500 underline hover:text-blue-700">
            <Link to={'/'}>
                Go to Home
            </Link>
          </h1>
      </div>
    </div>
  );
};

export const PrivacyPolicy = () => <MaintenancePage title="Privacy Policy" />;
export const TermsAndConditions = () => <MaintenancePage title="Terms & Conditions" />;
