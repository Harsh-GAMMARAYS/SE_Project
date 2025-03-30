
import React from "react";
import { 
  CreditCard, 
  ShoppingCart, 
  Users, 
  Zap, 
  Search 
} from "lucide-react";

const RecentTransactions = () => {
  // Mock data for transactions
  const transactions = [
    {
      id: 1,
      description: "Sysco Food Service",
      category: "Ingredients",
      date: "Today, 10:45 AM",
      amount: -1845.75,
      type: "expense",
      icon: ShoppingCart,
    },
    {
      id: 2,
      description: "Evening Service Sales",
      category: "Revenue",
      date: "Today, 09:30 AM",
      amount: 3254.50,
      type: "income",
      icon: CreditCard,
    },
    {
      id: 3,
      description: "Staff Payroll",
      category: "Salaries",
      date: "Yesterday, 05:15 PM",
      amount: -4850.00,
      type: "expense",
      icon: Users,
    },
    {
      id: 4,
      description: "Electric Bill",
      category: "Utilities",
      date: "Yesterday, 02:30 PM",
      amount: -527.35,
      type: "expense",
      icon: Zap,
    },
    {
      id: 5,
      description: "Lunch Service Sales",
      category: "Revenue",
      date: "Yesterday, 01:45 PM",
      amount: 2145.85,
      type: "income",
      icon: CreditCard,
    },
  ];

  return (
    <div className="dashboard-card h-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="card-title">Recent Transactions</h2>
        <div className="relative">
          <input
            type="text"
            placeholder="Search transactions..."
            className="pl-8 pr-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-culinary-teal"
          />
          <Search className="absolute left-2 top-1.5 h-4 w-4 text-gray-400" />
        </div>
      </div>

      <div className="space-y-2">
        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            className="flex items-center justify-between p-3 border-b border-gray-100 hover:bg-gray-50 rounded-md transition-colors"
          >
            <div className="flex items-center">
              <div
                className={`p-2 rounded-md mr-3 ${
                  transaction.type === "income"
                    ? "bg-green-100"
                    : "bg-red-100"
                }`}
              >
                <transaction.icon
                  className={`h-4 w-4 ${
                    transaction.type === "income"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                />
              </div>
              <div>
                <div className="font-medium text-culinary-navy">
                  {transaction.description}
                </div>
                <div className="text-xs text-culinary-gray">
                  {transaction.category} • {transaction.date}
                </div>
              </div>
            </div>
            <div
              className={`font-semibold ${
                transaction.type === "income"
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {transaction.type === "income" ? "+" : ""}
              ${Math.abs(transaction.amount).toLocaleString("en-US", {
                minimumFractionDigits: 2,
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 text-center">
        <button className="text-culinary-teal hover:underline text-sm">
          View All Transactions
        </button>
      </div>
    </div>
  );
};

export default RecentTransactions;
