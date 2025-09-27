import React, { useEffect, useState, useContext } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./style.css"; // We'll add the styles below
import UserHeader from '../components/UserHeader';
import { AuthContext } from "../context/AuthContext"; // Used for user access


const About = () => {
  const { user } = useContext(AuthContext);
  return (
    <>
      {user?.role === "admin" ? <Header /> : <UserHeader />}
      
      <div className="about-container">
        <h1>About Us</h1>
        <p>
          Welcome to <strong>Bid Center</strong> — your trusted online platform
          for secure and competitive bidding!
        </p>

        <h2>Our Mission</h2>
        <p>
          At Bid Center, our mission is to connect buyers and sellers through a
          dynamic auction system that is easy to use, transparent, and secure.
          Whether you're looking to auction rare collectibles or bid on
          exclusive items, we've got you covered.
        </p>

        <h2>Meet the Developers</h2>
        <ul>
          <li>ADITHYA N KASHYAP</li>
          <li>SOUVIK BHATTACHARYA</li>
          <li>SANJANA SURPURKAR</li>
          <li>YASH DHEKALE</li>
          <li>HRISHITA TIWARI</li>
          <li>SHEEMA SUBHANA SYED</li>
          <li>SUBASH V</li>
          <li>NAMAN WADHWANI</li>
          <li>VIGHNESH VYANKATESH PANDIT</li>
          <li>BOOPATHY</li>
        </ul>
      </div>
      <Footer />
    </>
  );
};

export default About;
