
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
import { Search, Filter, Star, MessageSquare, ThumbsUp, ThumbsDown } from "lucide-react";

const CustomerFeedback = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Mock feedback data
  const feedbacks = [
    {
      id: 1,
      customer: "John Smith",
      date: "Nov 25, 2023",
      rating: 5,
      comment: "The salmon dish was outstanding. The sauce perfectly complemented the fish and the service was excellent!",
      source: "In-person",
      status: "Published",
      responded: true
    },
    {
      id: 2,
      customer: "Maria Rodriguez",
      date: "Nov 22, 2023",
      rating: 4,
      comment: "Really enjoyed the pasta special. Would have given 5 stars but the wait time was a bit longer than expected.",
      source: "Website",
      status: "Published",
      responded: true
    },
    {
      id: 3,
      customer: "David Chen",
      date: "Nov 20, 2023",
      rating: 2,
      comment: "Disappointed with my visit today. The food was cold when served and the staff was inattentive.",
      source: "Email",
      status: "Under Review",
      responded: false
    },
    {
      id: 4,
      customer: "Sophie Wilson",
      date: "Nov 18, 2023",
      rating: 5,
      comment: "Celebrated my anniversary here and everything was perfect! The chef's special tasting menu exceeded our expectations.",
      source: "Website",
      status: "Published",
      responded: true
    },
    {
      id: 5,
      customer: "Michael Johnson",
      date: "Nov 15, 2023",
      rating: 3,
      comment: "Average experience. The appetizers were great but the main course was just okay. Ambiance is nice though.",
      source: "In-person",
      status: "Published",
      responded: false
    }
  ];

  // Filter feedbacks based on search query
  const filteredFeedbacks = feedbacks.filter(feedback => 
    feedback.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    feedback.comment.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate average rating
  const averageRating = feedbacks.reduce((acc, feedback) => acc + feedback.rating, 0) / feedbacks.length;

  // Count ratings
  const ratingCounts = [1, 2, 3, 4, 5].map(rating => 
    feedbacks.filter(feedback => feedback.rating === rating).length
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-culinary-navy">Customer Feedback</h1>
        <div className="flex gap-2 mt-4 md:mt-0">
          <button className="bg-culinary-teal text-white px-4 py-2 rounded-md flex items-center">
            <MessageSquare className="h-4 w-4 mr-2" />
            Request Feedback
          </button>
          <button className="bg-white border border-culinary-gray/20 px-4 py-2 rounded-md flex items-center">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="dashboard-card lg:col-span-1">
          <h2 className="text-xl font-semibold text-culinary-navy mb-4">Feedback Overview</h2>
          
          <div className="flex flex-col items-center mb-6">
            <div className="text-4xl font-bold text-culinary-teal flex items-center">
              {averageRating.toFixed(1)}
              <span className="text-amber-400 ml-2">
                <Star className="h-8 w-8 fill-current" />
              </span>
            </div>
            <div className="text-culinary-gray mt-1">Average Rating</div>
            <div className="text-sm text-culinary-gray mt-1">Based on {feedbacks.length} reviews</div>
          </div>

          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map(rating => (
              <div key={rating} className="flex items-center">
                <div className="flex items-center w-12">
                  <span className="text-sm font-medium">{rating}</span>
                  <Star className="h-4 w-4 text-amber-400 ml-1" />
                </div>
                <div className="flex-1 h-2 bg-gray-200 rounded-full mx-2">
                  <div
                    className="h-2 rounded-full bg-culinary-teal"
                    style={{ width: `${(ratingCounts[5-rating] / feedbacks.length) * 100}%` }}
                  ></div>
                </div>
                <div className="w-8 text-right text-sm text-culinary-gray">
                  {ratingCounts[5-rating]}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t">
            <h3 className="font-medium text-culinary-navy mb-3">Feedback Sources</h3>
            <div className="grid grid-cols-3 gap-2">
              <div className="p-3 bg-culinary-light rounded-lg text-center">
                <div className="text-lg font-bold text-culinary-teal">55%</div>
                <div className="text-xs text-culinary-gray">In-person</div>
              </div>
              <div className="p-3 bg-culinary-light rounded-lg text-center">
                <div className="text-lg font-bold text-culinary-teal">32%</div>
                <div className="text-xs text-culinary-gray">Website</div>
              </div>
              <div className="p-3 bg-culinary-light rounded-lg text-center">
                <div className="text-lg font-bold text-culinary-teal">13%</div>
                <div className="text-xs text-culinary-gray">Email</div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t">
            <h3 className="font-medium text-culinary-navy mb-3">Response Rate</h3>
            <div className="flex items-center">
              <div className="w-16 h-16 rounded-full border-4 border-culinary-teal flex items-center justify-center">
                <span className="text-lg font-bold text-culinary-navy">78%</span>
              </div>
              <div className="ml-4">
                <div className="text-sm font-medium text-culinary-navy">78 of 100</div>
                <div className="text-xs text-culinary-gray">Reviews responded to</div>
              </div>
            </div>
          </div>
        </div>

        <div className="dashboard-card lg:col-span-2">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-culinary-navy mb-4 md:mb-0">Recent Feedback</h2>
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search feedback..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Feedback</TableHead>
                  <TableHead>Source</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredFeedbacks.map((feedback) => (
                  <TableRow key={feedback.id}>
                    <TableCell className="font-medium">{feedback.customer}</TableCell>
                    <TableCell>{feedback.date}</TableCell>
                    <TableCell>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < feedback.rating ? 'text-amber-400 fill-current' : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="max-w-xs">
                      <div className="truncate">{feedback.comment}</div>
                    </TableCell>
                    <TableCell>{feedback.source}</TableCell>
                    <TableCell>
                      <div className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        feedback.status === 'Published' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {feedback.status}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <button className="text-culinary-teal hover:text-culinary-teal/80 tooltip" title="View Details">
                          <MessageSquare className="h-4 w-4" />
                        </button>
                        {!feedback.responded && (
                          <button className="text-culinary-teal hover:text-culinary-teal/80 tooltip" title="Respond">
                            <ThumbsUp className="h-4 w-4" />
                          </button>
                        )}
                        <button className="text-red-500 hover:text-red-600 tooltip" title="Mark as inappropriate">
                          <ThumbsDown className="h-4 w-4" />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      <div className="dashboard-card">
        <h2 className="text-xl font-semibold text-culinary-navy mb-6">Popular Feedback Topics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 bg-culinary-light rounded-lg">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-culinary-navy">Food Quality</h3>
                <div className="flex mt-1">
                  <Star className="h-4 w-4 text-amber-400 fill-current" />
                  <Star className="h-4 w-4 text-amber-400 fill-current" />
                  <Star className="h-4 w-4 text-amber-400 fill-current" />
                  <Star className="h-4 w-4 text-amber-400 fill-current" />
                  <Star className="h-4 w-4 text-amber-400 fill-current" />
                </div>
              </div>
              <div className="text-2xl font-bold text-culinary-teal">4.8</div>
            </div>
            <div className="mt-2 text-sm text-culinary-gray">Mentioned in 85% of reviews</div>
          </div>
          
          <div className="p-4 bg-culinary-light rounded-lg">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-culinary-navy">Service</h3>
                <div className="flex mt-1">
                  <Star className="h-4 w-4 text-amber-400 fill-current" />
                  <Star className="h-4 w-4 text-amber-400 fill-current" />
                  <Star className="h-4 w-4 text-amber-400 fill-current" />
                  <Star className="h-4 w-4 text-amber-400 fill-current" />
                  <Star className="h-4 w-4 text-gray-300" />
                </div>
              </div>
              <div className="text-2xl font-bold text-culinary-teal">4.2</div>
            </div>
            <div className="mt-2 text-sm text-culinary-gray">Mentioned in 72% of reviews</div>
          </div>
          
          <div className="p-4 bg-culinary-light rounded-lg">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-culinary-navy">Ambiance</h3>
                <div className="flex mt-1">
                  <Star className="h-4 w-4 text-amber-400 fill-current" />
                  <Star className="h-4 w-4 text-amber-400 fill-current" />
                  <Star className="h-4 w-4 text-amber-400 fill-current" />
                  <Star className="h-4 w-4 text-amber-400 fill-current" />
                  <Star className="h-4 w-4 text-amber-400 fill-current" />
                </div>
              </div>
              <div className="text-2xl font-bold text-culinary-teal">4.9</div>
            </div>
            <div className="mt-2 text-sm text-culinary-gray">Mentioned in 65% of reviews</div>
          </div>
          
          <div className="p-4 bg-culinary-light rounded-lg">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-culinary-navy">Value</h3>
                <div className="flex mt-1">
                  <Star className="h-4 w-4 text-amber-400 fill-current" />
                  <Star className="h-4 w-4 text-amber-400 fill-current" />
                  <Star className="h-4 w-4 text-amber-400 fill-current" />
                  <Star className="h-4 w-4 text-gray-300" />
                  <Star className="h-4 w-4 text-gray-300" />
                </div>
              </div>
              <div className="text-2xl font-bold text-culinary-teal">3.5</div>
            </div>
            <div className="mt-2 text-sm text-culinary-gray">Mentioned in 58% of reviews</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerFeedback;
