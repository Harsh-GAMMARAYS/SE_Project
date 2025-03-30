
import React from "react";
import Navbar from "@/components/Navbar";
import EmployeeManagement from "@/components/Employees/EmployeeManagement";

const Employees = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <EmployeeManagement />
    </div>
  );
};

export default Employees;
