
import React, { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import Navbar from "@/components/Navbar";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { 
  Search, 
  Plus, 
  Filter, 
  ArrowUpDown, 
  AlertCircle, 
  CheckCircle, 
  Clock,
  Edit,
  Trash2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InventoryItem, Supplier, Order } from "@/types/inventory";
import { 
  fetchInventoryItems,
  fetchSuppliers,
  fetchOrders,
  fetchInventoryStats,
  createInventoryItem,
  updateInventoryItem,
  deleteInventoryItem,
  createSupplier,
  updateSupplier,
  deleteSupplier,
  createOrder,
  getOrderWithItems,
  updateOrderStatus
} from "@/services/inventoryService";
import InventoryItemForm from "./InventoryItemForm";
import SupplierForm from "./SupplierForm";
import OrderForm from "./OrderForm";
import OrderDetails from "./OrderDetails";

const InventoryPage = () => {
  const { toast } = useToast();
  
  // Data state
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<InventoryItem[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [filteredSuppliers, setFilteredSuppliers] = useState<Supplier[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [stats, setStats] = useState({
    lowStock: 0,
    criticalStock: 0,
    normalStock: 0,
    pendingOrders: 0
  });
  
  // UI state
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [supplierSearchTerm, setSupplierSearchTerm] = useState("");
  const [orderSearchTerm, setOrderSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("inventory");
  const [sortBy, setSortBy] = useState<{ field: string, direction: 'asc' | 'desc' }>({ 
    field: "name", 
    direction: "asc" 
  });
  
  // Modal state
  const [itemFormOpen, setItemFormOpen] = useState(false);
  const [supplierFormOpen, setSupplierFormOpen] = useState(false);
  const [orderFormOpen, setOrderFormOpen] = useState(false);
  const [orderDetailsOpen, setOrderDetailsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<{id: string, name: string, type: 'item' | 'supplier'} | null>(null);

  // Load data
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [itemsData, suppliersData, ordersData, statsData] = await Promise.all([
          fetchInventoryItems(),
          fetchSuppliers(),
          fetchOrders(),
          fetchInventoryStats()
        ]);
        
        setInventoryItems(itemsData as InventoryItem[]);
        setFilteredItems(itemsData as InventoryItem[]);
        setSuppliers(suppliersData as Supplier[]);
        setFilteredSuppliers(suppliersData as Supplier[]);
        setOrders(ordersData as Order[]);
        setStats({
          lowStock: statsData.lowStock,
          criticalStock: statsData.criticalStock,
          normalStock: statsData.normalStock,
          pendingOrders: statsData.pendingOrders
        });
      } catch (error) {
        console.error("Failed to load inventory data:", error);
        toast({
          title: "Error loading data",
          description: "Could not load inventory data. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, [toast]);
  
  // Filter inventory items when search term changes
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredItems(inventoryItems);
    } else {
      const lowercasedTerm = searchTerm.toLowerCase();
      const filtered = inventoryItems.filter(item => 
        item.name.toLowerCase().includes(lowercasedTerm) ||
        item.category.toLowerCase().includes(lowercasedTerm)
      );
      setFilteredItems(filtered);
    }
  }, [searchTerm, inventoryItems]);
  
  // Filter suppliers when supplier search term changes
  useEffect(() => {
    if (supplierSearchTerm.trim() === "") {
      setFilteredSuppliers(suppliers);
    } else {
      const lowercasedTerm = supplierSearchTerm.toLowerCase();
      const filtered = suppliers.filter(supplier => 
        supplier.name.toLowerCase().includes(lowercasedTerm) ||
        (supplier.category && supplier.category.toLowerCase().includes(lowercasedTerm))
      );
      setFilteredSuppliers(filtered);
    }
  }, [supplierSearchTerm, suppliers]);
  
  // Sort inventory items
  const handleSort = (field: string) => {
    const newDirection = sortBy.field === field && sortBy.direction === 'asc' ? 'desc' : 'asc';
    setSortBy({ field, direction: newDirection });
    
    const sortedItems = [...filteredItems].sort((a, b) => {
      // Handle case where values might be undefined or null
      const valueA = a[field as keyof InventoryItem];
      const valueB = b[field as keyof InventoryItem];
      
      if (valueA === valueB) return 0;
      if (valueA === null || valueA === undefined) return 1;
      if (valueB === null || valueB === undefined) return -1;
      
      // Compare values based on type
      const result = typeof valueA === 'string' 
        ? (valueA as string).localeCompare(valueB as string) 
        : Number(valueA) < Number(valueB) ? -1 : 1;
        
      return sortBy.direction === 'asc' ? result : -result;
    });
    
    setFilteredItems(sortedItems);
  };
  
  // CRUD operations for inventory items
  const handleCreateItem = async (data: Omit<InventoryItem, "id" | "created_at" | "updated_at">) => {
    const newItem = await createInventoryItem(data);
    if (newItem) {
      const updatedItems = await fetchInventoryItems();
      setInventoryItems(updatedItems as InventoryItem[]);
      setFilteredItems(updatedItems as InventoryItem[]);
      const statsData = await fetchInventoryStats();
      setStats({
        lowStock: statsData.lowStock,
        criticalStock: statsData.criticalStock,
        normalStock: statsData.normalStock,
        pendingOrders: statsData.pendingOrders
      });
    }
  };
  
  const handleUpdateItem = async (data: Omit<InventoryItem, "id" | "created_at" | "updated_at">) => {
    if (!selectedItem) return;
    
    const updatedItem = await updateInventoryItem(selectedItem.id, data);
    if (updatedItem) {
      const updatedItems = await fetchInventoryItems();
      setInventoryItems(updatedItems as InventoryItem[]);
      setFilteredItems(updatedItems as InventoryItem[]);
      const statsData = await fetchInventoryStats();
      setStats({
        lowStock: statsData.lowStock,
        criticalStock: statsData.criticalStock,
        normalStock: statsData.normalStock,
        pendingOrders: statsData.pendingOrders
      });
    }
  };
  
  const handleDeleteItem = async () => {
    if (!itemToDelete) return;
    
    if (itemToDelete.type === 'item') {
      const success = await deleteInventoryItem(itemToDelete.id, itemToDelete.name);
      if (success) {
        const updatedItems = await fetchInventoryItems();
        setInventoryItems(updatedItems as InventoryItem[]);
        setFilteredItems(updatedItems as InventoryItem[]);
        const statsData = await fetchInventoryStats();
        setStats({
          lowStock: statsData.lowStock,
          criticalStock: statsData.criticalStock,
          normalStock: statsData.normalStock,
          pendingOrders: statsData.pendingOrders
        });
      }
    } else {
      const success = await deleteSupplier(itemToDelete.id, itemToDelete.name);
      if (success) {
        const updatedSuppliers = await fetchSuppliers();
        setSuppliers(updatedSuppliers as Supplier[]);
        setFilteredSuppliers(updatedSuppliers as Supplier[]);
      }
    }
    
    setDeleteConfirmOpen(false);
    setItemToDelete(null);
  };
  
  // CRUD operations for suppliers
  const handleCreateSupplier = async (data: Omit<Supplier, "id" | "created_at" | "updated_at" | "last_order">) => {
    const newSupplier = await createSupplier({...data, last_order: null});
    if (newSupplier) {
      const updatedSuppliers = await fetchSuppliers();
      setSuppliers(updatedSuppliers as Supplier[]);
      setFilteredSuppliers(updatedSuppliers as Supplier[]);
    }
  };
  
  const handleUpdateSupplier = async (data: Omit<Supplier, "id" | "created_at" | "updated_at" | "last_order">) => {
    if (!selectedSupplier) return;
    
    const updatedSupplier = await updateSupplier(selectedSupplier.id, {...data, last_order: selectedSupplier.last_order});
    if (updatedSupplier) {
      const updatedSuppliers = await fetchSuppliers();
      setSuppliers(updatedSuppliers as Supplier[]);
      setFilteredSuppliers(updatedSuppliers as Supplier[]);
    }
  };
  
  // Order operations
  const handleCreateOrder = async (data: any) => {
    const orderData = {
      supplier_id: data.supplier_id,
      order_date: new Date().toISOString(),
      expected_delivery: data.expected_delivery ? new Date(data.expected_delivery).toISOString() : null,
      status: data.status,
      total: data.items.reduce((acc: number, item: any) => acc + item.total_price, 0)
    };
    
    const newOrder = await createOrder(orderData, data.items);
    if (newOrder) {
      const updatedOrders = await fetchOrders();
      setOrders(updatedOrders as Order[]);
      const statsData = await fetchInventoryStats();
      setStats({
        lowStock: statsData.lowStock,
        criticalStock: statsData.criticalStock,
        normalStock: statsData.normalStock,
        pendingOrders: statsData.pendingOrders
      });
    }
  };
  
  const handleViewOrderDetails = async (orderId: string) => {
    const orderDetails = await getOrderWithItems(orderId);
    if (orderDetails) {
      setSelectedOrder(orderDetails as Order);
      setOrderDetailsOpen(true);
    }
  };
  
  const handleUpdateOrderStatus = async (orderId: string, status: string) => {
    const updatedOrder = await updateOrderStatus(orderId, status);
    if (updatedOrder) {
      const updatedOrders = await fetchOrders();
      setOrders(updatedOrders as Order[]);
      
      // If order details dialog is open, update the selected order
      if (selectedOrder && selectedOrder.id === orderId) {
        setSelectedOrder({ ...selectedOrder, status });
      }
      
      const statsData = await fetchInventoryStats();
      setStats({
        lowStock: statsData.lowStock,
        criticalStock: statsData.criticalStock,
        normalStock: statsData.normalStock,
        pendingOrders: statsData.pendingOrders
      });
    }
  };
  
  // Helper functions
  const getSupplierName = (supplierId: string | null) => {
    if (!supplierId) return "No supplier";
    const supplier = suppliers.find(s => s.id === supplierId);
    return supplier ? supplier.name : "Unknown";
  };
  
  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  const getStatusBadgeColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'critical':
        return "bg-red-100 text-red-800";
      case 'low':
        return "bg-amber-100 text-amber-800";
      case 'normal':
        return "bg-green-100 text-green-800";
      case 'in transit':
        return "bg-blue-100 text-blue-800";
      case 'processing':
        return "bg-purple-100 text-purple-800";
      case 'scheduled':
        return "bg-indigo-100 text-indigo-800";
      case 'delivered':
        return "bg-green-100 text-green-800";
      case 'cancelled':
        return "bg-red-100 text-red-800";
      case 'active':
        return "bg-green-100 text-green-800";
      case 'inactive':
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

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
            <button 
              className="bg-culinary-teal text-white px-4 py-2 rounded-md hover:bg-opacity-90 flex items-center"
              onClick={() => {
                setSelectedItem(null);
                setItemFormOpen(true);
              }}
            >
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
                <div className="card-title text-red-800">
                  {stats.criticalStock > 0 
                    ? "Critical Stock Items" 
                    : "Low Stock Items"
                  }
                </div>
                <div className="text-red-500 font-semibold text-lg">
                  {stats.criticalStock > 0
                    ? `${stats.criticalStock} items`
                    : `${stats.lowStock} items`
                  }
                </div>
              </div>
            </div>
            <button 
              className="mt-2 w-full text-sm text-red-600 hover:underline"
              onClick={() => setActiveTab("inventory")}
            >
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
                <div className="text-amber-500 font-semibold text-lg">
                  {stats.pendingOrders} orders
                </div>
              </div>
            </div>
            <button 
              className="mt-2 w-full text-sm text-amber-600 hover:underline"
              onClick={() => setActiveTab("orders")}
            >
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
                <div className="text-green-500 font-semibold text-lg">
                  {stats.normalStock} items
                </div>
              </div>
            </div>
            <button 
              className="mt-2 w-full text-sm text-green-600 hover:underline"
              onClick={() => setActiveTab("inventory")}
            >
              View Items
            </button>
          </div>
        </div>

        <Tabs 
          defaultValue="inventory" 
          className="mb-8"
          value={activeTab}
          onValueChange={setActiveTab}
        >
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
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                </div>
              </div>

              {loading ? (
                <div className="py-8 flex justify-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-culinary-navy"></div>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead 
                          className="cursor-pointer"
                          onClick={() => handleSort('name')}
                        >
                          <div className="flex items-center">
                            Item Name
                            <ArrowUpDown className="h-3 w-3 ml-1" />
                          </div>
                        </TableHead>
                        <TableHead 
                          className="cursor-pointer"
                          onClick={() => handleSort('category')}
                        >
                          <div className="flex items-center">
                            Category
                            <ArrowUpDown className="h-3 w-3 ml-1" />
                          </div>
                        </TableHead>
                        <TableHead className="text-center">Stock</TableHead>
                        <TableHead className="text-center">Min Level</TableHead>
                        <TableHead>Supplier</TableHead>
                        <TableHead className="text-right">Unit Price</TableHead>
                        <TableHead className="text-center">Status</TableHead>
                        <TableHead className="text-center">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredItems.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={8} className="text-center py-4">
                            {searchTerm ? "No items found matching your search." : "No inventory items found."}
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredItems.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell className="font-medium">
                              {item.name}
                            </TableCell>
                            <TableCell className="text-culinary-gray">
                              {item.category}
                            </TableCell>
                            <TableCell className="text-center">
                              {item.current_stock} {item.unit}
                            </TableCell>
                            <TableCell className="text-center">
                              {item.min_level} {item.unit}
                            </TableCell>
                            <TableCell className="text-culinary-gray">
                              {getSupplierName(item.supplier_id)}
                            </TableCell>
                            <TableCell className="text-right font-medium">
                              ${item.unit_price.toFixed(2)}
                            </TableCell>
                            <TableCell className="text-center">
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(item.status)}`}
                              >
                                {item.status === "critical"
                                  ? "Critical"
                                  : item.status === "low"
                                  ? "Low"
                                  : "In Stock"}
                              </span>
                            </TableCell>
                            <TableCell>
                              <div className="flex justify-center space-x-2">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => {
                                    setSelectedItem(item);
                                    setItemFormOpen(true);
                                  }}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="text-red-500 hover:text-red-700"
                                  onClick={() => {
                                    setItemToDelete({
                                      id: item.id,
                                      name: item.name,
                                      type: 'item'
                                    });
                                    setDeleteConfirmOpen(true);
                                  }}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              )}
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
                      value={supplierSearchTerm}
                      onChange={(e) => setSupplierSearchTerm(e.target.value)}
                    />
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                  </div>
                  <button 
                    className="bg-culinary-teal text-white px-4 py-2 rounded-md hover:bg-opacity-90 flex items-center"
                    onClick={() => {
                      setSelectedSupplier(null);
                      setSupplierFormOpen(true);
                    }}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Supplier
                  </button>
                </div>
              </div>

              {loading ? (
                <div className="py-8 flex justify-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-culinary-navy"></div>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="cursor-pointer">
                          <div className="flex items-center">
                            Supplier Name
                            <ArrowUpDown className="h-3 w-3 ml-1" />
                          </div>
                        </TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Last Order</TableHead>
                        <TableHead className="text-center">Status</TableHead>
                        <TableHead className="text-center">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredSuppliers.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={8} className="text-center py-4">
                            {supplierSearchTerm ? "No suppliers found matching your search." : "No suppliers found."}
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredSuppliers.map((supplier) => (
                          <TableRow key={supplier.id}>
                            <TableCell className="font-medium">
                              {supplier.name}
                            </TableCell>
                            <TableCell className="text-culinary-gray">
                              {supplier.contact || "—"}
                            </TableCell>
                            <TableCell className="text-culinary-gray">
                              {supplier.phone || "—"}
                            </TableCell>
                            <TableCell className="text-culinary-gray">
                              {supplier.email || "—"}
                            </TableCell>
                            <TableCell className="text-culinary-gray">
                              {supplier.category || "—"}
                            </TableCell>
                            <TableCell className="text-culinary-gray">
                              {formatDate(supplier.last_order)}
                            </TableCell>
                            <TableCell className="text-center">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(supplier.status)}`}>
                                {supplier.status}
                              </span>
                            </TableCell>
                            <TableCell>
                              <div className="flex justify-center space-x-2">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => {
                                    setSelectedSupplier(supplier);
                                    setSupplierFormOpen(true);
                                  }}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="text-red-500 hover:text-red-700"
                                  onClick={() => {
                                    setItemToDelete({
                                      id: supplier.id,
                                      name: supplier.name,
                                      type: 'supplier'
                                    });
                                    setDeleteConfirmOpen(true);
                                  }}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="orders">
            <div className="dashboard-card">
              <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                <h2 className="text-xl font-semibold mb-4 md:mb-0">Orders</h2>
                <div className="flex space-x-3">
                  <div className="relative w-full md:w-64">
                    <input
                      type="text"
                      placeholder="Search orders..."
                      className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-culinary-teal"
                      value={orderSearchTerm}
                      onChange={(e) => setOrderSearchTerm(e.target.value)}
                    />
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                  </div>
                  <button 
                    className="bg-culinary-teal text-white px-4 py-2 rounded-md hover:bg-opacity-90 flex items-center"
                    onClick={() => setOrderFormOpen(true)}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Create New Order
                  </button>
                </div>
              </div>

              {loading ? (
                <div className="py-8 flex justify-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-culinary-navy"></div>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.length === 0 ? (
                    <div className="text-center py-8">
                      <p>No orders found.</p>
                    </div>
                  ) : (
                    orders
                      .filter(order => {
                        if (!orderSearchTerm) return true;
                        
                        const term = orderSearchTerm.toLowerCase();
                        const supplierName = order.supplier?.name?.toLowerCase() || '';
                        
                        return (
                          order.id.toLowerCase().includes(term) ||
                          supplierName.includes(term) ||
                          order.status.toLowerCase().includes(term)
                        );
                      })
                      .map((order) => (
                        <div
                          key={order.id}
                          className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                        >
                          <div className="flex flex-col md:flex-row justify-between mb-2">
                            <div>
                              <h3 className="font-medium text-culinary-navy">
                                Order #{order.id.slice(0, 8)} - {order.supplier?.name || 'Unknown Supplier'}
                              </h3>
                              <p className="text-sm text-culinary-gray">
                                Ordered: {formatDate(order.order_date)} | Expected: {formatDate(order.expected_delivery)}
                              </p>
                            </div>
                            <div className="mt-2 md:mt-0">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(order.status)}`}>
                                {order.status}
                              </span>
                            </div>
                          </div>
                          <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-100">
                            <span className="font-medium">
                              Total: ${order.total ? order.total.toFixed(2) : "0.00"}
                            </span>
                            <div className="space-x-2">
                              <button 
                                className="px-3 py-1 text-sm border border-culinary-navy text-culinary-navy rounded hover:bg-culinary-navy hover:text-white transition-colors"
                                onClick={() => handleViewOrderDetails(order.id)}
                              >
                                Details
                              </button>
                            </div>
                          </div>
                        </div>
                      ))
                  )}
                </div>
              )}
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
      
      {/* Inventory Item Dialog */}
      {itemFormOpen && (
        <InventoryItemForm
          isOpen={itemFormOpen}
          onClose={() => setItemFormOpen(false)}
          onSubmit={selectedItem ? handleUpdateItem : handleCreateItem}
          item={selectedItem || undefined}
          suppliers={suppliers}
        />
      )}
      
      {/* Supplier Dialog */}
      {supplierFormOpen && (
        <SupplierForm
          isOpen={supplierFormOpen}
          onClose={() => setSupplierFormOpen(false)}
          onSubmit={selectedSupplier ? handleUpdateSupplier : handleCreateSupplier}
          supplier={selectedSupplier || undefined}
        />
      )}
      
      {/* Order Form Dialog */}
      {orderFormOpen && (
        <OrderForm
          isOpen={orderFormOpen}
          onClose={() => setOrderFormOpen(false)}
          onSubmit={handleCreateOrder}
          suppliers={suppliers}
          inventoryItems={inventoryItems}
        />
      )}
      
      {/* Order Details Dialog */}
      {orderDetailsOpen && selectedOrder && (
        <OrderDetails
          isOpen={orderDetailsOpen}
          onClose={() => {
            setOrderDetailsOpen(false);
            setSelectedOrder(null);
          }}
          order={selectedOrder}
          onUpdateStatus={handleUpdateOrderStatus}
        />
      )}
      
      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete {itemToDelete?.name}.
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteItem}
              className="bg-red-600 text-white hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default InventoryPage;
