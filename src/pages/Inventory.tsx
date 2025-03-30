
import React from "react";
import Navbar from "@/components/Navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Plus, Filter, ArrowUpDown, AlertCircle, CheckCircle, Clock } from "lucide-react";

const Inventory = () => {
  // Mock data for inventory items
  const inventoryItems = [
    {
      id: 1,
      name: "Fresh Tomatoes",
      category: "Produce",
      currentStock: 15,
      unit: "kg",
      minLevel: 20,
      status: "low",
      lastOrdered: "Sep 25, 2023",
      supplier: "Local Farm Co.",
      unitPrice: 3.50,
    },
    {
      id: 2,
      name: "Chicken Breast",
      category: "Meat",
      currentStock: 25,
      unit: "kg",
      minLevel: 15,
      status: "normal",
      lastOrdered: "Sep 28, 2023",
      supplier: "Premium Meats Inc.",
      unitPrice: 12.75,
    },
    {
      id: 3,
      name: "Olive Oil",
      category: "Pantry",
      currentStock: 8,
      unit: "bottles",
      minLevel: 10,
      status: "low",
      lastOrdered: "Sep 20, 2023",
      supplier: "Gourmet Oils Ltd.",
      unitPrice: 18.95,
    },
    {
      id: 4,
      name: "Flour",
      category: "Dry Goods",
      currentStock: 30,
      unit: "kg",
      minLevel: 20,
      status: "normal",
      lastOrdered: "Sep 15, 2023",
      supplier: "Bakers Supply Co.",
      unitPrice: 2.25,
    },
    {
      id: 5,
      name: "Heavy Cream",
      category: "Dairy",
      currentStock: 6,
      unit: "liters",
      minLevel: 12,
      status: "critical",
      lastOrdered: "Sep 22, 2023",
      supplier: "Local Dairy Farm",
      unitPrice: 6.50,
    },
    {
      id: 6,
      name: "Shrimp",
      category: "Seafood",
      currentStock: 18,
      unit: "kg",
      minLevel: 15,
      status: "normal",
      lastOrdered: "Sep 27, 2023",
      supplier: "Ocean Fresh Seafood",
      unitPrice: 24.95,
    },
    {
      id: 7,
      name: "Fresh Herbs",
      category: "Produce",
      currentStock: 10,
      unit: "bunches",
      minLevel: 15,
      status: "low",
      lastOrdered: "Sep 26, 2023",
      supplier: "Local Farm Co.",
      unitPrice: 2.50,
    },
    {
      id: 8,
      name: "Coffee Beans",
      category: "Beverages",
      currentStock: 22,
      unit: "kg",
      minLevel: 10,
      status: "normal",
      lastOrdered: "Sep 18, 2023",
      supplier: "Specialty Coffee Inc.",
      unitPrice: 32.00,
    },
  ];

  // Mock data for suppliers
  const suppliers = [
    {
      id: 1,
      name: "Local Farm Co.",
      contact: "John Smith",
      phone: "(555) 123-4567",
      email: "john@localfarm.com",
      category: "Produce",
      lastOrder: "Sep 25, 2023",
      status: "Active",
    },
    {
      id: 2,
      name: "Premium Meats Inc.",
      contact: "Sarah Johnson",
      phone: "(555) 234-5678",
      email: "sarah@premiummeats.com",
      category: "Meat",
      lastOrder: "Sep 28, 2023",
      status: "Active",
    },
    {
      id: 3,
      name: "Gourmet Oils Ltd.",
      contact: "Mike Williams",
      phone: "(555) 345-6789",
      email: "mike@gourmetoils.com",
      category: "Pantry",
      lastOrder: "Sep 20, 2023",
      status: "Active",
    },
    {
      id: 4,
      name: "Bakers Supply Co.",
      contact: "Lisa Brown",
      phone: "(555) 456-7890",
      email: "lisa@bakerssupply.com",
      category: "Dry Goods",
      lastOrder: "Sep 15, 2023",
      status: "Active",
    },
    {
      id: 5,
      name: "Local Dairy Farm",
      contact: "David Miller",
      phone: "(555) 567-8901",
      email: "david@localdairy.com",
      category: "Dairy",
      lastOrder: "Sep 22, 2023",
      status: "Active",
    },
  ];

  // Mock data for pending orders
  const pendingOrders = [
    {
      id: 1,
      supplier: "Premium Meats Inc.",
      orderDate: "Sep 29, 2023",
      expectedDelivery: "Oct 01, 2023",
      status: "In Transit",
      items: ["Chicken Breast", "Beef Sirloin", "Pork Loin"],
      total: 875.50,
    },
    {
      id: 2,
      supplier: "Ocean Fresh Seafood",
      orderDate: "Sep 28, 2023",
      expectedDelivery: "Sep 30, 2023",
      status: "Processing",
      items: ["Shrimp", "Salmon", "Scallops"],
      total: 650.25,
    },
    {
      id: 3,
      supplier: "Local Farm Co.",
      orderDate: "Sep 30, 2023",
      expectedDelivery: "Oct 01, 2023",
      status: "Scheduled",
      items: ["Fresh Tomatoes", "Fresh Herbs", "Lettuce", "Onions"],
      total: 320.75,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold text-culinary-navy mb-2">
              Inventory Management
            </h1>
            <p className="text-culinary-gray">
              Track, order, and manage your restaurant's ingredients and supplies
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-3">
            <button className="bg-white border border-gray-300 text-culinary-navy px-4 py-2 rounded-md hover:bg-gray-50 flex items-center">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </button>
            <button className="bg-culinary-teal text-white px-4 py-2 rounded-md hover:bg-opacity-90 flex items-center">
              <Plus className="h-4 w-4 mr-2" />
              Add New Item
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="dashboard-card bg-red-50 border-red-200">
            <div className="flex items-center">
              <div className="bg-red-100 p-2 rounded-md mr-3">
                <AlertCircle className="h-5 w-5 text-red-500" />
              </div>
              <div>
                <div className="card-title text-red-800">Low Stock Items</div>
                <div className="text-red-500 font-semibold text-lg">3 items</div>
              </div>
            </div>
            <button className="mt-2 w-full text-sm text-red-600 hover:underline">
              View Items
            </button>
          </div>

          <div className="dashboard-card bg-amber-50 border-amber-200">
            <div className="flex items-center">
              <div className="bg-amber-100 p-2 rounded-md mr-3">
                <Clock className="h-5 w-5 text-amber-500" />
              </div>
              <div>
                <div className="card-title text-amber-800">Pending Orders</div>
                <div className="text-amber-500 font-semibold text-lg">3 orders</div>
              </div>
            </div>
            <button className="mt-2 w-full text-sm text-amber-600 hover:underline">
              View Orders
            </button>
          </div>

          <div className="dashboard-card bg-green-50 border-green-200">
            <div className="flex items-center">
              <div className="bg-green-100 p-2 rounded-md mr-3">
                <CheckCircle className="h-5 w-5 text-green-500" />
              </div>
              <div>
                <div className="card-title text-green-800">In Stock Items</div>
                <div className="text-green-500 font-semibold text-lg">5 items</div>
              </div>
            </div>
            <button className="mt-2 w-full text-sm text-green-600 hover:underline">
              View Items
            </button>
          </div>
        </div>

        <Tabs defaultValue="inventory" className="mb-8">
          <TabsList className="mb-6">
            <TabsTrigger value="inventory">Inventory</TabsTrigger>
            <TabsTrigger value="suppliers">Suppliers</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="waste">Waste Tracking</TabsTrigger>
          </TabsList>

          <TabsContent value="inventory">
            <div className="dashboard-card">
              <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                <h2 className="text-xl font-semibold mb-4 md:mb-0">Inventory Items</h2>
                <div className="relative w-full md:w-64">
                  <input
                    type="text"
                    placeholder="Search inventory..."
                    className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-culinary-teal"
                  />
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="py-3 px-4 text-left text-sm font-semibold text-culinary-navy">
                        <div className="flex items-center cursor-pointer">
                          Item Name
                          <ArrowUpDown className="h-3 w-3 ml-1" />
                        </div>
                      </th>
                      <th className="py-3 px-4 text-left text-sm font-semibold text-culinary-navy">
                        Category
                      </th>
                      <th className="py-3 px-4 text-center text-sm font-semibold text-culinary-navy">
                        Stock
                      </th>
                      <th className="py-3 px-4 text-center text-sm font-semibold text-culinary-navy">
                        Min Level
                      </th>
                      <th className="py-3 px-4 text-left text-sm font-semibold text-culinary-navy">
                        Supplier
                      </th>
                      <th className="py-3 px-4 text-right text-sm font-semibold text-culinary-navy">
                        Unit Price
                      </th>
                      <th className="py-3 px-4 text-center text-sm font-semibold text-culinary-navy">
                        Status
                      </th>
                      <th className="py-3 px-4 text-center text-sm font-semibold text-culinary-navy">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {inventoryItems.map((item) => (
                      <tr
                        key={item.id}
                        className="border-t border-gray-100 hover:bg-gray-50"
                      >
                        <td className="py-3 px-4 text-sm font-medium">
                          {item.name}
                        </td>
                        <td className="py-3 px-4 text-sm text-culinary-gray">
                          {item.category}
                        </td>
                        <td className="py-3 px-4 text-sm text-center">
                          {item.currentStock} {item.unit}
                        </td>
                        <td className="py-3 px-4 text-sm text-center">
                          {item.minLevel} {item.unit}
                        </td>
                        <td className="py-3 px-4 text-sm text-culinary-gray">
                          {item.supplier}
                        </td>
                        <td className="py-3 px-4 text-sm text-right font-medium">
                          ${item.unitPrice.toFixed(2)}
                        </td>
                        <td className="py-3 px-4 text-sm text-center">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              item.status === "critical"
                                ? "bg-red-100 text-red-800"
                                : item.status === "low"
                                ? "bg-amber-100 text-amber-800"
                                : "bg-green-100 text-green-800"
                            }`}
                          >
                            {item.status === "critical"
                              ? "Critical"
                              : item.status === "low"
                              ? "Low"
                              : "In Stock"}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-sm text-center">
                          <button className="text-culinary-teal hover:underline mr-2">
                            Edit
                          </button>
                          <button className="text-culinary-gold hover:underline">
                            Order
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="suppliers">
            <div className="dashboard-card">
              <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                <h2 className="text-xl font-semibold mb-4 md:mb-0">Suppliers</h2>
                <div className="flex space-x-3">
                  <div className="relative w-full md:w-64">
                    <input
                      type="text"
                      placeholder="Search suppliers..."
                      className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-culinary-teal"
                    />
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                  </div>
                  <button className="bg-culinary-teal text-white px-4 py-2 rounded-md hover:bg-opacity-90 flex items-center">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Supplier
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="py-3 px-4 text-left text-sm font-semibold text-culinary-navy">
                        <div className="flex items-center cursor-pointer">
                          Supplier Name
                          <ArrowUpDown className="h-3 w-3 ml-1" />
                        </div>
                      </th>
                      <th className="py-3 px-4 text-left text-sm font-semibold text-culinary-navy">
                        Contact
                      </th>
                      <th className="py-3 px-4 text-left text-sm font-semibold text-culinary-navy">
                        Phone
                      </th>
                      <th className="py-3 px-4 text-left text-sm font-semibold text-culinary-navy">
                        Email
                      </th>
                      <th className="py-3 px-4 text-left text-sm font-semibold text-culinary-navy">
                        Category
                      </th>
                      <th className="py-3 px-4 text-left text-sm font-semibold text-culinary-navy">
                        Last Order
                      </th>
                      <th className="py-3 px-4 text-center text-sm font-semibold text-culinary-navy">
                        Status
                      </th>
                      <th className="py-3 px-4 text-center text-sm font-semibold text-culinary-navy">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {suppliers.map((supplier) => (
                      <tr
                        key={supplier.id}
                        className="border-t border-gray-100 hover:bg-gray-50"
                      >
                        <td className="py-3 px-4 text-sm font-medium">
                          {supplier.name}
                        </td>
                        <td className="py-3 px-4 text-sm text-culinary-gray">
                          {supplier.contact}
                        </td>
                        <td className="py-3 px-4 text-sm text-culinary-gray">
                          {supplier.phone}
                        </td>
                        <td className="py-3 px-4 text-sm text-culinary-gray">
                          {supplier.email}
                        </td>
                        <td className="py-3 px-4 text-sm text-culinary-gray">
                          {supplier.category}
                        </td>
                        <td className="py-3 px-4 text-sm text-culinary-gray">
                          {supplier.lastOrder}
                        </td>
                        <td className="py-3 px-4 text-sm text-center">
                          <span className="px-2 py-1 rounded-full bg-green-100 text-green-800 text-xs font-medium">
                            {supplier.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-sm text-center">
                          <button className="text-culinary-teal hover:underline mr-2">
                            Edit
                          </button>
                          <button className="text-culinary-gold hover:underline">
                            Order
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="orders">
            <div className="dashboard-card">
              <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                <h2 className="text-xl font-semibold mb-4 md:mb-0">Pending Orders</h2>
                <button className="bg-culinary-teal text-white px-4 py-2 rounded-md hover:bg-opacity-90 flex items-center">
                  <Plus className="h-4 w-4 mr-2" />
                  Create New Order
                </button>
              </div>

              <div className="space-y-4">
                {pendingOrders.map((order) => (
                  <div
                    key={order.id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex flex-col md:flex-row justify-between mb-2">
                      <div>
                        <h3 className="font-medium text-culinary-navy">
                          Order #{order.id} - {order.supplier}
                        </h3>
                        <p className="text-sm text-culinary-gray">
                          Ordered: {order.orderDate} | Expected: {order.expectedDelivery}
                        </p>
                      </div>
                      <div className="mt-2 md:mt-0">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            order.status === "In Transit"
                              ? "bg-blue-100 text-blue-800"
                              : order.status === "Processing"
                              ? "bg-amber-100 text-amber-800"
                              : "bg-purple-100 text-purple-800"
                          }`}
                        >
                          {order.status}
                        </span>
                      </div>
                    </div>
                    <div className="mt-2">
                      <p className="text-sm">
                        <span className="text-culinary-gray">Items: </span>
                        {order.items.join(", ")}
                      </p>
                    </div>
                    <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-100">
                      <span className="font-medium">
                        Total: ${order.total.toFixed(2)}
                      </span>
                      <div className="space-x-2">
                        <button className="px-3 py-1 text-sm border border-culinary-navy text-culinary-navy rounded hover:bg-culinary-navy hover:text-white transition-colors">
                          Details
                        </button>
                        <button className="px-3 py-1 text-sm bg-culinary-teal text-white rounded hover:bg-opacity-90 transition-colors">
                          Track Order
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="waste">
            <div className="dashboard-card">
              <h2 className="text-xl font-semibold mb-4">Waste Tracking</h2>
              <p className="text-culinary-gray mb-8">
                Track and analyze food waste to optimize inventory usage and reduce costs.
                This feature helps you identify patterns and take corrective actions.
              </p>
              <div className="flex justify-center">
                <div className="bg-culinary-navy/5 p-8 rounded-lg text-center">
                  <p className="text-culinary-navy">
                    Waste tracking features are coming soon
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

export default Inventory;
