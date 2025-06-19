
import { useState, useEffect } from "react";
import { Link, useSearchParams, useParams } from "react-router-dom";
import {
  Calendar,
  FileText,
  Download,
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
import { Alert, AlertDescription } from "@/components/ui/alert";
import { googleSheetsService, JobData } from "@/services/googleSheets";

const OfflineJobForms = () => {
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
            <Link to="/" className="hover:text-primary">Home</Link>
            <span>/</span>
            <Link to="/job-forms" className="hover:text-primary">Offline Forms</Link>
            <span>/</span>
            <span className="text-gray-800">{jobData?.title || "Job Details"}</span>
          </div>
        </div>
      </div>

      {/* Main Content - Offline Layout */}
      <div className="container mx-auto px-4 py-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Job Header - Offline Style */}
          <Card className="bg-white border-2 border-orange-200">
            <CardHeader className="bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-t-lg">
              <div className="text-center">
                <Badge className="bg-red-700 text-white mb-2">OFFLINE FORM</Badge>
                <CardTitle className="text-2xl font-bold mb-2">
                  {jobData.title}
                </CardTitle>
                <div className="text-lg opacity-90">{jobData.organization}</div>
                <div className="flex justify-center items-center gap-4 text-sm mt-2">
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
            </CardHeader>

            <CardContent className="p-6">
              <Alert className="mb-4 border-red-200 bg-red-50">
                <Clock className="w-4 h-4" />
                <AlertDescription className="text-red-800">
                  <strong>Download Form Before:</strong> {jobData.applicationEnd} | 
                  <strong> Submit By:</strong> {jobData.feePaymentEnd}
                </AlertDescription>
              </Alert>

              {/* Offline Form Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-center">
                <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <h3 className="font-semibold text-gray-800 mb-2">Form Download</h3>
                  <p className="text-sm text-gray-600 mb-3">Download the application form and fill it manually</p>
                  <Button className="w-full bg-orange-600 hover:bg-orange-700">
                    <Download className="w-4 h-4 mr-2" />
                    Download Form PDF
                  </Button>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h3 className="font-semibold text-gray-800 mb-2">Submission</h3>
                  <p className="text-sm text-gray-600 mb-3">Submit by post or in person</p>
                  <Button variant="outline" className="w-full border-blue-200 text-blue-600">
                    <FileText className="w-4 h-4 mr-2" />
                    View Instructions
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Important Dates - Simplified for Offline */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-xl text-orange-600">
                <Calendar className="w-5 h-5 mr-2" />
                Important Dates
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-green-50 rounded-lg border border-green-200 text-center">
                  <div className="text-sm text-gray-600 mb-1">Form Available From</div>
                  <div className="text-lg font-bold text-green-700">{jobData.applicationStart}</div>
                </div>
                <div className="p-4 bg-red-50 rounded-lg border border-red-200 text-center">
                  <div className="text-sm text-gray-600 mb-1">Last Date to Submit</div>
                  <div className="text-lg font-bold text-red-700">{jobData.applicationEnd}</div>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg border border-purple-200 text-center">
                  <div className="text-sm text-gray-600 mb-1">Exam Date</div>
                  <div className="text-lg font-bold text-purple-700">{jobData.examDate}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Fee & Eligibility - Combined for Offline */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg text-green-600">
                  <IndianRupee className="w-5 h-5 mr-2" />
                  Application Fee
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                    <span className="text-gray-700">General/OBC:</span>
                    <span className="font-bold text-yellow-800">{jobData.feeGeneral}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <span className="text-gray-700">SC/ST/PH:</span>
                    <span className="font-bold text-blue-800">{jobData.feeReserved}</span>
                  </div>
                  <div className="text-xs text-gray-600 text-center">
                    Payment by DD/Postal Order
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg text-purple-600">
                  <GraduationCap className="w-5 h-5 mr-2" />
                  Eligibility
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm text-gray-600">Age Limit:</span>
                    <div className="font-medium">{jobData.ageMinimum} - {jobData.ageMaximum}</div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Education:</span>
                    <div className="font-medium text-sm">{jobData.education}</div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Experience:</span>
                    <div className="font-medium">{jobData.experience}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Post Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-xl text-indigo-600">
                <Building className="w-5 h-5 mr-2" />
                Post Details & Vacancies
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-orange-50">
                      <th className="border border-gray-300 px-4 py-2 text-left">Post Name</th>
                      <th className="border border-gray-300 px-4 py-2 text-center">Vacancies</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Eligibility</th>
                    </tr>
                  </thead>
                  <tbody>
                    {posts.map((post, index) => (
                      <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                        <td className="border border-gray-300 px-4 py-2">{post.position}</td>
                        <td className="border border-gray-300 px-4 py-2 text-center font-semibold text-orange-600">
                          {post.vacancies}
                        </td>
                        <td className="border border-gray-300 px-4 py-2 text-sm">{post.eligibility}</td>
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
              <CardTitle className="flex items-center text-xl text-orange-600">
                <GraduationCap className="w-5 h-5 mr-2" />
                Selection Process
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectionProcess.map((step, index) => (
                  <div key={index} className="flex items-center p-3 bg-orange-50 rounded-lg border border-orange-200">
                    <div className="w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center text-sm font-semibold mr-3">
                      {index + 1}
                    </div>
                    <span className="font-medium text-gray-800">{step}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Links at Bottom */}
          <Card>
            <CardHeader className="bg-orange-600 text-white rounded-t-lg">
              <CardTitle className="text-lg">Download Links</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button className="w-full bg-red-600 hover:bg-red-700 justify-start" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Application Form
                </Button>
                <Button variant="outline" className="w-full justify-start border-orange-200 text-orange-600 hover:bg-orange-50" size="sm">
                  <FileText className="w-4 h-4 mr-2" />
                  Notification PDF
                </Button>
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <Globe className="w-4 h-4 mr-2" />
                  Official Website
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

export default OfflineJobForms;
