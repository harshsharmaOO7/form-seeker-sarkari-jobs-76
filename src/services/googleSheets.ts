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

  // Column Assignment (which column to show in main page)
  columnType: "offline" | "online" | "sewayojan";
  columnDescription: string;
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

  private getColumnType(type: string | undefined): "offline" | "online" | "sewayojan" {
    const normalizedType = type?.trim().toLowerCase();
    const valid = ["offline", "online", "sewayojan"] as const;
    return valid.includes(normalizedType as any) 
      ? normalizedType as "offline" | "online" | "sewayojan" 
      : "online";
  }

  async fetchJobData(): Promise<JobData[]> {
    try {
      if (!this.SHEET_ID || !this.API_KEY) {
        console.warn("Google Sheets credentials not configured, using fallback data");
        return this.getFallbackData();
      }

      const range = `${this.SHEET_NAME}!A:AK`;
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${this.SHEET_ID}/values/${range}?key=${this.API_KEY}`;

      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const data = await response.json();
      if (!data.values || data.values.length < 2) {
        console.warn("No data found in Google Sheets");
        return this.getFallbackData();
      }

      return data.values.slice(1).map((row: string[], index: number) => ({
        id: row[0] || `job-${index + 1}`,
        title: row[1] || "",
        organization: row[2] || "",
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
        columnType: this.getColumnType(row[36]),
        columnDescription: row[37] || "Apply Now",
      }));
    } catch (error) {
      console.error("Error fetching data from Google Sheets:", error);
      return this.getFallbackData();
    }
  }

  // ... rest of your class methods remain the same ...
}

export const googleSheetsService = new GoogleSheetsService();
