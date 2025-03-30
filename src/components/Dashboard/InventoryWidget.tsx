
import React from "react";
import { ShoppingCart, AlertCircle } from "lucide-react";

const InventoryWidget = () => {
  // Mock data for inventory items
  const inventoryItems = [
    {
      id: 1,
      name: "Fresh Tomatoes",
      currentStock: 15,
      minStock: 20,
      unit: "kg",
      status: "low",
    },
    {
      id: 2,
      name: "Chicken Breast",
      currentStock: 25,
      minStock: 15,
      unit: "kg",
      status: "normal",
    },
    {
      id: 3,
      name: "Olive Oil",
      currentStock: 8,
      minStock: 10,
      unit: "bottles",
      status: "low",
    },
    {
      id: 4,
      name: "Flour",
      currentStock: 30,
      minStock: 20,
      unit: "kg",
      status: "normal",
    },
    {
      id: 5,
      name: "Heavy Cream",
      currentStock: 6,
      minStock: 12,
      unit: "liters",
      status: "critical",
    },
  ];

  return (
    <div className="dashboard-card h-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="card-title">Inventory Status</h2>
        <button className="text-sm text-culinary-teal hover:underline">
          View All
        </button>
      </div>

      <div className="space-y-3">
        {inventoryItems.map((item) => (
          <div
            key={item.id}
            className={`flex items-center justify-between p-2 rounded-md ${
              item.status === "critical"
                ? "bg-red-50 border border-red-200"
                : item.status === "low"
                ? "bg-amber-50 border border-amber-200"
                : "bg-gray-50 border border-gray-200"
            }`}
          >
            <div className="flex items-center">
              {item.status === "critical" && (
                <AlertCircle className="h-4 w-4 text-red-500 mr-2" />
              )}
              <span
                className={`text-sm font-medium ${
                  item.status === "critical" ? "text-red-700" : ""
                }`}
              >
                {item.name}
              </span>
            </div>
            <div className="text-sm">
              <span
                className={`font-medium ${
                  item.status === "critical"
                    ? "text-red-700"
                    : item.status === "low"
                    ? "text-amber-700"
                    : "text-green-700"
                }`}
              >
                {item.currentStock}
              </span>
              <span className="text-culinary-gray">/{item.minStock}</span>
              <span className="text-xs text-culinary-gray ml-1">
                {item.unit}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between bg-amber-50 p-3 rounded-md">
          <div className="flex items-center">
            <ShoppingCart className="h-5 w-5 text-amber-500 mr-2" />
            <span className="text-sm font-medium">Order Alert</span>
          </div>
          <span className="text-sm text-amber-700 font-medium">3 items</span>
        </div>
      </div>

      <div className="mt-4">
        <button className="w-full py-2 bg-culinary-navy text-white rounded-md hover:bg-opacity-90 transition-colors">
          Manage Inventory
        </button>
      </div>
    </div>
  );
};

export default InventoryWidget;
