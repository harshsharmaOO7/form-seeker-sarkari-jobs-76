// Google Sheets API integration service
// This service fetches job data from Google Sheets

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
  applyLink: string;

  // Column Assignment
  columnType: "offline" | "online" | "sewayojan";
  columnDescription: string;
  referenceNumber?: string;
  importantLinks?: string;
  examCenter?: string;
  otherInfo?: string;
}

export interface HomePageJobData {
  id: string;
  title: string;
  description: string;
  link: string;
  organization?: string;
  lastDate?: string;
  columnType: "offline" | "online" | "sewayojan";
}

class GoogleSheetsService {
  private readonly SHEET_ID = import.meta.env.VITE_GOOGLE_SHEET_ID || "";
  private readonly API_KEY = import.meta.env.VITE_GOOGLE_API_KEY || "";
  private readonly SHEET_NAME = "JobData";
  private readonly COLUMNS = {
    ID: 0,
    TITLE: 1,
    ORGANIZATION: 2,
    // ... all other column indices
    COLUMN_TYPE: 36,
    COLUMN_DESCRIPTION: 37,
    // Add any additional columns here
    APPLY_LINK: 38,
    REFERENCE_NUMBER: 39,
    IMPORTANT_LINKS: 40,
    EXAM_CENTER: 41,
    OTHER_INFO: 42
  };

  private getColumnType(type: string | undefined): "offline" | "online" | "sewayojan" {
    const normalizedType = type?.trim().toLowerCase();
    const validTypes = ["offline", "online", "sewayojan"] as const;
    return validTypes.includes(normalizedType as any) 
      ? normalizedType as "offline" | "online" | "sewayojan" 
      : "online";
  }

  async fetchJobData(): Promise<JobData[]> {
    try {
      if (!this.SHEET_ID || !this.API_KEY) {
        console.warn("Google Sheets credentials not configured, using fallback data");
        return this.getFallbackData();
      }

      const range = `${this.SHEET_NAME}!A:AR`; // Extended range to cover all columns
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${this.SHEET_ID}/values/${range}?key=${this.API_KEY}`;

      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const data = await response.json();
      if (!data.values || data.values.length < 2) {
        console.warn("No data found in Google Sheets");
        return this.getFallbackData();
      }

      // First row contains headers, skip it
      return data.values.slice(1).map((row: string[], index: number) => ({
        id: row[this.COLUMNS.ID] || `job-${index + 1}`,
        title: row[this.COLUMNS.TITLE] || "",
        organization: row[this.COLUMNS.ORGANIZATION] || "",
        category: row[3] || "",
        postDate: row[4] || "",
        lastUpdate: row[5] || "",
        status: row[6] || "Active",
        totalPosts: row[7] || "0",
        officialWebsite: row[8] || "",
        applicationStart: row[9] || "",
        applicationEnd: row[10] || "",
        feePaymentEnd: row[11] || "",
        correctionDates: row[12] || "",
        examDate: row[13] || "",
        admitCardDate: row[14] || "",
        feeGeneral: row[15] || "₹0",
        feeReserved: row[16] || "₹0",
        paymentMode: row[17] || "",
        ageMinimum: row[18] || "18",
        ageMaximum: row[19] || "30",
        ageNote: row[20] || "",
        education: row[21] || "",
        experience: row[22] || "Not Required",
        nationality: row[23] || "Indian Citizen",
        physicalStandards: row[24] || "",
        postsData: row[25] || "[]",
        selectionProcess: row[26] || "[]",
        payScale: row[27] || "",
        gradePayPostwise: row[28] || "",
        allowances: row[29] || "",
        phone: row[30] || "",
        email: row[31] || "",
        website: row[32] || "",
        onlineFormLink: row[33] || "#",
        notificationLink: row[34] || "#",
        syllabusLink: row[35] || "#",
        columnType: this.getColumnType(row[this.COLUMNS.COLUMN_TYPE]),
        columnDescription: row[this.COLUMNS.COLUMN_DESCRIPTION] || "Apply Now",
        applyLink: row[this.COLUMNS.APPLY_LINK] || "",
        referenceNumber: row[this.COLUMNS.REFERENCE_NUMBER],
        importantLinks: row[this.COLUMNS.IMPORTANT_LINKS],
        examCenter: row[this.COLUMNS.EXAM_CENTER],
        otherInfo: row[this.COLUMNS.OTHER_INFO]
      }));
    } catch (error) {
      console.error("Error fetching data from Google Sheets:", error);
      return this.getFallbackData();
    }
  }

  async getHomePageData() {
    const allJobs = await this.fetchJobData();
    const result = {
      offline: [] as HomePageJobData[],
      online: [] as HomePageJobData[],
      sewayojan: [] as HomePageJobData[],
    };

    allJobs.forEach((job) => {
      const homePageJob: HomePageJobData = {
        id: job.id,
        title: job.title,
        description: job.columnDescription,
        link: job.applyLink || `/job-forms?id=${job.id}`,
        organization: job.organization,
        lastDate: job.applicationEnd,
        columnType: job.columnType,
      };
      result[job.columnType].push(homePageJob);
    });

    return result;
  }

  async getJobById(jobId: string): Promise<JobData | null> {
    const allJobs = await this.fetchJobData();
    return allJobs.find((job) => job.id === jobId) || null;
  }

  private getFallbackData(): JobData[] {
    // Return your fallback data as before
    return [...]; // Include your complete fallback data here
  }
}

export const googleSheetsService = new GoogleSheetsService();
