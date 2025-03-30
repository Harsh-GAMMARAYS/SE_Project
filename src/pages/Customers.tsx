
import React from "react";
import Navbar from "@/components/Navbar";
import CustomerManagement from "@/components/Customers/CustomerManagement";

const Customers = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <CustomerManagement />
    </div>
  );
};

export default Customers;
