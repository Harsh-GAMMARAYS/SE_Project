
import React from "react";
import Navbar from "@/components/Navbar";
import SchedulingCalendar from "@/components/Scheduling/SchedulingCalendar";

const Scheduling = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <SchedulingCalendar />
    </div>
  );
};

export default Scheduling;
