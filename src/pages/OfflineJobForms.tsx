
import { useState, useEffect } from "react";
import { Link, useSearchParams, useParams } from "react-router-dom";
import {
  Download,
  FileText,
  Globe,
  MessageCircle,
  Users,
  ExternalLink
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { offlineGoogleSheetsService, OfflineJobData } from "@/services/offlineGoogleSheets";

const OfflineJobForms = () => {
  const [searchParams] = useSearchParams();
  const { jobId: urlJobId } = useParams();
  const jobId = urlJobId || searchParams.get("id") || "echs-gramtik-2025";

  const [jobData, setJobData] = useState<OfflineJobData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobData = async () => {
      try {
        setLoading(true);
        const data = await offlineGoogleSheetsService.getOfflineJobById(jobId);
        if (data) {
          setJobData(data);
        } else {
          setError("Offline job not found");
        }
      } catch (err) {
        setError("Failed to load offline job data");
        console.error("Error fetching offline job data:", err);
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
          <p className="mt-4 text-gray-600">Loading offline job details...</p>
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
            ⚠️ {error || "Offline job not found"}
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
    <div className="min-h-screen bg-white">
      <Header />

      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-primary">Home</Link>
            <span>/</span>
            <Link to="/job-forms" className="hover:text-primary">Offline Forms</Link>
            <span>/</span>
            <span className="text-gray-800">{jobData?.title}</span>
          </div>
        </div>
      </div>

      {/* Government Style Notification */}
      <div className="container mx-auto px-4 py-6">
        <div className="max-w-4xl mx-auto">
          {/* Official Header - Government Style */}
          <div className="bg-white border-2 border-gray-800 mb-6">
            {/* Header with organization info */}
            <div className="bg-blue-100 border-b border-gray-400 p-2 text-center">
              <div className="text-green-700 font-bold text-sm">निदेश का थलापुरक पूत्र आवश्य पढ़े</div>
              <div className="text-red-600 font-bold text-sm">अंतिम तिथि : {jobData.applicationEnd}</div>
            </div>

            {/* Main Blue Header */}
            <div className="bg-blue-600 text-white text-center py-2">
              <div className="text-lg font-bold">{jobData.organization}</div>
              <div className="text-xs">UNOFFICIAL INSTRUCTIONS FOR CANDIDATE, FOR COMPLETE DETAILS CHECK OFFICIAL NOTIFICATION</div>
            </div>

            {/* Main Title */}
            <div className="bg-black text-white text-center py-4">
              <h1 className="text-2xl md:text-3xl font-bold tracking-wider">{jobData.title}</h1>
            </div>

            {/* Organization Details */}
            <div className="bg-green-600 text-white text-center py-2">
              <div className="font-semibold">GOVT OF INDIA, {jobData.organization}</div>
            </div>

            {/* Job Type and Details */}
            <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white text-center py-2">
              <div className="font-bold text-lg">{posts[0]?.position || jobData.title}</div>
            </div>

            {/* Application Type */}
            <div className="flex justify-center items-center gap-4 py-3 bg-gray-100">
              <span className="bg-purple-600 text-white px-4 py-2 rounded font-bold">पुरुष/महिला</span>
              <span className="bg-blue-800 text-white px-6 py-2 rounded font-bold text-lg">Offline</span>
              <span className="text-sm">निःशुल्क भर्ती</span>
            </div>
          </div>

          {/* Key Details Table */}
          <div className="bg-white border border-gray-400 mb-6">
            <table className="w-full text-sm">
              <tbody>
                <tr className="border-b border-gray-400">
                  <td className="bg-gray-200 font-semibold p-3 border-r border-gray-400 w-1/4">पद का नाम</td>
                  <td className="p-3 border-r border-gray-400">{posts[0]?.position || jobData.title}</td>
                  <td className="bg-gray-200 font-semibold p-3 border-r border-gray-400">योग्यता</td>
                  <td className="p-3">{jobData.education}</td>
                </tr>
                <tr className="border-b border-gray-400">
                  <td className="bg-gray-200 font-semibold p-3 border-r border-gray-400">कुल पद संख्या</td>
                  <td className="p-3 border-r border-gray-400 font-bold text-blue-600">{jobData.totalPosts}</td>
                  <td className="bg-gray-200 font-semibold p-3 border-r border-gray-400">आवेदन शुल्क</td>
                  <td className="p-3">{jobData.feeGeneral}</td>
                </tr>
                <tr>
                  <td className="bg-gray-200 font-semibold p-3 border-r border-gray-400">आयु सीमा</td>
                  <td className="p-3 border-r border-gray-400">{jobData.ageMinimum} - {jobData.ageMaximum}</td>
                  <td className="bg-gray-200 font-semibold p-3 border-r border-gray-400">वेतन</td>
                  <td className="p-3">{jobData.payScale}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Important Dates Section */}
          <div className="bg-green-100 border border-green-400 p-4 mb-6 rounded">
            <div className="bg-green-600 text-white text-center py-2 mb-4 rounded font-bold">
              विज्ञापन तिथियां - 20 रुपये
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <strong>आवेदन शुरू:</strong> {jobData.applicationStart}
              </div>
              <div>
                <strong>आवेदन अंतिम तिथि:</strong> <span className="text-red-600 font-bold">{jobData.applicationEnd}</span>
              </div>
              <div>
                <strong>फीस भुगतान अंतिम तिथि:</strong> {jobData.feePaymentEnd}
              </div>
              <div>
                <strong>परीक्षा तिथि:</strong> {jobData.examDate}
              </div>
            </div>
          </div>

          {/* Application Process */}
          <div className="bg-white border border-gray-400 p-4 mb-6">
            <h3 className="font-bold text-lg mb-3 text-red-600">आवेदन कैसे करें - How to Apply:</h3>
            <div className="space-y-2 text-sm">
              <p>• आवेदकों को सबसे पहले ऑफलाइन आवेदन करना होगा।</p>
              <p>• इसके बाद अपने सभी जरूरी दस्तावेजों को संलग्न करना होगा।</p>
              <p>• सभी जानकारी सही से भरने के बाद फीस का भुगतान करना होगा।</p>
              <p>• आवेदन की अंतिम तिथि <strong className="text-red-600">{jobData.applicationEnd}</strong> है।</p>
            </div>
          </div>

          {/* Application Address Section */}
          {jobData.applicationAddress && (
            <div className="bg-white border border-gray-400 p-4 mb-6">
              <h3 className="font-bold text-lg mb-3 text-blue-600">आवेदन भेजने का पता - Application Address:</h3>
              <div className="text-sm whitespace-pre-line">
                {jobData.applicationAddress}
              </div>
            </div>
          )}

          {/* General Conditions Section */}
          {jobData.generalConditions && (
            <div className="bg-white border border-gray-400 p-4 mb-6">
              <h3 className="font-bold text-lg mb-3 text-purple-600">अन्य सामान्य शर्ते व निर्देश - Other General Terms & Instructions:</h3>
              <div className="text-sm whitespace-pre-line">
                {jobData.generalConditions}
              </div>
            </div>
          )}

          {/* Selection Process */}
          {selectionProcess.length > 0 && (
            <div className="bg-white border border-gray-400 p-4 mb-6">
              <h3 className="font-bold text-lg mb-3 text-blue-600">चयन प्रक्रिया - Selection Process:</h3>
              <div className="space-y-2 text-sm">
                {selectionProcess.map((step, index) => (
                  <div key={index} className="flex items-start">
                    <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs mr-3 mt-0.5">
                      {index + 1}
                    </span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Post-wise Details */}
          {posts.length > 0 && (
            <div className="bg-white border border-gray-400 mb-6 overflow-x-auto">
              <div className="bg-gray-200 p-3 font-bold text-center">पदवार विवरण - Post Wise Details</div>
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-400 p-2">क्र.सं.</th>
                    <th className="border border-gray-400 p-2">पद का नाम</th>
                    <th className="border border-gray-400 p-2">कुल पद</th>
                    <th className="border border-gray-400 p-2">योग्यता</th>
                  </tr>
                </thead>
                <tbody>
                  {posts.map((post, index) => (
                    <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="border border-gray-400 p-2 text-center">{index + 1}</td>
                      <td className="border border-gray-400 p-2">{post.position}</td>
                      <td className="border border-gray-400 p-2 text-center font-bold text-blue-600">{post.vacancies}</td>
                      <td className="border border-gray-400 p-2">{post.eligibility}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Quick Links Box */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 border-2 border-gray-300 rounded-lg p-6 mb-6">
            <div className="text-center mb-4">
              <h3 className="text-white text-xl font-bold">Quick Links & Resources</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {jobData.formLink && (
                <a href={jobData.formLink} target="_blank" rel="noopener noreferrer">
                  <Button className="w-full bg-red-600 hover:bg-red-700 py-3">
                    <Download className="w-4 h-4 mr-2" />
                    Download Form
                  </Button>
                </a>
              )}
              {jobData.socialLink && (
                <a href={jobData.socialLink} target="_blank" rel="noopener noreferrer">
                  <Button className="w-full bg-green-600 hover:bg-green-700 py-3">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Join Telegram
                  </Button>
                </a>
              )}
              {jobData.notificationLink && (
                <a href={jobData.notificationLink} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="w-full border-blue-600 text-blue-600 hover:bg-blue-50 py-3 bg-white">
                    <FileText className="w-4 h-4 mr-2" />
                    Official Notification
                  </Button>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default OfflineJobForms;
