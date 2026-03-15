"use client";

import Link from "next/link";
import {
    Mic2,
    Eye,
    FileText,
    ArrowRight,
    BookOpen,
    Video,
    TrendingUp,
    Lightbulb,
    ChevronRight,
} from "lucide-react";

const recommendations = [
    {
        id: 1,
        title: "Reduce Filler Words",
        desc: "You used 'um' and 'uh' 14 times in your last session. Practice structured pauses instead of fillers.",
        tag: "Voice",
        priority: "High",
        icon: Mic2,
        color: { bg: "rgba(20,184,166,0.10)", border: "rgba(20,184,166,0.2)", text: "text-teal-400", badge: "rgba(20,184,166,0.15)" },
        resources: [
            { label: "Practice Interview", href: "/interview", icon: Video },
            { label: "Voice Module", href: "/exam", icon: BookOpen },
        ],
    },
    {
        id: 2,
        title: "Improve Eye Contact",
        desc: "Eye contact was at 58% — below the 70% target. Look directly at the camera center when answering.",
        tag: "Visual",
        priority: "High",
        icon: Eye,
        color: { bg: "rgba(139,92,246,0.10)", border: "rgba(139,92,246,0.2)", text: "text-purple-400", badge: "rgba(139,92,246,0.15)" },
        resources: [
            { label: "Start Session", href: "/interview/session", icon: Video },
        ],
    },
    {
        id: 3,
        title: "Use STAR Structure",
        desc: "Your content score improves 18% when you follow the Situation–Task–Action–Result format.",
        tag: "Content",
        priority: "Medium",
        icon: FileText,
        color: { bg: "rgba(251,146,60,0.10)", border: "rgba(251,146,60,0.2)", text: "text-amber-400", badge: "rgba(251,146,60,0.15)" },
        resources: [
            { label: "Behavioral Practice", href: "/interview", icon: Video },
            { label: "STAR Drills", href: "/exam", icon: BookOpen },
        ],
    },
    {
        id: 4,
        title: "Increase Speaking Pace Consistency",
        desc: "Your WPM varied between 95–140 across questions. Aim to stay in the 110–130 WPM sweet spot.",
        tag: "Voice",
        priority: "Medium",
        icon: TrendingUp,
        color: { bg: "rgba(20,184,166,0.10)", border: "rgba(20,184,166,0.2)", text: "text-teal-400", badge: "rgba(20,184,166,0.15)" },
        resources: [
            { label: "Practice Interview", href: "/interview", icon: Video },
        ],
    },
    {
        id: 5,
        title: "Strengthen Technical Accuracy",
        desc: "Technical questions scored 70%. Focus on depth — include time/space complexity and edge cases in answers.",
        tag: "Content",
        priority: "Low",
        icon: Lightbulb,
        color: { bg: "rgba(251,146,60,0.10)", border: "rgba(251,146,60,0.2)", text: "text-amber-400", badge: "rgba(251,146,60,0.15)" },
        resources: [
            { label: "Technical Exam", href: "/exam", icon: BookOpen },
            { label: "Tech Interview", href: "/interview", icon: Video },
        ],
    },
];

const priorityStyles: Record<string, { bg: string; text: string }> = {
    High: { bg: "rgba(239,68,68,0.12)", text: "text-red-400" },
    Medium: { bg: "rgba(251,146,60,0.12)", text: "text-amber-400" },
    Low: { bg: "rgba(20,184,166,0.12)", text: "text-teal-400" },
};

export default function RecommendationsPage() {
    const high = recommendations.filter((r) => r.priority === "High");
    const medium = recommendations.filter((r) => r.priority === "Medium");
    const low = recommendations.filter((r) => r.priority === "Low");

    const Card = ({ rec }: { rec: typeof recommendations[0] }) => {
        const Icon = rec.icon;
        const pStyle = priorityStyles[rec.priority];
        return (
            <div
                className="glass-card rounded-2xl p-5 flex flex-col gap-3 transition-all"
                style={{ border: `1px solid ${rec.color.border}` }}
            >
                <div className="flex items-start justify-between">
                    <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: rec.color.bg }}
                    >
                        <Icon size={18} className={rec.color.text} />
                    </div>
                    <div className="flex items-center gap-2">
                        <span
                            className={`inline-flex px-2 py-0.5 rounded-md text-xs font-semibold ${rec.color.text}`}
                            style={{ background: rec.color.badge }}
                        >
                            {rec.tag}
                        </span>
                        <span
                            className={`inline-flex px-2 py-0.5 rounded-md text-xs font-semibold ${pStyle.text}`}
                            style={{ background: pStyle.bg }}
                        >
                            {rec.priority}
                        </span>
                    </div>
                </div>

                <div>
                    <p className="text-sm font-semibold text-white mb-1">{rec.title}</p>
                    <p className="text-xs text-white/45 leading-relaxed">{rec.desc}</p>
                </div>

                <div className="flex flex-wrap gap-2 mt-auto pt-1">
                    {rec.resources.map((res) => {
                        const ResIcon = res.icon;
                        return (
                            <Link
                                key={res.label}
                                href={res.href}
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all hover:scale-105"
                                style={{
                                    background: "linear-gradient(135deg,#fb923c,#f59e0b)",
                                    color: "#000",
                                }}
                            >
                                <ResIcon size={12} />
                                {res.label}
                            </Link>
                        );
                    })}
                    <Link
                        href="/reports"
                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs text-white/40 hover:text-white/60 glass-card glass-card-hover transition-all"
                    >
                        View Report <ChevronRight size={11} />
                    </Link>
                </div>
            </div>
        );
    };

    return (
        <div className="p-6 lg:p-8 min-h-screen">
            {/* Header */}
            <div className="flex items-start justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-white mb-1 flex items-center gap-2">
                        <Lightbulb size={22} className="text-amber-400" /> AI Recommendations
                    </h1>
                    <p className="text-sm text-white/40">
                        Personalised improvement areas based on your last 4 sessions
                    </p>
                </div>
                <Link
                    href="/interview"
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-black transition-all hover:scale-105"
                    style={{
                        background: "linear-gradient(135deg,#fb923c,#f59e0b)",
                        boxShadow: "0 0 16px rgba(251,146,60,0.3)",
                    }}
                >
                    Start Practice <ArrowRight size={14} />
                </Link>
            </div>

            {/* Stats strip */}
            <div className="grid grid-cols-3 gap-4 mb-8">
                {[
                    { label: "High Priority", count: high.length, color: "text-red-400", bg: "rgba(239,68,68,0.08)", border: "rgba(239,68,68,0.15)" },
                    { label: "Medium Priority", count: medium.length, color: "text-amber-400", bg: "rgba(251,146,60,0.08)", border: "rgba(251,146,60,0.15)" },
                    { label: "Low Priority", count: low.length, color: "text-teal-400", bg: "rgba(20,184,166,0.08)", border: "rgba(20,184,166,0.15)" },
                ].map((s) => (
                    <div key={s.label} className="glass-card rounded-2xl p-4 text-center"
                        style={{ background: s.bg, border: `1px solid ${s.border}` }}>
                        <p className={`text-3xl font-black ${s.color}`}>{s.count}</p>
                        <p className="text-xs text-white/40 mt-1">{s.label}</p>
                    </div>
                ))}
            </div>

            {/* High Priority */}
            {high.length > 0 && (
                <div className="mb-8">
                    <h2 className="text-xs font-semibold text-red-400 uppercase tracking-widest mb-3">
                        🔴 High Priority — Address First
                    </h2>
                    <div className="grid md:grid-cols-2 gap-4">
                        {high.map((r) => <Card key={r.id} rec={r} />)}
                    </div>
                </div>
            )}

            {/* Medium Priority */}
            {medium.length > 0 && (
                <div className="mb-8">
                    <h2 className="text-xs font-semibold text-amber-400 uppercase tracking-widest mb-3">
                        🟡 Medium Priority
                    </h2>
                    <div className="grid md:grid-cols-2 gap-4">
                        {medium.map((r) => <Card key={r.id} rec={r} />)}
                    </div>
                </div>
            )}

            {/* Low Priority */}
            {low.length > 0 && (
                <div className="mb-8">
                    <h2 className="text-xs font-semibold text-teal-400 uppercase tracking-widest mb-3">
                        🟢 Low Priority — Nice to Have
                    </h2>
                    <div className="grid md:grid-cols-2 gap-4">
                        {low.map((r) => <Card key={r.id} rec={r} />)}
                    </div>
                </div>
            )}
        </div>
    );
}
