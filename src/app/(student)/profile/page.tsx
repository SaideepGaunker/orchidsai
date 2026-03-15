"use client";

import { useState, type ComponentType } from "react";
import {
  User,
  Mail,
  Phone,
  GraduationCap,
  MapPin,
  Edit3,
  Save,
  Camera,
  Award,
  Target,
  Mic2,
  BookOpen,
  Bell,
  Shield,
  ChevronRight,
} from "lucide-react";

const badges = [
  { label: "First Interview", icon: "🎯", earned: true },
  { label: "5-Day Streak", icon: "🔥", earned: true },
  { label: "Top Scorer", icon: "🏆", earned: false },
  { label: "10 Sessions", icon: "⭐", earned: true },
  { label: "Voice Master", icon: "🎤", earned: false },
  { label: "Quick Learner", icon: "⚡", earned: true },
];

type Preference = { icon: ComponentType<{ size?: number; className?: string }>; label: string; desc: string; on: boolean };

export default function ProfilePage() {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("Arjun Kumar");
  const [email, setEmail] = useState("arjun.kumar@email.com");
  const [phone, setPhone] = useState("+91 98765 43210");
  const [college, setCollege] = useState("IIT Delhi");
  const [city, setCity] = useState("New Delhi, India");
  const [bio, setBio] = useState("Final year CSE student targeting product roles at top-tier tech companies. Preparing for technical and PM interviews.");
  const [targetRole, setTargetRole] = useState("Software Engineer");
  const [interviewDomain, setInterviewDomain] = useState("technical");
  const [experienceLevel, setExperienceLevel] = useState("student");
  const [preferences, setPreferences] = useState<Preference[]>([
    { icon: Bell, label: "Email Notifications", desc: "Session reminders and weekly reports", on: true },
    { icon: Shield, label: "Two-Factor Authentication", desc: "Extra security for your account", on: false },
    { icon: Mic2, label: "Auto-transcription", desc: "Automatically transcribe your spoken answers", on: true },
  ]);

  const togglePreference = (index: number) => {
    setPreferences((prev) =>
      prev.map((p, i) => (i === index ? { ...p, on: !p.on } : p))
    );
  };

  const handleSave = () => {
    setEditing(false);
    // TODO: Persist profile updates to API/database
  };

  return (
    <div className="p-6 lg:p-8 min-h-screen">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-1">Profile</h1>
        <p className="text-sm text-white/40">Manage your personal information and preferences</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left column */}
        <div className="space-y-5">
          {/* Avatar + basic info */}
          <div className="glass-card rounded-2xl p-6 text-center"
            style={{ border: "1px solid rgba(251,146,60,0.12)" }}>
            <div className="relative w-20 h-20 mx-auto mb-4">
              <div className="w-full h-full rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-2xl font-black text-black">
                AK
              </div>
              <button className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center transition-all"
                style={{ background: "linear-gradient(135deg,#fb923c,#f59e0b)" }}>
                <Camera size={12} className="text-black" />
              </button>
            </div>
            <h2 className="text-lg font-bold text-white mb-0.5">{name}</h2>
            <p className="text-xs text-white/40 mb-3">Software Engineering Student</p>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold text-amber-400"
              style={{ background: "rgba(251,146,60,0.1)", border: "1px solid rgba(251,146,60,0.2)" }}>
              Free Plan
            </div>
          </div>

          {/* Stats */}
          <div className="glass-card rounded-2xl p-5">
            <p className="text-xs font-semibold text-white/40 uppercase tracking-wide mb-3">Your Stats</p>
            <div className="space-y-3">
              {[
                { icon: Mic2, label: "Interviews Done", value: "12", color: "amber" },
                { icon: BookOpen, label: "Exams Taken", value: "8", color: "teal" },
                { icon: Target, label: "Best CI Score", value: "74 / 100", color: "amber" },
                { icon: Award, label: "Badges Earned", value: "4 / 6", color: "teal" },
              ].map(({ icon: Icon, label, value, color }) => (
                <div key={label} className="flex items-center justify-between py-1.5 border-b border-white/4">
                  <div className="flex items-center gap-2">
                    <Icon size={13} className={color === "amber" ? "text-amber-400" : "text-teal-400"} />
                    <span className="text-xs text-white/45">{label}</span>
                  </div>
                  <span className="text-xs font-semibold text-white/80">{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Badges */}
          <div className="glass-card rounded-2xl p-5">
            <p className="text-xs font-semibold text-white/40 uppercase tracking-wide mb-3">Achievements</p>
            <div className="grid grid-cols-3 gap-2">
              {badges.map(({ label, icon, earned }) => (
                <div key={label} className="flex flex-col items-center p-3 rounded-xl text-center"
                  style={earned ? {
                    background: "rgba(251,146,60,0.08)",
                    border: "1px solid rgba(251,146,60,0.15)",
                  } : {
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    opacity: 0.4,
                  }}>
                  <span className="text-xl mb-1">{icon}</span>
                  <p className="text-xs text-white/50 leading-tight">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="lg:col-span-2 space-y-5">
          {/* Personal Info */}
          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-sm font-semibold text-white">Personal Information</h3>
              <button onClick={() => (editing ? handleSave() : setEditing(true))}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all glass-card glass-card-hover"
                style={editing ? { color: "#fb923c", border: "1px solid rgba(251,146,60,0.25)" } : { color: "rgba(255,255,255,0.5)" }}>
                {editing ? <Save size={12} /> : <Edit3 size={12} />}
                {editing ? "Save Changes" : "Edit Profile"}
              </button>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { icon: User, label: "Full Name", value: name, setter: setName, type: "text" },
                { icon: Mail, label: "Email Address", value: email, setter: setEmail, type: "email" },
                { icon: Phone, label: "Phone Number", value: phone, setter: setPhone, type: "tel" },
                { icon: GraduationCap, label: "College / University", value: college, setter: setCollege, type: "text" },
                { icon: MapPin, label: "Location", value: city, setter: setCity, type: "text" },
              ].map(({ icon: Icon, label, value, setter, type }) => (
                <div key={label}>
                  <label className="text-xs font-medium text-white/40 mb-1.5 flex items-center gap-1.5">
                    <Icon size={11} /> {label}
                  </label>
                  <input type={type} value={value} onChange={(e) => setter(e.target.value)} disabled={!editing}
                    className="w-full px-3 py-2.5 rounded-xl text-sm text-white outline-none transition-all"
                    style={editing ? {
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(251,146,60,0.3)",
                    } : {
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.06)",
                      color: "rgba(255,255,255,0.7)",
                    }} />
                </div>
              ))}
              <div className="sm:col-span-2">
                <label className="text-xs font-medium text-white/40 mb-1.5 block">Bio</label>
                <textarea value={bio} onChange={(e) => setBio(e.target.value)} disabled={!editing} rows={3}
                  className="w-full px-3 py-2.5 rounded-xl text-sm text-white outline-none transition-all resize-none leading-relaxed"
                  style={editing ? {
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(251,146,60,0.3)",
                  } : {
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    color: "rgba(255,255,255,0.7)",
                  }} />
              </div>
            </div>
          </div>

          {/* Career Goals */}
          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-sm font-semibold text-white">Career Goals</h3>
                <p className="text-xs text-white/30 mt-0.5">Used by AI to tailor questions and difficulty</p>
              </div>
              {editing && (
                <span className="text-xs text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-md font-semibold">Editing</span>
              )}
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="text-xs font-medium text-white/40 mb-1.5 flex items-center gap-1.5">
                  <Target size={11} /> Target Role
                </label>
                <input
                  type="text" value={targetRole} onChange={(e) => setTargetRole(e.target.value)} disabled={!editing}
                  className="w-full px-3 py-2.5 rounded-xl text-sm text-white outline-none transition-all"
                  style={editing ? { background: "rgba(255,255,255,0.06)", border: "1px solid rgba(251,146,60,0.3)" } : { background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.7)" }}
                />
              </div>
              <div>
                <label className="text-xs font-medium text-white/40 mb-1.5 block">Interview Domain</label>
                <select
                  value={interviewDomain} onChange={(e) => setInterviewDomain(e.target.value)} disabled={!editing}
                  className="w-full px-3 py-2.5 rounded-xl text-sm text-white outline-none transition-all appearance-none"
                  style={editing ? { background: "rgba(255,255,255,0.06)", border: "1px solid rgba(251,146,60,0.3)" } : { background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.7)" }}
                >
                  <option value="hr" style={{ background: "#0a0c1e" }}>HR / Behavioral</option>
                  <option value="technical" style={{ background: "#0a0c1e" }}>Technical</option>
                  <option value="case" style={{ background: "#0a0c1e" }}>Case Interview</option>
                  <option value="mixed" style={{ background: "#0a0c1e" }}>Mixed (Full Mock)</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-white/40 mb-1.5 block">Experience Level</label>
                <select
                  value={experienceLevel} onChange={(e) => setExperienceLevel(e.target.value)} disabled={!editing}
                  className="w-full px-3 py-2.5 rounded-xl text-sm text-white outline-none transition-all appearance-none"
                  style={editing ? { background: "rgba(255,255,255,0.06)", border: "1px solid rgba(251,146,60,0.3)" } : { background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.7)" }}
                >
                  <option value="student" style={{ background: "#0a0c1e" }}>Student / Fresher</option>
                  <option value="0-2" style={{ background: "#0a0c1e" }}>0–2 Years</option>
                  <option value="2-5" style={{ background: "#0a0c1e" }}>2–5 Years</option>
                  <option value="5+" style={{ background: "#0a0c1e" }}>5+ Years</option>
                </select>
              </div>
            </div>
          </div>

          {/* Preferences */}
          <div className="glass-card rounded-2xl p-6">
            <h3 className="text-sm font-semibold text-white mb-5">Preferences & Settings</h3>
            <div className="space-y-2">
              {preferences.map(({ icon: Icon, label, desc, on }, index) => (
                <div
                  key={label}
                  role="button"
                  tabIndex={0}
                  onClick={() => togglePreference(index)}
                  onKeyDown={(e) => e.key === "Enter" && togglePreference(index)}
                  className="flex items-center justify-between p-3.5 rounded-xl cursor-pointer"
                  style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)" }}
                >
                  <div className="flex items-center gap-3">
                    <Icon size={15} className="text-white/30" />
                    <div>
                      <p className="text-sm font-medium text-white/80">{label}</p>
                      <p className="text-xs text-white/30">{desc}</p>
                    </div>
                  </div>
                  <div className="w-10 h-5 rounded-full relative transition-all"
                    style={{ background: on ? "linear-gradient(135deg,#fb923c,#f59e0b)" : "rgba(255,255,255,0.1)" }}>
                    <div
                      className="absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all"
                      style={{ left: on ? "calc(100% - 18px)" : "2px", boxShadow: "0 1px 4px rgba(0,0,0,0.3)" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upgrade CTA */}
          <div className="rounded-2xl p-6"
            style={{ background: "linear-gradient(135deg,rgba(251,146,60,0.1),rgba(245,158,11,0.05))", border: "1px solid rgba(251,146,60,0.2)" }}>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-semibold text-white mb-1">Upgrade to Pro</p>
                <p className="text-xs text-white/40 mb-3">Unlock unlimited interviews, full multimodal analysis & PDF reports</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-xl font-black text-white">₹499</span>
                  <span className="text-xs text-white/35">/ month</span>
                </div>
              </div>
              <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-black transition-all hover:scale-105"
                style={{ background: "linear-gradient(135deg,#fb923c,#f59e0b)", boxShadow: "0 0 16px rgba(251,146,60,0.25)" }}>
                Upgrade <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
