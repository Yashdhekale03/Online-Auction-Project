import React, { useEffect, useState, useContext } from "react";
import Header from '../components/Header';
import Footer from '../components/Footer';
import UserHeader from '../components/UserHeader';
import { AuthContext } from "../context/AuthContext"; // Used for user access


const HowItWorks = () => {
  const { user } = useContext(AuthContext);
  return (
    <>
      {user?.role === "admin" ? <Header /> : <UserHeader />}
      
      <main className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
        <div className="max-w-3xl w-full bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-4xl font-bold mb-6 text-center">How It Works</h1>
          <p className="mb-4 text-center">
            Welcome to Bid Center!  Here's a guide to managing your account:
          </p>

          <ol className="list-decimal list-inside space-y-4">
            <li>
              <p className="text-sm mt-6 mb-2">Sign Up</p>
              <p className="mb-4">
                Create a new Bid Center account. Click on the Signup button on the top right of the screen and You'll need to provide basic information like your name, email address, and a password. Click on Sign Up button the account will be created.
              </p>
            </li>
            <li>
              <p className="text-sm mt-6 mb-2">Log In</p>
              <p className="mb-4">
                Access your Bid Center account using your registered email and password.  Consider enabling two-factor authentication for added security.
              </p>
            </li>
            <li>
              <p className="text-sm mt-6 mb-2">Reset Password</p>
              <p className="mb-4">
                You can reset your password by selecting the reset password option.
              </p>
            </li>
            <li>
              <p className="text-sm mt-6 mb-2">Delete Account</p>
              <p className="mb-4">
                You can delete your Bid Center account.  This action is permanent, and you will lose access to your data and any active bids.  You may be asked to confirm this action.
              </p>
            </li>
             <li>
              <p className="text-sm mt-6 mb-2">Edit Profile</p>
              <p className="mb-4">
                Manage your Profile settings, such as your profile information, email preferences, etc.
              </p>
            </li>
          </ol>

          <p className="mt-8">
            For more details, please refer to our <a href="/faq" className="text-blue-500 hover:underline">FAQ</a> or contact our support team.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default HowItWorks;