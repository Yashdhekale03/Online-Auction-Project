import React, { useEffect, useState, useContext } from "react";
import UserHeader from '../components/UserHeader';
import { AuthContext } from "../context/AuthContext";
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function PrivacyPolicy() {
  const { user } = useContext(AuthContext);
  return (
    <>
      {user?.role === "admin" ? <Header /> : <UserHeader />}
      <div className="flex flex-col items-center justify-center px-4 py-10 min-h-screen bg-gray-50">
        <div className="max-w-3xl w-full bg-white p-8 rounded-2xl shadow-lg">
          <h1 className="text-3xl font-bold mb-6 text-center">Privacy Policy</h1>
          <p style={{ fontSize: '1rem', lineHeight: '1.6', marginBottom: '15px', color: '#333',textAlign:"center" }}>
          At Bid Center, your privacy matters to us. This policy outlines how we handle your personal data and what choices you have.
        </p>

        <h2 style={{ fontSize: '1rem', fontWeight: 'semibold', marginTop: '25px', marginBottom: '10px', color: '#40a9ff' }}>1. What We Collect</h2>
        <p style={{ fontSize: '1rem', lineHeight: '1.6', marginBottom: '15px', color: '#555' }}>
          When you use our platform, we may gather information like your name, email, device type, and how you interact with the site.
        </p>

        <h2 style={{ fontSize: '1rem', fontWeight: 'semibold', marginTop: '25px', marginBottom: '10px', color: '#40a9ff' }}>2. Why We Collect It</h2>
        <p style={{ fontSize: '1rem', lineHeight: '1.6', marginBottom: '15px', color: '#555' }}>
          We use this data to deliver a better user experience, troubleshoot issues, notify you of important updates, and improve our services.
        </p>

        <h2 style={{ fontSize: '1rem', fontWeight: 'semibold', marginTop: '25px', marginBottom: '10px', color: '#40a9ff' }}>3. Sharing & Security</h2>
        <p style={{ fontSize: '1rem', lineHeight: '1.6', marginBottom: '15px', color: '#555' }}>
          Your data is never sold. We only share it when required by law or to trusted services helping us run Bid Center — under strict confidentiality.
        </p>

        <h2 style={{ fontSize: '1rem', fontWeight: 'semibold', marginTop: '25px', marginBottom: '10px', color: '#40a9ff' }}>4. Your Choices</h2>
        <p style={{ fontSize: '1rem', lineHeight: '1.6', marginBottom: '15px', color: '#555' }}>
          You can request access to your information, ask for changes, or request deletion. Reach out to us at <strong style={{ fontWeight: 'bold', color: '#1890ff' }}>support@bidcenter.com</strong> and we’ll help you out.
        </p>

        <h2 style={{ fontSize: '1rem', fontWeight: 'semibold', marginTop: '25px', marginBottom: '10px', color: '#40a9ff' }}>5. Policy Updates</h2>
        <p style={{ fontSize: '1rem', lineHeight: '1.6', marginBottom: '15px', color: '#555' }}>
          As we grow, we might update this policy. Major changes will be clearly communicated. Your continued use means you agree with the latest version.
        </p>

        <p style={{ fontSize: '0.9rem', color: '#777', marginTop: '30px', textAlign: 'center' }}>
          This policy is effective as of April 18, 2025.
        </p>

        </div>
      </div>
      <Footer />
    </>
  );
}
