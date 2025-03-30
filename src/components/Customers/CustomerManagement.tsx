
import React, { useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Search, UserPlus, Filter, Star, Mail, Phone } from "lucide-react";

const CustomerManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Mock customer data
  const customers = [
    {
      id: 1,
      name: "John Smith",
      email: "john.smith@example.com",
      phone: "(555) 123-4567",
      visits: 32,
      lastVisit: "Oct 23, 2023",
      totalSpent: "$1,245.80",
      status: "Regular",
    },
    {
      id: 2,
      name: "Maria Rodriguez",
      email: "maria.r@example.com",
      phone: "(555) 987-6543",
      visits: 18,
      lastVisit: "Nov 12, 2023",
      totalSpent: "$870.50",
      status: "VIP",
    },
    {
      id: 3,
      name: "David Chen",
      email: "david.c@example.com",
      phone: "(555) 456-7890",
      visits: 8,
      lastVisit: "Oct 5, 2023",
      totalSpent: "$320.25",
      status: "New",
    },
    {
      id: 4,
      name: "Sophie Wilson",
      email: "sophie.w@example.com",
      phone: "(555) 234-5678",
      visits: 24,
      lastVisit: "Nov 18, 2023",
      totalSpent: "$925.75",
      status: "Regular",
    },
    {
      id: 5,
      name: "Michael Johnson",
      email: "michael.j@example.com",
      phone: "(555) 876-5432",
      visits: 45,
      lastVisit: "Nov 25, 2023",
      totalSpent: "$2,340.60",
      status: "VIP",
    }
  ];

  // Filter customers based on search query
  const filteredCustomers = customers.filter(customer => 
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-culinary-navy">Customer Management</h1>
        <div className="flex gap-2 mt-4 md:mt-0">
          <button className="bg-culinary-teal text-white px-4 py-2 rounded-md flex items-center">
            <UserPlus className="h-4 w-4 mr-2" />
            Add Customer
          </button>
          <button className="bg-white border border-culinary-gray/20 px-4 py-2 rounded-md flex items-center">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </button>
        </div>
      </div>

      <div className="mb-6 dashboard-card">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-culinary-navy mb-4 md:mb-0">Customer Overview</h2>
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search customers..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-culinary-light p-4 rounded-lg shadow-sm">
            <div className="text-lg font-semibold text-culinary-navy">230</div>
            <div className="text-culinary-gray text-sm">Total Customers</div>
          </div>
          <div className="bg-culinary-light p-4 rounded-lg shadow-sm">
            <div className="text-lg font-semibold text-culinary-navy">45</div>
            <div className="text-culinary-gray text-sm">New This Month</div>
          </div>
          <div className="bg-culinary-light p-4 rounded-lg shadow-sm">
            <div className="text-lg font-semibold text-culinary-navy">$85.50</div>
            <div className="text-culinary-gray text-sm">Avg. Spend Per Visit</div>
          </div>
          <div className="bg-culinary-light p-4 rounded-lg shadow-sm">
            <div className="text-lg font-semibold text-culinary-navy">78%</div>
            <div className="text-culinary-gray text-sm">Retention Rate</div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Visits</TableHead>
                <TableHead>Last Visit</TableHead>
                <TableHead>Total Spent</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell className="font-medium">{customer.name}</TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <div className="flex items-center text-sm text-culinary-gray">
                        <Mail className="h-3 w-3 mr-1" /> {customer.email}
                      </div>
                      <div className="flex items-center text-sm text-culinary-gray mt-1">
                        <Phone className="h-3 w-3 mr-1" /> {customer.phone}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{customer.visits}</TableCell>
                  <TableCell>{customer.lastVisit}</TableCell>
                  <TableCell>{customer.totalSpent}</TableCell>
                  <TableCell>
                    <div className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                      customer.status === 'VIP' 
                        ? 'bg-amber-100 text-amber-800' 
                        : customer.status === 'Regular'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {customer.status === 'VIP' && <Star className="h-3 w-3 mr-1" />}
                      {customer.status}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <button className="text-culinary-teal hover:text-culinary-teal/80">View</button>
                      <button className="text-culinary-teal hover:text-culinary-teal/80">Edit</button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default CustomerManagement;
