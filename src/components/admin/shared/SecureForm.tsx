import React from "react";

interface SecureFormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  onSecureSubmit: (e: React.FormEvent, csrfToken: string) => void;
  rateLimitKey?: string;
  children: React.ReactNode;
}

export function SecureForm({ onSecureSubmit, rateLimitKey, children, ...props }: SecureFormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Generate a mock CSRF token for now
    const csrfToken = `csrf-${Date.now()}`;
    onSecureSubmit(e, csrfToken);
  };

  return (
    <form onSubmit={handleSubmit} {...props}>
      {children}
    </form>
  );
}
