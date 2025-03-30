
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
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Navbar = () => {
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
          <div className="flex items-center space-x-4">
            {/* Hamburger Menu for Additional Navigation */}
            <Sheet>
              <SheetTrigger asChild>
                <button className="p-2 rounded-md hover:bg-culinary-teal focus:outline-none transition-colors">
                  <Menu className="h-5 w-5" />
                </button>
              </SheetTrigger>
              <SheetContent side="left" className="bg-culinary-navy text-white border-culinary-teal">
                <SheetHeader>
                  <SheetTitle className="text-white">Menu</SheetTitle>
                  <SheetDescription className="text-gray-300">
                    Access all sections of the application
                  </SheetDescription>
                </SheetHeader>
                <div className="py-4">
                  <ul className="space-y-2">
                    {navItems.map((item) => (
                      <li key={item.name}>
                        <Link
                          to={item.path}
                          className="flex items-center p-2 rounded-md hover:bg-culinary-teal transition-colors"
                        >
                          <item.icon className="h-5 w-5 mr-3" />
                          <span>{item.name}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </SheetContent>
            </Sheet>
            
            <Link to="/" className="flex items-center">
              <span className="text-culinary-gold font-bold text-xl ml-2">
                Culinary Finance Hub
              </span>
            </Link>
          </div>

          {/* Desktop Navigation - Show only first 5 items directly in the navbar */}
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
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
