
import React from "react";
import Navbar from "@/components/Navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Download, Filter, Calendar } from "lucide-react";

const Finances = () => {
  // Mock data for revenue by category
  const revenueByCategory = [
    { name: "Main Courses", value: 45000 },
    { name: "Appetizers", value: 15000 },
    { name: "Beverages", value: 20000 },
    { name: "Desserts", value: 12000 },
    { name: "Catering", value: 30000 },
  ];

  // Mock data for expenses by category
  const expensesByCategory = [
    { name: "Ingredients", value: 42000 },
    { name: "Staff Wages", value: 35000 },
    { name: "Utilities", value: 8000 },
    { name: "Rent", value: 12000 },
    { name: "Marketing", value: 5000 },
    { name: "Other", value: 3000 },
  ];

  // Colors for pie charts - updated to match new theme
  const REVENUE_COLORS = ["#8174A0", "#9985B5", "#A888B5", "#B8A4C9", "#D5C6E0"];
  const EXPENSE_COLORS = ["#EFB6C8", "#F2C4D2", "#F5D2DC", "#F8E0E7", "#FBEEF1", "#FFD2A0"];

  // Mock data for monthly financial data
  const monthlyFinancialData = [
    {
      name: "Jan",
      revenue: 85000,
      expenses: 72000,
      profit: 13000,
    },
    {
      name: "Feb",
      revenue: 92000,
      expenses: 75000,
      profit: 17000,
    },
    {
      name: "Mar",
      revenue: 88000,
      expenses: 70000,
      profit: 18000,
    },
    {
      name: "Apr",
      revenue: 99000,
      expenses: 78000,
      profit: 21000,
    },
    {
      name: "May",
      revenue: 105000,
      expenses: 82000,
      profit: 23000,
    },
    {
      name: "Jun",
      revenue: 112000,
      expenses: 85000,
      profit: 27000,
    },
  ];

  // Financial KPI metrics
  const financialKPIs = [
    {
      title: "Revenue",
      value: "$122,500",
      change: "+8.2%",
      trend: "up",
    },
    {
      title: "Expenses",
      value: "$85,000",
      change: "-3.5%",
      trend: "down",
    },
    {
      title: "Net Profit",
      value: "$37,500",
      change: "+12.7%",
      trend: "up",
    },
    {
      title: "Profit Margin",
      value: "30.6%",
      change: "+4.3%",
      trend: "up",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold text-culinary-navy mb-2">
              Financial Management
            </h1>
            <p className="text-culinary-gray">
              Track, analyze, and manage your restaurant's finances
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-3">
            <button className="bg-white border border-gray-300 text-culinary-navy px-4 py-2 rounded-md hover:bg-gray-50 flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              Jun 1 - Jun 30, 2023
            </button>
            <button className="bg-culinary-navy text-white px-4 py-2 rounded-md hover:bg-opacity-90 flex items-center">
              <Download className="h-4 w-4 mr-2" />
              Export Reports
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {financialKPIs.map((kpi, index) => (
            <div key={index} className="dashboard-card">
              <div className="card-title">{kpi.title}</div>
              <div className="stat-value text-culinary-navy">{kpi.value}</div>
              <div className="flex items-center mt-2">
                <span
                  className={
                    kpi.trend === "up" ? "up-trend text-sm" : "down-trend text-sm"
                  }
                >
                  {kpi.trend === "up" ? "↑" : "↓"} {kpi.change}
                </span>
                <span className="text-culinary-gray text-sm ml-1">vs last month</span>
              </div>
            </div>
          ))}
        </div>

        <Tabs defaultValue="overview" className="mb-8">
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
            <TabsTrigger value="expenses">Expenses</TabsTrigger>
            <TabsTrigger value="taxes">Taxes</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="dashboard-card">
              <h2 className="card-title mb-4">Monthly Financial Trends</h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={monthlyFinancialData}
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
                      formatter={(value) => [
                        `$${value.toLocaleString()}`,
                        undefined,
                      ]}
                      labelStyle={{ color: "#8174A0" }}
                      contentStyle={{
                        backgroundColor: "white",
                        borderColor: "#E2E8F0",
                        borderRadius: "0.375rem",
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="dashboard-card">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="card-title">Revenue Breakdown</h2>
                  <button className="text-sm text-culinary-navy hover:underline flex items-center">
                    <Filter className="h-3 w-3 mr-1" /> Filter
                  </button>
                </div>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={revenueByCategory}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) =>
                          `${name}: ${(percent * 100).toFixed(0)}%`
                        }
                      >
                        {revenueByCategory.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={REVENUE_COLORS[index % REVENUE_COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value) => [
                          `$${value.toLocaleString()}`,
                          "Revenue",
                        ]}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="dashboard-card">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="card-title">Expense Breakdown</h2>
                  <button className="text-sm text-culinary-navy hover:underline flex items-center">
                    <Filter className="h-3 w-3 mr-1" /> Filter
                  </button>
                </div>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={expensesByCategory}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) =>
                          `${name}: ${(percent * 100).toFixed(0)}%`
                        }
                      >
                        {expensesByCategory.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={EXPENSE_COLORS[index % EXPENSE_COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value) => [
                          `$${value.toLocaleString()}`,
                          "Expenses",
                        ]}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="revenue">
            <div className="dashboard-card">
              <h2 className="text-xl font-semibold mb-4">Revenue Analysis</h2>
              <p className="text-culinary-gray mb-8">
                Detailed revenue analysis will appear here. This section will include
                revenue by menu item, service type, time of day, and customer segments.
              </p>
              <div className="flex justify-center">
                <div className="bg-culinary-navy/5 p-8 rounded-lg text-center">
                  <p className="text-culinary-navy">
                    Revenue analysis data is being prepared
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="expenses">
            <div className="dashboard-card">
              <h2 className="text-xl font-semibold mb-4">Expense Management</h2>
              <p className="text-culinary-gray mb-8">
                Detailed expense management tools will appear here. This section will include
                expense categorization, vendor payments, and cost optimization recommendations.
              </p>
              <div className="flex justify-center">
                <div className="bg-culinary-navy/5 p-8 rounded-lg text-center">
                  <p className="text-culinary-navy">
                    Expense management features are being prepared
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="taxes">
            <div className="dashboard-card">
              <h2 className="text-xl font-semibold mb-4">Tax Management</h2>
              <p className="text-culinary-gray mb-8">
                Tax calculation and filing tools will appear here. This section will include
                sales tax tracking, employee withholdings, and tax deduction recommendations.
              </p>
              <div className="flex justify-center">
                <div className="bg-culinary-navy/5 p-8 rounded-lg text-center">
                  <p className="text-culinary-navy">
                    Tax management features are being prepared
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="reports">
            <div className="dashboard-card">
              <h2 className="text-xl font-semibold mb-4">Financial Reports</h2>
              <p className="text-culinary-gray mb-8">
                Generated financial reports will appear here. This section will include
                profit and loss statements, balance sheets, and cash flow statements.
              </p>
              <div className="flex justify-center">
                <div className="bg-culinary-navy/5 p-8 rounded-lg text-center">
                  <p className="text-culinary-navy">
                    Financial report generator is being prepared
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Finances;
