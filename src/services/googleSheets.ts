// Google Sheets API integration service
export interface JobData {
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
  correctionDates: string;
  examDate: string;
  admitCardDate: string;

  // Application Fee
  feeGeneral: string;
  feeReserved: string;
  paymentMode: string;

  // Age & Eligibility
  ageMinimum: string;
  ageMaximum: string;
  ageNote: string;
  education: string;
  experience: string;
  nationality: string;
  physicalStandards: string;

  // Post Details (JSON string)
  postsData: string;

  // Selection Process (JSON string)
  selectionProcess: string;

  // Salary
  payScale: string;
  gradePayPostwise: string;
  allowances: string;

  // Contact Info
  phone: string;
  email: string;
  website: string;

  // Links
  onlineFormLink: string;
  notificationLink: string;
  syllabusLink: string;

  // Column Assignment
  columnType: "offline" | "online" | "sewayojan";
  columnDescription: string;
}

export interface HomePageJobData {
  id: number | string;
  title: string;
  description: string;
  link: string;
  organization?: string;
}

class GoogleSheetsService {
  private readonly SHEET_ID = import.meta.env.VITE_GOOGLE_SHEET_ID || "";
  private readonly API_KEY = import.meta.env.VITE_GOOGLE_API_KEY || "";
  private readonly SHEET_NAME = "JobData";

  private validateColumnType(type: string | undefined): "offline" | "online" | "sewayojan" {
    const normalized = type?.trim().toLowerCase();
    return normalized === "offline" || normalized === "sewayojan" ? normalized : "online";
  }

  async fetchJobData(): Promise<JobData[]> {
    try {
      if (!this.SHEET_ID || !this.API_KEY) {
        console.warn("Missing Google Sheets credentials");
        return [];
      }

      const range = `${this.SHEET_NAME}!A:AK`;
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${this.SHEET_ID}/values/${range}?key=${this.API_KEY}`;
      
      console.log("Fetching data from Google Sheets...");
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Raw sheet data:", data);

      if (!data.values?.length) {
        console.warn("No data found in sheet");
        return [];
      }

      // Skip header row and map data
      const jobs = data.values.slice(1).map((row: string[], index: number) => ({
        id: row[0] || `job-${index}`,
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
        correctionDates: row[12] || "",
        examDate: row[13] || "",
        admitCardDate: row[14] || "",
        
        // Application Fee
        feeGeneral: row[15] || "",
        feeReserved: row[16] || "",
        paymentMode: row[17] || "",
        
        // Age & Eligibility
        ageMinimum: row[18] || "",
        ageMaximum: row[19] || "",
        ageNote: row[20] || "",
        education: row[21] || "",
        experience: row[22] || "",
        nationality: row[23] || "",
        physicalStandards: row[24] || "",
        
        // Post Details (JSON string)
        postsData: row[25] || "[]",
        
        // Selection Process (JSON string)
        selectionProcess: row[26] || "[]",
        
        // Salary
        payScale: row[27] || "",
        gradePayPostwise: row[28] || "",
        allowances: row[29] || "",
        
        // Contact Info
        phone: row[30] || "",
        email: row[31] || "",
        website: row[32] || "",
        
        // Links
        onlineFormLink: row[33] || "",
        notificationLink: row[34] || "",
        syllabusLink: row[35] || "",
        
        // Column Assignment
        columnType: this.validateColumnType(row[36]),
        columnDescription: row[37] || "Apply Now"
      }));

      console.log("Processed jobs data:", jobs);
      return jobs;
    } catch (error) {
      console.error("Error fetching from Google Sheets:", error);
      return [];
    }
  }

  async getJobById(jobId: string): Promise<JobData | null> {
    try {
      const jobs = await this.fetchJobData();
      const job = jobs.find(job => job.id === jobId);
      console.log(`Looking for job with ID: ${jobId}`, job);
      return job || null;
    } catch (error) {
      console.error("Error getting job by ID:", error);
      return null;
    }
  }

  async getJobsByCategory(category: string): Promise<JobData[]> {
    try {
      const jobs = await this.fetchJobData();
      return jobs.filter(job => 
        job.category.toLowerCase().includes(category.toLowerCase())
      );
    } catch (error) {
      console.error("Error getting jobs by category:", error);
      return [];
    }
  }

  async getJobsByColumnType(columnType: "offline" | "online" | "sewayojan"): Promise<JobData[]> {
    try {
      const jobs = await this.fetchJobData();
      return jobs.filter(job => job.columnType === columnType);
    } catch (error) {
      console.error("Error getting jobs by column type:", error);
      return [];
    }
  }

  async getHomePageData(): Promise<{
    offline: HomePageJobData[];
    online: HomePageJobData[];
    sewayojan: HomePageJobData[];
  }> {
    try {
      const jobs = await this.fetchJobData();
      
      const offline = jobs
        .filter(job => job.columnType === "offline")
        .slice(0, 5)
        .map(job => ({
          id: job.id,
          title: job.title,
          description: job.columnDescription || "Download Available",
          link: `/job/${job.id}`,
          organization: job.organization
        }));

      const online = jobs
        .filter(job => job.columnType === "online")
        .slice(0, 5)
        .map(job => ({
          id: job.id,
          title: job.title,
          description: job.columnDescription || "Apply Online",
          link: `/job/${job.id}`,
          organization: job.organization
        }));

      const sewayojan = jobs
        .filter(job => job.columnType === "sewayojan")
        .slice(0, 5)
        .map(job => ({
          id: job.id,
          title: job.title,
          description: job.columnDescription || "Apply Online",
          link: `/job/${job.id}`,
          organization: job.organization
        }));

      return { offline, online, sewayojan };
    } catch (error) {
      console.error("Error getting home page data:", error);
      return { offline: [], online: [], sewayojan: [] };
    }
  }
}

export const googleSheetsService = new GoogleSheetsService();
