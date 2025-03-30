
import React from "react";
import { CreditCard, ArrowUp, ArrowDown } from "lucide-react";

const BankingWidget = () => {
  // Mock data for connected accounts
  const accounts = [
    {
      id: 1,
      name: "Business Checking",
      balance: 24680.45,
      accountNumber: "****3456",
      type: "checking",
    },
    {
      id: 2,
      name: "Business Savings",
      balance: 85750.22,
      accountNumber: "****7890",
      type: "savings",
    },
  ];

  return (
    <div className="dashboard-card h-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="card-title">Banking</h2>
        <button className="text-sm text-culinary-teal hover:underline">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {accounts.map((account) => (
          <div
            key={account.id}
            className="p-3 border border-gray-200 rounded-md bg-gray-50"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="bg-culinary-navy p-2 rounded-md mr-3">
                  <CreditCard className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className="font-medium text-culinary-navy">
                    {account.name}
                  </div>
                  <div className="text-xs text-culinary-gray">
                    {account.accountNumber}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-culinary-navy">
                  ${account.balance.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                </div>
                <div className="text-xs text-culinary-gray capitalize">
                  {account.type}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4">
        <h3 className="text-sm font-medium mb-2">Recent Activity</h3>
        <div className="space-y-2">
          <div className="flex items-center justify-between p-2 border-b border-gray-100">
            <div className="flex items-center">
              <div className="p-1 rounded-full bg-red-100 mr-2">
                <ArrowUp className="h-3 w-3 text-red-500" />
              </div>
              <span className="text-sm">Supplier Payment</span>
            </div>
            <div className="text-sm font-medium text-red-500">-$2,540.00</div>
          </div>
          <div className="flex items-center justify-between p-2 border-b border-gray-100">
            <div className="flex items-center">
              <div className="p-1 rounded-full bg-green-100 mr-2">
                <ArrowDown className="h-3 w-3 text-green-500" />
              </div>
              <span className="text-sm">Sales Deposit</span>
            </div>
            <div className="text-sm font-medium text-green-500">+$4,890.75</div>
          </div>
          <div className="flex items-center justify-between p-2 border-b border-gray-100">
            <div className="flex items-center">
              <div className="p-1 rounded-full bg-red-100 mr-2">
                <ArrowUp className="h-3 w-3 text-red-500" />
              </div>
              <span className="text-sm">Utility Bill</span>
            </div>
            <div className="text-sm font-medium text-red-500">-$845.30</div>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <button className="w-full py-2 bg-culinary-teal text-white rounded-md hover:bg-opacity-90 transition-colors">
          Connect Bank Account
        </button>
      </div>
    </div>
  );
};

export default BankingWidget;
