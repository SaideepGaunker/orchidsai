// Security utilities for admin portal

// CSRF Token Management
export function getCSRFToken(): string {
  if (typeof window === "undefined") return "";
  
  let token = sessionStorage.getItem("csrf_token");
  if (!token) {
    token = generateToken();
    sessionStorage.setItem("csrf_token", token);
  }
  return token;
}

function generateToken(): string {
  return Array.from(crypto.getRandomValues(new Uint8Array(32)))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

// Rate Limiting
const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

export function loginRateLimiter(identifier: string, maxAttempts = 5, windowMs = 15 * 60 * 1000): boolean {
  return checkRateLimit(identifier, maxAttempts, windowMs);
}

export function formSubmitRateLimiter(identifier: string, maxAttempts = 10, windowMs = 60 * 1000): boolean {
  return checkRateLimit(identifier, maxAttempts, windowMs);
}

function checkRateLimit(key: string, maxAttempts: number, windowMs: number): boolean {
  const now = Date.now();
  const record = rateLimitStore.get(key);

  if (!record || now > record.resetAt) {
    rateLimitStore.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }

  if (record.count >= maxAttempts) {
    return false;
  }

  record.count++;
  return true;
}

// Input Validation
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, "")
    .replace(/javascript:/gi, "")
    .replace(/on\w+=/gi, "")
    .trim();
}

export function validateTextInput(input: string, maxLength = 1000): { valid: boolean; error?: string } {
  if (!input || input.trim().length === 0) {
    return { valid: false, error: "Input cannot be empty" };
  }

  if (input.length > maxLength) {
    return { valid: false, error: `Input exceeds maximum length of ${maxLength} characters` };
  }

  // Check for suspicious patterns
  const suspiciousPatterns = [/<script/i, /javascript:/i, /on\w+=/i];
  if (suspiciousPatterns.some((pattern) => pattern.test(input))) {
    return { valid: false, error: "Input contains invalid characters" };
  }

  return { valid: true };
}
