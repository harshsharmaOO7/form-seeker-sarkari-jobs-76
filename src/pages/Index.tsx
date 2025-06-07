
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

  const resultData = [
    {
      id: 1,
      title: "Jharkhand Board JAC Class 12th Arts Result 2025",
      description: "Declared",
      link: "/result/1"
    },
    {
      id: 2,
      title: "UPSC CDS II 2024 Marks",
      description: "Published",
      link: "/result/2"
    },
    {
      id: 3,
      title: "SSB Junior Instructor Result 2025",
      description: "Declared",
      link: "/result/3"
    },
    {
      id: 4,
      title: "OFSS Bihar Class 11th Admissions First Merit List 2025",
      description: "Released",
      link: "/result/4"
    },
    {
      id: 5,
      title: "JEE Advanced 2025 Result",
      description: "Declared",
      link: "/result/5"
    }
  ];

  const admitCardData = [
    {
      id: 1,
      title: "BSPHCL Various Post Exam Date 2025",
      description: "Download Now",
      link: "/admit-card/1"
    },
    {
      id: 2,
      title: "NAUKRIIG NET June 2025 Subject Wise Exam Date",
      description: "Available",
      link: "/admit-card/2"
    },
    {
      id: 3,
      title: "UPSSSC Mukhya Sevika 2022 DV Letter",
      description: "Download",
      link: "/admit-card/3"
    },
    {
      id: 4,
      title: "UP GNM Entrance Test UPGET 2025 Admit Card",
      description: "Released",
      link: "/admit-card/4"
    },
    {
      id: 5,
      title: "BSSC Field Assistant Exam Date 2025",
      description: "Available",
      link: "/admit-card/5"
    }
  ];

  const sewayojanData = [
    {
      id: 1,
      title: "SSC Combined Hindi Translators JHT Online Form 2025",
      description: "Apply Online",
      link: "/sewayojan/1"
    },
    {
      id: 2,
      title: "SSC Stenographer Grade C and D Online Form 2025",
      description: "Registration Open",
      link: "/sewayojan/2"
    },
    {
      id: 3,
      title: "Army School AWES TGT, PGT, PRT Online Form 2025",
      description: "Apply Now",
      link: "/sewayojan/3"
    },
    {
      id: 4,
      title: "Bihar Panchayati Raj Technical Assistant Online Form 2025",
      description: "Application Open",
      link: "/sewayojan/4"
    },
    {
      id: 5,
      title: "IPSCDRA Operation Officer and Other Various Post Online Form 2025",
      description: "Apply Online",
      link: "/sewayojan/5"
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

  return (
    <div className="min-h-screen bg-white">
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
              <Card key={index} className="text-center p-4 bg-white">
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
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content - Three Columns */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Result Column */}
              <div className="bg-white border rounded-lg">
                <div className="bg-red-600 text-white px-4 py-3 font-semibold text-lg rounded-t-lg">
                  Result
                </div>
                <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
                  {resultData.map((item) => (
                    <div key={item.id} className="border-b border-gray-100 pb-2 last:border-b-0">
                      <Link to={item.link} className="block hover:text-primary">
                        <div className="flex items-start gap-2">
                          <span className="text-blue-600 text-xs mt-1">•</span>
                          <div>
                            <h4 className="text-sm font-medium text-gray-800 hover:text-primary line-clamp-2">
                              {item.title}
                            </h4>
                            <span className="text-xs text-green-600 font-medium">{item.description}</span>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
                <div className="p-3 text-center border-t">
                  <Link to="/results">
                    <Button variant="outline" size="sm">View All Results</Button>
                  </Link>
                </div>
              </div>

              {/* Admit Card Column */}
              <div className="bg-white border rounded-lg">
                <div className="bg-green-600 text-white px-4 py-3 font-semibold text-lg rounded-t-lg">
                  Admit Card
                </div>
                <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
                  {admitCardData.map((item) => (
                    <div key={item.id} className="border-b border-gray-100 pb-2 last:border-b-0">
                      <Link to={item.link} className="block hover:text-primary">
                        <div className="flex items-start gap-2">
                          <span className="text-blue-600 text-xs mt-1">•</span>
                          <div>
                            <h4 className="text-sm font-medium text-gray-800 hover:text-primary line-clamp-2">
                              {item.title}
                            </h4>
                            <span className="text-xs text-orange-600 font-medium">{item.description}</span>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
                <div className="p-3 text-center border-t">
                  <Link to="/admit-cards">
                    <Button variant="outline" size="sm">View All Admit Cards</Button>
                  </Link>
                </div>
              </div>

              {/* Sewayojan Bharti Column */}
              <div className="bg-white border rounded-lg">
                <div className="bg-blue-600 text-white px-4 py-3 font-semibold text-lg rounded-t-lg">
                  Sewayojan Bharti
                </div>
                <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
                  {sewayojanData.map((item) => (
                    <div key={item.id} className="border-b border-gray-100 pb-2 last:border-b-0">
                      <Link to={item.link} className="block hover:text-primary">
                        <div className="flex items-start gap-2">
                          <span className="text-blue-600 text-xs mt-1">•</span>
                          <div>
                            <h4 className="text-sm font-medium text-gray-800 hover:text-primary line-clamp-2">
                              {item.title}
                            </h4>
                            <span className="text-xs text-purple-600 font-medium">{item.description}</span>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
                <div className="p-3 text-center border-t">
                  <Link to="/sewayojan">
                    <Button variant="outline" size="sm">View All Sewayojan</Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Categories Grid */}
            <div className="mt-8">
              <div className="section-header rounded-t-md">
                <div className="flex items-center">
                  <Building className="w-5 h-5 mr-2" />
                  Job Categories
                </div>
              </div>
              <div className="bg-white border border-t-0 rounded-b-md p-6">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {categories.map((category) => (
                    <Link key={category.name} to={category.path}>
                      <Card className={`text-center hover:shadow-md transition-all duration-200 border-2 ${category.color} bg-white`}>
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
              <div className="bg-white border border-t-0 rounded-b-md p-4">
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
              <div className="bg-white border border-t-0 rounded-b-md p-4">
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
