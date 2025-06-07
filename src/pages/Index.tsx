
import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Calendar, Building, MapPin, Shield, Train, CreditCard, GraduationCap, Flag } from "lucide-react";
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
      category: "Police"
    },
    {
      id: 2,
      title: "Railway Group D Notification",
      department: "Indian Railways",
      description: "Application for Track Maintainer, Helper and other Group D posts",
      lastDate: "2024-07-20",
      category: "Railway"
    },
    {
      id: 3,
      title: "Bank PO Recruitment",
      department: "State Bank of India",
      description: "Probationary Officer recruitment for various branches",
      lastDate: "2024-07-25",
      category: "Banking"
    },
    {
      id: 4,
      title: "Teaching Staff Vacancy",
      department: "Education Department",
      description: "Primary and Secondary teacher recruitment in government schools",
      lastDate: "2024-07-30",
      category: "Teaching"
    },
    {
      id: 5,
      title: "Army Soldier Recruitment",
      department: "Indian Army",
      description: "Soldier General Duty and Soldier Technical recruitment",
      lastDate: "2024-08-05",
      category: "Defence"
    },
    {
      id: 6,
      title: "Clerk Recruitment 2024",
      department: "High Court",
      description: "Office Assistant and Data Entry Operator positions",
      lastDate: "2024-08-10",
      category: "Clerical"
    }
  ];

  const categories = [
    {
      name: "Police Jobs",
      icon: Shield,
      count: "125+ Forms",
      color: "bg-blue-100 text-blue-700",
      path: "/category/police"
    },
    {
      name: "Railway Jobs",
      icon: Train,
      count: "89+ Forms",
      color: "bg-green-100 text-green-700",
      path: "/category/railway"
    },
    {
      name: "Bank Jobs",
      icon: CreditCard,
      count: "67+ Forms",
      color: "bg-purple-100 text-purple-700",
      path: "/category/banking"
    },
    {
      name: "Teaching",
      icon: GraduationCap,
      count: "156+ Forms",
      color: "bg-orange-100 text-orange-700",
      path: "/category/teaching"
    },
    {
      name: "Defence",
      icon: Flag,
      count: "78+ Forms",
      color: "bg-red-100 text-red-700",
      path: "/category/defence"
    }
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
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-accent text-primary-foreground py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Latest Sarkari Offline Forms
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Get instant access to government job forms, notifications, and recruitment updates
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                  <Input
                    type="text"
                    placeholder="Search for job forms, departments, or categories..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 py-3 text-lg bg-card text-foreground"
                  />
                </div>
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground px-8">
                  Search Forms
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Job Forms Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Latest Job Forms
            </h2>
            <p className="text-xl text-muted-foreground">
              Recently published government job notifications and forms
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestJobs.map((job) => (
              <Card key={job.id} className="hover:shadow-lg transition-shadow duration-200">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="secondary" className="mb-2">
                      {job.category}
                    </Badge>
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">Days left</div>
                      <div className="font-bold text-lg">
                        {getDaysLeft(job.lastDate)}
                      </div>
                    </div>
                  </div>
                  <CardTitle className="text-lg leading-tight">
                    {job.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center text-muted-foreground">
                      <Building className="w-4 h-4 mr-2" />
                      <span className="text-sm">{job.department}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {job.description}
                    </p>
                    <div className="flex items-center text-muted-foreground">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span className="text-sm">Last Date: {formatDate(job.lastDate)}</span>
                    </div>
                    <Link to={`/job/${job.id}`}>
                      <Button className="w-full mt-4">
                        View Details
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link to="/category/all">
              <Button variant="outline" size="lg">
                View All Job Forms
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Job Categories
            </h2>
            <p className="text-xl text-muted-foreground">
              Browse forms by department and job type
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {categories.map((category) => (
              <Link key={category.name} to={category.path}>
                <Card className="text-center hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
                  <CardContent className="p-6">
                    <div className={`w-16 h-16 mx-auto rounded-full ${category.color} flex items-center justify-center mb-4`}>
                      <category.icon className="w-8 h-8" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{category.name}</h3>
                    <p className="text-muted-foreground text-sm">{category.count}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
