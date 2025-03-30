
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  BarChart, 
  CreditCard, 
  Home, 
  ShoppingCart, 
  User, 
  Calendar, 
  Users, 
  MessageSquare,
  Menu,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navItems = [
    { name: "Dashboard", path: "/", icon: Home },
    { name: "Banking", path: "/banking", icon: CreditCard },
    { name: "Finances", path: "/finances", icon: BarChart },
    { name: "Inventory", path: "/inventory", icon: ShoppingCart },
    { name: "Employees", path: "/employees", icon: Users },
    { name: "Scheduling", path: "/scheduling", icon: Calendar },
    { name: "Customers", path: "/customers", icon: User },
    { name: "Feedback", path: "/feedback", icon: MessageSquare },
  ];

  return (
    <nav className="bg-culinary-navy text-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-culinary-gold font-bold text-xl ml-2">
                Culinary Finance Hub
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-1">
            {navItems.slice(0, 5).map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-culinary-teal transition-colors"
              >
                <item.icon className="h-4 w-4 mr-1" />
                {item.name}
              </Link>
            ))}
            <div className="relative group">
              <button className="flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-culinary-teal transition-colors">
                More
              </button>
              <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white text-culinary-navy hidden group-hover:block z-10">
                {navItems.slice(5).map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className="flex items-center px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    <item.icon className="h-4 w-4 mr-2" />
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* User Profile */}
          <div className="hidden md:flex items-center">
            <div className="relative">
              <button className="flex items-center space-x-2 focus:outline-none">
                <div className="h-8 w-8 rounded-full bg-culinary-teal flex items-center justify-center">
                  <span className="text-white text-xs font-bold">RC</span>
                </div>
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-culinary-teal focus:outline-none"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={cn("md:hidden", isMobileMenuOpen ? "block" : "hidden")}>
        <div className="px-2 pt-2 pb-3 space-y-1 bg-culinary-navy">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-culinary-teal"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <item.icon className="h-4 w-4 mr-2" />
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
