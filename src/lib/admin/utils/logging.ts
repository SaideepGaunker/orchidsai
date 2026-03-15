// Logging utilities for admin actions

interface LogEntry {
  timestamp: Date;
  adminId: string;
  action: string;
  resourceType: string;
  resourceId: string;
  metadata?: Record<string, unknown>;
}

export function logAdminAction(entry: Partial<Omit<LogEntry, "timestamp">> & { resourceType: string; resourceId: string }): void {
  const logEntry: LogEntry = {
    adminId: entry.adminId || "unknown",
    action: entry.action || "access",
    resourceType: entry.resourceType,
    resourceId: entry.resourceId,
    metadata: entry.metadata,
    timestamp: new Date(),
  };
  
  console.log("[Admin Action]", logEntry);
  
  // In production, this would send to a logging service
  if (typeof window !== "undefined") {
    const logs = JSON.parse(localStorage.getItem("admin_logs") || "[]");
    logs.push(logEntry);
    // Keep only last 100 logs
    if (logs.length > 100) {
      logs.shift();
    }
    localStorage.setItem("admin_logs", JSON.stringify(logs));
  }
}

export function logQuestionAction(entry: Partial<Omit<LogEntry, "timestamp">> & { resourceType?: string; resourceId: string }): void {
  logAdminAction({ ...entry, resourceType: entry.resourceType || "question" });
}
