
import React from "react";
import Navbar from "@/components/Navbar";
import DashboardOverview from "@/components/Dashboard/DashboardOverview";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <DashboardOverview />
    </div>
  );
};

export default Index;
