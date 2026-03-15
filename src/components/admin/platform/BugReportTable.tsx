"use client";

import React, { useEffect, useState } from "react";
import { GlassCard } from "../shared/GlassCard";
import { Bug, Filter, Search, Eye, MessageSquare } from "lucide-react";
import { getBugReports, updateBugReportStatus, addBugReportNote } from "@/lib/admin/mock/mockApi";
import { BugReport, BugStatus } from "@/lib/admin/mock/mockData";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";

export function BugReportTable() {
  const { user } = useAuth();
  const [reports, setReports] = useState<BugReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedReport, setSelectedReport] = useState<BugReport | null>(null);
  const [newNote, setNewNote] = useState("");
  const [filters, setFilters] = useState({
    status: "",
    severity: "",
    userType: "",
    search: "",
  });

  useEffect(() => {
    fetchReports();
  }, [filters.status, filters.severity, filters.userType]);

  const fetchReports = async () => {
    try {
      const data = await getBugReports({
        status: filters.status as BugStatus | undefined,
        severity: filters.severity || undefined,
        userType: filters.userType || undefined,
      });
      setReports(data);
    } catch (error) {
      console.error("Failed to fetch bug reports:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id: string, status: BugStatus) => {
    try {
      await updateBugReportStatus(id, status);
      await fetchReports();
      if (selectedReport?.id === id) {
        setSelectedReport({ ...selectedReport, status });
      }
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  const handleAddNote = async () => {
    if (!selectedReport || !newNote.trim() || !user) return;
    
    try {
      await addBugReportNote(selectedReport.id, newNote, user.email);
      setNewNote("");
      await fetchReports();
      const updated = reports.find(r => r.id === selectedReport.id);
      if (updated) setSelectedReport(updated);
    } catch (error) {
      console.error("Failed to add note:", error);
    }
  };

  const filteredReports = reports.filter(report => {
    if (filters.search) {
      const search = filters.search.toLowerCase();
      return (
        report.title.toLowerCase().includes(search) ||
        report.description.toLowerCase().includes(search) ||
        report.userEmail.toLowerCase().includes(search)
      );
    }
    return true;
  });

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical": return "bg-red-500/10 text-red-400 border-red-500/20";
      case "high": return "bg-orange-500/10 text-orange-400 border-orange-500/20";
      case "medium": return "bg-amber-500/10 text-amber-400 border-amber-500/20";
      case "low": return "bg-blue-500/10 text-blue-400 border-blue-500/20";
      default: return "bg-gray-500/10 text-gray-400 border-gray-500/20";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new": return "bg-purple-500/10 text-purple-400 border-purple-500/20";
      case "in progress": return "bg-blue-500/10 text-blue-400 border-blue-500/20";
      case "resolved": return "bg-green-500/10 text-green-400 border-green-500/20";
      case "closed": return "bg-gray-500/10 text-gray-400 border-gray-500/20";
      default: return "bg-gray-500/10 text-gray-400 border-gray-500/20";
    }
  };

  return (
    <>
      <GlassCard className="p-6" glow>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/20">
              <Bug className="w-5 h-5 text-amber-500" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white">Bug Reports</h3>
              <p className="text-sm text-gray-400">{filteredReports.length} total reports</p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search reports..."
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-500"
            />
          </div>
          
          <Select value={filters.status || "all"} onValueChange={(value) => setFilters({ ...filters, status: value === "all" ? "" : value })}>
            <SelectTrigger className="bg-white/5 border-white/10 text-white">
              <SelectValue placeholder="All Statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="in progress">In Progress</SelectItem>
              <SelectItem value="resolved">Resolved</SelectItem>
              <SelectItem value="closed">Closed</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filters.severity || "all"} onValueChange={(value) => setFilters({ ...filters, severity: value === "all" ? "" : value })}>
            <SelectTrigger className="bg-white/5 border-white/10 text-white">
              <SelectValue placeholder="All Severities" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Severities</SelectItem>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="critical">Critical</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filters.userType || "all"} onValueChange={(value) => setFilters({ ...filters, userType: value === "all" ? "" : value })}>
            <SelectTrigger className="bg-white/5 border-white/10 text-white">
              <SelectValue placeholder="All User Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All User Types</SelectItem>
              <SelectItem value="student">Student</SelectItem>
              <SelectItem value="mentor">Mentor</SelectItem>
              <SelectItem value="institution">Institution</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Table */}
        {loading ? (
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 bg-white/5 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {filteredReports.map((report) => (
              <div
                key={report.id}
                onClick={() => setSelectedReport(report)}
                className="p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-200 cursor-pointer"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="text-white font-medium truncate">{report.title}</h4>
                      <Badge className={`${getSeverityColor(report.severity)} border`}>
                        {report.severity}
                      </Badge>
                      <Badge className={`${getStatusColor(report.status)} border`}>
                        {report.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-400 line-clamp-1">{report.description}</p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                      <span>{report.userName} ({report.userType})</span>
                      <span>•</span>
                      <span>{new Date(report.createdAt).toLocaleDateString()}</span>
                      {report.notes && report.notes.length > 0 && (
                        <>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <MessageSquare className="w-3 h-3" />
                            {report.notes.length} notes
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-amber-400 hover:text-amber-300 hover:bg-amber-500/10"
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </GlassCard>

      {/* Detail Modal */}
      <Dialog open={!!selectedReport} onOpenChange={() => setSelectedReport(null)}>
        <DialogContent className="max-w-2xl bg-[#0a0a0f] border-white/10 text-white">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-white">Bug Report Details</DialogTitle>
          </DialogHeader>
          
          {selectedReport && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">{selectedReport.title}</h3>
                <div className="flex items-center gap-2 mb-4">
                  <Badge className={`${getSeverityColor(selectedReport.severity)} border`}>
                    {selectedReport.severity}
                  </Badge>
                  <Badge className={`${getStatusColor(selectedReport.status)} border`}>
                    {selectedReport.status}
                  </Badge>
                </div>
                <p className="text-gray-300">{selectedReport.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
                <div>
                  <p className="text-xs text-gray-400 mb-1">Reported By</p>
                  <p className="text-sm text-white">{selectedReport.userName}</p>
                  <p className="text-xs text-gray-500">{selectedReport.userEmail}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-1">User Type</p>
                  <p className="text-sm text-white capitalize">{selectedReport.userType}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-1">Created</p>
                  <p className="text-sm text-white">{new Date(selectedReport.createdAt).toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-1">Last Updated</p>
                  <p className="text-sm text-white">{new Date(selectedReport.updatedAt).toLocaleString()}</p>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-300 mb-2 block">Update Status</label>
                <Select
                  value={selectedReport.status}
                  onValueChange={(value) => handleStatusUpdate(selectedReport.id, value as BugStatus)}
                >
                  <SelectTrigger className="bg-white/5 border-white/10 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="in progress">In Progress</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-300 mb-2 block">Notes</label>
                {selectedReport.notes && selectedReport.notes.length > 0 ? (
                  <div className="space-y-2 mb-4 max-h-40 overflow-y-auto">
                    {selectedReport.notes.map((note, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-white/5 border border-white/10">
                        <p className="text-sm text-gray-300">{note.text}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {note.addedBy} • {new Date(note.addedAt).toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 mb-4">No notes yet</p>
                )}
                
                <div className="flex gap-2">
                  <Textarea
                    placeholder="Add a note..."
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                    rows={3}
                  />
                </div>
                <Button
                  onClick={handleAddNote}
                  disabled={!newNote.trim()}
                  className="mt-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
                >
                  Add Note
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
