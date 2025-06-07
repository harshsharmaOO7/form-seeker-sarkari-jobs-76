
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Target, Users, Clock } from "lucide-react";

const About = () => {
  const features = [
    {
      icon: Search,
      title: "Latest Updates",
      description: "Get the most recent government job notifications and form releases as soon as they're published."
    },
    {
      icon: Target,
      title: "Accurate Information",
      description: "All information is verified and cross-checked from official government sources to ensure accuracy."
    },
    {
      icon: Users,
      title: "User-Friendly",
      description: "Easy-to-navigate interface designed to help you find the right job forms quickly and efficiently."
    },
    {
      icon: Clock,
      title: "Timely Alerts",
      description: "Never miss important deadlines with our timely notifications about application dates and exam schedules."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-accent text-primary-foreground py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About SarkariForm
            </h1>
            <p className="text-xl md:text-2xl opacity-90">
              Your trusted partner for government job opportunities
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Introduction */}
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-foreground mb-6">
                We Provide Latest Sarkari Offline Form Updates
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                SarkariForm is a dedicated platform that brings you the latest government job notifications, 
                offline application forms, and recruitment updates from various departments and organizations 
                across India. Our mission is to make government job information accessible to every aspirant 
                who dreams of serving the nation.
              </p>
            </div>

            {/* Mission Statement */}
            <Card className="mb-12">
              <CardHeader>
                <CardTitle className="text-2xl text-center">Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center leading-relaxed">
                  To bridge the gap between government job opportunities and aspiring candidates by providing 
                  accurate, timely, and comprehensive information about Sarkari job forms, notifications, and 
                  recruitment processes. We believe that every eligible candidate should have equal access to 
                  government job opportunities.
                </p>
              </CardContent>
            </Card>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              {features.map((feature, index) => (
                <Card key={index} className="text-center">
                  <CardHeader>
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <feature.icon className="w-8 h-8 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* What We Offer */}
            <Card className="mb-12">
              <CardHeader>
                <CardTitle className="text-2xl text-center">What We Offer</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-foreground mb-3">Job Categories We Cover:</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Police and Law Enforcement Jobs</li>
                      <li>• Railway Recruitment Notifications</li>
                      <li>• Banking Sector Opportunities</li>
                      <li>• Teaching and Education Jobs</li>
                      <li>• Defence and Military Recruitment</li>
                      <li>• Civil Services and Administrative Posts</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-3">Services Provided:</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Official notification downloads</li>
                      <li>• Application form access</li>
                      <li>• Important date reminders</li>
                      <li>• Eligibility criteria details</li>
                      <li>• Selection process information</li>
                      <li>• Exam syllabus and pattern</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Important Note */}
            <Card className="bg-muted/50">
              <CardHeader>
                <CardTitle className="text-xl text-center">Important Note</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center leading-relaxed">
                  <strong>Disclaimer:</strong> SarkariForm is an independent information portal and is not 
                  affiliated with any government agency or department. All information provided on this 
                  website is gathered from official government sources and is meant for informational 
                  purposes only. Candidates are advised to verify all details from the official websites 
                  of respective organizations before applying.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
