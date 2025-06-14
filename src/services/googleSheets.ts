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
        console.warn("Using fallback data - missing Sheets credentials");
        return this.getFallbackData();
      }

      const range = `${this.SHEET_NAME}!A:AK`;
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${this.SHEET_ID}/values/${range}?key=${this.API_KEY}`;
      
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP error: ${response.status}`);

      const data = await response.json();
      if (!data.values?.length) {
        console.warn("No data found in sheet");
        return this.getFallbackData();
      }

      return data.values.slice(1).map((row, index) => ({
        id: row[0] || `job-${index}`,
        title: row[1] || "",
        // ... other field mappings ...
        columnType: this.validateColumnType(row[36]),
        columnDescription: row[37] || "Apply Now"
      }));
    } catch (error) {
      console.error("Sheets API error:", error);
      return this.getFallbackData();
    }
  }

  // ... rest of your methods ...
}

export const googleSheetsService = new GoogleSheetsService();
