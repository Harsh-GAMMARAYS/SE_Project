
import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Clock, Calendar as CalendarIcon, Users, UtensilsCrossed, Clock10 } from "lucide-react";

const SchedulingCalendar = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  // Mock events
  const events = [
    {
      id: 1,
      title: "Food Tasting Event",
      time: "10:00 AM - 12:00 PM",
      guests: 12,
      location: "Main Dining Area",
      type: "Special Event",
      notes: "Corporate client, requires vegetarian options"
    },
    {
      id: 2,
      title: "Kitchen Staff Meeting",
      time: "2:00 PM - 3:00 PM",
      guests: 8,
      location: "Conference Room",
      type: "Internal",
      notes: "Monthly planning and menu review"
    },
    {
      id: 3,
      title: "Private Dinner Reservation",
      time: "7:00 PM - 10:00 PM",
      guests: 24,
      location: "VIP Section",
      type: "Reservation",
      notes: "Anniversary celebration, special wine pairing requested"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-culinary-navy">Scheduling & Calendar</h1>
        <div>
          <button className="bg-culinary-teal text-white px-4 py-2 rounded-md">
            + New Event
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 dashboard-card">
          <h2 className="text-xl font-semibold text-culinary-navy mb-4">Select Date</h2>
          <Calendar 
            mode="single" 
            selected={date} 
            onSelect={setDate} 
            className="p-0 rounded-md border"
          />
          
          <div className="mt-6">
            <h3 className="font-medium text-culinary-navy mb-2">Add New Event</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="event-title">Event Title</Label>
                <Input id="event-title" placeholder="Enter event title" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="start-time">Start Time</Label>
                  <Input id="start-time" type="time" />
                </div>
                <div>
                  <Label htmlFor="end-time">End Time</Label>
                  <Input id="end-time" type="time" />
                </div>
              </div>
              <div>
                <Label htmlFor="guests">Number of Guests</Label>
                <Input id="guests" type="number" min="1" placeholder="0" />
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <Input id="location" placeholder="Enter location" />
              </div>
              <div className="pt-2">
                <button className="w-full bg-culinary-teal text-white px-4 py-2 rounded-md">
                  Schedule Event
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-2 dashboard-card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-culinary-navy">
              Events for {date ? date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : "Today"}
            </h2>
            <div className="flex space-x-2">
              <button className="bg-white border border-culinary-gray/20 px-3 py-1 rounded-md text-sm">
                Day
              </button>
              <button className="bg-culinary-light border border-culinary-gray/20 px-3 py-1 rounded-md text-sm font-medium">
                Week
              </button>
              <button className="bg-white border border-culinary-gray/20 px-3 py-1 rounded-md text-sm">
                Month
              </button>
            </div>
          </div>
          
          <div className="space-y-3">
            {events.map((event) => (
              <div key={event.id} className="p-4 border rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow">
                <div className="flex flex-col md:flex-row justify-between">
                  <div>
                    <h3 className="font-semibold text-culinary-navy text-lg">{event.title}</h3>
                    <div className="flex items-center text-culinary-gray mt-1">
                      <Clock className="h-4 w-4 mr-1" />
                      <span className="text-sm">{event.time}</span>
                    </div>
                    <div className="flex items-center text-culinary-gray mt-1">
                      <Users className="h-4 w-4 mr-1" />
                      <span className="text-sm">{event.guests} guests</span>
                    </div>
                  </div>
                  <div className="mt-3 md:mt-0">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                      event.type === 'Special Event' 
                        ? 'bg-purple-100 text-purple-800' 
                        : event.type === 'Internal'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {event.type === 'Special Event' && <UtensilsCrossed className="h-3 w-3 mr-1" />}
                      {event.type === 'Internal' && <Clock10 className="h-3 w-3 mr-1" />}
                      {event.type === 'Reservation' && <CalendarIcon className="h-3 w-3 mr-1" />}
                      {event.type}
                    </span>
                    <div className="text-sm text-culinary-gray mt-2">
                      {event.location}
                    </div>
                  </div>
                </div>
                <div className="mt-3 text-sm text-culinary-gray border-t pt-2">
                  <p><span className="font-medium">Notes:</span> {event.notes}</p>
                </div>
                <div className="mt-3 flex justify-end space-x-2">
                  <button className="text-culinary-teal hover:text-culinary-teal/80 text-sm">Edit</button>
                  <button className="text-red-500 hover:text-red-600 text-sm">Cancel</button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <h3 className="font-medium text-culinary-navy mb-3">Upcoming Schedule</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-3 bg-culinary-light rounded-lg">
                <div className="text-sm font-medium text-culinary-navy">Today</div>
                <div className="text-2xl font-bold text-culinary-teal mt-1">3</div>
                <div className="text-xs text-culinary-gray">Events Scheduled</div>
              </div>
              <div className="p-3 bg-culinary-light rounded-lg">
                <div className="text-sm font-medium text-culinary-navy">This Week</div>
                <div className="text-2xl font-bold text-culinary-teal mt-1">12</div>
                <div className="text-xs text-culinary-gray">Events Scheduled</div>
              </div>
              <div className="p-3 bg-culinary-light rounded-lg">
                <div className="text-sm font-medium text-culinary-navy">This Month</div>
                <div className="text-2xl font-bold text-culinary-teal mt-1">42</div>
                <div className="text-xs text-culinary-gray">Events Scheduled</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchedulingCalendar;
