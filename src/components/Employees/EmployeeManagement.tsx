
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Plus, Calendar, Clock, DollarSign, Award, FileText, GraduationCap } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

// Mock employee data
const employees = [
  {
    id: 1,
    name: "Sarah Johnson",
    position: "Head Chef",
    department: "Kitchen",
    status: "Active",
    hireDate: "2022-03-15",
    salary: "$68,000",
    contact: "sarah.j@example.com",
    skills: ["French Cuisine", "Menu Development", "Staff Management"],
    certifications: ["Culinary Arts Degree", "Food Safety Certification"],
    image: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: 2,
    name: "Michael Rodriguez",
    position: "Sous Chef",
    department: "Kitchen",
    status: "Active",
    hireDate: "2022-05-22",
    salary: "$52,000",
    contact: "michael.r@example.com",
    skills: ["Italian Cuisine", "Inventory Management", "Food Preparation"],
    certifications: ["Culinary Certificate", "Knife Skills Certification"],
    image: "https://i.pravatar.cc/150?img=2",
  },
  {
    id: 3,
    name: "Jessica Williams",
    position: "Pastry Chef",
    department: "Kitchen",
    status: "Active",
    hireDate: "2022-07-10",
    salary: "$48,000",
    contact: "jessica.w@example.com",
    skills: ["Dessert Creation", "Baking", "Chocolate Work"],
    certifications: ["Pastry Arts Diploma", "Food Handling Certificate"],
    image: "https://i.pravatar.cc/150?img=3",
  },
  {
    id: 4,
    name: "David Chen",
    position: "Floor Manager",
    department: "Front of House",
    status: "Active",
    hireDate: "2022-02-08",
    salary: "$54,000",
    contact: "david.c@example.com",
    skills: ["Customer Service", "Staff Scheduling", "Conflict Resolution"],
    certifications: ["Hospitality Management Degree", "Leadership Certificate"],
    image: "https://i.pravatar.cc/150?img=4",
  },
  {
    id: 5,
    name: "Amanda Lopez",
    position: "Server",
    department: "Front of House",
    status: "Part-time",
    hireDate: "2022-09-18",
    salary: "$32,000",
    contact: "amanda.l@example.com",
    skills: ["Wine Knowledge", "Customer Service", "POS System Operation"],
    certifications: ["Alcohol Service Certification", "Customer Service Training"],
    image: "https://i.pravatar.cc/150?img=5",
  },
];

const EmployeeManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState<number | null>(null);

  const filteredEmployees = employees.filter(
    (employee) =>
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-culinary-navy">Employee Management</h1>
        <div className="flex items-center space-x-2 mt-4 md:mt-0">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="Search employees..."
              className="pl-8 w-full md:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button className="bg-culinary-teal text-white px-4 py-2 rounded-md flex items-center">
            <Plus className="h-4 w-4 mr-2" /> Add Employee
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 dashboard-card bg-white rounded-lg shadow-sm p-4">
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-culinary-navy">Employees</h2>
            <p className="text-sm text-gray-500">Manage your team members</p>
          </div>
          <div className="space-y-2">
            {filteredEmployees.map((employee) => (
              <div
                key={employee.id}
                className={`p-3 border rounded-lg transition-colors cursor-pointer flex items-center ${
                  selectedEmployee === employee.id
                    ? "border-culinary-teal bg-culinary-light"
                    : "border-gray-200 hover:bg-gray-50"
                }`}
                onClick={() => setSelectedEmployee(employee.id)}
              >
                <div className="flex-shrink-0 mr-3">
                  <img
                    src={employee.image}
                    alt={employee.name}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                </div>
                <div className="flex-grow">
                  <h3 className="font-medium text-culinary-navy">{employee.name}</h3>
                  <p className="text-sm text-gray-500">{employee.position}</p>
                </div>
                <div
                  className={`px-2 py-1 text-xs rounded-full ${
                    employee.status === "Active"
                      ? "bg-green-100 text-green-800"
                      : employee.status === "Part-time"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {employee.status}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2 dashboard-card bg-white rounded-lg shadow-sm p-0">
          {selectedEmployee ? (
            <Tabs defaultValue="profile" className="w-full">
              <div className="border-b">
                <TabsList className="w-full h-auto p-0 bg-transparent">
                  <TabsTrigger
                    value="profile"
                    className="flex-1 py-3 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-culinary-teal data-[state=active]:shadow-none"
                  >
                    Profile
                  </TabsTrigger>
                  <TabsTrigger
                    value="schedule"
                    className="flex-1 py-3 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-culinary-teal data-[state=active]:shadow-none"
                  >
                    Schedule
                  </TabsTrigger>
                  <TabsTrigger
                    value="payroll"
                    className="flex-1 py-3 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-culinary-teal data-[state=active]:shadow-none"
                  >
                    Payroll
                  </TabsTrigger>
                  <TabsTrigger
                    value="performance"
                    className="flex-1 py-3 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-culinary-teal data-[state=active]:shadow-none"
                  >
                    Performance
                  </TabsTrigger>
                  <TabsTrigger
                    value="training"
                    className="flex-1 py-3 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-culinary-teal data-[state=active]:shadow-none"
                  >
                    Training
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="profile" className="p-6">
                {employees.find((e) => e.id === selectedEmployee) && (
                  <div>
                    <div className="flex flex-col md:flex-row items-start mb-6">
                      <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
                        <img
                          src={employees.find((e) => e.id === selectedEmployee)?.image}
                          alt={employees.find((e) => e.id === selectedEmployee)?.name}
                          className="h-24 w-24 rounded-full object-cover"
                        />
                      </div>
                      <div className="flex-grow">
                        <h2 className="text-2xl font-bold text-culinary-navy">
                          {employees.find((e) => e.id === selectedEmployee)?.name}
                        </h2>
                        <p className="text-lg text-gray-600">
                          {employees.find((e) => e.id === selectedEmployee)?.position}
                        </p>
                        <div className="mt-2 flex flex-wrap gap-2">
                          <span className="px-2 py-1 text-xs rounded-full bg-culinary-light text-culinary-navy">
                            {employees.find((e) => e.id === selectedEmployee)?.department}
                          </span>
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${
                              employees.find((e) => e.id === selectedEmployee)?.status === "Active"
                                ? "bg-green-100 text-green-800"
                                : employees.find((e) => e.id === selectedEmployee)?.status === "Part-time"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {employees.find((e) => e.id === selectedEmployee)?.status}
                          </span>
                        </div>
                      </div>
                      <div className="mt-4 md:mt-0">
                        <Button className="bg-culinary-teal text-white">Edit Profile</Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <Card>
                        <CardContent className="p-4">
                          <div className="flex items-center">
                            <Calendar className="h-5 w-5 text-culinary-teal mr-2" />
                            <div>
                              <p className="text-sm text-gray-500">Hire Date</p>
                              <p className="font-medium">
                                {employees.find((e) => e.id === selectedEmployee)?.hireDate}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4">
                          <div className="flex items-center">
                            <DollarSign className="h-5 w-5 text-culinary-teal mr-2" />
                            <div>
                              <p className="text-sm text-gray-500">Salary</p>
                              <p className="font-medium">
                                {employees.find((e) => e.id === selectedEmployee)?.salary}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4">
                          <div className="flex items-center">
                            <Clock className="h-5 w-5 text-culinary-teal mr-2" />
                            <div>
                              <p className="text-sm text-gray-500">Status</p>
                              <p className="font-medium">
                                {employees.find((e) => e.id === selectedEmployee)?.status}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-lg font-semibold text-culinary-navy mb-3">Contact Information</h3>
                        <Card>
                          <CardContent className="p-4">
                            <div className="space-y-2">
                              <div>
                                <Label htmlFor="email">Email</Label>
                                <Input
                                  id="email"
                                  value={employees.find((e) => e.id === selectedEmployee)?.contact}
                                  readOnly
                                />
                              </div>
                              <div>
                                <Label htmlFor="phone">Phone</Label>
                                <Input id="phone" value="(555) 123-4567" readOnly />
                              </div>
                              <div>
                                <Label htmlFor="address">Address</Label>
                                <Textarea
                                  id="address"
                                  value="123 Main St, Anytown, ST 12345"
                                  className="resize-none"
                                  readOnly
                                />
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-culinary-navy mb-3">Skills & Certifications</h3>
                        <Card>
                          <CardContent className="p-4">
                            <div className="mb-4">
                              <h4 className="text-sm font-medium text-gray-500 mb-2">Skills</h4>
                              <div className="flex flex-wrap gap-2">
                                {employees
                                  .find((e) => e.id === selectedEmployee)
                                  ?.skills.map((skill, index) => (
                                    <span
                                      key={index}
                                      className="px-2 py-1 text-xs rounded-full bg-culinary-light text-culinary-navy"
                                    >
                                      {skill}
                                    </span>
                                  ))}
                              </div>
                            </div>
                            <div>
                              <h4 className="text-sm font-medium text-gray-500 mb-2">Certifications</h4>
                              <div className="space-y-2">
                                {employees
                                  .find((e) => e.id === selectedEmployee)
                                  ?.certifications.map((cert, index) => (
                                    <div
                                      key={index}
                                      className="flex items-center p-2 border rounded-md"
                                    >
                                      <Award className="h-4 w-4 text-culinary-teal mr-2" />
                                      <span>{cert}</span>
                                    </div>
                                  ))}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="schedule" className="p-6">
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Weekly Schedule</CardTitle>
                      <CardDescription>View and manage employee work hours</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-7 gap-2">
                          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                            <div key={day} className="text-center font-medium">
                              {day}
                            </div>
                          ))}
                          {["9-5", "9-5", "Off", "9-5", "9-5", "11-7", "Off"].map((hours, i) => (
                            <div
                              key={i}
                              className={`text-center py-2 px-1 text-sm rounded ${
                                hours === "Off"
                                  ? "bg-gray-100"
                                  : "bg-culinary-light text-culinary-navy"
                              }`}
                            >
                              {hours}
                            </div>
                          ))}
                        </div>
                        <div className="flex justify-end">
                          <Button variant="outline" className="mr-2">
                            View Full Calendar
                          </Button>
                          <Button className="bg-culinary-teal text-white">Edit Schedule</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Time Off Requests</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="p-3 border rounded-lg">
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="font-medium">Vacation</p>
                                <p className="text-sm text-gray-500">Nov 20 - Nov 27, 2023</p>
                              </div>
                              <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">
                                Pending
                              </span>
                            </div>
                          </div>
                          <div className="flex justify-end">
                            <Button variant="outline" className="text-sm">View All Requests</Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Attendance Summary</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="p-3 bg-culinary-light rounded-lg">
                              <p className="text-sm text-gray-500">Hours This Month</p>
                              <p className="text-xl font-bold">142 hrs</p>
                            </div>
                            <div className="p-3 bg-culinary-light rounded-lg">
                              <p className="text-sm text-gray-500">Punctuality Rate</p>
                              <p className="text-xl font-bold">98%</p>
                            </div>
                          </div>
                          <div className="flex justify-end">
                            <Button variant="outline" className="text-sm">View Full Report</Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="payroll" className="p-6">
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Salary Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="p-4 border rounded-lg">
                            <p className="text-sm text-gray-500">Base Salary</p>
                            <p className="text-xl font-bold">{employees.find((e) => e.id === selectedEmployee)?.salary}</p>
                          </div>
                          <div className="p-4 border rounded-lg">
                            <p className="text-sm text-gray-500">Payment Schedule</p>
                            <p className="text-xl font-bold">Bi-weekly</p>
                          </div>
                          <div className="p-4 border rounded-lg">
                            <p className="text-sm text-gray-500">YTD Earnings</p>
                            <p className="text-xl font-bold">$42,500</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Payments</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[
                          { date: "Oct 15, 2023", amount: "$2,615.38", status: "Paid" },
                          { date: "Oct 1, 2023", amount: "$2,615.38", status: "Paid" },
                          { date: "Sep 15, 2023", amount: "$2,615.38", status: "Paid" },
                        ].map((payment, index) => (
                          <div key={index} className="flex justify-between items-center p-3 border rounded-lg">
                            <div className="flex items-center">
                              <DollarSign className="h-5 w-5 text-culinary-teal mr-2" />
                              <div>
                                <p className="font-medium">Salary Payment</p>
                                <p className="text-sm text-gray-500">{payment.date}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-medium">{payment.amount}</p>
                              <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                                {payment.status}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <div className="flex justify-end">
                    <Button variant="outline" className="mr-2">
                      <FileText className="h-4 w-4 mr-2" />
                      Download Tax Forms
                    </Button>
                    <Button className="bg-culinary-teal text-white">
                      <FileText className="h-4 w-4 mr-2" />
                      View Pay Stubs
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="performance" className="p-6">
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Performance Overview</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="p-4 border rounded-lg">
                            <p className="text-sm text-gray-500">Overall Rating</p>
                            <div className="flex items-center">
                              <p className="text-xl font-bold mr-2">4.8/5.0</p>
                              <div className="flex">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <Award
                                    key={star}
                                    className={`h-4 w-4 ${
                                      star <= 4 ? "text-yellow-400" : "text-gray-300"
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                          </div>
                          <div className="p-4 border rounded-lg">
                            <p className="text-sm text-gray-500">Latest Review</p>
                            <p className="text-xl font-bold">Sep 2023</p>
                          </div>
                          <div className="p-4 border rounded-lg">
                            <p className="text-sm text-gray-500">Next Review</p>
                            <p className="text-xl font-bold">Mar 2024</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Performance Metrics</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[
                          { name: "Food Quality", score: 95 },
                          { name: "Team Collaboration", score: 90 },
                          { name: "Time Management", score: 85 },
                          { name: "Customer Satisfaction", score: 92 },
                        ].map((metric, index) => (
                          <div key={index} className="space-y-2">
                            <div className="flex justify-between">
                              <p className="font-medium">{metric.name}</p>
                              <p className="font-medium">{metric.score}%</p>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-culinary-teal h-2 rounded-full"
                                style={{ width: `${metric.score}%` }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Goals</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {[
                            { title: "Develop new seasonal menu", status: "In Progress", completion: 70 },
                            { title: "Complete advanced culinary training", status: "Not Started", completion: 0 },
                            { title: "Improve kitchen efficiency by 15%", status: "Completed", completion: 100 },
                          ].map((goal, index) => (
                            <div key={index} className="p-3 border rounded-lg">
                              <div className="flex justify-between items-start">
                                <div>
                                  <p className="font-medium">{goal.title}</p>
                                  <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                                    <div
                                      className={`h-1.5 rounded-full ${
                                        goal.completion === 100
                                          ? "bg-green-500"
                                          : "bg-culinary-teal"
                                      }`}
                                      style={{ width: `${goal.completion}%` }}
                                    ></div>
                                  </div>
                                </div>
                                <span
                                  className={`px-2 py-1 text-xs rounded-full ${
                                    goal.status === "Completed"
                                      ? "bg-green-100 text-green-800"
                                      : goal.status === "In Progress"
                                      ? "bg-blue-100 text-blue-800"
                                      : "bg-gray-100 text-gray-800"
                                  }`}
                                >
                                  {goal.status}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Recent Feedback</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {[
                            {
                              from: "Restaurant Manager",
                              date: "Oct 12, 2023",
                              message:
                                "Exceptional work on the new autumn menu. Customer feedback has been very positive.",
                            },
                            {
                              from: "Kitchen Staff",
                              date: "Sep 28, 2023",
                              message:
                                "Great leadership during the busy weekend rush. Helped everyone stay organized.",
                            },
                          ].map((feedback, index) => (
                            <div key={index} className="p-3 border rounded-lg">
                              <div className="flex justify-between items-start mb-2">
                                <p className="font-medium">{feedback.from}</p>
                                <p className="text-xs text-gray-500">{feedback.date}</p>
                              </div>
                              <p className="text-sm">{feedback.message}</p>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="training" className="p-6">
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Certifications</CardTitle>
                      <CardDescription>Current certifications and expiration dates</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[
                          {
                            name: "Food Safety Certification",
                            issuer: "National Restaurant Association",
                            date: "Feb 15, 2023",
                            expiry: "Feb 15, 2026",
                            status: "Active",
                          },
                          {
                            name: "Culinary Arts Degree",
                            issuer: "Culinary Institute of America",
                            date: "May 20, 2020",
                            expiry: "No Expiration",
                            status: "Active",
                          },
                        ].map((cert, index) => (
                          <div key={index} className="p-4 border rounded-lg flex justify-between items-center">
                            <div className="flex items-start">
                              <GraduationCap className="h-5 w-5 text-culinary-teal mr-3 mt-1" />
                              <div>
                                <p className="font-medium">{cert.name}</p>
                                <p className="text-sm text-gray-500">{cert.issuer}</p>
                                <div className="flex text-xs text-gray-500 mt-1">
                                  <span>Issued: {cert.date}</span>
                                  <span className="mx-2">•</span>
                                  <span>Expires: {cert.expiry}</span>
                                </div>
                              </div>
                            </div>
                            <span
                              className={`px-2 py-1 text-xs rounded-full ${
                                cert.status === "Active"
                                  ? "bg-green-100 text-green-800"
                                  : cert.status === "Expiring Soon"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {cert.status}
                            </span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Training Courses</CardTitle>
                      <CardDescription>Completed and ongoing training</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[
                          {
                            name: "Advanced Pastry Techniques",
                            progress: 100,
                            completionDate: "Sep 10, 2023",
                            status: "Completed",
                          },
                          {
                            name: "Restaurant Management Essentials",
                            progress: 60,
                            dueDate: "Nov 30, 2023",
                            status: "In Progress",
                          },
                          {
                            name: "Sustainable Cooking Practices",
                            progress: 0,
                            dueDate: "Jan 15, 2024",
                            status: "Not Started",
                          },
                        ].map((course, index) => (
                          <div key={index} className="p-4 border rounded-lg">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <p className="font-medium">{course.name}</p>
                                {course.completionDate && (
                                  <p className="text-xs text-gray-500">
                                    Completed on {course.completionDate}
                                  </p>
                                )}
                                {course.dueDate && (
                                  <p className="text-xs text-gray-500">Due by {course.dueDate}</p>
                                )}
                              </div>
                              <span
                                className={`px-2 py-1 text-xs rounded-full ${
                                  course.status === "Completed"
                                    ? "bg-green-100 text-green-800"
                                    : course.status === "In Progress"
                                    ? "bg-blue-100 text-blue-800"
                                    : "bg-gray-100 text-gray-800"
                                }`}
                              >
                                {course.status}
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className={`${
                                  course.progress === 100 ? "bg-green-500" : "bg-culinary-teal"
                                } h-2 rounded-full`}
                                style={{ width: `${course.progress}%` }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <div className="flex justify-end">
                    <Button variant="outline" className="mr-2">
                      <FileText className="h-4 w-4 mr-2" />
                      View Training History
                    </Button>
                    <Button className="bg-culinary-teal text-white">
                      <Plus className="h-4 w-4 mr-2" />
                      Add New Training
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          ) : (
            <div className="p-8 text-center">
              <div className="mx-auto w-16 h-16 bg-culinary-light rounded-full flex items-center justify-center mb-4">
                <Search className="h-8 w-8 text-culinary-teal" />
              </div>
              <h3 className="text-xl font-semibold text-culinary-navy mb-2">Select an Employee</h3>
              <p className="text-gray-500">
                Choose an employee from the list to view their details and manage their information.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeeManagement;
