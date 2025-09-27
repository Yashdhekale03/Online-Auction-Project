import React, { useEffect, useState, useContext } from "react";
import Header from '../components/Header';
import Footer from '../components/Footer';
import { motion } from "framer-motion";
import { Container } from "react-bootstrap";
import UserHeader from '../components/UserHeader';
import { AuthContext } from "../context/AuthContext"; // Used for user access


const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: "easeOut",
    },
    
  }),
};

const ContactUs = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="flex flex-col min-h-screen">
      {user?.role === "admin" ? <Header /> : <UserHeader />}

      <main className="flex-grow max-w-5xl mx-auto px-4 py-10">
        <motion.h1
          className="text-4xl font-bold mb-4"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          Get in Touch
        </motion.h1>

        <motion.p
          className="text-gray-600 mb-10"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          custom={2}
        >
          We'd love to hear from you! Whether you have a question about auctions, need support, or just want to share feedback—feel free to reach out.
        </motion.p>
        <Container
        maxWidth="xs"
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "70vh", marginBottom: "50px" }}>
        <motion.form
          className="grid gap-6 mb-12"
          initial="hidden"
          animate="visible"
        >
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              custom={i + 3}
              className={i === 2 ? "md:col-span-2" : ""}
            >
              {i === 0 && (
                <input
                  type="text"
                  placeholder="Your Name"
                  className="p-3 border rounded-lg w-full"
                />
              )}
              {i === 1 && (
                <input
                  type="email"
                  placeholder="Your Email"
                  className="p-3 border rounded-lg w-full"
                />
              )}
              {i === 2 && (
                <textarea
                  placeholder="Your Message"
                  className="p-3 border rounded-lg w-full h-40 resize-none"
                ></textarea>
              )}
              {i === 3 && (
                <button
                  type="submit"
                  className="text-black px-6 py-3 rounded-lg font-semibold w-fit"
                >
                  Send Message
                </button>
              )}
            </motion.div>
          ))}
        </motion.form>
        </Container>
        <motion.div initial="hidden" animate="visible" variants={fadeInUp} custom={5}>
          <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
          <ul className="space-y-2 text-gray-700">
            <li>
              📧 Email:{" "}
              <a href="mailto:support@bidcenter.com" className="text-blue-600 underline">
                support@bidcenter.com
              </a>
            </li>
            <li>
              📞 Phone:{" "}
              <a href="tel:+1234567890" className="text-blue-600 underline">
                +1 (234) 567-890
              </a>
            </li>
            <li>
              🏢 Address: 123 Auction Ave, Bidders City, BC 90210
            </li>
          </ul>
          <p className="text-gray-500 mt-4">Our team typically responds within 24 hours.</p>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default ContactUs;
