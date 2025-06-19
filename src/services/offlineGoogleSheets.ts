
// Dedicated Google Sheets service for offline jobs (Sheet 2)
export interface OfflineJobData {
  id: string;
  title: string;
  organization: string;
  category: string;
  postDate: string;
  lastUpdate: string;
  status: string;
  totalPosts: string;
  officialWebsite: string;

  // Important Dates
  applicationStart: string;
  applicationEnd: string;
  feePaymentEnd: string;
  examDate: string;

  // Application Fee
  feeGeneral: string;
  feeReserved: string;
  paymentMode: string;

  // Age & Eligibility
  ageMinimum: string;
  ageMaximum: string;
  education: string;
  nationality: string;

  // Post Details (JSON string)
  postsData: string;

  // Selection Process (JSON string)
  selectionProcess: string;

  // Salary
  payScale: string;

  // Contact Info
  phone: string;
  email: string;
  website: string;

  // Links
  onlineFormLink: string;
  notificationLink: string;
  telegramLink: string;

  // Column Description
  columnDescription: string;
}

class OfflineGoogleSheetsService {
  private readonly SHEET_ID = import.meta.env.VITE_GOOGLE_SHEET_ID || "";
  private readonly API_KEY = import.meta.env.VITE_GOOGLE_API_KEY || "";
  private readonly SHEET_NAME = "OfflineJobs"; // Sheet 2 name

  async fetchOfflineJobData(): Promise<OfflineJobData[]> {
    try {
      if (!this.SHEET_ID || !this.API_KEY) {
        console.warn("Missing Google Sheets credentials for offline jobs");
        return [];
      }

      const range = `${this.SHEET_NAME}!A:Z`;
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${this.SHEET_ID}/values/${range}?key=${this.API_KEY}`;
      
      console.log("Fetching offline jobs data from Google Sheets...");
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Raw offline jobs sheet data:", data);

      if (!data.values?.length) {
        console.warn("No offline jobs data found in sheet");
        return [];
      }

      // Skip header row and map data
      const jobs = data.values.slice(1).map((row: string[], index: number) => ({
        id: row[0] || `offline-job-${index}`,
        title: row[1] || "",
        organization: row[2] || "",
        category: row[3] || "",
        postDate: row[4] || "",
        lastUpdate: row[5] || "",
        status: row[6] || "Active",
        totalPosts: row[7] || "",
        officialWebsite: row[8] || "",
        
        // Important Dates
        applicationStart: row[9] || "",
        applicationEnd: row[10] || "",
        feePaymentEnd: row[11] || "",
        examDate: row[12] || "",
        
        // Application Fee
        feeGeneral: row[13] || "",
        feeReserved: row[14] || "",
        paymentMode: row[15] || "",
        
        // Age & Eligibility
        ageMinimum: row[16] || "",
        ageMaximum: row[17] || "",
        education: row[18] || "",
        nationality: row[19] || "",
        
        // Post Details (JSON string)
        postsData: row[20] || "[]",
        
        // Selection Process (JSON string)
        selectionProcess: row[21] || "[]",
        
        // Salary
        payScale: row[22] || "",
        
        // Contact Info
        phone: row[23] || "",
        email: row[24] || "",
        website: row[25] || "",
        
        // Links
        onlineFormLink: row[26] || "",
        notificationLink: row[27] || "",
        telegramLink: row[28] || "",
        
        // Column Description
        columnDescription: row[29] || "Download Available"
      }));

      console.log("Processed offline jobs data:", jobs);
      return jobs;
    } catch (error) {
      console.error("Error fetching offline jobs from Google Sheets:", error);
      return [];
    }
  }

  async getOfflineJobById(jobId: string): Promise<OfflineJobData | null> {
    try {
      const jobs = await this.fetchOfflineJobData();
      const job = jobs.find(job => job.id === jobId);
      console.log(`Looking for offline job with ID: ${jobId}`, job);
      return job || null;
    } catch (error) {
      console.error("Error getting offline job by ID:", error);
      return null;
    }
  }

  async getOfflineJobsByCategory(category: string): Promise<OfflineJobData[]> {
    try {
      const jobs = await this.fetchOfflineJobData();
      return jobs.filter(job => 
        job.category.toLowerCase().includes(category.toLowerCase())
      );
    } catch (error) {
      console.error("Error getting offline jobs by category:", error);
      return [];
    }
  }
}

export const offlineGoogleSheetsService = new OfflineGoogleSheetsService();
