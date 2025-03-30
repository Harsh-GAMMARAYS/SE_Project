
import React from "react";
import BankingWidget from "./BankingWidget";
import FinancialSummary from "./FinancialSummary";
import InventoryWidget from "./InventoryWidget";
import RecentTransactions from "./RecentTransactions";

const DashboardOverview = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-culinary-navy">
          Financial Dashboard
        </h1>
        <div className="mt-4 md:mt-0">
          <select className="bg-white border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-culinary-teal">
            <option value="today">Today</option>
            <option value="yesterday">Yesterday</option>
            <option value="week" selected>
              This Week
            </option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="dashboard-card">
          <div className="card-title">Daily Revenue</div>
          <div className="stat-value text-culinary-navy">$3,854</div>
          <div className="flex items-center mt-2">
            <span className="up-trend text-sm">↑ 12.5%</span>
            <span className="text-culinary-gray text-sm ml-1">vs yesterday</span>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-title">Monthly Revenue</div>
          <div className="stat-value text-culinary-navy">$72,145</div>
          <div className="flex items-center mt-2">
            <span className="up-trend text-sm">↑ 8.2%</span>
            <span className="text-culinary-gray text-sm ml-1">vs last month</span>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-title">Expenses</div>
          <div className="stat-value text-culinary-navy">$42,891</div>
          <div className="flex items-center mt-2">
            <span className="down-trend text-sm">↓ 3.1%</span>
            <span className="text-culinary-gray text-sm ml-1">vs last month</span>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-title">Net Profit</div>
          <div className="stat-value text-culinary-navy">$29,254</div>
          <div className="flex items-center mt-2">
            <span className="up-trend text-sm">↑ 15.4%</span>
            <span className="text-culinary-gray text-sm ml-1">vs last month</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <FinancialSummary />
        </div>
        <div>
          <BankingWidget />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentTransactions />
        </div>
        <div>
          <InventoryWidget />
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
