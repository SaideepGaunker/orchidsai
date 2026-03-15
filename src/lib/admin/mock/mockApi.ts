// Mock API functions for Admin Portal

import type {
  B2BAccount,
  B2BPayment,
  B2CAccount,
  B2CSubscription,
  B2CSubscriptionPlan,
  B2CPayment,
  BugReport,
  BugStatus,
  AIGeneratedQuestion,
  ValidationStatus,
  QuestionDomain,
} from "./mockData";

import {
  mockB2BAccounts,
  mockB2BPayments,
  mockB2CAccounts,
  mockB2CSubscriptions,
  mockB2CSubscriptionPlans,
  mockB2CPayments,
  mockBugReports,
  mockAIQuestions,
} from "./mockData";

// ============= SYSTEM METRICS =============

export async function getSystemMetrics() {
  return {
    systemStatus: { status: "operational" as const },
    responseTime: { avgMs: 245, maxMs: 890 },
    errorRate: { percentage: 0.02 },
    throughput: { requestsPerSecond: 1250 },
    activeUsers: { count: 3420 },
    concurrentSessions: { count: 892 },
  };
}

export async function getPlatformMetrics() {
  return {
    systemStatus: "operational" as const,
    responseTime: 245,
    errorRate: 0.02,
    activeUsers: 3420,
  };
}

export async function getAnalytics() {
  return {
    totalUsers: {
      students: 12000,
      mentors: 450,
      institutions: 120,
    },
    activeUsers: {
      daily: 3420,
      monthly: 8900,
    },
    sessions: {
      interviews: 35000,
      exams: 10230,
    },
    growth: {
      userGrowth: [
        { date: "2024-01-01", students: 10000, mentors: 350, institutions: 80 },
        { date: "2024-02-01", students: 10800, mentors: 380, institutions: 95 },
        { date: "2024-03-01", students: 11500, mentors: 420, institutions: 110 },
        { date: "2024-04-01", students: 12000, mentors: 450, institutions: 120 },
      ],
    },
  };
}

// ============= BUG REPORTS =============

export async function getBugReports(): Promise<BugReport[]> {
  return Promise.resolve(mockBugReports);
}

export async function updateBugReportStatus(id: string, status: BugStatus): Promise<void> {
  const report = mockBugReports.find((r) => r.id === id);
  if (report) {
    report.status = status;
    report.updatedAt = new Date();
  }
  return Promise.resolve();
}

export async function addBugReportNote(id: string, note: string, author: string): Promise<void> {
  const report = mockBugReports.find((r) => r.id === id);
  if (report) {
    report.notes.push({ text: note, author, timestamp: new Date() });
    report.updatedAt = new Date();
  }
  return Promise.resolve();
}

// ============= B2B ACCOUNTS =============

export async function getB2BAccounts(): Promise<B2BAccount[]> {
  return Promise.resolve(mockB2BAccounts);
}

export async function getB2BAccountDetails(id: string): Promise<B2BAccount | null> {
  return Promise.resolve(mockB2BAccounts.find((a) => a.id === id) || null);
}

export async function getB2BPayments(accountId?: string): Promise<B2BPayment[]> {
  if (accountId) {
    return Promise.resolve(mockB2BPayments.filter((p) => p.accountId === accountId));
  }
  return Promise.resolve(mockB2BPayments);
}

// ============= B2C ACCOUNTS =============

export async function getB2CAccounts(): Promise<B2CAccount[]> {
  return Promise.resolve(mockB2CAccounts);
}

export async function getB2CAccountDetails(id: string): Promise<B2CAccount | null> {
  return Promise.resolve(mockB2CAccounts.find((a) => a.id === id) || null);
}

export async function getB2CSubscriptions(accountId?: string): Promise<B2CSubscription[]> {
  if (accountId) {
    return Promise.resolve(mockB2CSubscriptions.filter((s) => s.accountId === accountId));
  }
  return Promise.resolve(mockB2CSubscriptions);
}

export async function getB2CSubscriptionPlans(): Promise<B2CSubscriptionPlan[]> {
  return Promise.resolve(mockB2CSubscriptionPlans);
}

export async function getB2CPayments(accountId?: string): Promise<B2CPayment[]> {
  if (accountId) {
    return Promise.resolve(mockB2CPayments.filter((p) => p.accountId === accountId));
  }
  return Promise.resolve(mockB2CPayments);
}

export async function processRefund(paymentId: string, amount: number, reason: string): Promise<void> {
  const payment = mockB2CPayments.find((p) => p.id === paymentId);
  if (payment) {
    payment.status = "refunded";
  }
  return Promise.resolve();
}

export async function updateSubscription(
  subscriptionId: string,
  updates: Partial<B2CSubscription>
): Promise<void> {
  const subscription = mockB2CSubscriptions.find((s) => s.id === subscriptionId);
  if (subscription) {
    Object.assign(subscription, updates);
  }
  return Promise.resolve();
}

// ============= QUESTIONS =============

export async function getDomains(): Promise<Array<{ domain: QuestionDomain; pendingCount: number }>> {
  const domains: QuestionDomain[] = [
    "data_structures",
    "algorithms",
    "system_design",
    "behavioral",
    "databases",
    "networking",
  ];
  
  return Promise.resolve(
    domains.map((domain) => ({
      domain,
      pendingCount: mockAIQuestions.filter(
        (q) => q.domain === domain && q.validationStatus === "pending"
      ).length,
    }))
  );
}

export async function getQuestionsByDomain(domain: QuestionDomain): Promise<AIGeneratedQuestion[]> {
  return Promise.resolve(mockAIQuestions.filter((q) => q.domain === domain));
}

export async function getQuestionValidationHistory(): Promise<AIGeneratedQuestion[]> {
  return Promise.resolve(mockAIQuestions.filter((q) => q.validationStatus !== "pending"));
}

export async function getValidationHistory(): Promise<AIGeneratedQuestion[]> {
  return getQuestionValidationHistory();
}

export async function getValidationStatistics() {
  const allQuestions = mockAIQuestions;
  const approved = allQuestions.filter(q => q.validationStatus === "approved").length;
  const rejected = allQuestions.filter(q => q.validationStatus === "rejected").length;
  const pending = allQuestions.filter(q => q.validationStatus === "pending").length;
  const totalValidated = approved + rejected;
  
  return {
    total: allQuestions.length,
    approved,
    rejected,
    pending,
    totalValidated,
    approvalRate: totalValidated > 0 ? (approved / totalValidated) * 100 : 0,
    rejectionRate: totalValidated > 0 ? (rejected / totalValidated) * 100 : 0,
  };
}

export async function validateQuestion(
  id: string,
  status: ValidationStatus,
  validatorId: string,
  reason?: string
): Promise<void> {
  const question = mockAIQuestions.find((q) => q.id === id);
  if (question) {
    question.validationStatus = status;
    question.validatedAt = new Date();
    question.validatedBy = validatorId;
    if (reason) {
      question.rejectionReason = reason;
    }
  }
  return Promise.resolve();
}

export async function approveQuestion(id: string, validatorId: string): Promise<void> {
  return validateQuestion(id, "approved", validatorId);
}

export async function rejectQuestion(id: string, validatorId: string, reason: string): Promise<void> {
  return validateQuestion(id, "rejected", validatorId, reason);
}

export async function editQuestion(id: string, updates: Partial<AIGeneratedQuestion>): Promise<void> {
  const question = mockAIQuestions.find((q) => q.id === id);
  if (question) {
    Object.assign(question, updates);
  }
  return Promise.resolve();
}

export async function bulkApproveQuestions(ids: string[], validatorId: string): Promise<void> {
  ids.forEach((id) => {
    const question = mockAIQuestions.find((q) => q.id === id);
    if (question) {
      question.validationStatus = "approved";
      question.validatedAt = new Date();
      question.validatedBy = validatorId;
    }
  });
  return Promise.resolve();
}

export async function bulkRejectQuestions(ids: string[], validatorId: string, reason: string): Promise<void> {
  ids.forEach((id) => {
    const question = mockAIQuestions.find((q) => q.id === id);
    if (question) {
      question.validationStatus = "rejected";
      question.validatedAt = new Date();
      question.validatedBy = validatorId;
      question.rejectionReason = reason;
    }
  });
  return Promise.resolve();
}

// ============= LOGGING =============

interface AdminAction {
  adminId: string;
  adminEmail: string;
  actionType: string;
  resourceType: string;
  resourceId: string;
  timestamp: Date;
  metadata?: Record<string, unknown>;
}

export async function logAdminAction(action: AdminAction): Promise<void> {
  console.log("[Admin Action]", action);
  return Promise.resolve();
}


// ============= B2C ACCOUNT MANAGEMENT =============

export async function updateB2CSubscription(
  subscriptionId: string,
  updates: Partial<B2CSubscription>
): Promise<void> {
  const subscription = mockB2CSubscriptions.find((s) => s.id === subscriptionId);
  if (subscription) {
    Object.assign(subscription, updates);
  }
  return Promise.resolve();
}

export async function grantPromotionalAccess(
  accountId: string,
  endDate: Date
): Promise<void> {
  const account = mockB2CAccounts.find((a) => a.id === accountId);
  if (account) {
    account.subscriptionStatus = "active";
    account.endDate = endDate;
  }
  return Promise.resolve();
}

export async function suspendB2CAccount(accountId: string): Promise<void> {
  const account = mockB2CAccounts.find((a) => a.id === accountId);
  if (account) {
    account.subscriptionStatus = "cancelled";
  }
  return Promise.resolve();
}

export async function reactivateB2CAccount(accountId: string): Promise<void> {
  const account = mockB2CAccounts.find((a) => a.id === accountId);
  if (account) {
    account.subscriptionStatus = "active";
  }
  return Promise.resolve();
}
