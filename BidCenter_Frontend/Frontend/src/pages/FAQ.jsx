import React, { useEffect, useState, useContext } from "react";
import Header from '../components/Header';
import Footer from '../components/Footer';
import UserHeader from '../components/UserHeader';
import { AuthContext } from "../context/AuthContext"; // Used for user access

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const { user } = useContext(AuthContext); // ✅ Fix: Get user from AuthContext

  const faqs = [
    {
      question: 'What is the best online auction platform?',
      answer: 'The best online auction platform or auction software offers a user-friendly interface and enables features such as buying, browsing and bidding against a required material',
    },
    {
      question: 'What is a procurement auction?',
      answer: 'A procurement auction is where buyers invite suppliers to bid for contracts, usually in reverse auction format.',
    },
    {
      question: 'What is reverse auction software?',
      answer: 'Reverse auction software allows sellers to compete to offer the lowest price to a buyer, driving down costs.',
    },
    {
      question: 'How do I place a bid?',
      answer: 'To place a bid, you must first create an account and be logged in. Then, find the item you want and enter your maximum bid.',
    },
    {
      question: 'What happens if I am outbid?',
      answer: 'If you are outbid, you will be notified, and you can choose to bid again.',
    },
    {
      question: 'How do I win an auction?',
      answer: 'You win an auction by being the highest bidder when the auction closes.',
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <style>
        {`
          .faq-answer-container {
            text-align: left !important;
            display: block !important;
          }
        `}
      </style>

      {/* ✅ Renders admin or user header based on role */}
      {user?.role === "admin" ? <Header /> : <UserHeader />}

      <main className="p-6 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h1>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index}>
              <button
                onClick={() => toggleFAQ(index)}
                style={{
                  width: '100%',
                  padding: 0,
                  textAlign: 'center',
                  fontWeight: '500',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  border: 'none',
                  backgroundColor: 'transparent',
                  outline: 'none',
                  boxSizing: 'border-box',
                  cursor: 'pointer',
                }}
              >
                {faq.question}
                <span className="ml-2">{openIndex === index ? '▲' : '▼'}</span>
              </button>
              {openIndex === index && (
                <div className="p-4 pt-0 text-gray-700 faq-answer-container">
                  {faq.answer}
                </div>
              )}
              {index < faqs.length - 1 && <hr className="my-2 border-gray-200" />}
            </div>
          ))}
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default FAQ;
