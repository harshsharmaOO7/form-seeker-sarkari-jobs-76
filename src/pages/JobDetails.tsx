
import { useParams, Link } from "react-router-dom";
import { Calendar, Building, MapPin, Users, GraduationCap, ArrowLeft, Download, ExternalLink, Clock } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const JobDetails = () => {
  const { jobId } = useParams();

  // Mock job data - in a real app this would come from an API
  const jobData = {
    id: jobId,
    title: "Police Constable Recruitment 2024",
    department: "State Police Department",
    category: "Police",
    description: "The State Police Department is conducting recruitment for 5000 Police Constable posts across various districts. This is a great opportunity for candidates who want to serve the nation and maintain law and order in the society.",
    posts: "5000",
    eligibility: {
      education: "12th Pass from recognized board",
      age: "18-25 years (Age relaxation as per government norms)",
      physical: "Height: 168 cm (Male), 152 cm (Female)"
    },
    importantDates: {
      notification: "2024-06-01",
      startDate: "2024-06-15", 
      lastDate: "2024-07-15",
      examDate: "2024-08-20",
      resultDate: "2024-09-15"
    },
    applicationFee: {
      general: "₹500",
      sc_st: "₹250",
      others: "₹400"
    },
    selectionProcess: [
      "Written Examination",
      "Physical Efficiency Test (PET)",
      "Physical Standard Test (PST)", 
      "Medical Examination",
      "Document Verification"
    ],
    syllabus: {
      "General Knowledge": "Current Affairs, History, Geography, Polity",
      "Reasoning": "Verbal and Non-verbal reasoning",
      "Mathematics": "Basic arithmetic, algebra, geometry",
      "English": "Grammar, vocabulary, comprehension"
    },
    location: "All Districts of the State",
    salary: "₹21,700 - ₹69,100 (7th Pay Commission)",
    officialWebsite: "https://statepolice.gov.in"
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
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
      
      {/* Breadcrumb */}
      <section className="bg-muted/30 py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary">Home</Link>
            <span>/</span>
            <Link to="/category/police" className="hover:text-primary">Police Jobs</Link>
            <span>/</span>
            <span className="text-foreground">Job Details</span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-6">
            <Link to="/category/police">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Police Jobs
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Job Header */}
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start mb-4">
                    <Badge variant="secondary" className="capitalize">
                      {jobData.category}
                    </Badge>
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">Days left to apply</div>
                      <div className={`font-bold text-2xl ${getDaysLeft(jobData.importantDates.lastDate) <= 7 ? 'text-destructive' : 'text-primary'}`}>
                        {getDaysLeft(jobData.importantDates.lastDate)}
                      </div>
                    </div>
                  </div>
                  
                  <CardTitle className="text-2xl md:text-3xl mb-4">
                    {jobData.title}
                  </CardTitle>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center text-muted-foreground">
                      <Building className="w-4 h-4 mr-2" />
                      <span>{jobData.department}</span>
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <Users className="w-4 h-4 mr-2" />
                      <span>{jobData.posts} Posts</span>
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span>{jobData.location}</span>
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <GraduationCap className="w-4 h-4 mr-2" />
                      <span>{jobData.eligibility.education}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {jobData.description}
                  </p>
                </CardContent>
              </Card>

              {/* Important Dates */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="w-5 h-5 mr-2" />
                    Important Dates
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Notification Released:</span>
                      <span className="font-medium">{formatDate(jobData.importantDates.notification)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Application Start Date:</span>
                      <span className="font-medium">{formatDate(jobData.importantDates.startDate)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Last Date to Apply:</span>
                      <span className="font-medium text-primary">{formatDate(jobData.importantDates.lastDate)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Examination Date:</span>
                      <span className="font-medium">{formatDate(jobData.importantDates.examDate)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Expected Result:</span>
                      <span className="font-medium">{formatDate(jobData.importantDates.resultDate)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Eligibility Criteria */}
              <Card>
                <CardHeader>
                  <CardTitle>Eligibility Criteria</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Educational Qualification:</h4>
                      <p className="text-muted-foreground">{jobData.eligibility.education}</p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Age Limit:</h4>
                      <p className="text-muted-foreground">{jobData.eligibility.age}</p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Physical Standards:</h4>
                      <p className="text-muted-foreground">{jobData.eligibility.physical}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Selection Process */}
              <Card>
                <CardHeader>
                  <CardTitle>Selection Process</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {jobData.selectionProcess.map((step, index) => (
                      <div key={index} className="flex items-center">
                        <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium mr-3">
                          {index + 1}
                        </div>
                        <span>{step}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Syllabus */}
              <Card>
                <CardHeader>
                  <CardTitle>Exam Syllabus</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.entries(jobData.syllabus).map(([subject, topics]) => (
                      <div key={subject}>
                        <h4 className="font-medium mb-2">{subject}:</h4>
                        <p className="text-muted-foreground text-sm">{topics}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full" size="lg">
                    <Download className="w-4 h-4 mr-2" />
                    Download Application Form
                  </Button>
                  <Button variant="outline" className="w-full">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Official Notification
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Clock className="w-4 h-4 mr-2" />
                    Set Reminder
                  </Button>
                </CardContent>
              </Card>

              {/* Application Fee */}
              <Card>
                <CardHeader>
                  <CardTitle>Application Fee</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">General/OBC:</span>
                      <span className="font-medium">{jobData.applicationFee.general}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">SC/ST:</span>
                      <span className="font-medium">{jobData.applicationFee.sc_st}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Others:</span>
                      <span className="font-medium">{jobData.applicationFee.others}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Salary */}
              <Card>
                <CardHeader>
                  <CardTitle>Salary</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg font-medium text-primary">{jobData.salary}</p>
                  <p className="text-sm text-muted-foreground mt-1">Plus other allowances as per government norms</p>
                </CardContent>
              </Card>

              {/* Official Website */}
              <Card>
                <CardHeader>
                  <CardTitle>Official Website</CardTitle>
                </CardHeader>
                <CardContent>
                  <a href={jobData.officialWebsite} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    {jobData.officialWebsite}
                  </a>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default JobDetails;
