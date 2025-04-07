
import { supabase } from "@/integrations/supabase/client";
import { InventoryItem, Supplier, Order, OrderItem } from "@/types/inventory";
import { toast } from "@/components/ui/use-toast";

// Inventory Items
export const fetchInventoryItems = async () => {
  try {
    const { data, error } = await supabase
      .from("inventory_items")
      .select("*, suppliers(name)")
      .order('name');
    
    if (error) throw error;
    return data;
  } catch (error: any) {
    toast({
      title: "Error fetching inventory",
      description: error.message,
      variant: "destructive",
    });
    return [];
  }
};

export const getInventoryItem = async (id: string) => {
  try {
    const { data, error } = await supabase
      .from("inventory_items")
      .select("*, suppliers(name)")
      .eq("id", id)
      .single();
    
    if (error) throw error;
    return data;
  } catch (error: any) {
    toast({
      title: "Error fetching item",
      description: error.message,
      variant: "destructive",
    });
    return null;
  }
};

export const createInventoryItem = async (item: Omit<InventoryItem, "id" | "created_at" | "updated_at">) => {
  try {
    const { data, error } = await supabase
      .from("inventory_items")
      .insert(item)
      .select()
      .single();
    
    if (error) throw error;
    
    toast({
      title: "Item created",
      description: `${item.name} has been added to inventory.`,
    });
    
    return data;
  } catch (error: any) {
    toast({
      title: "Error creating item",
      description: error.message,
      variant: "destructive",
    });
    return null;
  }
};

export const updateInventoryItem = async (id: string, item: Partial<InventoryItem>) => {
  try {
    const { data, error } = await supabase
      .from("inventory_items")
      .update({ ...item, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single();
    
    if (error) throw error;
    
    toast({
      title: "Item updated",
      description: `${item.name || 'Item'} has been updated.`,
    });
    
    return data;
  } catch (error: any) {
    toast({
      title: "Error updating item",
      description: error.message,
      variant: "destructive",
    });
    return null;
  }
};

export const deleteInventoryItem = async (id: string, name: string) => {
  try {
    const { error } = await supabase
      .from("inventory_items")
      .delete()
      .eq("id", id);
    
    if (error) throw error;
    
    toast({
      title: "Item deleted",
      description: `${name} has been removed from inventory.`,
    });
    
    return true;
  } catch (error: any) {
    toast({
      title: "Error deleting item",
      description: error.message,
      variant: "destructive",
    });
    return false;
  }
};

// Suppliers
export const fetchSuppliers = async () => {
  try {
    const { data, error } = await supabase
      .from("suppliers")
      .select()
      .order('name');
    
    if (error) throw error;
    return data;
  } catch (error: any) {
    toast({
      title: "Error fetching suppliers",
      description: error.message,
      variant: "destructive",
    });
    return [];
  }
};

export const getSupplier = async (id: string) => {
  try {
    const { data, error } = await supabase
      .from("suppliers")
      .select()
      .eq("id", id)
      .single();
    
    if (error) throw error;
    return data;
  } catch (error: any) {
    toast({
      title: "Error fetching supplier",
      description: error.message,
      variant: "destructive",
    });
    return null;
  }
};

export const createSupplier = async (supplier: Omit<Supplier, "id" | "created_at" | "updated_at">) => {
  try {
    const { data, error } = await supabase
      .from("suppliers")
      .insert(supplier)
      .select()
      .single();
    
    if (error) throw error;
    
    toast({
      title: "Supplier added",
      description: `${supplier.name} has been added to suppliers.`,
    });
    
    return data;
  } catch (error: any) {
    toast({
      title: "Error adding supplier",
      description: error.message,
      variant: "destructive",
    });
    return null;
  }
};

export const updateSupplier = async (id: string, supplier: Partial<Supplier>) => {
  try {
    const { data, error } = await supabase
      .from("suppliers")
      .update({ ...supplier, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single();
    
    if (error) throw error;
    
    toast({
      title: "Supplier updated",
      description: `${supplier.name || 'Supplier'} has been updated.`,
    });
    
    return data;
  } catch (error: any) {
    toast({
      title: "Error updating supplier",
      description: error.message,
      variant: "destructive",
    });
    return null;
  }
};

export const deleteSupplier = async (id: string, name: string) => {
  try {
    const { error } = await supabase
      .from("suppliers")
      .delete()
      .eq("id", id);
    
    if (error) throw error;
    
    toast({
      title: "Supplier deleted",
      description: `${name} has been removed from suppliers.`,
    });
    
    return true;
  } catch (error: any) {
    toast({
      title: "Error deleting supplier",
      description: error.message,
      variant: "destructive",
    });
    return false;
  }
};

// Orders
export const fetchOrders = async () => {
  try {
    const { data, error } = await supabase
      .from("orders")
      .select(`*, suppliers(name)`)
      .order('order_date', { ascending: false });
    
    if (error) throw error;
    return data;
  } catch (error: any) {
    toast({
      title: "Error fetching orders",
      description: error.message,
      variant: "destructive",
    });
    return [];
  }
};

export const getOrderWithItems = async (id: string) => {
  try {
    // First fetch the order
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .select(`*, suppliers(*)`)
      .eq("id", id)
      .single();
    
    if (orderError) throw orderError;
    
    // Then fetch the order items with their related inventory items
    const { data: items, error: itemsError } = await supabase
      .from("order_items")
      .select(`*, inventory_items(*)`)
      .eq("order_id", id);
    
    if (itemsError) throw itemsError;
    
    return { ...order, items };
  } catch (error: any) {
    toast({
      title: "Error fetching order details",
      description: error.message,
      variant: "destructive",
    });
    return null;
  }
};

export const createOrder = async (
  order: Omit<Order, "id" | "created_at" | "updated_at">,
  items: Omit<OrderItem, "id" | "created_at" | "order_id">[]
) => {
  try {
    // Start a transaction using supabase.rpc
    const { data: newOrder, error: orderError } = await supabase
      .from("orders")
      .insert(order)
      .select()
      .single();
    
    if (orderError) throw orderError;
    
    // Add order items with the new order id
    const orderItems = items.map(item => ({
      ...item,
      order_id: newOrder.id
    }));
    
    const { error: itemsError } = await supabase
      .from("order_items")
      .insert(orderItems);
    
    if (itemsError) throw itemsError;
    
    toast({
      title: "Order created",
      description: `Order #${newOrder.id.slice(0, 8)} has been placed.`,
    });
    
    return newOrder;
  } catch (error: any) {
    toast({
      title: "Error creating order",
      description: error.message,
      variant: "destructive",
    });
    return null;
  }
};

export const updateOrderStatus = async (id: string, status: string) => {
  try {
    const { data, error } = await supabase
      .from("orders")
      .update({ 
        status, 
        updated_at: new Date().toISOString() 
      })
      .eq("id", id)
      .select()
      .single();
    
    if (error) throw error;
    
    toast({
      title: "Order updated",
      description: `Order status changed to ${status}.`,
    });
    
    return data;
  } catch (error: any) {
    toast({
      title: "Error updating order",
      description: error.message,
      variant: "destructive",
    });
    return null;
  }
};

export const deleteOrder = async (id: string) => {
  try {
    const { error } = await supabase
      .from("orders")
      .delete()
      .eq("id", id);
    
    if (error) throw error;
    
    toast({
      title: "Order deleted",
      description: `Order has been deleted.`,
    });
    
    return true;
  } catch (error: any) {
    toast({
      title: "Error deleting order",
      description: error.message,
      variant: "destructive",
    });
    return false;
  }
};

// Dashboard Statistics
export const fetchInventoryStats = async () => {
  try {
    const { data: items, error: itemsError } = await supabase
      .from("inventory_items")
      .select();
    
    if (itemsError) throw itemsError;
    
    const { data: orders, error: ordersError } = await supabase
      .from("orders")
      .select()
      .in("status", ["Processing", "In Transit", "Scheduled"]);
    
    if (ordersError) throw ordersError;
    
    const lowStock = items.filter(item => item.status === "low").length;
    const criticalStock = items.filter(item => item.status === "critical").length;
    const normalStock = items.filter(item => item.status === "normal").length;
    const pendingOrders = orders.length;
    
    return {
      lowStock,
      criticalStock,
      normalStock,
      pendingOrders,
      totalItems: items.length
    };
  } catch (error: any) {
    console.error("Error fetching inventory stats:", error);
    return {
      lowStock: 0,
      criticalStock: 0,
      normalStock: 0,
      pendingOrders: 0,
      totalItems: 0
    };
  }
};
