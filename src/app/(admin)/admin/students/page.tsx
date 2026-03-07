"use client";

import { useState, useRef, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
    Users,
    UserPlus,
    Search,
    ChevronDown,
    MessageSquare,
    X,
    Mic2,
    Star,
    AlertTriangle,
    Send,
    FileDown,
    ChevronUp,
} from "lucide-react";
import {
    AreaChart,
    Area,
    RadarChart,
    Radar,
    PolarGrid,
    PolarAngleAxis,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

// ── Mock student data ──────────────────────────────────────────────────────────
const initialStudents = [
    {
        id: "s1",
        name: "Aarav Sharma",
        email: "aarav@gmail.com",
        batch: "Batch 2024–A",
        avatar: "AS",
        sessions: 12,
        ci: 78,
        status: "Active",
        joined: "Jan 10, 2025",
        domain: "Frontend Dev",
        ciHistory: [
            { week: "W1", ci: 60 }, { week: "W2", ci: 65 }, { week: "W3", ci: 70 },
            { week: "W4", ci: 68 }, { week: "W5", ci: 75 }, { week: "W6", ci: 78 },
        ],
        skills: [
            { skill: "Data Structures", score: 80 },
            { skill: "System Design", score: 55 },
            { skill: "Behavioral", score: 88 },
            { skill: "OS", score: 65 },
            { skill: "Networking", score: 72 },
        ],
        sessions_list: [
            { id: "S-001", date: "Feb 25", type: "Technical", ci: 80, duration: "18m", feedback: "Strong DSA coverage. Needs to improve response structure on edge cases." },
            { id: "S-002", date: "Feb 18", type: "Behavioral", ci: 76, duration: "22m", feedback: "Good STAR structure. Eye contact was slightly low." },
            { id: "S-003", date: "Feb 10", type: "Technical", ci: 74, duration: "15m", feedback: "Solid fundamentals but missed time complexity analysis." },
        ],
        flagged: false,
        notes: "",
    },
    {
        id: "s2",
        name: "Ananya Patel",
        email: "ananya.p@gmail.com",
        batch: "Batch 2024–B",
        avatar: "AP",
        sessions: 8,
        ci: 64,
        status: "Active",
        joined: "Jan 14, 2025",
        domain: "Product Manager",
        ciHistory: [
            { week: "W1", ci: 50 }, { week: "W2", ci: 54 }, { week: "W3", ci: 59 },
            { week: "W4", ci: 61 }, { week: "W5", ci: 63 }, { week: "W6", ci: 64 },
        ],
        skills: [
            { skill: "Data Structures", score: 40 },
            { skill: "System Design", score: 68 },
            { skill: "Behavioral", score: 80 },
            { skill: "OS", score: 45 },
            { skill: "Networking", score: 55 },
        ],
        sessions_list: [
            { id: "S-001", date: "Feb 24", type: "Behavioral", ci: 67, duration: "20m", feedback: "Strong narrative but answers tend to be lengthy — practice conciseness." },
            { id: "S-002", date: "Feb 15", type: "Technical", ci: 60, duration: "25m", feedback: "Struggles with algorithm complexity. Recommend additional DSA practice." },
        ],
        flagged: true,
        notes: "Needs extra support in DSA. Mentor follow-up scheduled for March.",
    },
    {
        id: "s3",
        name: "Ethan Hunt",
        email: "ethan@mi.com",
        batch: "Batch 2024–A",
        avatar: "EH",
        sessions: 15,
        ci: 82,
        status: "Active",
        joined: "Dec 20, 2024",
        domain: "Backend Dev",
        ciHistory: [
            { week: "W1", ci: 68 }, { week: "W2", ci: 72 }, { week: "W3", ci: 75 },
            { week: "W4", ci: 76 }, { week: "W5", ci: 80 }, { week: "W6", ci: 82 },
        ],
        skills: [
            { skill: "Data Structures", score: 90 },
            { skill: "System Design", score: 78 },
            { skill: "Behavioral", score: 82 },
            { skill: "OS", score: 75 },
            { skill: "Networking", score: 80 },
        ],
        sessions_list: [
            { id: "S-001", date: "Feb 26", type: "System Design", ci: 84, duration: "30m", feedback: "Excellent system design reasoning. Minor gaps in scalability discussion." },
            { id: "S-002", date: "Feb 19", type: "Technical", ci: 82, duration: "20m", feedback: "Consistently high performance. Push to advanced topics." },
            { id: "S-003", date: "Feb 12", type: "Behavioral", ci: 80, duration: "18m", feedback: "Strong communication. Confident delivery throughout." },
        ],
        flagged: false,
        notes: "",
    },
    {
        id: "s4",
        name: "Ishaan Gupta",
        email: "ishaan.g@gmail.com",
        batch: "Batch 2024–B",
        avatar: "IG",
        sessions: 4,
        ci: 52,
        status: "Review",
        joined: "Jan 22, 2025",
        domain: "Frontend Dev",
        ciHistory: [
            { week: "W1", ci: 45 }, { week: "W2", ci: 48 }, { week: "W3", ci: 50 },
            { week: "W4", ci: 48 }, { week: "W5", ci: 52 }, { week: "W6", ci: 52 },
        ],
        skills: [
            { skill: "Data Structures", score: 38 },
            { skill: "System Design", score: 45 },
            { skill: "Behavioral", score: 60 },
            { skill: "OS", score: 40 },
            { skill: "Networking", score: 50 },
        ],
        sessions_list: [
            { id: "S-001", date: "Feb 20", type: "Technical", ci: 52, duration: "12m", feedback: "Incomplete answers. Struggled with basic recursion problems." },
        ],
        flagged: true,
        notes: "Immediate intervention needed. Low engagement and CI stagnation.",
    },
    {
        id: "s5",
        name: "Meera Reddy",
        email: "meera.r@gmail.com",
        batch: "Batch 2024–A",
        avatar: "MR",
        sessions: 22,
        ci: 89,
        status: "Active",
        joined: "Dec 15, 2024",
        domain: "Data Scientist",
        ciHistory: [
            { week: "W1", ci: 72 }, { week: "W2", ci: 76 }, { week: "W3", ci: 80 },
            { week: "W4", ci: 83 }, { week: "W5", ci: 87 }, { week: "W6", ci: 89 },
        ],
        skills: [
            { skill: "Data Structures", score: 88 },
            { skill: "System Design", score: 80 },
            { skill: "Behavioral", score: 92 },
            { skill: "OS", score: 78 },
            { skill: "Networking", score: 82 },
        ],
        sessions_list: [
            { id: "S-001", date: "Feb 27", type: "Behavioral", ci: 91, duration: "25m", feedback: "Exceptional STAR framework usage. Clear, data-driven answers." },
            { id: "S-002", date: "Feb 21", type: "Technical", ci: 88, duration: "28m", feedback: "Near-perfect performance. Ready for FAANG-level mock." },
            { id: "S-003", date: "Feb 14", type: "System Design", ci: 87, duration: "32m", feedback: "Excellent scalability insights. Minor gaps in cost optimization." },
        ],
        flagged: false,
        notes: "Top performer. Recommend advanced challenge track.",
    },
];

type Student = (typeof initialStudents)[0];

// ── Circular CI Ring ──────────────────────────────────────────────────────────
function CIRing({ value, size = 80 }: { value: number; size?: number }) {
    const radius = size / 2 - 6;
    const circumference = 2 * Math.PI * radius;
    const dashoffset = circumference * (1 - value / 100);
    const color = value >= 75 ? "#10b981" : value >= 60 ? "#f59e0b" : "#ef4444";
    return (
        <svg width={size} height={size} className="-rotate-90">
            <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth={6} />
            <circle
                cx={size / 2} cy={size / 2} r={radius}
                fill="none" stroke={color} strokeWidth={6}
                strokeDasharray={circumference} strokeDashoffset={dashoffset}
                strokeLinecap="round"
                style={{ transition: "stroke-dashoffset 1s ease" }}
            />
        </svg>
    );
}

function StudentsInner() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [studentList, setStudentList] = useState<Student[]>(initialStudents);
    const [query, setQuery] = useState("");
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
    const [mentorNote, setMentorNote] = useState("");
    const [expandedSession, setExpandedSession] = useState<string | null>(null);
    const [chatOpen, setChatOpen] = useState(false);
    const [chatMsg, setChatMsg] = useState("");
    const [chatHistory, setChatHistory] = useState<{ from: "mentor" | "student"; text: string }[]>([]);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Assign Practice modal state
    const [assignModalOpen, setAssignModalOpen] = useState(false);
    const [assignType, setAssignType] = useState("technical");
    const [assignDomain, setAssignDomain] = useState("Software Engineering");
    const [assignDueDate, setAssignDueDate] = useState("");
    const [assignSuccess, setAssignSuccess] = useState(false);

    const handleAssign = () => {
        setAssignModalOpen(false);
        setAssignSuccess(true);
        setTimeout(() => setAssignSuccess(false), 3500);
    };

    // Add Student modal state
    const [addModalOpen, setAddModalOpen] = useState(false);
    const [addSuccess, setAddSuccess] = useState(false);
    const [newName, setNewName] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [newBatch, setNewBatch] = useState("");
    const [newCollege, setNewCollege] = useState("");
    const [newDomain, setNewDomain] = useState("Software Engineering");
    const [newExp, setNewExp] = useState("Student / Fresher");

    const resetAddForm = () => {
        setNewName(""); setNewEmail(""); setNewBatch(""); setNewCollege("");
        setNewDomain("Software Engineering"); setNewExp("Student / Fresher");
    };

    const handleAddStudent = () => {
        if (!newName.trim() || !newEmail.trim()) return;
        const initials = newName.trim().split(" ").map((w) => w[0].toUpperCase()).slice(0, 2).join("");
        const today = new Date().toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
        const newStudent: Student = {
            id: `s${Date.now()}`,
            name: newName.trim(),
            email: newEmail.trim(),
            batch: newBatch.trim() || "Unassigned",
            avatar: initials,
            sessions: 0,
            ci: 0,
            status: "Active",
            joined: today,
            domain: newDomain,
            ciHistory: [],
            skills: [
                { skill: "Data Structures", score: 0 },
                { skill: "System Design", score: 0 },
                { skill: "Behavioral", score: 0 },
                { skill: "OS", score: 0 },
                { skill: "Networking", score: 0 },
            ],
            sessions_list: [],
            flagged: false,
            notes: "",
        };
        setStudentList((prev) => [...prev, newStudent]);
        setAddModalOpen(false);
        resetAddForm();
        setAddSuccess(true);
        setTimeout(() => setAddSuccess(false), 3500);
    };

    // When a student is selected and query equals their name, show all students.
    // Otherwise filter by query so live searching works.
    const filtered = studentList.filter((s) => {
        const q = query.toLowerCase();
        if (!q || (selectedStudent && q === selectedStudent.name.toLowerCase())) return true;
        return (
            s.name.toLowerCase().includes(q) ||
            s.email.toLowerCase().includes(q) ||
            s.batch.toLowerCase().includes(q)
        );
    });

    // Auto-select student from query param (e.g. ?student=Meera+Reddy)
    // This must run AFTER selectStudent is defined, so it's placed after all state.
    useEffect(() => {
        const name = searchParams.get("student");
        if (!name) return;
        const found = studentList.find((s) => s.name.toLowerCase() === decodeURIComponent(name).toLowerCase());
        if (found) {
            setSelectedStudent(found);
            setQuery(found.name);
            setMentorNote(found.notes);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Close dropdown on outside click
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    const openDropdown = () => {
        // Clear query so all students show on re-open
        if (selectedStudent && query === selectedStudent.name) setQuery("");
        setDropdownOpen(true);
        inputRef.current?.focus();
    };

    const selectStudent = (s: Student) => {
        setSelectedStudent(s);
        setQuery(s.name);
        setDropdownOpen(false);
        setMentorNote(s.notes);
        setChatOpen(false);
        setChatHistory([]);
    };

    const sendChat = () => {
        if (!chatMsg.trim()) return;
        setChatHistory((h) => [...h, { from: "mentor", text: chatMsg }]);
        setChatMsg("");
        // Simulate reply
        setTimeout(() => {
            setChatHistory((h) => [
                ...h,
                {
                    from: "student",
                    text: "Thanks for the message! I'll review this feedback and get back to you.",
                },
            ]);
        }, 1000);
    };

    const ciColor = (ci: number) =>
        ci >= 75 ? "text-emerald-400" : ci >= 60 ? "text-amber-400" : "text-red-400";

    const ciBg = (ci: number) =>
        ci >= 75 ? "rgba(16,185,129,0.1)" : ci >= 60 ? "rgba(245,158,11,0.1)" : "rgba(239,68,68,0.1)";

    return (
        <>
            <div className="p-6 lg:p-8 min-h-screen">
                {/* Page Header */}
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-white mb-1 tracking-tight">Student Profiles</h1>
                        <p className="text-sm text-white/40">Select a student to view their performance and interact with them</p>
                    </div>
                    <button
                        onClick={() => setAddModalOpen(true)}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-black transition-all hover:scale-105"
                        style={{ background: "linear-gradient(135deg, #10b981, #059669)", boxShadow: "0 0 16px rgba(16,185,129,0.3)" }}
                    >
                        <UserPlus size={16} /> Add Student
                    </button>
                </div>

                {/* ── Student Selector Dropdown ──────────────────────────────── */}
                <div className="mb-8" ref={dropdownRef}>
                    <label className="text-[10px] font-black text-white/30 uppercase tracking-[2px] mb-2 block">
                        Select Student
                    </label>
                    <div className="relative max-w-lg">
                        <div
                            className="flex items-center gap-3 px-4 py-3.5 rounded-2xl cursor-text transition-all"
                            style={{ background: "rgba(255,255,255,0.04)", border: dropdownOpen ? "1px solid rgba(16,185,129,0.5)" : "1px solid rgba(255,255,255,0.08)", boxShadow: dropdownOpen ? "0 0 16px rgba(16,185,129,0.1)" : "none" }}
                            onMouseDown={(e) => { if (e.target === e.currentTarget) { e.preventDefault(); openDropdown(); } }}
                        >
                            <Search size={16} className="text-white/30 flex-shrink-0 cursor-pointer" onClick={openDropdown} />
                            <input ref={inputRef} type="text" value={query}
                                onChange={(e) => { setQuery(e.target.value); setDropdownOpen(true); }}
                                onFocus={() => setDropdownOpen(true)}
                                placeholder="Search by name, email, or batch..."
                                className="flex-1 bg-transparent text-sm text-white placeholder:text-white/20 outline-none cursor-text" />
                            {selectedStudent && (
                                <button onMouseDown={(e) => { e.preventDefault(); e.stopPropagation(); setSelectedStudent(null); setQuery(""); setDropdownOpen(false); }}
                                    className="text-white/20 hover:text-white/60 transition-colors p-1" tabIndex={-1}>
                                    <X size={14} />
                                </button>
                            )}
                            <ChevronDown size={14} className={`text-white/30 transition-transform duration-200 flex-shrink-0 cursor-pointer ${dropdownOpen ? "rotate-180" : ""}`} onClick={openDropdown} />
                        </div>
                        {dropdownOpen && (
                            <div className="absolute top-[calc(100%+8px)] left-0 right-0 rounded-2xl overflow-y-auto z-50 shadow-2xl"
                                style={{ background: "rgba(10,12,28,0.98)", border: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(24px)", maxHeight: 320 }}>
                                {filtered.length === 0 ? (
                                    <div className="p-6 text-center text-xs text-white/30">No students match your search</div>
                                ) : (
                                    filtered.map((s) => (
                                        <div key={s.id}
                                            onMouseDown={(e) => { e.preventDefault(); selectStudent(s); }}
                                            className={`flex items-center gap-4 px-5 py-4 cursor-pointer transition-all hover:bg-white/[0.04] border-b border-white/[0.03] last:border-0 ${selectedStudent?.id === s.id ? "bg-emerald-500/5" : ""}`}>
                                            <div className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-black text-black flex-shrink-0"
                                                style={{ background: `linear-gradient(135deg, ${s.ci >= 75 ? "#10b981, #059669" : s.ci >= 60 ? "#f59e0b, #d97706" : "#ef4444, #b91c1c"})` }}>
                                                {s.avatar}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-semibold text-white truncate">{s.name}</p>
                                                <p className="text-xs text-white/30 truncate">{s.email} · {s.batch}</p>
                                            </div>
                                            <div className="flex items-center gap-3 flex-shrink-0">
                                                <span className={`text-xs font-black ${ciColor(s.ci)}`}>CI {s.ci}</span>
                                                {s.flagged && <AlertTriangle size={13} className="text-red-400" />}
                                                <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md ${s.status === "Active" ? "text-emerald-400 bg-emerald-400/10" : "text-red-400 bg-red-400/10"}`}>{s.status}</span>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* ── Student Detail View ──────────────────────────────────────── */}
                {selectedStudent ? (
                    <div className="space-y-6">
                        {/* Profile Header Card */}
                        <div className="glass-card rounded-2xl p-6 border border-white/5">
                            <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                                <div className="flex items-center gap-5 flex-1">
                                    <div className="relative">
                                        <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-lg font-black text-black flex-shrink-0"
                                            style={{ background: `linear-gradient(135deg, ${selectedStudent.ci >= 75 ? "#10b981, #059669" : selectedStudent.ci >= 60 ? "#f59e0b, #d97706" : "#ef4444, #b91c1c"})` }}>
                                            {selectedStudent.avatar}
                                        </div>
                                        {selectedStudent.flagged && (
                                            <div className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-red-500 flex items-center justify-center">
                                                <AlertTriangle size={10} className="text-white" />
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-3 mb-1">
                                            <h2 className="text-xl font-bold text-white">{selectedStudent.name}</h2>
                                            <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md ${selectedStudent.status === "Active" ? "text-emerald-400 bg-emerald-400/10" : "text-red-400 bg-red-400/10"}`}>{selectedStudent.status}</span>
                                            {selectedStudent.flagged && <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md text-red-400 bg-red-400/10">Flagged</span>}
                                        </div>
                                        <p className="text-sm text-white/40 mb-1">{selectedStudent.email}</p>
                                        <div className="flex flex-wrap items-center gap-3 text-xs text-white/30">
                                            <span>{selectedStudent.batch}</span><span>·</span><span>{selectedStudent.domain}</span><span>·</span><span>Joined {selectedStudent.joined}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-wrap items-center gap-4">
                                    <div className="flex items-center gap-3 glass-card rounded-2xl px-4 py-3 border border-white/5">
                                        <div className="relative w-14 h-14 flex items-center justify-center">
                                            <CIRing value={selectedStudent.ci} size={56} />
                                            <span className={`absolute text-sm font-black ${ciColor(selectedStudent.ci)}`}>{selectedStudent.ci}</span>
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-white/30 uppercase tracking-widest font-black">Conf. Index</p>
                                            <p className={`text-sm font-black ${ciColor(selectedStudent.ci)}`}>{selectedStudent.ci >= 75 ? "Strong" : selectedStudent.ci >= 60 ? "Developing" : "Needs Help"}</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-center glass-card rounded-2xl px-5 py-3 border border-white/5">
                                        <Mic2 size={16} className="text-white/30 mb-1" />
                                        <p className="text-xl font-black text-white">{selectedStudent.sessions}</p>
                                        <p className="text-[10px] text-white/30 uppercase tracking-widest">Sessions</p>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <button onClick={() => setChatOpen(!chatOpen)}
                                            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-black transition-all hover:scale-105"
                                            style={{ background: "linear-gradient(135deg, #10b981, #059669)", boxShadow: "0 0 12px rgba(16,185,129,0.2)" }}>
                                            <MessageSquare size={15} /> Message Student
                                        </button>
                                        <button onClick={() => setAssignModalOpen(true)}
                                            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-black transition-all hover:scale-105"
                                            style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)", boxShadow: "0 0 12px rgba(99,102,241,0.2)" }}>
                                            <Star size={15} /> Assign Practice
                                        </button>
                                        <button onClick={() => window.print()}
                                            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-white/60 glass-card glass-card-hover transition-all border border-white/5">
                                            <FileDown size={15} /> Export Report
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Charts row */}
                        <div className="grid lg:grid-cols-2 gap-6">
                            <div className="glass-card rounded-2xl p-6 border border-white/5">
                                <h3 className="text-xs font-black text-white/30 uppercase tracking-[2px] mb-5">CI Trend (Last 6 Weeks)</h3>
                                <ResponsiveContainer width="100%" height={180}>
                                    <AreaChart data={selectedStudent.ciHistory}>
                                        <defs>
                                            <linearGradient id="ciGrad" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#10b981" stopOpacity={0.25} />
                                                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 10 }} />
                                        <YAxis domain={[40, 100]} axisLine={false} tickLine={false} tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 10 }} />
                                        <Tooltip contentStyle={{ background: "rgba(10,12,24,0.9)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "10px", fontSize: 12 }} />
                                        <Area type="monotone" dataKey="ci" stroke="#10b981" fill="url(#ciGrad)" strokeWidth={2.5} dot={{ fill: "#10b981", r: 3 }} />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="glass-card rounded-2xl p-6 border border-white/5">
                                <h3 className="text-xs font-black text-white/30 uppercase tracking-[2px] mb-5">Skill Coverage</h3>
                                <ResponsiveContainer width="100%" height={180}>
                                    <RadarChart data={selectedStudent.skills}>
                                        <PolarGrid stroke="rgba(255,255,255,0.05)" />
                                        <PolarAngleAxis dataKey="skill" tick={{ fill: "rgba(255,255,255,0.35)", fontSize: 10 }} />
                                        <Radar name="Score" dataKey="score" stroke="#10b981" fill="#10b981" fillOpacity={0.12} strokeWidth={2} />
                                        <Tooltip contentStyle={{ background: "rgba(10,12,24,0.9)", border: "1px solid rgba(16,185,129,0.2)", borderRadius: "10px", fontSize: 12 }} />
                                    </RadarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Skill bars */}
                        <div className="glass-card rounded-2xl p-6 border border-white/5">
                            <h3 className="text-xs font-black text-white/30 uppercase tracking-[2px] mb-5">Skill Breakdown</h3>
                            <div className="grid md:grid-cols-2 gap-x-10 gap-y-4">
                                {selectedStudent.skills.map((sk) => (
                                    <div key={sk.skill}>
                                        <div className="flex justify-between text-xs mb-1.5">
                                            <span className="text-white/50">{sk.skill}</span>
                                            <span className={sk.score < 60 ? "text-red-400 font-semibold" : "text-emerald-400 font-semibold"}>{sk.score}%</span>
                                        </div>
                                        <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                                            <div className={`h-full rounded-full ${sk.score < 60 ? "bg-red-500/70" : "bg-emerald-500/70"}`} style={{ width: `${sk.score}%`, transition: "width 1s ease" }} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Session History */}
                        <div className="glass-card rounded-2xl overflow-hidden border border-white/5">
                            <div className="p-6 border-b border-white/5">
                                <h3 className="text-xs font-black text-white/30 uppercase tracking-[2px]">Session History</h3>
                            </div>
                            <div className="divide-y divide-white/5">
                                {selectedStudent.sessions_list.map((sess) => (
                                    <div key={sess.id}>
                                        <div className="flex items-center justify-between px-6 py-4 cursor-pointer hover:bg-white/[0.02] transition-colors"
                                            onClick={() => setExpandedSession(expandedSession === sess.id ? null : sess.id)}>
                                            <div className="flex items-center gap-4">
                                                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: ciBg(sess.ci) }}>
                                                    <Star size={15} className={ciColor(sess.ci)} />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-semibold text-white">{sess.id} — {sess.type}</p>
                                                    <p className="text-xs text-white/30">{sess.date} · {sess.duration}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <span className={`text-sm font-black ${ciColor(sess.ci)}`}>CI {sess.ci}</span>
                                                {expandedSession === sess.id ? <ChevronUp size={14} className="text-white/30" /> : <ChevronDown size={14} className="text-white/30" />}
                                            </div>
                                        </div>
                                        {expandedSession === sess.id && (
                                            <div className="px-6 pb-5 pt-1 bg-white/[0.015]">
                                                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5">
                                                    <p className="text-[10px] font-black text-white/30 uppercase tracking-widest mb-2">AI Feedback</p>
                                                    <p className="text-sm text-white/60 leading-relaxed">{sess.feedback}</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Mentor Notes */}
                        <div className="glass-card rounded-2xl p-6 border border-white/5">
                            <h3 className="text-xs font-black text-white/30 uppercase tracking-[2px] mb-4">Mentor Notes</h3>
                            <textarea value={mentorNote} onChange={(e) => setMentorNote(e.target.value)} rows={4}
                                placeholder="Add private mentor notes for this student (not visible to the student)..."
                                className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 outline-none resize-none transition-all focus:border-emerald-500/40" />
                            <div className="flex justify-end mt-3">
                                <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-black transition-all hover:scale-105"
                                    style={{ background: "linear-gradient(135deg, #10b981, #059669)" }}>
                                    Save Notes
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="glass-card rounded-2xl p-16 text-center border-white/5">
                        <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-5">
                            <Users size={28} className="text-emerald-400" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Select a Student</h3>
                        <p className="text-white/40 max-w-sm mx-auto text-sm leading-relaxed">
                            Use the dropdown above to search and select a student to view their performance profile, session history, and send messages.
                        </p>
                    </div>
                )}

                {/* ── Floating Chat Panel ─────────────────────────────────────── */}
                {chatOpen && selectedStudent && (
                    <div className="fixed bottom-6 right-6 w-96 rounded-3xl overflow-hidden shadow-2xl z-[100] flex flex-col"
                        style={{ height: 480, background: "rgba(10,12,28,0.97)", border: "1px solid rgba(16,185,129,0.2)", backdropFilter: "blur(24px)" }}>
                        <div className="flex items-center justify-between px-5 py-4 border-b border-white/5 flex-shrink-0"
                            style={{ background: "linear-gradient(135deg, rgba(16,185,129,0.12), rgba(5,150,105,0.05))" }}>
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-xl bg-emerald-500 flex items-center justify-center text-xs font-black text-black">{selectedStudent.avatar}</div>
                                <div>
                                    <p className="text-sm font-bold text-white leading-none">{selectedStudent.name}</p>
                                    <p className="text-[10px] text-emerald-400 mt-0.5">Student Chat</p>
                                </div>
                            </div>
                            <button onClick={() => setChatOpen(false)} className="text-white/30 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/5"><X size={16} /></button>
                        </div>
                        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
                            {chatHistory.length === 0 && (
                                <div className="text-center py-8">
                                    <MessageSquare size={32} className="mx-auto text-white/10 mb-3" />
                                    <p className="text-xs text-white/20">Start a conversation with {selectedStudent.name}</p>
                                </div>
                            )}
                            {chatHistory.map((msg, i) => (
                                <div key={i} className={`flex ${msg.from === "mentor" ? "justify-end" : "justify-start"}`}>
                                    <div className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${msg.from === "mentor" ? "text-black font-medium rounded-br-sm" : "text-white/70 rounded-bl-sm"}`}
                                        style={msg.from === "mentor" ? { background: "linear-gradient(135deg, #10b981, #059669)" } : { background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.06)" }}>
                                        {msg.text}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex items-center gap-3 px-4 py-3 border-t border-white/5 flex-shrink-0">
                            <input type="text" value={chatMsg} onChange={(e) => setChatMsg(e.target.value)} onKeyDown={(e) => e.key === "Enter" && sendChat()}
                                placeholder="Type a message..."
                                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/20 outline-none focus:border-emerald-500/40 transition-all" />
                            <button onClick={sendChat} className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all hover:scale-105"
                                style={{ background: "linear-gradient(135deg, #10b981, #059669)" }}>
                                <Send size={15} className="text-black" />
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* ── Assign Practice Modal ──────────────────────────────────────── */}
            {assignModalOpen && selectedStudent && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-4"
                    style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)" }}
                    onClick={(e) => { if (e.target === e.currentTarget) setAssignModalOpen(false); }}>
                    <div className="glass-card rounded-3xl p-6 w-full max-w-md"
                        style={{ border: "1px solid rgba(99,102,241,0.25)", boxShadow: "0 0 40px rgba(99,102,241,0.1)" }}>
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h3 className="text-lg font-bold text-white">Assign Practice</h3>
                                <p className="text-xs text-white/40 mt-0.5">For {selectedStudent.name}</p>
                            </div>
                            <button onClick={() => setAssignModalOpen(false)} className="text-white/30 hover:text-white/60 transition-colors p-1 rounded-lg hover:bg-white/5"><X size={18} /></button>
                        </div>
                        <div className="mb-4">
                            <label className="text-xs font-black text-white/30 uppercase tracking-[2px] mb-2 block">Practice Type</label>
                            <div className="grid grid-cols-2 gap-2">
                                {[{ id: "technical", label: "Technical Interview" }, { id: "hr", label: "HR Interview" }, { id: "mock", label: "Full Mock" }, { id: "exam", label: "Exam Session" }].map(({ id, label }) => (
                                    <button key={id} onClick={() => setAssignType(id)}
                                        className="px-3 py-2.5 rounded-xl text-sm font-medium text-left transition-all"
                                        style={assignType === id ? { background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.35)", color: "#a5b4fc" } : { background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.45)" }}>
                                        {label}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="text-xs font-black text-white/30 uppercase tracking-[2px] mb-2 block">Domain</label>
                            <select value={assignDomain} onChange={(e) => setAssignDomain(e.target.value)}
                                className="w-full px-3 py-2.5 rounded-xl text-sm text-white outline-none appearance-none"
                                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}>
                                {["Software Engineering", "Data Science", "Product Management", "Frontend / UI", "Backend / APIs", "System Design", "Machine Learning"].map((d) => (
                                    <option key={d} value={d} style={{ background: "#0a0c1e" }}>{d}</option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-6">
                            <label className="text-xs font-black text-white/30 uppercase tracking-[2px] mb-2 block">Due Date <span className="normal-case font-normal">(optional)</span></label>
                            <input type="date" value={assignDueDate} onChange={(e) => setAssignDueDate(e.target.value)}
                                className="w-full px-3 py-2.5 rounded-xl text-sm text-white/70 outline-none"
                                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }} />
                        </div>
                        <button onClick={handleAssign}
                            className="w-full py-3.5 rounded-xl text-sm font-bold text-black transition-all hover:scale-[1.02]"
                            style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)", boxShadow: "0 0 16px rgba(99,102,241,0.3)" }}>
                            Assign to {selectedStudent.name}
                        </button>
                    </div>
                </div>
            )}

            {/* ── Add Student Modal ──────────────────────────────────────────── */}
            {addModalOpen && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-4"
                    style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(10px)" }}
                    onClick={(e) => { if (e.target === e.currentTarget) { setAddModalOpen(false); resetAddForm(); } }}>
                    <div className="glass-card rounded-3xl p-6 w-full max-w-lg"
                        style={{ border: "1px solid rgba(16,185,129,0.25)", boxShadow: "0 0 50px rgba(16,185,129,0.08)" }}>
                        {/* Modal Header */}
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h3 className="text-lg font-bold text-white">Add New Student</h3>
                                <p className="text-xs text-white/40 mt-0.5">Fill in the details to onboard a new student</p>
                            </div>
                            <button onClick={() => { setAddModalOpen(false); resetAddForm(); }}
                                className="text-white/30 hover:text-white/60 transition-colors p-1 rounded-lg hover:bg-white/5">
                                <X size={18} />
                            </button>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-4">
                            {/* Full Name */}
                            <div className="col-span-2">
                                <label className="text-[10px] font-black text-white/30 uppercase tracking-[2px] mb-1.5 block">Full Name <span className="text-red-400">*</span></label>
                                <input type="text" value={newName} onChange={(e) => setNewName(e.target.value)}
                                    placeholder="e.g. Priya Singh"
                                    className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder:text-white/20 outline-none transition-all focus:border-emerald-500/50"
                                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)" }} />
                            </div>
                            {/* Email */}
                            <div className="col-span-2">
                                <label className="text-[10px] font-black text-white/30 uppercase tracking-[2px] mb-1.5 block">Email Address <span className="text-red-400">*</span></label>
                                <input type="email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)}
                                    placeholder="e.g. priya@gmail.com"
                                    className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder:text-white/20 outline-none transition-all focus:border-emerald-500/50"
                                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)" }} />
                            </div>
                            {/* College */}
                            <div>
                                <label className="text-[10px] font-black text-white/30 uppercase tracking-[2px] mb-1.5 block">College / University</label>
                                <input type="text" value={newCollege} onChange={(e) => setNewCollege(e.target.value)}
                                    placeholder="e.g. IIT Delhi"
                                    className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder:text-white/20 outline-none transition-all focus:border-emerald-500/50"
                                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)" }} />
                            </div>
                            {/* Batch */}
                            <div>
                                <label className="text-[10px] font-black text-white/30 uppercase tracking-[2px] mb-1.5 block">Batch / Cohort</label>
                                <input type="text" value={newBatch} onChange={(e) => setNewBatch(e.target.value)}
                                    placeholder="e.g. Batch 2024-C"
                                    className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder:text-white/20 outline-none transition-all focus:border-emerald-500/50"
                                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)" }} />
                            </div>
                            {/* Domain */}
                            <div>
                                <label className="text-[10px] font-black text-white/30 uppercase tracking-[2px] mb-1.5 block">Interview Domain</label>
                                <select value={newDomain} onChange={(e) => setNewDomain(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl text-sm text-white outline-none appearance-none"
                                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)" }}>
                                    {["Software Engineering", "Data Science", "Product Management", "Frontend / UI", "Backend / APIs", "System Design", "Machine Learning"].map((d) => (
                                        <option key={d} value={d} style={{ background: "#0a0c1e" }}>{d}</option>
                                    ))}
                                </select>
                            </div>
                            {/* Experience */}
                            <div>
                                <label className="text-[10px] font-black text-white/30 uppercase tracking-[2px] mb-1.5 block">Experience Level</label>
                                <select value={newExp} onChange={(e) => setNewExp(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl text-sm text-white outline-none appearance-none"
                                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)" }}>
                                    {["Student / Fresher", "0–2 Years", "2–5 Years", "5+ Years"].map((e) => (
                                        <option key={e} value={e} style={{ background: "#0a0c1e" }}>{e}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="flex gap-3 pt-2">
                            <button onClick={() => { setAddModalOpen(false); resetAddForm(); }}
                                className="flex-1 py-3 rounded-xl text-sm font-medium text-white/50 glass-card glass-card-hover transition-all border border-white/5">
                                Cancel
                            </button>
                            <button onClick={handleAddStudent}
                                disabled={!newName.trim() || !newEmail.trim()}
                                className="flex-1 py-3 rounded-xl text-sm font-bold text-black transition-all hover:scale-[1.02] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
                                style={{ background: "linear-gradient(135deg, #10b981, #059669)", boxShadow: "0 0 16px rgba(16,185,129,0.3)" }}>
                                <UserPlus size={15} className="inline mr-2" />Add Student
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ── Assign Success Toast ────────────────────────────────────────── */}
            {assignSuccess && (
                <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[300] flex items-center gap-3 px-5 py-3 rounded-2xl text-sm font-semibold text-white shadow-2xl"
                    style={{ background: "linear-gradient(135deg, rgba(16,185,129,0.9), rgba(5,150,105,0.9))", backdropFilter: "blur(12px)", border: "1px solid rgba(16,185,129,0.3)" }}>
                    <Star size={16} className="text-white" /> Practice assigned successfully!
                </div>
            )}

            {/* ── Add Student Success Toast ───────────────────────────────────── */}
            {addSuccess && (
                <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[300] flex items-center gap-3 px-5 py-3 rounded-2xl text-sm font-semibold text-white shadow-2xl"
                    style={{ background: "linear-gradient(135deg, rgba(16,185,129,0.9), rgba(5,150,105,0.9))", backdropFilter: "blur(12px)", border: "1px solid rgba(16,185,129,0.3)" }}>
                    <UserPlus size={16} className="text-white" /> Student added successfully!
                </div>
            )}
        </>
    );
}


// useSearchParams() REQUIRES a Suspense boundary in Next.js App Router.
// Without this wrapper the entire page silently breaks.
export default function AdminStudentsPage() {
    return (
        <Suspense fallback={
            <div className="p-8 text-center text-white/30 text-sm">Loading student directory...</div>
        }>
            <StudentsInner />
        </Suspense>
    );
}
