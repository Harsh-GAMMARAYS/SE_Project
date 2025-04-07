
import React from "react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from "recharts";

const FinancialSummary = () => {
  // Mock data for the financial chart
  const financialData = [
    {
      name: "Jan",
      revenue: 45000,
      expenses: 38000,
      profit: 7000,
    },
    {
      name: "Feb",
      revenue: 52000,
      expenses: 42000,
      profit: 10000,
    },
    {
      name: "Mar",
      revenue: 48000,
      expenses: 39000,
      profit: 9000,
    },
    {
      name: "Apr",
      revenue: 58000,
      expenses: 45000,
      profit: 13000,
    },
    {
      name: "May",
      revenue: 65000,
      expenses: 48000,
      profit: 17000,
    },
    {
      name: "Jun",
      revenue: 72000,
      expenses: 51000,
      profit: 21000,
    },
  ];

  return (
    <div className="dashboard-card h-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="card-title">Financial Summary</h2>
        <div className="flex space-x-2">
          <button className="px-3 py-1 text-xs rounded-md bg-culinary-navy text-white">
            6M
          </button>
          <button className="px-3 py-1 text-xs rounded-md border border-gray-300 text-culinary-gray hover:bg-gray-100">
            1Y
          </button>
          <button className="px-3 py-1 text-xs rounded-md border border-gray-300 text-culinary-gray hover:bg-gray-100">
            All
          </button>
        </div>
      </div>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={financialData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" />
            <YAxis 
              axisLine={false} 
              tickLine={false}
              tickFormatter={(value) => `$${value / 1000}k`}
            />
            <Tooltip 
              formatter={(value) => [`$${value.toLocaleString()}`, undefined]}
              labelStyle={{ color: "#8174A0" }}
              contentStyle={{ 
                backgroundColor: "white", 
                borderColor: "#E2E8F0",
                borderRadius: "0.375rem"
              }}
            />
            <Legend />
            <Bar 
              dataKey="revenue" 
              name="Revenue" 
              fill="#8174A0" 
              radius={[4, 4, 0, 0]} 
            />
            <Bar 
              dataKey="expenses" 
              name="Expenses" 
              fill="#EFB6C8" 
              radius={[4, 4, 0, 0]} 
            />
            <Bar 
              dataKey="profit" 
              name="Net Profit" 
              fill="#FFD2A0" 
              radius={[4, 4, 0, 0]} 
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default FinancialSummary;

