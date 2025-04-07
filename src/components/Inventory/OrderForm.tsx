
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { 
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { InventoryItem, Supplier } from "@/types/inventory";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { XCircle, Plus } from "lucide-react";

const formSchema = z.object({
  supplier_id: z.string({ required_error: "Supplier is required" }),
  expected_delivery: z.string().optional(),
  status: z.string().default("Pending"),
  items: z.array(
    z.object({
      item_id: z.string({ required_error: "Item is required" }),
      quantity: z.coerce.number().positive({ message: "Quantity must be positive" }),
      unit_price: z.coerce.number().positive({ message: "Price must be positive" }),
      total_price: z.coerce.number()
    })
  ).min(1, { message: "At least one item is required" })
});

interface OrderFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: z.infer<typeof formSchema>) => void;
  suppliers: Supplier[];
  inventoryItems: InventoryItem[];
}

const OrderForm = ({
  isOpen,
  onClose,
  onSubmit,
  suppliers,
  inventoryItems,
}: OrderFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      supplier_id: "",
      expected_delivery: "",
      status: "Pending",
      items: [
        { 
          item_id: "", 
          quantity: 1, 
          unit_price: 0,
          total_price: 0
        }
      ]
    },
  });
  
  const { fields, append, remove } = form.useFieldArray({
    name: "items",
    control: form.control,
  });

  // Watch for changes to recalculate totals
  const formValues = form.watch();
  const [orderTotal, setOrderTotal] = useState<number>(0);
  
  // Update unit price when item changes
  const updateItemPrice = (index: number, itemId: string) => {
    const selectedItem = inventoryItems.find(item => item.id === itemId);
    if (selectedItem) {
      const currentQuantity = form.getValues(`items.${index}.quantity`);
      form.setValue(`items.${index}.unit_price`, selectedItem.unit_price);
      form.setValue(
        `items.${index}.total_price`, 
        selectedItem.unit_price * currentQuantity
      );
    }
  };
  
  // Update total price when quantity changes
  const updateTotalPrice = (index: number, quantity: number) => {
    const currentUnitPrice = form.getValues(`items.${index}.unit_price`);
    form.setValue(
      `items.${index}.total_price`, 
      currentUnitPrice * quantity
    );
  };
  
  // Calculate order total
  useEffect(() => {
    const total = formValues.items.reduce(
      (sum, item) => sum + (item.total_price || 0), 
      0
    );
    setOrderTotal(total);
  }, [formValues]);
  
  const addItem = () => {
    append({ 
      item_id: "", 
      quantity: 1, 
      unit_price: 0,
      total_price: 0
    });
  };

  function handleSubmit(values: z.infer<typeof formSchema>) {
    onSubmit({
      ...values,
      expected_delivery: values.expected_delivery || undefined
    });
    onClose();
  }

  // Filter suppliers to show only active ones
  const activeSuppliers = suppliers.filter(s => s.status === "Active");

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Create New Order</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="supplier_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Supplier</FormLabel>
                    <FormControl>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select supplier" />
                        </SelectTrigger>
                        <SelectContent>
                          {activeSuppliers.map((supplier) => (
                            <SelectItem key={supplier.id} value={supplier.id}>
                              {supplier.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="expected_delivery"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Expected Delivery Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">Order Items</h3>
                <Button 
                  type="button" 
                  onClick={addItem} 
                  variant="outline" 
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <Plus className="h-4 w-4" /> Add Item
                </Button>
              </div>

              {form.formState.errors.items?.message && (
                <p className="text-sm text-red-500">{form.formState.errors.items.message}</p>
              )}

              <div className="rounded-md border overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="py-2 px-4 text-left font-medium">Item</th>
                      <th className="py-2 px-4 text-left font-medium">Quantity</th>
                      <th className="py-2 px-4 text-left font-medium">Unit Price</th>
                      <th className="py-2 px-4 text-left font-medium">Total</th>
                      <th className="py-2 px-4 text-center font-medium">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {fields.map((field, index) => (
                      <tr key={field.id} className="border-t">
                        <td className="py-2 px-4 w-1/3">
                          <FormField
                            control={form.control}
                            name={`items.${index}.item_id`}
                            render={({ field }) => (
                              <FormItem className="space-y-0">
                                <FormControl>
                                  <Select 
                                    onValueChange={(value) => {
                                      field.onChange(value);
                                      updateItemPrice(index, value);
                                    }}
                                    value={field.value}
                                  >
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select item" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {inventoryItems.map((item) => (
                                        <SelectItem key={item.id} value={item.id}>
                                          {item.name} - {item.current_stock} {item.unit} available
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </td>
                        <td className="py-2 px-4">
                          <FormField
                            control={form.control}
                            name={`items.${index}.quantity`}
                            render={({ field }) => (
                              <FormItem className="space-y-0">
                                <FormControl>
                                  <Input 
                                    type="number" 
                                    {...field}
                                    onChange={(e) => {
                                      field.onChange(e);
                                      updateTotalPrice(index, Number(e.target.value));
                                    }}
                                    min={1} 
                                    className="w-20"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </td>
                        <td className="py-2 px-4">
                          <FormField
                            control={form.control}
                            name={`items.${index}.unit_price`}
                            render={({ field }) => (
                              <FormItem className="space-y-0">
                                <FormControl>
                                  <Input 
                                    type="number"
                                    step="0.01"
                                    {...field}
                                    onChange={(e) => {
                                      field.onChange(e);
                                      updateTotalPrice(
                                        index, 
                                        form.getValues(`items.${index}.quantity`)
                                      );
                                    }}
                                    className="w-24"
                                    readOnly
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </td>
                        <td className="py-2 px-4">
                          <FormField
                            control={form.control}
                            name={`items.${index}.total_price`}
                            render={({ field }) => (
                              <FormItem className="space-y-0">
                                <FormControl>
                                  <Input 
                                    type="number"
                                    step="0.01"
                                    {...field}
                                    className="w-28"
                                    readOnly
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </td>
                        <td className="py-2 px-4 text-center">
                          {fields.length > 1 && (
                            <button
                              type="button"
                              onClick={() => remove(index)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <XCircle className="h-5 w-5" />
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="bg-muted/20">
                      <td colSpan={3} className="py-2 px-4 text-right font-medium">
                        Order Total:
                      </td>
                      <td colSpan={2} className="py-2 px-4 font-medium">
                        ${orderTotal.toFixed(2)}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">Create Order</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default OrderForm;
