import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, AlertCircle } from "lucide-react";
import { fetchInventoryStats, fetchInventoryItems } from "@/services/inventoryService";
import { InventoryItem } from "@/types/inventory";

const InventoryWidget = () => {
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([]);
  const [stats, setStats] = useState({
    lowStock: 0,
    criticalStock: 0,
    normalStock: 0,
    pendingOrders: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        // Fetch stats
        const statsData = await fetchInventoryStats();
        setStats({
          lowStock: statsData.lowStock,
          criticalStock: statsData.criticalStock,
          normalStock: statsData.normalStock,
          pendingOrders: statsData.pendingOrders
        });
        
        // Fetch inventory items
        const items = await fetchInventoryItems();
        const sortedItems = (items as InventoryItem[]).sort((a, b) => {
          const statusPriority: Record<string, number> = {
            critical: 0,
            low: 1,
            normal: 2
          };
          return statusPriority[a.status] - statusPriority[b.status];
        }).slice(0, 5);
        
        setInventoryItems(sortedItems);
      } catch (error) {
        console.error("Failed to load inventory data:", error);
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, []);

  return (
    <div className="dashboard-card h-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="card-title">Inventory Status</h2>
        <Link to="/inventory" className="text-sm text-culinary-teal hover:underline">
          View All
        </Link>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-12 bg-gray-100 animate-pulse rounded-md"></div>
          ))}
        </div>
      ) : (
        <>
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
                    {item.current_stock}
                  </span>
                  <span className="text-culinary-gray">/{item.min_level}</span>
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
              <span className="text-sm text-amber-700 font-medium">
                {stats.lowStock + stats.criticalStock} items
              </span>
            </div>
          </div>

          <div className="mt-4">
            <Link to="/inventory" className="block">
              <button className="w-full py-2 bg-culinary-navy text-white rounded-md hover:bg-opacity-90 transition-colors">
                Manage Inventory
              </button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default InventoryWidget;
