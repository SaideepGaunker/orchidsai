"use client";

import { useState } from "react";
import { Mail, UserPlus, Upload, Copy, Check } from "lucide-react";

export default function InviteStudentsPage() {
  const [emails, setEmails] = useState("");
  const [copied, setCopied] = useState(false);
  const inviteLink = "https://aiinterviewcoach.com/register?ref=mentor123";

  const handleCopyLink = () => {
    navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold tracking-tight text-white">Invite Students</h1>
        <p className="mt-2 text-gray-400">Add students to your institution and batches</p>
      </div>

      {/* Invite Methods */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Email Invites */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10">
              <Mail size={24} className="text-emerald-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Email Invitations</h3>
              <p className="text-sm text-gray-400">Send invites via email</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">
                Student Email Addresses
              </label>
              <textarea
                value={emails}
                onChange={(e) => setEmails(e.target.value)}
                placeholder="Enter email addresses (one per line)&#10;student1@example.com&#10;student2@example.com"
                rows={6}
                className="w-full rounded-xl border border-white/10 bg-white/5 p-4 text-white placeholder:text-gray-500 focus:border-emerald-500/50 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>

            <button className="w-full rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-3 font-semibold text-white transition-all hover:from-emerald-600 hover:to-teal-700">
              Send Invitations
            </button>
          </div>
        </div>

        {/* Invite Link */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10">
              <UserPlus size={24} className="text-blue-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Invite Link</h3>
              <p className="text-sm text-gray-400">Share a registration link</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">
                Your Unique Invite Link
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inviteLink}
                  readOnly
                  className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white focus:outline-none"
                />
                <button
                  onClick={handleCopyLink}
                  className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white transition-all hover:bg-white/10"
                >
                  {copied ? <Check size={18} className="text-emerald-400" /> : <Copy size={18} />}
                </button>
              </div>
            </div>

            <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-4">
              <p className="text-sm text-blue-300">
                Share this link with students to automatically add them to your institution.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bulk Upload */}
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/10">
            <Upload size={24} className="text-purple-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Bulk Upload</h3>
            <p className="text-sm text-gray-400">Upload a CSV file with student details</p>
          </div>
        </div>

        <div className="space-y-4">
          <label className="flex items-center justify-center rounded-xl border-2 border-dashed border-white/10 bg-white/5 p-12 transition-all hover:border-emerald-500/50 cursor-pointer">
            <input type="file" accept=".csv" className="sr-only" aria-label="Upload CSV file" />
            <div className="text-center">
              <Upload size={48} className="mx-auto mb-4 text-gray-500" />
              <p className="mb-2 text-sm font-medium text-white">
                Drop your CSV file here or click to browse
              </p>
              <p className="text-xs text-gray-500">
                Supported format: CSV with columns (name, email, batch)
              </p>
            </div>
          </label>

          <div className="flex items-center justify-between">
            <button className="text-sm text-emerald-400 hover:text-emerald-300">
              Download CSV Template
            </button>
            <button className="rounded-xl bg-gradient-to-r from-purple-500 to-violet-600 px-6 py-3 font-semibold text-white transition-all hover:from-purple-600 hover:to-violet-700">
              Upload CSV
            </button>
          </div>
        </div>
      </div>

      {/* Recent Invites */}
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
        <h3 className="mb-4 text-lg font-semibold text-white">Recent Invitations</h3>
        <div className="flex h-32 items-center justify-center rounded-xl bg-white/5">
          <p className="text-sm text-gray-500">No invitations sent yet</p>
        </div>
      </div>
    </div>
  );
}
