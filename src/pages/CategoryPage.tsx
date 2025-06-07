
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Search, Calendar, Building, Filter, ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const CategoryPage = () => {
  const { categoryName } = useParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("latest");

  // Mock data for different categories
  const allJobs = [
    {
      id: 1,
      title: "Police Constable Recruitment 2024",
      department: "State Police Department",
      description: "Recruitment for 5000 Police Constable posts across various districts with written exam and physical test",
      lastDate: "2024-07-15",
      category: "police",
      posts: "5000",
      eligibility: "12th Pass"
    },
    {
      id: 2,
      title: "Sub Inspector Notification",
      department: "Central Police Force",
      description: "Direct recruitment for Sub Inspector posts in various central police organizations",
      lastDate: "2024-07-22",
      category: "police",
      posts: "800",
      eligibility: "Graduate"
    },
    {
      id: 3,
      title: "Railway Group D Recruitment",
      department: "Indian Railways",
      description: "Application for Track Maintainer, Helper, Assistant Pointsman and other Group D posts",
      lastDate: "2024-07-20",
      category: "railway",
      posts: "15000",
      eligibility: "10th Pass"
    },
    {
      id: 4,
      title: "Station Master Recruitment",
      department: "Railway Board",
      description: "Recruitment for Station Master posts in various railway zones across India",
      lastDate: "2024-08-01",
      category: "railway",
      posts: "500",
      eligibility: "Graduate"
    },
    {
      id: 5,
      title: "Bank PO Recruitment",
      department: "State Bank of India",
      description: "Probationary Officer recruitment for various branches across India with training program",
      lastDate: "2024-07-25",
      category: "banking",
      posts: "2000",
      eligibility: "Graduate"
    },
    {
      id: 6,
      title: "Bank Clerk Notification",
      department: "Punjab National Bank",
      description: "Junior Associate (Customer Support & Sales) recruitment in various states",
      lastDate: "2024-08-05",
      category: "banking",
      posts: "3000",
      eligibility: "Graduate"
    },
    {
      id: 7,
      title: "Primary Teacher Recruitment",
      department: "Education Department",
      description: "Primary school teacher recruitment in government schools across rural and urban areas",
      lastDate: "2024-07-30",
      category: "teaching",
      posts: "8000",
      eligibility: "B.Ed"
    },
    {
      id: 8,
      title: "Professor Recruitment",
      department: "University Grants Commission",
      description: "Assistant Professor recruitment in various subjects for government colleges",
      lastDate: "2024-08-10",
      category: "teaching",
      posts: "1200",
      eligibility: "Ph.D"
    },
    {
      id: 9,
      title: "Army Soldier Recruitment",
      department: "Indian Army",
      description: "Soldier General Duty and Soldier Technical recruitment with physical and written tests",
      lastDate: "2024-08-05",
      category: "defence",
      posts: "10000",
      eligibility: "10th/12th Pass"
    },
    {
      id: 10,
      title: "Navy Sailor Recruitment",
      department: "Indian Navy",
      description: "Sailor recruitment for various trades including technical and non-technical posts",
      lastDate: "2024-08-15",
      category: "defence",
      posts: "3000",
      eligibility: "12th Pass"
    }
  ];

  const getCategoryTitle = (category: string) => {
    const titles = {
      police: "Police Offline Job Forms",
      railway: "Railway Offline Job Forms", 
      banking: "Banking Offline Job Forms",
      teaching: "Teaching Offline Job Forms",
      defence: "Defence Offline Job Forms",
      all: "All Job Categories"
    };
    return titles[category as keyof typeof titles] || "Job Forms";
  };

  const filteredJobs = allJobs.filter(job => {
    const matchesCategory = categoryName === "all" || job.category === categoryName;
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.department.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const getDaysLeft = (dateString: string) => {
    const today = new Date();
    const lastDate = new Date(dateString);
    const diffTime = lastDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Page Header */}
      <section className="bg-muted/30 py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-6">
            <Link to="/">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {getCategoryTitle(categoryName || "all")}
          </h1>
          <p className="text-lg text-muted-foreground">
            Find the latest government job forms and notifications in this category
          </p>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-6 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                type="text"
                placeholder="Search job forms..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Sort by:</span>
              </div>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="latest">Latest</SelectItem>
                  <SelectItem value="deadline">Deadline</SelectItem>
                  <SelectItem value="posts">No. of Posts</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="mt-4">
            <p className="text-sm text-muted-foreground">
              Showing {filteredJobs.length} job forms
            </p>
          </div>
        </div>
      </section>

      {/* Job Listings */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          {filteredJobs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">No job forms found matching your criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredJobs.map((job) => (
                <Card key={job.id} className="hover:shadow-lg transition-shadow duration-200">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <Badge variant="secondary" className="mb-2 capitalize">
                        {job.category}
                      </Badge>
                      <div className="text-right">
                        <div className="text-sm text-muted-foreground">Days left</div>
                        <div className={`font-bold text-lg ${getDaysLeft(job.lastDate) <= 7 ? 'text-destructive' : 'text-foreground'}`}>
                          {getDaysLeft(job.lastDate)}
                        </div>
                      </div>
                    </div>
                    <CardTitle className="text-xl leading-tight">
                      {job.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center text-muted-foreground">
                        <Building className="w-4 h-4 mr-2" />
                        <span className="text-sm">{job.department}</span>
                      </div>
                      
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {job.description}
                      </p>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-medium text-foreground">Posts: </span>
                          <span className="text-muted-foreground">{job.posts}</span>
                        </div>
                        <div>
                          <span className="font-medium text-foreground">Eligibility: </span>
                          <span className="text-muted-foreground">{job.eligibility}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center text-muted-foreground">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span className="text-sm">Last Date: {formatDate(job.lastDate)}</span>
                      </div>
                      
                      <Link to={`/job/${job.id}`}>
                        <Button className="w-full">
                          View Details & Download Form
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
          
          {/* Pagination */}
          {filteredJobs.length > 0 && (
            <div className="flex justify-center mt-12">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" disabled>
                  Previous
                </Button>
                <Button variant="default" size="sm">
                  1
                </Button>
                <Button variant="outline" size="sm">
                  2
                </Button>
                <Button variant="outline" size="sm">
                  3
                </Button>
                <Button variant="outline" size="sm">
                  Next
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CategoryPage;
