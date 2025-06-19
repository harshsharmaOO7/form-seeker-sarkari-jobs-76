import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Calendar,
  Building,
  MapPin,
  Shield,
  Train,
  CreditCard,
  GraduationCap,
  Flag,
  Clock,
  FileText,
  TrendingUp,
  Users,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { googleSheetsService, HomePageJobData } from "@/services/googleSheets";

const Index = () => {
  const [offlineFormData, setOfflineFormData] = useState<HomePageJobData[]>([]);
  const [onlineFormData, setOnlineFormData] = useState<HomePageJobData[]>([]);
  const [sewayojanData, setSewayojanData] = useState<HomePageJobData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomePageData = async () => {
      try {
        const data = await googleSheetsService.getHomePageData();
        setOfflineFormData(data.offline);
        setOnlineFormData(data.online);
        setSewayojanData(data.sewayojan);
      } catch (error) {
        console.error("Error fetching home page data:", error);
        // Keep existing fallback data if API fails
      } finally {
        setLoading(false);
      }
    };

    fetchHomePageData();
  }, []);

  // Fallback data in case Google Sheets is not available
  const fallbackOfflineFormData = [
    {
      id: 1,
      title: "SSC Combined Hindi Translators JHT Offline Form 2025",
      description: "Download Available",
      link: "/offline-form/1",
    },
    {
      id: 2,
      title: "Railway Group D Offline Application Form 2025",
      description: "PDF Download",
      link: "/offline-form/2",
    },
    {
      id: 3,
      title: "Police Constable Offline Form 2025",
      description: "Download Now",
      link: "/offline-form/3",
    },
    {
      id: 4,
      title: "BSPHCL Various Post Offline Form 2025",
      description: "Available",
      link: "/offline-form/4",
    },
    {
      id: 5,
      title: "UP GNM Entrance Test Offline Form 2025",
      description: "Download PDF",
      link: "/offline-form/5",
    },
  ];

  const fallbackOnlineFormData = [
    {
      id: 1,
      title: "SSC Stenographer Grade C and D Online Form 2025",
      description: "Apply Online",
      link: "/online-form/1",
    },
    {
      id: 2,
      title: "Army School AWES TGT, PGT, PRT Online Form 2025",
      description: "Registration Open",
      link: "/online-form/2",
    },
    {
      id: 3,
      title: "Bihar Panchayati Raj Technical Assistant Online Form 2025",
      description: "Apply Now",
      link: "/online-form/3",
    },
    {
      id: 4,
      title: "BSSC Field Assistant Online Application 2025",
      description: "Available",
      link: "/online-form/4",
    },
    {
      id: 5,
      title: "NAUKRIIG NET June 2025 Online Registration",
      description: "Apply Online",
      link: "/online-form/5",
    },
  ];

  const fallbackSewayojanData = [
    {
      id: 1,
      title: "SSC Combined Hindi Translators JHT Online Form 2025",
      description: "Apply Online",
      link: "/sewayojan/1",
    },
    {
      id: 2,
      title: "SSC Stenographer Grade C and D Online Form 2025",
      description: "Registration Open",
      link: "/sewayojan/2",
    },
    {
      id: 3,
      title: "Army School AWES TGT, PGT, PRT Online Form 2025",
      description: "Apply Now",
      link: "/sewayojan/3",
    },
    {
      id: 4,
      title: "Bihar Panchayati Raj Technical Assistant Online Form 2025",
      description: "Application Open",
      link: "/sewayojan/4",
    },
    {
      id: 5,
      title:
        "IPSCDRA Operation Officer and Other Various Post Online Form 2025",
      description: "Apply Online",
      link: "/sewayojan/5",
    },
  ];

  const quickStats = [
    { label: "Total Jobs", value: "2,458", icon: FileText },
    { label: "Active Today", value: "127", icon: TrendingUp },
    { label: "This Week", value: "543", icon: Calendar },
    { label: "Total Users", value: "50K+", icon: Users },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary via-primary to-accent text-primary-foreground py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Latest Sarkari Job Forms & Results
            </h1>
            <p className="text-lg mb-6 opacity-90">
              Get instant access to government job notifications, forms, and
              results
            </p>
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
                  <span className="text-2xl font-bold text-primary">
                    {stat.value}
                  </span>
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
              {/* Offline Form Column */}
              <div className="bg-white border rounded-lg">
                <div className="bg-red-600 text-white px-4 py-3 font-semibold text-lg rounded-t-lg">
                  Offline Form
                </div>
                <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
                  {(offlineFormData.length > 0
                    ? offlineFormData
                    : fallbackOfflineFormData
                  ).map((item) => (
                    <div
                      key={item.id}
                      className="border-b border-gray-100 pb-2 last:border-b-0"
                    >
                      <Link to={item.link} className="block hover:text-primary">
                        <div className="flex items-start gap-2">
                          <span className="text-blue-600 text-xs mt-1">•</span>
                          <div>
                            <h4 className="text-sm font-medium text-slate-800 hover:text-primary line-clamp-2">
                              {item.title}
                            </h4>
                            <span className="text-xs text-green-700 font-medium">
                              {item.description}
                            </span>
                            {item.organization && (
                              <div className="text-xs text-gray-500 mt-1">
                                {item.organization}
                              </div>
                            )}
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
                <div className="p-3 text-center border-t">
                  <Link to="/offline-forms">
                    <Button variant="outline" size="sm">
                      View All Offline Forms
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Online Form Column */}
              <div className="bg-white border rounded-lg">
                <div className="bg-green-600 text-white px-4 py-3 font-semibold text-lg rounded-t-lg">
                  Online Form
                </div>
                <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
                  {(onlineFormData.length > 0
                    ? onlineFormData
                    : fallbackOnlineFormData
                  ).map((item) => (
                    <div
                      key={item.id}
                      className="border-b border-gray-100 pb-2 last:border-b-0"
                    >
                      <Link to={item.link} className="block hover:text-primary">
                        <div className="flex items-start gap-2">
                          <span className="text-blue-600 text-xs mt-1">•</span>
                          <div>
                            <h4 className="text-sm font-medium text-slate-800 hover:text-primary line-clamp-2">
                              {item.title}
                            </h4>
                            <span className="text-xs text-orange-700 font-medium">
                              {item.description}
                            </span>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
                <div className="p-3 text-center border-t">
                  <Link to="/online-forms">
                    <Button variant="outline" size="sm">
                      View All Online Forms
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Sewayojan Bharti Column */}
              <div className="bg-white border rounded-lg">
                <div className="bg-blue-600 text-white px-4 py-3 font-semibold text-lg rounded-t-lg">
                  Sewayojan Bharti
                </div>
                <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
                  {(sewayojanData.length > 0
                    ? sewayojanData
                    : fallbackSewayojanData
                  ).map((item) => (
                    <div
                      key={item.id}
                      className="border-b border-gray-100 pb-2 last:border-b-0"
                    >
                      <Link to={item.link} className="block hover:text-primary">
                        <div className="flex items-start gap-2">
                          <span className="text-blue-600 text-xs mt-1">•</span>
                          <div>
                            <h4 className="text-sm font-medium text-slate-800 hover:text-primary line-clamp-2">
                              {item.title}
                            </h4>
                            <span className="text-xs text-purple-700 font-medium">
                              {item.description}
                            </span>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
                <div className="p-3 text-center border-t">
                  <Link to="/sewayojan">
                    <Button variant="outline" size="sm">
                      View All Sewayojan
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Advertisement Space (where categories used to be) */}
            <div className="mt-8 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-16 text-center">
              <p className="text-gray-500 text-lg">Advertisement Space</p>
              <p className="text-gray-400 text-sm mt-2">728x90 Banner Ads</p>
            </div>
          </div>

          {/* Sidebar - Advertisement Space */}
          <div className="lg:col-span-1">
            <div className="bg-muted/20 border-2 border-dashed border-border rounded-md p-8 text-center">
              <p className="text-muted-foreground text-sm">
                Advertisement Space
              </p>
              <p className="text-muted-foreground text-xs mt-1">300x600 Sidebar</p>
            </div>
          </div>
        </div>

        {/* Bottom Section - Important Links and Quick Updates */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Important Links - Moved to Bottom */}
          <div>
            <div className="section-header rounded-t-md">Important Links</div>
            <div className="bg-white border border-t-0 rounded-b-md p-4">
              <div className="space-y-2">
                <a
                  href="#"
                  className="block text-sm text-slate-700 hover:text-primary py-1 border-b border-border/50"
                >
                  📋 Admit Card Downloads
                </a>
                <a
                  href="#"
                  className="block text-sm text-slate-700 hover:text-primary py-1 border-b border-border/50"
                >
                  📊 Latest Results
                </a>
                <a
                  href="#"
                  className="block text-sm text-slate-700 hover:text-primary py-1 border-b border-border/50"
                >
                  📝 Application Forms
                </a>
                <a
                  href="#"
                  className="block text-sm text-slate-700 hover:text-primary py-1 border-b border-border/50"
                >
                  📅 Exam Calendar
                </a>
                <a
                  href="#"
                  className="block text-sm text-slate-700 hover:text-primary py-1"
                >
                  ❓ Help & Support
                </a>
              </div>
            </div>
          </div>

          {/* Quick Updates - Moved to Bottom */}
          <div>
            <div className="section-header rounded-t-md">Quick Updates</div>
            <div className="bg-white border border-t-0 rounded-b-md p-4">
              <div className="space-y-3">
                <div className="text-sm">
                  <div className="font-medium text-slate-800">
                    Railway Result 2024
                  </div>
                  <div className="text-slate-600 text-xs">
                    Published 2 hours ago
                  </div>
                </div>
                <div className="text-sm">
                  <div className="font-medium text-slate-800">
                    Police Admit Card
                  </div>
                  <div className="text-slate-600 text-xs">
                    Published 5 hours ago
                  </div>
                </div>
                <div className="text-sm">
                  <div className="font-medium text-slate-800">
                    Bank PO Notification
                  </div>
                  <div className="text-slate-600 text-xs">
                    Published 1 day ago
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Index;
