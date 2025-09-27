import React, { useEffect, useState, useContext } from "react";
import UserHeader from '../components/UserHeader';
import { AuthContext } from "../context/AuthContext";
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function TermsOfService() {
  const { user } = useContext(AuthContext);
  return (
    <>
      {user?.role === "admin" ? <Header /> : <UserHeader />}
      <div className="flex flex-col items-center justify-center px-4 py-10 min-h-screen bg-gray-50">
        <div className="max-w-3xl w-full bg-white p-8 rounded-2xl shadow-lg">
          <h1 className="text-3xl font-bold mb-6 text-center">Terms of Service</h1>
          <p style={{ fontSize: '1rem', lineHeight: '1.6', marginBottom: '15px', color: '#333', textAlign: "center" }}>
          Welcome to Bid Center. These Terms & Conditions govern your use of our platform. By accessing or using our website, you agree to be bound by these terms.
        </p>

        <h2 style={{ fontSize: '1rem', fontWeight: 'semibold', marginTop: '25px', marginBottom: '10px', color: '#00acc1' }}>1. Acceptance of Terms</h2>
        <p style={{ fontSize: '1rem', lineHeight: '1.6', marginBottom: '15px', color: '#555' }}>
          By accessing or using Bid Center, you acknowledge that you have read, understood, and agree to comply with these Terms and Conditions.
        </p>

        <h2 style={{ fontSize: '1rem', fontWeight: 'semibold', marginTop: '25px', marginBottom: '10px', color: '#00acc1' }}>2. Account Creation</h2>
        <p style={{ fontSize: '1rem', lineHeight: '1.6', marginBottom: '15px', color: '#555' }}>
          To access certain features, you must create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account.
        </p>

        <h2 style={{ fontSize: '1rem', fontWeight: 'semibold', marginTop: '25px', marginBottom: '10px', color: '#00acc1' }}>3. Proper Use of the Platform</h2>
        <p style={{ fontSize: '1rem', lineHeight: '1.6', marginBottom: '15px', color: '#555' }}>
          You agree to use Bid Center solely for lawful purposes. You shall not engage in any activity that could harm, disrupt, or interfere with the normal operation of our services or the experience of other users.
        </p>

        <h2 style={{ fontSize: '1rem', fontWeight: 'semibold', marginTop: '25px', marginBottom: '10px', color: '#00acc1' }}>4. User Responsibility</h2>
        <p style={{ fontSize: '1rem', lineHeight: '1.6', marginBottom: '15px', color: '#555' }}>
          You are solely responsible for all content you submit, share, or upload to Bid Center. You agree to indemnify and hold harmless Bid Center from any claims arising out of your actions on the platform.
        </p>

        <h2 style={{ fontSize: '1rem', fontWeight: 'semibold', marginTop: '25px', marginBottom: '10px', color: '#00acc1' }}>5. Limitation of Liability</h2>
        <p style={{ fontSize: '1rem', lineHeight: '1.6', marginBottom: '15px', color: '#555' }}>
          Bid Center is not liable for any direct, indirect, incidental, special, or consequential damages resulting from your use of or inability to use the platform, including loss of data or profits.
        </p>

        <h2 style={{ fontSize: '1rem', fontWeight: 'semibold', marginTop: '25px', marginBottom: '10px', color: '#00acc1' }}>6. Termination of Access</h2>
        <p style={{ fontSize: '1rem', lineHeight: '1.6', marginBottom: '15px', color: '#555' }}>
          We reserve the right to suspend or terminate your access to Bid Center at our sole discretion, without notice, for conduct that we believe violates these Terms and Conditions or is otherwise harmful to other users or us.
        </p>

        <h2 style={{ fontSize: '1rem', fontWeight: 'semibold', marginTop: '25px', marginBottom: '10px', color: '#00acc1' }}>7. Modifications</h2>
        <p style={{ fontSize: '1rem', lineHeight: '1.6', marginBottom: '15px', color: '#555' }}>
          Bid Center reserves the right to modify these Terms & Conditions at any time. Changes will be effective upon posting to our website. Continued use of the platform after such changes constitutes acceptance.
        </p>

        <p style={{ fontSize: '0.9rem', color: '#777', marginTop: '30px', textAlign: 'center' }}>
          These terms are effective as of April 18, 2025.
        </p>



        </div>
      </div>
      <Footer />
    </>
  );
}
