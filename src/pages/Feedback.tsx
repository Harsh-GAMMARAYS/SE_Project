
import React from "react";
import Navbar from "@/components/Navbar";
import CustomerFeedback from "@/components/Feedback/CustomerFeedback";

const Feedback = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <CustomerFeedback />
    </div>
  );
};

export default Feedback;
