
import { useState, useEffect } from "react";
import { Link, useSearchParams, useParams } from "react-router-dom";
import {
  Calendar,
  FileText,
  Download,
  ExternalLink,
  Building,
  MapPin,
  Users,
  Clock,
  IndianRupee,
  GraduationCap,
  Phone,
  Mail,
  Globe,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { googleSheetsService, JobData } from "@/services/googleSheets";

const JobForms = () => {
  const [searchParams] = useSearchParams();
  const { jobId: urlJobId } = useParams();
  const jobId = urlJobId || searchParams.get("id") || "railway-group-d-2025";

  const [jobData, setJobData] = useState<JobData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobData = async () => {
      try {
        setLoading(true);
        const data = await googleSheetsService.getJobById(jobId);
        if (data) {
          setJobData(data);
        } else {
          setError("Job not found");
        }
      } catch (err) {
        setError("Failed to load job data");
        console.error("Error fetching job data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobData();
  }, [jobId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-12 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading job details...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !jobData) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-12 text-center">
          <div className="text-red-600 text-xl mb-4">
            ⚠️ {error || "Job not found"}
          </div>
          <Link to="/">
            <Button>Go Back to Home</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  let posts: any[] = [];
  let selectionProcess: string[] = [];

  try {
    posts = JSON.parse(jobData.postsData || "[]");
    selectionProcess = JSON.parse(jobData.selectionProcess || "[]");
  } catch (e) {
    console.error("Error parsing JSON data:", e);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-primary">
              Home
            </Link>
            <span>/</span>
            <Link to="/job-forms" className="hover:text-primary">
              Job Forms
            </Link>
            <span>/</span>
            <span className="text-gray-800">{jobData?.title || "Job Details"}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="max-w-5xl mx-auto space-y-6">
          {/* Job Header */}
          <Card className="bg-white">
            <CardHeader className="bg-gradient-to-r from-green-600 to-green-700 text-white rounded-t-lg">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-2xl font-bold mb-2">
                    {jobData.title}
                  </CardTitle>
                  <div className="flex flex-wrap items-center gap-4 text-sm">
                    <div className="flex items-center">
                      <Building className="w-4 h-4 mr-1" />
                      {jobData.organization}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      Posted: {jobData.postDate}
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      {jobData.totalPosts} Posts
                    </div>
                  </div>
                </div>
                <Badge className="bg-green-500 text-white">
                  {jobData.status}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="p-6">
              <Alert className="mb-4 border-orange-200 bg-orange-50">
                <Clock className="w-4 h-4" />
                <AlertDescription className="text-orange-800">
                  <strong>Last Date to Apply:</strong>{" "}
                  {jobData.applicationEnd} |<strong> Fee Payment:</strong>{" "}
                  {jobData.feePaymentEnd}
                </AlertDescription>
              </Alert>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    Quick Information
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Organization:</span>
                      <span className="font-medium">
                        {jobData.organization}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Posts:</span>
                      <span className="font-medium text-green-600">
                        {jobData.totalPosts}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Category:</span>
                      <span className="font-medium">{jobData.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Last Update:</span>
                      <span className="font-medium">
                        {jobData.lastUpdate}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    Contact Information
                  </h3>
                  <div className="space-y-2 text-sm">
                    {jobData.phone && (
                      <div className="flex items-center">
                        <Phone className="w-4 h-4 mr-2 text-blue-600" />
                        <span>{jobData.phone}</span>
                      </div>
                    )}
                    {jobData.email && (
                      <div className="flex items-center">
                        <Mail className="w-4 h-4 mr-2 text-green-600" />
                        <span>{jobData.email}</span>
                      </div>
                    )}
                    {jobData.website && (
                      <div className="flex items-center">
                        <Globe className="w-4 h-4 mr-2 text-purple-600" />
                        <span>{jobData.website}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Important Dates */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-xl">
                <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                Important Dates
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span className="font-medium text-gray-700">
                      Application Begin:
                    </span>
                    <span className="text-green-700 font-semibold">
                      {jobData.applicationStart}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                    <span className="font-medium text-gray-700">
                      Last Date for Apply:
                    </span>
                    <span className="text-red-700 font-semibold">
                      {jobData.applicationEnd}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-amber-50 rounded-lg">
                    <span className="font-medium text-gray-700">
                      Fee Payment Last Date:
                    </span>
                    <span className="text-amber-800 font-semibold">
                      {jobData.feePaymentEnd}
                    </span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <span className="font-medium text-gray-700">
                      Correction Date:
                    </span>
                    <span className="text-blue-700 font-semibold">
                      {jobData.correctionDates}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                    <span className="font-medium text-gray-700">
                      Exam Date:
                    </span>
                    <span className="text-purple-700 font-semibold">
                      {jobData.examDate}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-indigo-50 rounded-lg">
                    <span className="font-medium text-gray-700">
                      Admit Card:
                    </span>
                    <span className="text-indigo-700 font-semibold">
                      {jobData.admitCardDate}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Application Fee - Improved styling */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-xl">
                <IndianRupee className="w-5 h-5 mr-2 text-green-600" />
                Application Fee
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                  <div className="text-sm text-gray-700 mb-1">
                    General / OBC / EWS
                  </div>
                  <div className="text-2xl font-bold text-amber-800">
                    {jobData.feeGeneral}
                  </div>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="text-sm text-gray-700 mb-1">
                    SC / ST / PH / Female
                  </div>
                  <div className="text-2xl font-bold text-blue-700">
                    {jobData.feeReserved}
                  </div>
                </div>
              </div>
              <div className="mt-4 p-3 bg-green-50 rounded-lg">
                <div className="text-sm text-green-800">
                  <strong>Payment Mode:</strong> {jobData.paymentMode}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Age Limit */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-xl">
                <Users className="w-5 h-5 mr-2 text-purple-600" />
                Age Limit & Eligibility
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">
                    Age Limit
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Minimum Age:</span>
                      <span className="font-medium">
                        {jobData.ageMinimum}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Maximum Age:</span>
                      <span className="font-medium">
                        {jobData.ageMaximum}
                      </span>
                    </div>
                    <div className="text-sm text-blue-600 mt-2">
                      * {jobData.ageNote}
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">
                    Eligibility Criteria
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-gray-600">Education:</span>
                      <p className="text-gray-800 mt-1">
                        {jobData.education}
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-600">Experience:</span>
                      <span className="ml-2 font-medium">
                        {jobData.experience}
                      </span>
                    </div>
                    {jobData.physicalStandards && (
                      <div>
                        <span className="text-gray-600">
                          Physical Standards:
                        </span>
                        <span className="ml-2 font-medium">
                          {jobData.physicalStandards}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Post Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-xl">
                <Building className="w-5 h-5 mr-2 text-indigo-600" />
                Post Details & Vacancies
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border border-gray-300 px-4 py-2 text-left">
                        Level
                      </th>
                      <th className="border border-gray-300 px-4 py-2 text-left">
                        Post Name
                      </th>
                      <th className="border border-gray-300 px-4 py-2 text-center">
                        Vacancies
                      </th>
                      <th className="border border-gray-300 px-4 py-2 text-left">
                        Eligibility
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {posts.map((post, index) => (
                      <tr
                        key={index}
                        className={
                          index % 2 === 0 ? "bg-white" : "bg-gray-50"
                        }
                      >
                        <td className="border border-gray-300 px-4 py-2 font-semibold text-green-600">
                          {post.code}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          {post.position}
                        </td>
                        <td className="border border-gray-300 px-4 py-2 text-center font-semibold text-blue-600">
                          {post.vacancies}
                        </td>
                        <td className="border border-gray-300 px-4 py-2 text-sm">
                          {post.eligibility}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Selection Process */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-xl">
                <GraduationCap className="w-5 h-5 mr-2 text-orange-600" />
                Selection Process
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectionProcess.map((step, index) => (
                  <div
                    key={index}
                    className="flex items-center p-3 bg-blue-50 rounded-lg"
                  >
                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold mr-3">
                      {index + 1}
                    </div>
                    <span className="font-medium text-gray-800">{step}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Salary Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-xl">
                <IndianRupee className="w-5 h-5 mr-2 text-green-600" />
                Salary & Benefits
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="text-sm text-gray-600 mb-1">Pay Scale</div>
                  <div className="text-lg font-bold text-green-700">
                    {jobData.payScale}
                  </div>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="text-sm text-gray-600 mb-1">Pay Matrix</div>
                  <div className="text-lg font-bold text-blue-700">
                    {jobData.gradePayPostwise}
                  </div>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <div className="text-sm text-gray-600 mb-1">Allowances</div>
                  <div className="text-sm font-medium text-purple-700">
                    {jobData.allowances}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Important Instructions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-red-600">
                Important Instructions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex items-start">
                  <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>
                    Candidates must apply through the official website only.
                  </span>
                </div>
                <div className="flex items-start">
                  <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>
                    Read the official notification carefully before applying.
                  </span>
                </div>
                <div className="flex items-start">
                  <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>
                    Keep all required documents ready before starting the
                    application.
                  </span>
                </div>
                <div className="flex items-start">
                  <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>
                    Check eligibility criteria carefully as per guidelines.
                  </span>
                </div>
                <div className="flex items-start">
                  <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>
                    Take printout of submitted application form for future
                    reference.
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Links at Bottom */}
          <Card>
            <CardHeader className="bg-green-600 text-white rounded-t-lg">
              <CardTitle className="text-lg">Quick Links</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                <Button
                  className="w-full bg-blue-600 hover:bg-blue-700 justify-start"
                  size="sm"
                  onClick={() => window.open(jobData.onlineFormLink, "_blank")}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Apply Online
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start border-red-200 text-red-600 hover:bg-red-50"
                  size="sm"
                  onClick={() => window.open(jobData.notificationLink, "_blank")}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Notification
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  size="sm"
                  onClick={() => window.open(jobData.officialWebsite, "_blank")}
                >
                  <Globe className="w-4 h-4 mr-2" />
                  Official Website
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  size="sm"
                  onClick={() => window.open(jobData.syllabusLink, "_blank")}
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Syllabus
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default JobForms;
