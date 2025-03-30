
import React from "react";
import Navbar from "@/components/Navbar";
import { CreditCard, Link, Plus, ArrowUp, ArrowDown } from "lucide-react";

const Banking = () => {
  // Mock data for bank accounts
  const accounts = [
    {
      id: 1,
      name: "Business Checking",
      balance: 24680.45,
      accountNumber: "****3456",
      bank: "Chase Bank",
      type: "checking",
    },
    {
      id: 2,
      name: "Business Savings",
      balance: 85750.22,
      accountNumber: "****7890",
      bank: "Bank of America",
      type: "savings",
    },
    {
      id: 3,
      name: "Restaurant Operations",
      balance: 12500.00,
      accountNumber: "****4321",
      bank: "Wells Fargo",
      type: "checking",
    },
  ];

  // Mock data for recent transactions
  const transactions = [
    {
      id: 1,
      description: "Produce Wholesale Inc.",
      date: "Today, 10:45 AM",
      amount: -1540.75,
      type: "expense",
      category: "Ingredients",
    },
    {
      id: 2,
      description: "Evening Dinner Service",
      date: "Today, 09:30 AM",
      amount: 4125.50,
      type: "income",
      category: "Sales",
    },
    {
      id: 3,
      description: "Staff Payroll",
      date: "Yesterday, 05:15 PM",
      amount: -6750.00,
      type: "expense",
      category: "Payroll",
    },
    {
      id: 4,
      description: "City Water & Sewage",
      date: "Yesterday, 02:30 PM",
      amount: -325.42,
      type: "expense",
      category: "Utilities",
    },
    {
      id: 5,
      description: "Lunch Service",
      date: "Yesterday, 01:45 PM",
      amount: 2870.85,
      type: "income",
      category: "Sales",
    },
    {
      id: 6,
      description: "Wine Distributor LLC",
      date: "Sep 25, 2023",
      amount: -1890.35,
      type: "expense",
      category: "Beverages",
    },
    {
      id: 7,
      description: "Private Event Booking",
      date: "Sep 24, 2023",
      amount: 3500.00,
      type: "income",
      category: "Catering",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold text-culinary-navy mb-2">
              Banking
            </h1>
            <p className="text-culinary-gray">
              Manage your restaurant's bank accounts and transactions
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-3">
            <button className="bg-white border border-gray-300 text-culinary-navy px-4 py-2 rounded-md hover:bg-gray-50 flex items-center">
              <Link className="h-4 w-4 mr-2" />
              Connect Account
            </button>
            <button className="bg-culinary-teal text-white px-4 py-2 rounded-md hover:bg-opacity-90 flex items-center">
              <Plus className="h-4 w-4 mr-2" />
              Create Transfer
            </button>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="section-title">Accounts Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {accounts.map((account) => (
              <div
                key={account.id}
                className="dashboard-card hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center mb-4">
                  <div className="bg-culinary-navy p-2 rounded-md mr-3">
                    <CreditCard className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-culinary-navy">
                      {account.name}
                    </div>
                    <div className="text-xs text-culinary-gray">
                      {account.bank} • {account.accountNumber}
                    </div>
                  </div>
                </div>
                <div className="mb-2">
                  <div className="text-sm text-culinary-gray">Balance</div>
                  <div className="text-2xl font-bold text-culinary-navy">
                    ${account.balance.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                  </div>
                </div>
                <div className="flex space-x-2 mt-4">
                  <button className="bg-culinary-navy text-white px-3 py-1 rounded text-sm flex-1 hover:bg-opacity-90">
                    View Details
                  </button>
                  <button className="bg-white border border-culinary-navy text-culinary-navy px-3 py-1 rounded text-sm flex-1 hover:bg-gray-50">
                    Transfer
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="section-title">Recent Transactions</h2>
            <div className="flex items-center space-x-4">
              <div>
                <select className="bg-white border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-culinary-teal">
                  <option value="all">All Accounts</option>
                  {accounts.map((account) => (
                    <option key={account.id} value={account.id}>
                      {account.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <select className="bg-white border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-culinary-teal">
                  <option value="all">All Categories</option>
                  <option value="ingredients">Ingredients</option>
                  <option value="utilities">Utilities</option>
                  <option value="payroll">Payroll</option>
                  <option value="sales">Sales</option>
                  <option value="catering">Catering</option>
                </select>
              </div>
            </div>
          </div>

          <div className="dashboard-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="py-3 px-4 text-left text-sm font-semibold text-culinary-navy">
                      Description
                    </th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-culinary-navy">
                      Category
                    </th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-culinary-navy">
                      Date
                    </th>
                    <th className="py-3 px-4 text-right text-sm font-semibold text-culinary-navy">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((transaction) => (
                    <tr
                      key={transaction.id}
                      className="border-t border-gray-100 hover:bg-gray-50"
                    >
                      <td className="py-3 px-4 text-sm">
                        <div className="flex items-center">
                          <div
                            className={`p-1 rounded-full mr-2 ${
                              transaction.type === "income"
                                ? "bg-green-100"
                                : "bg-red-100"
                            }`}
                          >
                            {transaction.type === "income" ? (
                              <ArrowDown className="h-3 w-3 text-green-600" />
                            ) : (
                              <ArrowUp className="h-3 w-3 text-red-600" />
                            )}
                          </div>
                          {transaction.description}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm text-culinary-gray">
                        {transaction.category}
                      </td>
                      <td className="py-3 px-4 text-sm text-culinary-gray">
                        {transaction.date}
                      </td>
                      <td
                        className={`py-3 px-4 text-sm font-semibold text-right ${
                          transaction.type === "income"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {transaction.type === "income" ? "+" : "-"}$
                        {Math.abs(transaction.amount).toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 py-3 px-4 border-t border-gray-100 flex justify-between items-center">
              <div className="text-sm text-culinary-gray">
                Showing 7 of 243 transactions
              </div>
              <div className="flex space-x-2">
                <button className="px-3 py-1 border border-gray-300 rounded text-sm text-culinary-gray hover:bg-gray-50">
                  Previous
                </button>
                <button className="px-3 py-1 bg-culinary-teal text-white rounded text-sm hover:bg-opacity-90">
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banking;
