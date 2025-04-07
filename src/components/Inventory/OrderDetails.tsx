
import React, { useState } from "react";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Order, Supplier } from "@/types/inventory";
import { CalendarClock, TruckIcon, CheckCircle2, AlertCircle, Clock } from "lucide-react";

interface OrderDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  order: Order | null;
  onUpdateStatus: (id: string, status: string) => void;
}

const OrderDetails = ({
  isOpen,
  onClose,
  order,
  onUpdateStatus,
}: OrderDetailsProps) => {
  const [isUpdating, setIsUpdating] = useState(false);
  
  if (!order) return null;
  
  const handleStatusUpdate = async (status: string) => {
    setIsUpdating(true);
    await onUpdateStatus(order.id, status);
    setIsUpdating(false);
  };
  
  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Not specified";
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Pending":
        return <Clock className="h-4 w-4 text-amber-500" />;
      case "Processing":
        return <CalendarClock className="h-4 w-4 text-blue-500" />;
      case "In Transit":
        return <TruckIcon className="h-4 w-4 text-purple-500" />;
      case "Delivered":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case "Cancelled":
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-amber-100 text-amber-800";
      case "Processing":
        return "bg-blue-100 text-blue-800";
      case "In Transit":
        return "bg-purple-100 text-purple-800";
      case "Scheduled":
        return "bg-indigo-100 text-indigo-800";
      case "Delivered":
        return "bg-green-100 text-green-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  
  const supplier = order.supplier as Supplier;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>
            Order Details #{order.id.slice(0, 8)}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Supplier</p>
              <p className="font-medium">{supplier ? supplier.name : 'Unknown'}</p>
            </div>
            
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Status</p>
              <div className="flex items-center">
                <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 ${getStatusColor(order.status)}`}>
                  {getStatusIcon(order.status)} {order.status}
                </span>
              </div>
            </div>
            
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Order Date</p>
              <p>{formatDate(order.order_date)}</p>
            </div>
            
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Expected Delivery</p>
              <p>{formatDate(order.expected_delivery)}</p>
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="font-medium">Order Items</h3>
            <div className="rounded-md border overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="py-2 px-4 text-left font-medium">Item</th>
                    <th className="py-2 px-4 text-center font-medium">Quantity</th>
                    <th className="py-2 px-4 text-right font-medium">Unit Price</th>
                    <th className="py-2 px-4 text-right font-medium">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items && order.items.map((item) => (
                    <tr key={item.id} className="border-t">
                      <td className="py-2 px-4">
                        {item.item?.name || 'Unknown Item'}
                      </td>
                      <td className="py-2 px-4 text-center">
                        {item.quantity} {item.item?.unit || ''}
                      </td>
                      <td className="py-2 px-4 text-right">
                        ${item.unit_price.toFixed(2)}
                      </td>
                      <td className="py-2 px-4 text-right font-medium">
                        ${item.total_price.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-muted/20">
                    <td colSpan={3} className="py-2 px-4 text-right font-medium">
                      Order Total:
                    </td>
                    <td className="py-2 px-4 text-right font-medium">
                      ${order.total ? order.total.toFixed(2) : "0.00"}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium mb-2">Update Status</h3>
            <div className="flex gap-2 flex-wrap">
              {order.status !== 'Pending' && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleStatusUpdate('Pending')}
                  disabled={isUpdating}
                >
                  Mark as Pending
                </Button>
              )}
              {order.status !== 'Processing' && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleStatusUpdate('Processing')}
                  disabled={isUpdating}
                >
                  Mark as Processing
                </Button>
              )}
              {order.status !== 'In Transit' && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleStatusUpdate('In Transit')}
                  disabled={isUpdating}
                >
                  Mark as In Transit
                </Button>
              )}
              {order.status !== 'Delivered' && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleStatusUpdate('Delivered')}
                  disabled={isUpdating}
                  className="border-green-200 bg-green-50 text-green-700 hover:bg-green-100"
                >
                  Mark as Delivered
                </Button>
              )}
              {order.status !== 'Cancelled' && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleStatusUpdate('Cancelled')}
                  disabled={isUpdating}
                  className="border-red-200 bg-red-50 text-red-700 hover:bg-red-100"
                >
                  Cancel Order
                </Button>
              )}
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetails;
