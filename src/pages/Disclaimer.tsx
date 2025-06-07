
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Shield, Eye, CheckCircle } from "lucide-react";

const Disclaimer = () => {
  const disclaimerPoints = [
    {
      icon: AlertTriangle,
      title: "No Government Affiliation",
      content: "SarkariForm is an independent information portal and is not affiliated, associated, or endorsed by any government agency, department, or organization. We are not an official government website."
    },
    {
      icon: Shield,
      title: "Information Accuracy",
      content: "While we strive to provide accurate and up-to-date information, we cannot guarantee the completeness, reliability, or accuracy of the content. All information is gathered from publicly available official sources."
    },
    {
      icon: Eye,
      title: "User Responsibility",
      content: "Users are advised to verify all information, dates, eligibility criteria, and application procedures from the official websites of respective government organizations before applying for any position."
    },
    {
      icon: CheckCircle,
      title: "Application Process",
      content: "All applications must be submitted through official government channels only. We do not accept applications, nor do we have any role in the recruitment process of any government organization."
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
              Disclaimer
            </h1>
            <p className="text-xl md:text-2xl opacity-90">
              Important information about our website and services
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            
            {/* Important Notice */}
            <Card className="mb-8 border-l-4 border-l-destructive bg-destructive/5">
              <CardHeader>
                <CardTitle className="text-2xl text-destructive flex items-center">
                  <AlertTriangle className="w-6 h-6 mr-2" />
                  Important Notice
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground font-medium leading-relaxed">
                  This website is NOT affiliated with any government agency. We are an independent 
                  information portal that provides details about government job opportunities for 
                  educational and informational purposes only.
                </p>
              </CardContent>
            </Card>

            {/* Disclaimer Points */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {disclaimerPoints.map((point, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center text-lg">
                      <point.icon className="w-5 h-5 mr-2 text-primary" />
                      {point.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      {point.content}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Detailed Disclaimer */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Detailed Disclaimer</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold text-foreground mb-3">1. Website Purpose</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    SarkariForm.com is designed to provide information about government job opportunities, 
                    notifications, and application forms. Our primary goal is to help job seekers find 
                    relevant information about Sarkari (government) jobs in an organized and accessible manner.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-3">2. Information Sources</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    All information published on this website is collected from official government websites, 
                    employment newspapers, and other publicly available sources. We make every effort to 
                    ensure the information is current and accurate, but we cannot guarantee its completeness 
                    or accuracy.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-3">3. Limitation of Liability</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    SarkariForm.com and its operators shall not be liable for any direct, indirect, 
                    incidental, consequential, or punitive damages arising from the use of this website 
                    or reliance on any information provided herein. Users access and use this website 
                    at their own risk.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-3">4. External Links</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Our website may contain links to external websites for reference purposes. We do not 
                    control the content of these external sites and are not responsible for their content, 
                    privacy policies, or practices. Links to external websites do not constitute an 
                    endorsement.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-3">5. User Obligations</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Users must verify all information from official sources before making any decisions. 
                    It is the user's responsibility to check eligibility criteria, application procedures, 
                    deadlines, and other requirements from the respective government organization's 
                    official website.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-3">6. No Application Processing</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    We do not process applications, collect application fees, or have any involvement 
                    in the recruitment process. All applications must be submitted directly to the 
                    respective government organizations through their official channels.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-3">7. Copyright and Content</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    The content on this website is for informational purposes only. Government job 
                    notifications and forms are public documents and remain the property of the 
                    respective government organizations. Our compilation and presentation of this 
                    information is protected by copyright law.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-3">8. Updates and Changes</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    This disclaimer may be updated from time to time without prior notice. Continued 
                    use of the website after any changes constitutes acceptance of the new terms. 
                    Users are encouraged to review this disclaimer periodically.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="mt-8">
              <CardHeader>
                <CardTitle>Questions About This Disclaimer?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  If you have any questions about this disclaimer or our website policies, 
                  please contact us through our contact page. We're here to help clarify 
                  any concerns you may have.
                </p>
                <p className="text-sm text-muted-foreground">
                  <strong>Last Updated:</strong> June 2024
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

export default Disclaimer;
