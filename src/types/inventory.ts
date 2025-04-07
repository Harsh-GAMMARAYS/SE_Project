
export interface InventoryItem {
  id: string;
  name: string;
  category: string;
  current_stock: number;
  unit: string;
  min_level: number;
  status: 'critical' | 'low' | 'normal';
  last_ordered: string | null;
  supplier_id: string | null;
  unit_price: number;
  created_at: string;
  updated_at: string;
}

export interface Supplier {
  id: string;
  name: string;
  contact: string | null;
  phone: string | null;
  email: string | null;
  category: string | null;
  last_order: string | null;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface Order {
  id: string;
  supplier_id: string | null;
  supplier?: Supplier;
  order_date: string;
  expected_delivery: string | null;
  status: string;
  total: number | null;
  created_at: string;
  updated_at: string;
  items?: OrderItem[];
}

export interface OrderItem {
  id: string;
  order_id: string;
  item_id: string;
  item?: InventoryItem;
  quantity: number;
  unit_price: number;
  total_price: number;
  created_at: string;
}
