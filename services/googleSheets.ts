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
  private readonly SHEET_NAME = "JobData"; // Name of the sheet tab

  /**
   * Fetches job data from Google Sheets
   * @returns Promise<JobData[]>
   */
  async fetchJobData(): Promise<JobData[]> {
    try {
      if (!this.SHEET_ID || !this.API_KEY) {
        console.warn(
          "Google Sheets credentials not configured, using fallback data",
        );
        return this.getFallbackData();
      }

      const range = `${this.SHEET_NAME}!A:AE`; // Covers columns A to AE (31 columns)
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${this.SHEET_ID}/values/${range}?key=${this.API_KEY}`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (!data.values || data.values.length < 2) {
        console.warn("No data found in Google Sheets");
        return this.getFallbackData();
      }

      // First row contains headers, skip it
      const rows = data.values.slice(1);

      return rows.map((row: string[], index: number) => ({
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
        columnType: (row[36] as "offline" | "online" | "sewayojan") || "online",
        columnDescription: row[37] || "Apply Now",
      }));
    } catch (error) {
      console.error("Error fetching data from Google Sheets:", error);
      return this.getFallbackData();
    }
  }

  /**
   * Gets job data formatted for home page columns
   * @returns Promise<{offline: HomePageJobData[], online: HomePageJobData[], sewayojan: HomePageJobData[]}>
   */
  async getHomePageData(): Promise<{
    offline: HomePageJobData[];
    online: HomePageJobData[];
    sewayojan: HomePageJobData[];
  }> {
    const allJobs = await this.fetchJobData();

    const offline: HomePageJobData[] = [];
    const online: HomePageJobData[] = [];
    const sewayojan: HomePageJobData[] = [];

    allJobs.forEach((job) => {
      const homePageJob: HomePageJobData = {
        id: job.id,
        title: job.title,
        description: job.columnDescription,
        link: `/job-forms?id=${job.id}`,
        organization: job.organization,
        lastDate: job.applicationEnd,
        columnType: job.columnType,
      };

      switch (job.columnType) {
        case "offline":
          offline.push(homePageJob);
          break;
        case "online":
          online.push(homePageJob);
          break;
        case "sewayojan":
          sewayojan.push(homePageJob);
          break;
      }
    });

    return { offline, online, sewayojan };
  }

  /**
   * Gets specific job data by ID
   * @param jobId - The job ID to fetch
   * @returns Promise<JobData | null>
   */
  async getJobById(jobId: string): Promise<JobData | null> {
    const allJobs = await this.fetchJobData();
    return allJobs.find((job) => job.id === jobId) || null;
  }

  /**
   * Fallback data when Google Sheets is not available
   * @returns JobData[]
   */
  private getFallbackData(): JobData[] {
    return [
      {
        id: "ssc-jht-2025",
        title: "SSC Combined Hindi Translators (JHT) Recruitment 2025",
        organization: "Staff Selection Commission (SSC)",
        category: "Central Government",
        postDate: "05 June 2025",
        lastUpdate: "08:33 PM",
        status: "Active",
        totalPosts: "417",
        officialWebsite: "https://ssc.gov.in/",
        applicationStart: "10 June 2025",
        applicationEnd: "09 July 2025",
        feePaymentEnd: "11 July 2025",
        correctionDates: "12-14 July 2025",
        examDate: "To be announced",
        admitCardDate: "Before exam",
        feeGeneral: "₹100",
        feeReserved: "No Fee",
        paymentMode: "Online (Net Banking, Debit/Credit Card, UPI)",
        ageMinimum: "18 Years",
        ageMaximum: "27 Years",
        ageNote: "Age relaxation as per SSC rules",
        education: "Master's Degree in Hindi with English as a subject",
        experience: "Not Required",
        nationality: "Indian Citizen",
        physicalStandards: "",
        postsData: JSON.stringify([
          {
            code: "A",
            position: "Junior Translation Officer (JTO) in CSOLS",
            vacancies: "89",
            eligibility: "Master's Degree in Hindi",
          },
          {
            code: "B",
            position: "Junior Translation Officer (JTO) in AFHQ",
            vacancies: "45",
            eligibility: "Master's Degree in Hindi",
          },
        ]),
        selectionProcess: JSON.stringify([
          "Paper-I (Objective Type)",
          "Paper-II (Descriptive Type)",
          "Document Verification",
          "Final Merit List",
        ]),
        payScale: "₹25,500 - ₹81,100",
        gradePayPostwise: "Various Grade Pay as per post",
        allowances: "DA, HRA, TA and other allowances as admissible",
        phone: "011-23232229",
        email: "ssc-cr@nic.in",
        website: "www.ssc.gov.in",
        onlineFormLink: "https://ssc.gov.in/apply",
        notificationLink: "https://ssc.gov.in/notification",
        syllabusLink: "https://ssc.gov.in/syllabus",
        columnType: "online",
        columnDescription: "Apply Online",
      },
      {
        id: "railway-group-d-2025",
        title: "Railway Group D Recruitment 2025",
        organization: "Railway Recruitment Board (RRB)",
        category: "Central Government Railway",
        postDate: "02 June 2025",
        lastUpdate: "06:15 PM",
        status: "Active",
        totalPosts: "103769",
        officialWebsite: "https://rrbcdg.gov.in/",
        applicationStart: "15 June 2025",
        applicationEnd: "15 July 2025",
        feePaymentEnd: "17 July 2025",
        correctionDates: "18-20 July 2025",
        examDate: "September 2025",
        admitCardDate: "15 days before exam",
        feeGeneral: "₹250",
        feeReserved: "₹250",
        paymentMode:
          "Online (Net Banking, Debit/Credit Card, UPI, Mobile Wallets)",
        ageMinimum: "18 Years",
        ageMaximum: "33 Years",
        ageNote: "Age relaxation as per Railway rules for reserved categories",
        education: "10th Pass (Matriculation) from recognized Board",
        experience: "Not Required",
        nationality: "Indian Citizen",
        physicalStandards: "As per Railway Medical Standards",
        postsData: JSON.stringify([
          {
            code: "Level-1",
            position: "Track Maintainer Grade-IV",
            vacancies: "28545",
            eligibility: "10th Pass",
          },
          {
            code: "Level-1",
            position: "Helper/Assistant in various technical departments",
            vacancies: "25436",
            eligibility: "10th Pass",
          },
        ]),
        selectionProcess: JSON.stringify([
          "Computer Based Test (CBT)",
          "Physical Efficiency Test (PET)",
          "Document Verification",
          "Medical Examination",
        ]),
        payScale: "₹18,000 - ₹56,900",
        gradePayPostwise: "Level-1 as per 7th Pay Commission",
        allowances: "DA, HRA, TA and other Railway allowances",
        phone: "0522-2820066",
        email: "rrbcdgonline@gmail.com",
        website: "www.rrbcdg.gov.in",
        onlineFormLink: "https://rrbcdg.gov.in/apply",
        notificationLink: "https://rrbcdg.gov.in/notification",
        syllabusLink: "https://rrbcdg.gov.in/syllabus",
        columnType: "offline",
        columnDescription: "Download PDF",
      },
    ];
  }
}

// Export singleton instance
export const googleSheetsService = new GoogleSheetsService();
