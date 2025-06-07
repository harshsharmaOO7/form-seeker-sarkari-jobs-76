
import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Calendar, Building, MapPin, Shield, Train, CreditCard, GraduationCap, Flag, Clock, FileText, TrendingUp, Users } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const latestJobs = [
    {
      id: 1,
      title: "Police Constable Recruitment 2024",
      department: "State Police Department",
      description: "Recruitment for 5000 Police Constable posts across various districts",
      lastDate: "2024-07-15",
      category: "Police",
      posts: "5000",
      status: "Active"
    },
    {
      id: 2,
      title: "Railway Group D Notification",
      department: "Indian Railways",
      description: "Application for Track Maintainer, Helper and other Group D posts",
      lastDate: "2024-07-20",
      category: "Railway",
      posts: "35000",
      status: "Active"
    },
    {
      id: 3,
      title: "Bank PO Recruitment",
      department: "State Bank of India",
      description: "Probationary Officer recruitment for various branches",
      lastDate: "2024-07-25",
      category: "Banking",
      posts: "2000",
      status: "Active"
    },
    {
      id: 4,
      title: "Teaching Staff Vacancy",
      department: "Education Department",
      description: "Primary and Secondary teacher recruitment in government schools",
      lastDate: "2024-07-30",
      category: "Teaching",
      posts: "8500",
      status: "New"
    }
  ];

  const categories = [
    {
      name: "Police Jobs",
      icon: Shield,
      count: "125+ Active",
      color: "bg-blue-50 text-blue-700 border-blue-200",
      path: "/category/police"
    },
    {
      name: "Railway Jobs",
      icon: Train,
      count: "89+ Active",
      color: "bg-green-50 text-green-700 border-green-200",
      path: "/category/railway"
    },
    {
      name: "Bank Jobs",
      icon: CreditCard,
      count: "67+ Active",
      color: "bg-purple-50 text-purple-700 border-purple-200",
      path: "/category/banking"
    },
    {
      name: "Teaching",
      icon: GraduationCap,
      count: "156+ Active",
      color: "bg-orange-50 text-orange-700 border-orange-200",
      path: "/category/teaching"
    },
    {
      name: "Defence",
      icon: Flag,
      count: "78+ Active",
      color: "bg-red-50 text-red-700 border-red-200",
      path: "/category/defence"
    },
    {
      name: "SSC Jobs",
      icon: FileText,
      count: "45+ Active",
      color: "bg-indigo-50 text-indigo-700 border-indigo-200",
      path: "/category/ssc"
    }
  ];

  const quickStats = [
    { label: "Total Jobs", value: "2,458", icon: FileText },
    { label: "Active Today", value: "127", icon: TrendingUp },
    { label: "This Week", value: "543", icon: Calendar },
    { label: "Total Users", value: "50K+", icon: Users }
  ];

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
      
      {/* Search Section */}
      <section className="bg-gradient-to-r from-primary via-primary to-accent text-primary-foreground py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Latest Sarkari Job Forms & Results
            </h1>
            <p className="text-lg mb-6 opacity-90">
              Get instant access to government job notifications, forms, and results
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                  <Input
                    type="text"
                    placeholder="Search jobs, results, forms..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 py-3 text-base bg-card text-foreground border-0"
                  />
                </div>
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground px-6">
                  Search
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-6 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickStats.map((stat, index) => (
              <Card key={index} className="text-center p-4">
                <div className="flex items-center justify-center mb-2">
                  <stat.icon className="w-6 h-6 text-primary mr-2" />
                  <span className="text-2xl font-bold text-primary">{stat.value}</span>
                </div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Latest Jobs Section */}
            <div className="mb-8">
              <div className="section-header rounded-t-md">
                <div className="flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  Latest Job Notifications
                </div>
              </div>
              <div className="bg-card border border-t-0 rounded-b-md">
                {latestJobs.map((job, index) => (
                  <div key={job.id} className={`p-4 ${index !== latestJobs.length - 1 ? 'border-b border-border' : ''}`}>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant={job.status === 'New' ? 'default' : 'secondary'} className="text-xs">
                            {job.status}
                          </Badge>
                          <span className="category-badge">{job.category}</span>
                        </div>
                        <h3 className="font-semibold text-foreground mb-1 hover:text-primary cursor-pointer">
                          <Link to={`/job/${job.id}`}>{job.title}</Link>
                        </h3>
                        <p className="text-sm text-muted-foreground mb-2">{job.department}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center">
                            <Users className="w-4 h-4 mr-1" />
                            {job.posts} Posts
                          </span>
                          <span className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            Last Date: {formatDate(job.lastDate)}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <div className="text-center">
                          <div className="text-lg font-bold text-primary">{getDaysLeft(job.lastDate)}</div>
                          <div className="text-xs text-muted-foreground">Days Left</div>
                        </div>
                        <Link to={`/job/${job.id}`}>
                          <Button size="sm">View Details</Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="p-4 text-center border-t border-border">
                  <Link to="/category/all">
                    <Button variant="outline">View All Jobs</Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Categories Grid */}
            <div>
              <div className="section-header rounded-t-md">
                <div className="flex items-center">
                  <Building className="w-5 h-5 mr-2" />
                  Job Categories
                </div>
              </div>
              <div className="bg-card border border-t-0 rounded-b-md p-6">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {categories.map((category) => (
                    <Link key={category.name} to={category.path}>
                      <Card className={`text-center hover:shadow-md transition-all duration-200 border-2 ${category.color}`}>
                        <CardContent className="p-4">
                          <div className="flex flex-col items-center">
                            <category.icon className="w-8 h-8 mb-2" />
                            <h3 className="font-semibold text-sm mb-1">{category.name}</h3>
                            <p className="text-xs opacity-75">{category.count}</p>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Important Links */}
            <div className="mb-6">
              <div className="section-header rounded-t-md">
                Important Links
              </div>
              <div className="bg-card border border-t-0 rounded-b-md p-4">
                <div className="space-y-2">
                  <a href="#" className="block text-sm text-foreground hover:text-primary py-1 border-b border-border/50">
                    📋 Admit Card Downloads
                  </a>
                  <a href="#" className="block text-sm text-foreground hover:text-primary py-1 border-b border-border/50">
                    📊 Latest Results
                  </a>
                  <a href="#" className="block text-sm text-foreground hover:text-primary py-1 border-b border-border/50">
                    📝 Application Forms
                  </a>
                  <a href="#" className="block text-sm text-foreground hover:text-primary py-1 border-b border-border/50">
                    📅 Exam Calendar
                  </a>
                  <a href="#" className="block text-sm text-foreground hover:text-primary py-1">
                    ❓ Help & Support
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Updates */}
            <div className="mb-6">
              <div className="section-header rounded-t-md">
                Quick Updates
              </div>
              <div className="bg-card border border-t-0 rounded-b-md p-4">
                <div className="space-y-3">
                  <div className="text-sm">
                    <div className="font-medium text-foreground">Railway Result 2024</div>
                    <div className="text-muted-foreground text-xs">Published 2 hours ago</div>
                  </div>
                  <div className="text-sm">
                    <div className="font-medium text-foreground">Police Admit Card</div>
                    <div className="text-muted-foreground text-xs">Published 5 hours ago</div>
                  </div>
                  <div className="text-sm">
                    <div className="font-medium text-foreground">Bank PO Notification</div>
                    <div className="text-muted-foreground text-xs">Published 1 day ago</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Advertisement Space */}
            <div className="bg-muted/20 border-2 border-dashed border-border rounded-md p-8 text-center">
              <p className="text-muted-foreground text-sm">Advertisement Space</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Index;
