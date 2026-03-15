// Mock Data Types and Data for Admin Portal

// ============= TYPE DEFINITIONS =============

export type SubscriptionStatus = "active" | "expired" | "cancelled" | "trial";
export type PaymentStatus = "completed" | "pending" | "failed" | "refunded";
export type BugStatus = "open" | "in_progress" | "resolved" | "closed";
export type BugSeverity = "low" | "medium" | "high" | "critical";
export type UserType = "student" | "professional" | "institution";
export type QuestionDomain = "data_structures" | "algorithms" | "system_design" | "behavioral" | "databases" | "networking";
export type QuestionDifficulty = "easy" | "medium" | "hard";
export type QuestionType = "technical" | "behavioral" | "system_design";
export type ValidationStatus = "pending" | "approved" | "rejected";

// B2B Account (Institutional)
export interface B2BAccount {
  id: string;
  institutionName: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  subscriptionPlanId: string;
  subscriptionStatus: SubscriptionStatus;
  licenseCount: number;
  usedLicenses: number;
  startDate: Date;
  endDate: Date;
  autoRenew: boolean;
  totalRevenue: number;
}

// B2B Subscription Plan
export interface B2BSubscriptionPlan {
  id: string;
  name: string;
  description: string;
  pricePerLicense: number;
  minLicenses: number;
  maxLicenses: number;
  features: string[];
  billingCycle: "monthly" | "quarterly" | "annual";
}

// B2B Payment
export interface B2BPayment {
  id: string;
  accountId: string;
  amount: number;
  status: PaymentStatus;
  paymentDate: Date;
  dueDate: Date;
  invoiceNumber: string;
  paymentMethod: string;
}

// B2C Account (Individual)
export interface B2CAccount {
  id: string;
  name: string;
  email: string;
  phone: string;
  subscriptionPlanId: string;
  subscriptionStatus: SubscriptionStatus;
  startDate: Date;
  endDate: Date;
  autoRenew: boolean;
  totalSpent: number;
}

// B2C Subscription Plan
export interface B2CSubscriptionPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  billingCycle: "monthly" | "annual";
  features: string[];
  trialDays: number;
}

// B2C Subscription
export interface B2CSubscription {
  id: string;
  accountId: string;
  planId: string;
  status: SubscriptionStatus;
  startDate: Date;
  endDate: Date;
  autoRenew: boolean;
  cancelledAt?: Date;
  cancelReason?: string;
}

// B2C Payment
export interface B2CPayment {
  id: string;
  accountId: string;
  subscriptionId: string;
  amount: number;
  status: PaymentStatus;
  paymentDate: Date;
  paymentMethod: string;
  transactionId: string;
}

// Bug Report
export interface BugReport {
  id: string;
  userId: string;
  userType: UserType;
  userEmail: string;
  title: string;
  description: string;
  severity: BugSeverity;
  status: BugStatus;
  reportedAt: Date;
  updatedAt: Date;
  assignedTo?: string;
  notes: Array<{ text: string; author: string; timestamp: Date }>;
}

// AI Generated Question
export interface AIGeneratedQuestion {
  id: string;
  domain: QuestionDomain;
  difficulty: QuestionDifficulty;
  type: QuestionType;
  question: string;
  expectedAnswer?: string;
  rubric?: string;
  validationStatus: ValidationStatus;
  generatedAt: Date;
  validatedAt?: Date;
  validatedBy?: string;
  rejectionReason?: string;
}

// ============= MOCK DATA =============

export const mockB2BSubscriptionPlans: B2BSubscriptionPlan[] = [
  {
    id: "b2b-plan-1",
    name: "Enterprise Basic",
    description: "Perfect for small institutions",
    pricePerLicense: 49,
    minLicenses: 10,
    maxLicenses: 50,
    features: ["Basic Analytics", "Email Support", "Monthly Reports", "Up to 50 users"],
    billingCycle: "monthly",
  },
  {
    id: "b2b-plan-2",
    name: "Enterprise Pro",
    description: "For growing institutions",
    pricePerLicense: 39,
    minLicenses: 51,
    maxLicenses: 200,
    features: ["Advanced Analytics", "Priority Support", "Weekly Reports", "Custom Branding", "API Access"],
    billingCycle: "annual",
  },
  {
    id: "b2b-plan-3",
    name: "Enterprise Elite",
    description: "For large organizations",
    pricePerLicense: 29,
    minLicenses: 201,
    maxLicenses: 1000,
    features: ["Premium Analytics", "24/7 Support", "Daily Reports", "Custom Branding", "API Access", "Dedicated Account Manager", "Custom Integrations"],
    billingCycle: "annual",
  },
  {
    id: "b2b-plan-4",
    name: "Startup Plan",
    description: "Special pricing for startups",
    pricePerLicense: 59,
    minLicenses: 5,
    maxLicenses: 25,
    features: ["Basic Analytics", "Email Support", "Monthly Reports", "Startup Resources"],
    billingCycle: "monthly",
  },
];

export const mockB2BAccounts: B2BAccount[] = [
  {
    id: "b2b-1",
    institutionName: "Tech University",
    contactName: "Dr. Sarah Johnson",
    contactEmail: "sarah.j@techuni.edu",
    contactPhone: "+1-555-0101",
    subscriptionPlanId: "b2b-plan-2",
    subscriptionStatus: "active",
    licenseCount: 500,
    usedLicenses: 450,
    startDate: new Date("2024-01-15"),
    endDate: new Date("2025-01-15"),
    autoRenew: true,
    totalRevenue: 234000,
  },
  {
    id: "b2b-2",
    institutionName: "Code Academy",
    contactName: "Michael Chen",
    contactEmail: "m.chen@codeacademy.com",
    contactPhone: "+1-555-0102",
    subscriptionPlanId: "b2b-plan-1",
    subscriptionStatus: "active",
    licenseCount: 45,
    usedLicenses: 38,
    startDate: new Date("2024-03-01"),
    endDate: new Date("2025-03-01"),
    autoRenew: true,
    totalRevenue: 26460,
  },
  {
    id: "b2b-3",
    institutionName: "Data Science Institute",
    contactName: "Dr. Emily Rodriguez",
    contactEmail: "e.rodriguez@dsi.edu",
    contactPhone: "+1-555-0103",
    subscriptionPlanId: "b2b-plan-2",
    subscriptionStatus: "active",
    licenseCount: 200,
    usedLicenses: 185,
    startDate: new Date("2024-02-10"),
    endDate: new Date("2025-02-10"),
    autoRenew: true,
    totalRevenue: 93600,
  },
  {
    id: "b2b-4",
    institutionName: "Business School Online",
    contactName: "James Wilson",
    contactEmail: "j.wilson@bso.edu",
    contactPhone: "+1-555-0104",
    subscriptionPlanId: "b2b-plan-1",
    subscriptionStatus: "active",
    licenseCount: 30,
    usedLicenses: 28,
    startDate: new Date("2024-04-20"),
    endDate: new Date("2025-04-20"),
    autoRenew: false,
    totalRevenue: 17640,
  },
  {
    id: "b2b-5",
    institutionName: "Engineering College",
    contactName: "Dr. Priya Patel",
    contactEmail: "p.patel@engcollege.edu",
    contactPhone: "+1-555-0105",
    subscriptionPlanId: "b2b-plan-2",
    subscriptionStatus: "trial",
    licenseCount: 100,
    usedLicenses: 75,
    startDate: new Date("2024-12-01"),
    endDate: new Date("2025-01-01"),
    autoRenew: false,
    totalRevenue: 0,
  },
  {
    id: "b2b-6",
    institutionName: "Global Tech Institute",
    contactName: "Robert Martinez",
    contactEmail: "r.martinez@globaltech.edu",
    contactPhone: "+1-555-0106",
    subscriptionPlanId: "b2b-plan-3",
    subscriptionStatus: "active",
    licenseCount: 800,
    usedLicenses: 720,
    startDate: new Date("2023-09-01"),
    endDate: new Date("2024-09-01"),
    autoRenew: true,
    totalRevenue: 278400,
  },
  {
    id: "b2b-7",
    institutionName: "Innovation Bootcamp",
    contactName: "Lisa Anderson",
    contactEmail: "l.anderson@innovationbc.com",
    contactPhone: "+1-555-0107",
    subscriptionPlanId: "b2b-plan-1",
    subscriptionStatus: "active",
    licenseCount: 35,
    usedLicenses: 32,
    startDate: new Date("2024-05-15"),
    endDate: new Date("2025-05-15"),
    autoRenew: true,
    totalRevenue: 20580,
  },
  {
    id: "b2b-8",
    institutionName: "Startup Hub Academy",
    contactName: "Kevin Park",
    contactEmail: "k.park@startuphub.io",
    contactPhone: "+1-555-0108",
    subscriptionPlanId: "b2b-plan-4",
    subscriptionStatus: "active",
    licenseCount: 20,
    usedLicenses: 18,
    startDate: new Date("2024-07-01"),
    endDate: new Date("2025-07-01"),
    autoRenew: true,
    totalRevenue: 14160,
  },
  {
    id: "b2b-9",
    institutionName: "Professional Development Center",
    contactName: "Amanda White",
    contactEmail: "a.white@pdc.org",
    contactPhone: "+1-555-0109",
    subscriptionPlanId: "b2b-plan-2",
    subscriptionStatus: "active",
    licenseCount: 150,
    usedLicenses: 135,
    startDate: new Date("2024-06-10"),
    endDate: new Date("2025-06-10"),
    autoRenew: true,
    totalRevenue: 70200,
  },
  {
    id: "b2b-10",
    institutionName: "Career Accelerator Institute",
    contactName: "Thomas Brown",
    contactEmail: "t.brown@careeracc.edu",
    contactPhone: "+1-555-0110",
    subscriptionPlanId: "b2b-plan-1",
    subscriptionStatus: "expired",
    licenseCount: 40,
    usedLicenses: 0,
    startDate: new Date("2023-08-01"),
    endDate: new Date("2024-08-01"),
    autoRenew: false,
    totalRevenue: 23520,
  },
  {
    id: "b2b-11",
    institutionName: "Digital Skills Academy",
    contactName: "Jennifer Lee",
    contactEmail: "j.lee@digitalskills.com",
    contactPhone: "+1-555-0111",
    subscriptionPlanId: "b2b-plan-2",
    subscriptionStatus: "active",
    licenseCount: 180,
    usedLicenses: 165,
    startDate: new Date("2024-04-01"),
    endDate: new Date("2025-04-01"),
    autoRenew: true,
    totalRevenue: 84240,
  },
  {
    id: "b2b-12",
    institutionName: "Future Leaders University",
    contactName: "Dr. Mohammed Ali",
    contactEmail: "m.ali@futureleaders.edu",
    contactPhone: "+1-555-0112",
    subscriptionPlanId: "b2b-plan-3",
    subscriptionStatus: "active",
    licenseCount: 600,
    usedLicenses: 550,
    startDate: new Date("2024-01-01"),
    endDate: new Date("2025-01-01"),
    autoRenew: true,
    totalRevenue: 208800,
  },
  {
    id: "b2b-13",
    institutionName: "Tech Talent Hub",
    contactName: "Rachel Green",
    contactEmail: "r.green@techtalent.io",
    contactPhone: "+1-555-0113",
    subscriptionPlanId: "b2b-plan-4",
    subscriptionStatus: "trial",
    licenseCount: 15,
    usedLicenses: 12,
    startDate: new Date("2024-12-05"),
    endDate: new Date("2025-01-05"),
    autoRenew: false,
    totalRevenue: 0,
  },
  {
    id: "b2b-14",
    institutionName: "Corporate Training Solutions",
    contactName: "David Kim",
    contactEmail: "d.kim@corptraining.com",
    contactPhone: "+1-555-0114",
    subscriptionPlanId: "b2b-plan-2",
    subscriptionStatus: "active",
    licenseCount: 120,
    usedLicenses: 110,
    startDate: new Date("2024-08-15"),
    endDate: new Date("2025-08-15"),
    autoRenew: true,
    totalRevenue: 56160,
  },
  {
    id: "b2b-15",
    institutionName: "Learning Excellence Institute",
    contactName: "Dr. Patricia Davis",
    contactEmail: "p.davis@learningexcel.edu",
    contactPhone: "+1-555-0115",
    subscriptionPlanId: "b2b-plan-1",
    subscriptionStatus: "cancelled",
    licenseCount: 25,
    usedLicenses: 0,
    startDate: new Date("2024-02-01"),
    endDate: new Date("2024-11-01"),
    autoRenew: false,
    totalRevenue: 11025,
  },
  {
    id: "b2b-16",
    institutionName: "Silicon Valley Coding School",
    contactName: "Mark Thompson",
    contactEmail: "m.thompson@svcs.edu",
    contactPhone: "+1-555-0116",
    subscriptionPlanId: "b2b-plan-2",
    subscriptionStatus: "active",
    licenseCount: 250,
    usedLicenses: 230,
    startDate: new Date("2024-03-15"),
    endDate: new Date("2025-03-15"),
    autoRenew: true,
    totalRevenue: 117000,
  },
  {
    id: "b2b-17",
    institutionName: "AI & Machine Learning Academy",
    contactName: "Dr. Sophia Zhang",
    contactEmail: "s.zhang@aimlacademy.edu",
    contactPhone: "+1-555-0117",
    subscriptionPlanId: "b2b-plan-3",
    subscriptionStatus: "active",
    licenseCount: 400,
    usedLicenses: 380,
    startDate: new Date("2024-01-20"),
    endDate: new Date("2025-01-20"),
    autoRenew: true,
    totalRevenue: 139200,
  },
  {
    id: "b2b-18",
    institutionName: "Cyber Security Institute",
    contactName: "Colonel James Harper",
    contactEmail: "j.harper@cybersec.edu",
    contactPhone: "+1-555-0118",
    subscriptionPlanId: "b2b-plan-2",
    subscriptionStatus: "active",
    licenseCount: 175,
    usedLicenses: 160,
    startDate: new Date("2024-04-01"),
    endDate: new Date("2025-04-01"),
    autoRenew: true,
    totalRevenue: 81900,
  },
  {
    id: "b2b-19",
    institutionName: "Cloud Computing University",
    contactName: "Dr. Rajesh Kumar",
    contactEmail: "r.kumar@clouduni.edu",
    contactPhone: "+1-555-0119",
    subscriptionPlanId: "b2b-plan-1",
    subscriptionStatus: "active",
    licenseCount: 42,
    usedLicenses: 40,
    startDate: new Date("2024-05-10"),
    endDate: new Date("2025-05-10"),
    autoRenew: true,
    totalRevenue: 24696,
  },
  {
    id: "b2b-20",
    institutionName: "Mobile App Development School",
    contactName: "Jessica Martinez",
    contactEmail: "j.martinez@mobiledev.com",
    contactPhone: "+1-555-0120",
    subscriptionPlanId: "b2b-plan-4",
    subscriptionStatus: "active",
    licenseCount: 18,
    usedLicenses: 16,
    startDate: new Date("2024-08-01"),
    endDate: new Date("2025-08-01"),
    autoRenew: true,
    totalRevenue: 12744,
  },
  {
    id: "b2b-21",
    institutionName: "Full Stack Developer Institute",
    contactName: "Carlos Rodriguez",
    contactEmail: "c.rodriguez@fullstack.edu",
    contactPhone: "+1-555-0121",
    subscriptionPlanId: "b2b-plan-2",
    subscriptionStatus: "active",
    licenseCount: 220,
    usedLicenses: 200,
    startDate: new Date("2024-02-15"),
    endDate: new Date("2025-02-15"),
    autoRenew: true,
    totalRevenue: 102960,
  },
  {
    id: "b2b-22",
    institutionName: "DevOps Training Center",
    contactName: "Michael O'Brien",
    contactEmail: "m.obrien@devopstc.com",
    contactPhone: "+1-555-0122",
    subscriptionPlanId: "b2b-plan-1",
    subscriptionStatus: "active",
    licenseCount: 38,
    usedLicenses: 35,
    startDate: new Date("2024-06-20"),
    endDate: new Date("2025-06-20"),
    autoRenew: false,
    totalRevenue: 22344,
  },
  {
    id: "b2b-23",
    institutionName: "Blockchain Technology Academy",
    contactName: "Dr. Yuki Tanaka",
    contactEmail: "y.tanaka@blockchain.edu",
    contactPhone: "+1-555-0123",
    subscriptionPlanId: "b2b-plan-2",
    subscriptionStatus: "trial",
    licenseCount: 80,
    usedLicenses: 65,
    startDate: new Date("2024-12-08"),
    endDate: new Date("2025-01-08"),
    autoRenew: false,
    totalRevenue: 0,
  },
  {
    id: "b2b-24",
    institutionName: "Game Development Institute",
    contactName: "Alex Turner",
    contactEmail: "a.turner@gamedev.edu",
    contactPhone: "+1-555-0124",
    subscriptionPlanId: "b2b-plan-1",
    subscriptionStatus: "active",
    licenseCount: 48,
    usedLicenses: 45,
    startDate: new Date("2024-07-15"),
    endDate: new Date("2025-07-15"),
    autoRenew: true,
    totalRevenue: 28224,
  },
  {
    id: "b2b-25",
    institutionName: "Quantum Computing Research Lab",
    contactName: "Dr. Elena Petrov",
    contactEmail: "e.petrov@quantumlab.edu",
    contactPhone: "+1-555-0125",
    subscriptionPlanId: "b2b-plan-3",
    subscriptionStatus: "active",
    licenseCount: 300,
    usedLicenses: 275,
    startDate: new Date("2024-01-10"),
    endDate: new Date("2025-01-10"),
    autoRenew: true,
    totalRevenue: 104400,
  },
];

export const mockB2BPayments: B2BPayment[] = [
  {
    id: "b2b-pay-1",
    accountId: "b2b-1",
    amount: 19500,
    status: "completed",
    paymentDate: new Date("2024-12-15"),
    dueDate: new Date("2024-12-15"),
    invoiceNumber: "INV-2024-001",
    paymentMethod: "Bank Transfer",
  },
  {
    id: "b2b-pay-2",
    accountId: "b2b-2",
    amount: 2205,
    status: "completed",
    paymentDate: new Date("2024-12-01"),
    dueDate: new Date("2024-12-01"),
    invoiceNumber: "INV-2024-002",
    paymentMethod: "Credit Card",
  },
  {
    id: "b2b-pay-3",
    accountId: "b2b-3",
    amount: 7800,
    status: "completed",
    paymentDate: new Date("2024-12-10"),
    dueDate: new Date("2024-12-10"),
    invoiceNumber: "INV-2024-003",
    paymentMethod: "Bank Transfer",
  },
  {
    id: "b2b-pay-4",
    accountId: "b2b-4",
    amount: 1470,
    status: "pending",
    paymentDate: new Date("2024-12-20"),
    dueDate: new Date("2024-12-20"),
    invoiceNumber: "INV-2024-004",
    paymentMethod: "Invoice",
  },
  {
    id: "b2b-pay-5",
    accountId: "b2b-6",
    amount: 23200,
    status: "completed",
    paymentDate: new Date("2024-12-01"),
    dueDate: new Date("2024-12-01"),
    invoiceNumber: "INV-2024-005",
    paymentMethod: "Bank Transfer",
  },
  {
    id: "b2b-pay-6",
    accountId: "b2b-7",
    amount: 1715,
    status: "completed",
    paymentDate: new Date("2024-12-15"),
    dueDate: new Date("2024-12-15"),
    invoiceNumber: "INV-2024-006",
    paymentMethod: "Credit Card",
  },
  {
    id: "b2b-pay-7",
    accountId: "b2b-8",
    amount: 1180,
    status: "completed",
    paymentDate: new Date("2024-12-01"),
    dueDate: new Date("2024-12-01"),
    invoiceNumber: "INV-2024-007",
    paymentMethod: "Credit Card",
  },
  {
    id: "b2b-pay-8",
    accountId: "b2b-9",
    amount: 5850,
    status: "completed",
    paymentDate: new Date("2024-12-10"),
    dueDate: new Date("2024-12-10"),
    invoiceNumber: "INV-2024-008",
    paymentMethod: "Bank Transfer",
  },
  {
    id: "b2b-pay-9",
    accountId: "b2b-11",
    amount: 7020,
    status: "completed",
    paymentDate: new Date("2024-12-01"),
    dueDate: new Date("2024-12-01"),
    invoiceNumber: "INV-2024-009",
    paymentMethod: "Bank Transfer",
  },
  {
    id: "b2b-pay-10",
    accountId: "b2b-12",
    amount: 17400,
    status: "completed",
    paymentDate: new Date("2024-12-01"),
    dueDate: new Date("2024-12-01"),
    invoiceNumber: "INV-2024-010",
    paymentMethod: "Bank Transfer",
  },
  {
    id: "b2b-pay-11",
    accountId: "b2b-14",
    amount: 4680,
    status: "completed",
    paymentDate: new Date("2024-12-15"),
    dueDate: new Date("2024-12-15"),
    invoiceNumber: "INV-2024-011",
    paymentMethod: "Credit Card",
  },
  {
    id: "b2b-pay-12",
    accountId: "b2b-1",
    amount: 19500,
    status: "pending",
    paymentDate: new Date("2025-01-15"),
    dueDate: new Date("2025-01-15"),
    invoiceNumber: "INV-2025-001",
    paymentMethod: "Bank Transfer",
  },
  {
    id: "b2b-pay-13",
    accountId: "b2b-6",
    amount: 23200,
    status: "failed",
    paymentDate: new Date("2024-11-01"),
    dueDate: new Date("2024-11-01"),
    invoiceNumber: "INV-2024-012",
    paymentMethod: "Credit Card",
  },
  {
    id: "b2b-pay-14",
    accountId: "b2b-10",
    amount: 1960,
    status: "refunded",
    paymentDate: new Date("2024-07-01"),
    dueDate: new Date("2024-07-01"),
    invoiceNumber: "INV-2024-013",
    paymentMethod: "Bank Transfer",
  },
  {
    id: "b2b-pay-15",
    accountId: "b2b-16",
    amount: 9750,
    status: "completed",
    paymentDate: new Date("2024-12-15"),
    dueDate: new Date("2024-12-15"),
    invoiceNumber: "INV-2024-014",
    paymentMethod: "Bank Transfer",
  },
  {
    id: "b2b-pay-16",
    accountId: "b2b-17",
    amount: 11600,
    status: "completed",
    paymentDate: new Date("2024-12-20"),
    dueDate: new Date("2024-12-20"),
    invoiceNumber: "INV-2024-015",
    paymentMethod: "Bank Transfer",
  },
  {
    id: "b2b-pay-17",
    accountId: "b2b-18",
    amount: 6825,
    status: "completed",
    paymentDate: new Date("2024-12-01"),
    dueDate: new Date("2024-12-01"),
    invoiceNumber: "INV-2024-016",
    paymentMethod: "Credit Card",
  },
  {
    id: "b2b-pay-18",
    accountId: "b2b-19",
    amount: 2058,
    status: "completed",
    paymentDate: new Date("2024-12-10"),
    dueDate: new Date("2024-12-10"),
    invoiceNumber: "INV-2024-017",
    paymentMethod: "Credit Card",
  },
  {
    id: "b2b-pay-19",
    accountId: "b2b-20",
    amount: 1062,
    status: "completed",
    paymentDate: new Date("2024-12-01"),
    dueDate: new Date("2024-12-01"),
    invoiceNumber: "INV-2024-018",
    paymentMethod: "Credit Card",
  },
  {
    id: "b2b-pay-20",
    accountId: "b2b-21",
    amount: 8580,
    status: "completed",
    paymentDate: new Date("2024-12-15"),
    dueDate: new Date("2024-12-15"),
    invoiceNumber: "INV-2024-019",
    paymentMethod: "Bank Transfer",
  },
  {
    id: "b2b-pay-21",
    accountId: "b2b-22",
    amount: 1862,
    status: "pending",
    paymentDate: new Date("2024-12-20"),
    dueDate: new Date("2024-12-20"),
    invoiceNumber: "INV-2024-020",
    paymentMethod: "Invoice",
  },
  {
    id: "b2b-pay-22",
    accountId: "b2b-24",
    amount: 2352,
    status: "completed",
    paymentDate: new Date("2024-12-15"),
    dueDate: new Date("2024-12-15"),
    invoiceNumber: "INV-2024-021",
    paymentMethod: "Credit Card",
  },
  {
    id: "b2b-pay-23",
    accountId: "b2b-25",
    amount: 8700,
    status: "completed",
    paymentDate: new Date("2024-12-10"),
    dueDate: new Date("2024-12-10"),
    invoiceNumber: "INV-2024-022",
    paymentMethod: "Bank Transfer",
  },
];

export const mockB2CSubscriptionPlans: B2CSubscriptionPlan[] = [
  {
    id: "b2c-plan-1",
    name: "Free",
    description: "Get started with basics",
    price: 0,
    billingCycle: "monthly",
    features: ["5 practice sessions/month", "Basic feedback"],
    trialDays: 0,
  },
  {
    id: "b2c-plan-2",
    name: "Pro",
    description: "For serious learners",
    price: 29,
    billingCycle: "monthly",
    features: ["Unlimited sessions", "Advanced AI feedback", "Progress tracking"],
    trialDays: 7,
  },
];

export const mockB2CAccounts: B2CAccount[] = [
  {
    id: "b2c-1",
    name: "John Doe",
    email: "john.doe@email.com",
    phone: "+1-555-0201",
    subscriptionPlanId: "b2c-plan-2",
    subscriptionStatus: "active",
    startDate: new Date("2024-06-01"),
    endDate: new Date("2025-06-01"),
    autoRenew: true,
    totalSpent: 348,
  },
  {
    id: "b2c-2",
    name: "Sarah Williams",
    email: "sarah.w@email.com",
    phone: "+1-555-0202",
    subscriptionPlanId: "b2c-plan-2",
    subscriptionStatus: "active",
    startDate: new Date("2024-08-15"),
    endDate: new Date("2025-08-15"),
    autoRenew: true,
    totalSpent: 116,
  },
  {
    id: "b2c-3",
    name: "Alex Kumar",
    email: "alex.kumar@email.com",
    phone: "+1-555-0203",
    subscriptionPlanId: "b2c-plan-1",
    subscriptionStatus: "active",
    startDate: new Date("2024-10-01"),
    endDate: new Date("2025-10-01"),
    autoRenew: false,
    totalSpent: 0,
  },
  {
    id: "b2c-4",
    name: "Maria Garcia",
    email: "m.garcia@email.com",
    phone: "+1-555-0204",
    subscriptionPlanId: "b2c-plan-2",
    subscriptionStatus: "trial",
    startDate: new Date("2024-12-05"),
    endDate: new Date("2024-12-12"),
    autoRenew: false,
    totalSpent: 0,
  },
  {
    id: "b2c-5",
    name: "David Lee",
    email: "david.lee@email.com",
    phone: "+1-555-0205",
    subscriptionPlanId: "b2c-plan-2",
    subscriptionStatus: "expired",
    startDate: new Date("2023-11-01"),
    endDate: new Date("2024-11-01"),
    autoRenew: false,
    totalSpent: 348,
  },
  {
    id: "b2c-6",
    name: "Emma Thompson",
    email: "emma.t@email.com",
    phone: "+1-555-0206",
    subscriptionPlanId: "b2c-plan-2",
    subscriptionStatus: "active",
    startDate: new Date("2024-09-10"),
    endDate: new Date("2025-09-10"),
    autoRenew: true,
    totalSpent: 87,
  },
];

export const mockB2CSubscriptions: B2CSubscription[] = [
  {
    id: "b2c-sub-1",
    accountId: "b2c-1",
    planId: "b2c-plan-2",
    status: "active",
    startDate: new Date("2024-06-01"),
    endDate: new Date("2025-06-01"),
    autoRenew: true,
  },
  {
    id: "b2c-sub-2",
    accountId: "b2c-2",
    planId: "b2c-plan-2",
    status: "active",
    startDate: new Date("2024-08-15"),
    endDate: new Date("2025-08-15"),
    autoRenew: true,
  },
  {
    id: "b2c-sub-3",
    accountId: "b2c-3",
    planId: "b2c-plan-1",
    status: "active",
    startDate: new Date("2024-10-01"),
    endDate: new Date("2025-10-01"),
    autoRenew: false,
  },
  {
    id: "b2c-sub-4",
    accountId: "b2c-4",
    planId: "b2c-plan-2",
    status: "trial",
    startDate: new Date("2024-12-05"),
    endDate: new Date("2024-12-12"),
    autoRenew: false,
  },
  {
    id: "b2c-sub-5",
    accountId: "b2c-5",
    planId: "b2c-plan-2",
    status: "expired",
    startDate: new Date("2023-11-01"),
    endDate: new Date("2024-11-01"),
    autoRenew: false,
  },
  {
    id: "b2c-sub-6",
    accountId: "b2c-6",
    planId: "b2c-plan-2",
    status: "active",
    startDate: new Date("2024-09-10"),
    endDate: new Date("2025-09-10"),
    autoRenew: true,
  },
];

export const mockB2CPayments: B2CPayment[] = [
  {
    id: "b2c-pay-1",
    accountId: "b2c-1",
    subscriptionId: "b2c-sub-1",
    amount: 29,
    status: "completed",
    paymentDate: new Date("2024-12-01"),
    paymentMethod: "Credit Card",
    transactionId: "txn_abc123",
  },
  {
    id: "b2c-pay-2",
    accountId: "b2c-2",
    subscriptionId: "b2c-sub-2",
    amount: 29,
    status: "completed",
    paymentDate: new Date("2024-12-15"),
    paymentMethod: "PayPal",
    transactionId: "txn_def456",
  },
  {
    id: "b2c-pay-3",
    accountId: "b2c-6",
    subscriptionId: "b2c-sub-6",
    amount: 29,
    status: "completed",
    paymentDate: new Date("2024-12-10"),
    paymentMethod: "Credit Card",
    transactionId: "txn_ghi789",
  },
  {
    id: "b2c-pay-4",
    accountId: "b2c-1",
    subscriptionId: "b2c-sub-1",
    amount: 29,
    status: "pending",
    paymentDate: new Date("2025-01-01"),
    paymentMethod: "Credit Card",
    transactionId: "txn_jkl012",
  },
  {
    id: "b2c-pay-5",
    accountId: "b2c-5",
    subscriptionId: "b2c-sub-5",
    amount: 29,
    status: "failed",
    paymentDate: new Date("2024-11-01"),
    paymentMethod: "Credit Card",
    transactionId: "txn_mno345",
  },
];

export const mockBugReports: BugReport[] = [
  {
    id: "bug-1",
    userId: "user-1",
    userType: "student",
    userEmail: "student@example.com",
    title: "Video recording fails on mobile",
    description: "When trying to record interview on mobile browser, camera permission is granted but recording doesn't start.",
    severity: "high",
    status: "in_progress",
    reportedAt: new Date("2024-12-10"),
    updatedAt: new Date("2024-12-11"),
    assignedTo: "dev-team",
    notes: [
      { text: "Investigating mobile browser compatibility", author: "Admin", timestamp: new Date("2024-12-11") },
    ],
  },
  {
    id: "bug-2",
    userId: "user-2",
    userType: "professional",
    userEmail: "pro@example.com",
    title: "Dashboard analytics not loading",
    description: "The analytics charts on the dashboard show loading spinner indefinitely.",
    severity: "medium",
    status: "open",
    reportedAt: new Date("2024-12-11"),
    updatedAt: new Date("2024-12-11"),
    notes: [],
  },
  {
    id: "bug-3",
    userId: "user-3",
    userType: "institution",
    userEmail: "admin@institution.edu",
    title: "Bulk user import fails with CSV",
    description: "When uploading CSV file with 100+ users, the import process fails after 50 users.",
    severity: "critical",
    status: "in_progress",
    reportedAt: new Date("2024-12-09"),
    updatedAt: new Date("2024-12-12"),
    assignedTo: "backend-team",
    notes: [
      { text: "Identified memory leak in CSV parser", author: "Dev Team", timestamp: new Date("2024-12-10") },
      { text: "Fix deployed to staging", author: "Dev Team", timestamp: new Date("2024-12-12") },
    ],
  },
  {
    id: "bug-4",
    userId: "user-4",
    userType: "student",
    userEmail: "student2@example.com",
    title: "AI feedback takes too long",
    description: "After completing interview, waiting 5+ minutes for AI feedback to generate.",
    severity: "medium",
    status: "resolved",
    reportedAt: new Date("2024-12-05"),
    updatedAt: new Date("2024-12-08"),
    assignedTo: "ai-team",
    notes: [
      { text: "Optimized AI model inference", author: "AI Team", timestamp: new Date("2024-12-07") },
      { text: "Reduced average time to 30 seconds", author: "AI Team", timestamp: new Date("2024-12-08") },
    ],
  },
];

export const mockAIQuestions: AIGeneratedQuestion[] = [
  {
    id: "q-1",
    domain: "data_structures",
    difficulty: "medium",
    type: "technical",
    question: "Explain how a hash table works and discuss collision resolution strategies.",
    expectedAnswer: "Hash tables use a hash function to map keys to array indices...",
    rubric: "Should cover: hash function, collision handling (chaining, open addressing), time complexity",
    validationStatus: "pending",
    generatedAt: new Date("2024-12-12"),
  },
  {
    id: "q-2",
    domain: "algorithms",
    difficulty: "hard",
    type: "technical",
    question: "Describe the quicksort algorithm and analyze its time complexity in best, average, and worst cases.",
    expectedAnswer: "Quicksort is a divide-and-conquer algorithm that selects a pivot element...",
    rubric: "Should cover: pivot selection, partitioning, recursion, time complexity analysis",
    validationStatus: "pending",
    generatedAt: new Date("2024-12-12"),
  },
  {
    id: "q-3",
    domain: "system_design",
    difficulty: "hard",
    type: "system_design",
    question: "Design a URL shortening service like bit.ly. Discuss the architecture, database schema, and scalability considerations.",
    expectedAnswer: "The system needs to generate short unique URLs, store mappings, and redirect users...",
    rubric: "Should cover: URL generation algorithm, database design, caching, load balancing, scalability",
    validationStatus: "approved",
    generatedAt: new Date("2024-12-10"),
    validatedAt: new Date("2024-12-11"),
    validatedBy: "validator@orchids.ai",
  },
  {
    id: "q-4",
    domain: "behavioral",
    difficulty: "medium",
    type: "behavioral",
    question: "Tell me about a time when you had to work with a difficult team member. How did you handle the situation?",
    expectedAnswer: "Candidate should demonstrate conflict resolution, communication skills, and professionalism...",
    rubric: "Look for: specific example, actions taken, outcome, lessons learned",
    validationStatus: "approved",
    generatedAt: new Date("2024-12-09"),
    validatedAt: new Date("2024-12-10"),
    validatedBy: "validator@orchids.ai",
  },
  {
    id: "q-5",
    domain: "databases",
    difficulty: "medium",
    type: "technical",
    question: "Explain the difference between SQL and NoSQL databases. When would you choose one over the other?",
    expectedAnswer: "SQL databases are relational with structured schemas, while NoSQL databases are non-relational...",
    rubric: "Should cover: ACID properties, schema flexibility, scalability, use cases",
    validationStatus: "pending",
    generatedAt: new Date("2024-12-12"),
  },
  {
    id: "q-6",
    domain: "networking",
    difficulty: "easy",
    type: "technical",
    question: "What is the difference between TCP and UDP protocols?",
    expectedAnswer: "TCP is connection-oriented and reliable, while UDP is connectionless and faster...",
    rubric: "Should cover: connection establishment, reliability, use cases",
    validationStatus: "rejected",
    generatedAt: new Date("2024-12-08"),
    validatedAt: new Date("2024-12-09"),
    validatedBy: "validator@orchids.ai",
    rejectionReason: "Too basic for target audience, lacks depth in explanation",
  },
  {
    id: "q-7",
    domain: "data_structures",
    difficulty: "easy",
    type: "technical",
    question: "What is a linked list and what are its advantages over arrays?",
    expectedAnswer: "A linked list is a linear data structure where elements are stored in nodes...",
    rubric: "Should cover: node structure, dynamic size, insertion/deletion efficiency",
    validationStatus: "approved",
    generatedAt: new Date("2024-12-11"),
    validatedAt: new Date("2024-12-12"),
    validatedBy: "validator@orchids.ai",
  },
  {
    id: "q-8",
    domain: "algorithms",
    difficulty: "medium",
    type: "technical",
    question: "Implement a function to find the longest palindromic substring in a given string.",
    expectedAnswer: "Can use dynamic programming or expand around center approach...",
    rubric: "Should cover: algorithm approach, time complexity, edge cases",
    validationStatus: "pending",
    generatedAt: new Date("2024-12-12"),
  },
  {
    id: "q-9",
    domain: "system_design",
    difficulty: "medium",
    type: "system_design",
    question: "How would you design a rate limiter for an API?",
    expectedAnswer: "Common approaches include token bucket, leaky bucket, or fixed window algorithms...",
    rubric: "Should cover: algorithm choice, distributed systems considerations, storage",
    validationStatus: "pending",
    generatedAt: new Date("2024-12-12"),
  },
  {
    id: "q-10",
    domain: "behavioral",
    difficulty: "easy",
    type: "behavioral",
    question: "Why do you want to work for our company?",
    expectedAnswer: "Candidate should show research about the company, alignment with values...",
    rubric: "Look for: specific reasons, company knowledge, genuine interest",
    validationStatus: "rejected",
    generatedAt: new Date("2024-12-07"),
    validatedAt: new Date("2024-12-08"),
    validatedBy: "validator@orchids.ai",
    rejectionReason: "Too generic, not specific to technical interview context",
  },
  {
    id: "q-11",
    domain: "databases",
    difficulty: "hard",
    type: "technical",
    question: "Explain database indexing and how B-trees are used in database systems.",
    expectedAnswer: "Indexes improve query performance by creating data structures that allow fast lookups...",
    rubric: "Should cover: index types, B-tree structure, trade-offs, when to use indexes",
    validationStatus: "approved",
    generatedAt: new Date("2024-12-10"),
    validatedAt: new Date("2024-12-11"),
    validatedBy: "validator@orchids.ai",
  },
  {
    id: "q-12",
    domain: "networking",
    difficulty: "medium",
    type: "technical",
    question: "Explain how HTTPS works and the role of SSL/TLS certificates.",
    expectedAnswer: "HTTPS uses SSL/TLS to encrypt communication between client and server...",
    rubric: "Should cover: encryption, certificate authority, handshake process, security benefits",
    validationStatus: "pending",
    generatedAt: new Date("2024-12-12"),
  },
];
