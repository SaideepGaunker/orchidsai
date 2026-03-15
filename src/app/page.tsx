import Link from "next/link";
import {
  BrainCircuit,
  Mic2,
  BarChart3,
  BookOpen,
  ShieldCheck,
  Zap,
  Users,
  TrendingUp,
  ArrowRight,
  Play,
  CheckCircle2,
} from "lucide-react";

const features = [
  {
    icon: Mic2,
    title: "AI Interview Simulation",
    desc: "Realistic mock interviews with voice, video & content analysis powered by Amazon Rekognition & Transcribe.",
    color: "amber",
  },
  {
    icon: BarChart3,
    title: "Confidence Index",
    desc: "A composite CI score combining content (35%), voice (25%), visual (25%) and consistency (15%) metrics.",
    color: "teal",
  },
  {
    icon: BookOpen,
    title: "Exam Practice",
    desc: "Adaptive MCQ and subjective exam sessions with timed auto-evaluation and difficulty adjustment.",
    color: "amber",
  },
  {
    icon: TrendingUp,
    title: "Performance Analytics",
    desc: "Session-by-session tracking, skill gap analysis, and downloadable PDF reports with improvement plans.",
    color: "teal",
  },
  {
    icon: Users,
    title: "B2B Institutional Dashboard",
    desc: "Batch analytics, student monitoring, cohort progress tracking and exportable reports for colleges & HR.",
    color: "amber",
  },
  {
    icon: ShieldCheck,
    title: "Privacy & Security",
    desc: "End-to-end encryption, explicit camera/mic consent, JWT auth and secure AWS S3 storage.",
    color: "teal",
  },
];

const stats = [
  { value: "45–50%", label: "of graduates lack job readiness" },
  { value: ">75%", label: "Target interview completion rate" },
  { value: "<30s", label: "Report generation time" },
  { value: "20%", label: "CI improvement after 4 sessions" },
];

const steps = [
  { num: "01", title: "Register & Choose Role", desc: "Create your account, pick a domain — HR, Technical, or Case interview." },
  { num: "02", title: "Start Your Interview", desc: "The AI generates adaptive questions. Respond via voice and video in real time." },
  { num: "03", title: "Get Multimodal Analysis", desc: "Speech, emotion, posture and content are evaluated simultaneously by AWS AI services." },
  { num: "04", title: "Review Your Report", desc: "Receive your Confidence Index, skill gap breakdown, and a personalized improvement plan." },
];

const plans = [
  {
    name: "Free",
    price: "₹0",
    period: "forever",
    features: ["3 mock interviews/month", "Basic session summary", "MCQ practice access", "Dashboard overview"],
    cta: "Get Started Free",
    link: "/student-register",
    highlight: false,
  },
  {
    name: "Pro",
    price: "₹499",
    period: "per month",
    features: [
      "Unlimited mock interviews",
      "Full multimodal AI analysis",
      "Confidence Index tracking",
      "Downloadable PDF reports",
      "Personalized recommendations",
      "Priority support",
    ],
    cta: "Start Pro Trial",
    link: "/student-register",
    highlight: true,
  },
  {
    name: "Institution",
    price: "Custom",
    period: "per batch",
    features: [
      "Everything in Pro",
      "B2B mentor dashboard",
      "Batch & cohort analytics",
      "Skill cluster heatmaps",
      "CSV export",
      "Dedicated account manager",
    ],
    cta: "Contact Sales",
    link: "/admin-register",
    highlight: false,
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-grid">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4"
        style={{ background: "rgba(10,12,24,0.8)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: "linear-gradient(135deg,#fb923c,#f59e0b)", boxShadow: "0 0 16px rgba(251,146,60,0.4)" }}>
            <BrainCircuit size={16} className="text-black" />
          </div>
          <span className="font-bold text-white text-sm">AI Interview Coach</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm text-white/50">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-white transition-colors">How it Works</a>
          <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
          <Link href="/b2b-student-login" className="hover:text-white transition-colors flex items-center gap-1.5">
            <ShieldCheck size={14} className="text-teal-400" />
            B2B Student
          </Link>
          <Link href="/mentor-login" className="hover:text-white transition-colors flex items-center gap-1.5">
            <ShieldCheck size={14} className="text-emerald-400" />
            Mentor
          </Link>
          <Link href="/admin-login" className="hover:text-white transition-colors flex items-center gap-1.5">
            <ShieldCheck size={14} className="text-amber-400" />
            Admin
          </Link>
          <Link href="/platform-admin-login" className="hover:text-white transition-colors flex items-center gap-1.5">
            <ShieldCheck size={14} className="text-purple-400" />
            Platform
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/student-login" className="text-sm text-white/60 hover:text-white transition-colors px-4 py-2">
            Sign In
          </Link>
          <Link href="/student-register"
            className="text-sm font-semibold text-black px-4 py-2 rounded-lg transition-all hover:scale-105"
            style={{ background: "linear-gradient(135deg,#fb923c,#f59e0b)", boxShadow: "0 0 16px rgba(251,146,60,0.3)" }}>
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-32 pb-24 px-6 text-center overflow-hidden">
        {/* Glow blobs */}
        <div className="absolute top-20 left-1/4 w-96 h-96 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(251,146,60,0.08) 0%, transparent 70%)" }} />
        <div className="absolute top-40 right-1/4 w-80 h-80 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(20,184,166,0.06) 0%, transparent 70%)" }} />

        <div className="relative max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6 text-xs font-medium text-amber-400"
            style={{ background: "rgba(251,146,60,0.1)", border: "1px solid rgba(251,146,60,0.2)" }}>
            <Zap size={12} />
            AI-Powered Interview & Exam Preparation
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6">
            Ace Every Interview
            <br />
            <span className="text-gradient-amber">with AI Precision</span>
          </h1>

          <p className="text-lg text-white/50 max-w-2xl mx-auto mb-10 leading-relaxed">
            Multimodal AI evaluates your voice, body language, and content simultaneously—
            giving you a Confidence Index and personalized roadmap to land your dream job.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/student-register"
              className="group flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-black transition-all hover:scale-105"
              style={{ background: "linear-gradient(135deg,#fb923c,#f59e0b)", boxShadow: "0 0 30px rgba(251,146,60,0.3)" }}>
              Start Free Today
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/student-login"
              className="flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-white/80 hover:text-white transition-all glass-card glass-card-hover">
              <Play size={14} className="text-amber-400" />
              Student Login
            </Link>
            <div className="w-px h-10 bg-white/10 hidden sm:block mx-2" />
            <Link href="/mentor-login"
              className="group flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-black transition-all hover:scale-105"
              style={{ background: "linear-gradient(135deg,#10b981,#059669)", boxShadow: "0 0 30px rgba(16,185,129,0.3)" }}>
              <ShieldCheck size={16} />
              Mentor Portal
            </Link>
            <Link href="/admin-login"
              className="group flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-black transition-all hover:scale-105"
              style={{ background: "linear-gradient(135deg,#fb923c,#f59e0b)", boxShadow: "0 0 30px rgba(251,146,60,0.3)" }}>
              <ShieldCheck size={16} />
              Admin Portal
            </Link>
            <Link href="/platform-admin-login"
              className="group flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-black transition-all hover:scale-105"
              style={{ background: "linear-gradient(135deg,#8b5cf6,#7c3aed)", boxShadow: "0 0 30px rgba(139,92,246,0.3)" }}>
              <ShieldCheck size={16} />
              Platform Admin
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-20 max-w-3xl mx-auto">
            {stats.map((s) => (
              <div key={s.label} className="glass-card rounded-xl p-4 text-center">
                <p className="text-2xl font-bold text-gradient-amber">{s.value}</p>
                <p className="text-xs text-white/40 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold text-amber-400 uppercase tracking-widest mb-3">Core Capabilities</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Everything you need to get hired</h2>
            <p className="text-white/40 max-w-xl mx-auto">From adaptive mock interviews to institutional analytics—one unified platform.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f) => (
              <div key={f.title} className="glass-card glass-card-hover rounded-2xl p-6">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4`}
                  style={{
                    background: f.color === "amber" ? "rgba(251,146,60,0.12)" : "rgba(20,184,166,0.12)",
                    border: f.color === "amber" ? "1px solid rgba(251,146,60,0.2)" : "1px solid rgba(20,184,166,0.2)",
                  }}>
                  <f.icon size={18} className={f.color === "amber" ? "text-amber-400" : "text-teal-400"} />
                </div>
                <h3 className="text-white font-semibold mb-2">{f.title}</h3>
                <p className="text-sm text-white/40 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold text-teal-400 uppercase tracking-widest mb-3">Process</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">From practice to placement</h2>
          </div>
          <div className="space-y-5">
            {steps.map((step, i) => (
              <div key={step.num} className="glass-card rounded-2xl p-6 flex items-start gap-5">
                <div className="text-3xl font-black text-gradient-amber flex-shrink-0">{step.num}</div>
                <div>
                  <h3 className="text-white font-semibold mb-1">{step.title}</h3>
                  <p className="text-sm text-white/40">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mentor Portal CTA */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="glass-card rounded-3xl p-10 md:p-12 relative overflow-hidden"
            style={{ 
              background: "linear-gradient(135deg, rgba(16,185,129,0.08), rgba(5,150,105,0.05))",
              border: "1px solid rgba(16,185,129,0.2)",
              boxShadow: "0 0 40px rgba(16,185,129,0.1)"
            }}>
            {/* Glow effect */}
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none"
              style={{ background: "radial-gradient(circle, rgba(16,185,129,0.15) 0%, transparent 70%)" }} />
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg,#10b981,#059669)", boxShadow: "0 0 20px rgba(16,185,129,0.4)" }}>
                  <ShieldCheck size={24} className="text-white" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-emerald-400 uppercase tracking-widest">For Institutions & Mentors</p>
                  <h2 className="text-2xl md:text-3xl font-bold text-white">Mentor Portal</h2>
                </div>
              </div>

              <p className="text-white/60 mb-8 max-w-2xl leading-relaxed">
                Comprehensive dashboard for educational institutions and mentors to track student progress, 
                manage batches, analyze performance metrics, and generate detailed reports. Monitor your 
                students' interview preparation journey with real-time analytics and insights.
              </p>

              <div className="grid md:grid-cols-3 gap-4 mb-8">
                <div className="glass-card rounded-xl p-4">
                  <Users size={20} className="text-emerald-400 mb-2" />
                  <p className="text-sm font-semibold text-white mb-1">Batch Management</p>
                  <p className="text-xs text-white/40">Track multiple student cohorts</p>
                </div>
                <div className="glass-card rounded-xl p-4">
                  <BarChart3 size={20} className="text-emerald-400 mb-2" />
                  <p className="text-sm font-semibold text-white mb-1">Analytics Dashboard</p>
                  <p className="text-xs text-white/40">Real-time performance metrics</p>
                </div>
                <div className="glass-card rounded-xl p-4">
                  <TrendingUp size={20} className="text-emerald-400 mb-2" />
                  <p className="text-sm font-semibold text-white mb-1">Progress Reports</p>
                  <p className="text-xs text-white/40">Exportable CSV & PDF reports</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/mentor-login"
                  className="group flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-white transition-all hover:scale-105"
                  style={{ background: "linear-gradient(135deg,#10b981,#059669)", boxShadow: "0 0 30px rgba(16,185,129,0.3)" }}>
                  Access Mentor Portal
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link href="/mentor-register"
                  className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-white/80 hover:text-white transition-all glass-card glass-card-hover">
                  Register as Mentor
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* B2B Student Portal CTA */}
      <section className="py-10 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="glass-card rounded-3xl p-8 md:p-10 relative overflow-hidden"
            style={{ 
              background: "linear-gradient(135deg, rgba(20,184,166,0.08), rgba(13,148,136,0.05))",
              border: "1px solid rgba(20,184,166,0.2)",
              boxShadow: "0 0 40px rgba(20,184,166,0.08)"
            }}>
            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <p className="text-xs font-semibold text-teal-400 uppercase tracking-widest mb-2">For Enrolled Students</p>
                <h2 className="text-xl md:text-2xl font-bold text-white mb-2">B2B Student Portal</h2>
                <p className="text-white/50 text-sm max-w-lg">
                  Enrolled via your institution or mentor? Access your assigned tasks, track your CI score, view mentor recommendations, and message your mentor directly.
                </p>
              </div>
              <Link href="/b2b-student-login"
                className="flex-shrink-0 group flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white transition-all hover:scale-105"
                style={{ background: "linear-gradient(135deg,#14b8a6,#0d9488)", boxShadow: "0 0 20px rgba(20,184,166,0.3)" }}>
                <Users size={16} />
                Student Login
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Admin CTA */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="glass-card rounded-3xl p-10 md:p-12 relative overflow-hidden"
            style={{ 
              background: "linear-gradient(135deg, rgba(251,146,60,0.08), rgba(245,158,11,0.05))",
              border: "1px solid rgba(251,146,60,0.2)",
              boxShadow: "0 0 40px rgba(251,146,60,0.1)"
            }}>
            {/* Glow effect */}
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none"
              style={{ background: "radial-gradient(circle, rgba(251,146,60,0.15) 0%, transparent 70%)" }} />
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg,#fb923c,#f59e0b)", boxShadow: "0 0 20px rgba(251,146,60,0.4)" }}>
                  <ShieldCheck size={24} className="text-white" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-amber-400 uppercase tracking-widest">For Platform Administrators</p>
                  <h2 className="text-2xl md:text-3xl font-bold text-white">Admin Portal</h2>
                </div>
              </div>

              <p className="text-white/60 mb-8 max-w-2xl leading-relaxed">
                Comprehensive system administration dashboard for managing the entire AI Interview Coach platform. 
                Monitor system health, manage licenses, handle subscriptions, validate AI-generated questions, 
                and oversee all platform operations with advanced analytics and reporting tools.
              </p>

              <div className="grid md:grid-cols-4 gap-4 mb-8">
                <div className="glass-card rounded-xl p-4">
                  <BarChart3 size={20} className="text-amber-400 mb-2" />
                  <p className="text-sm font-semibold text-white mb-1">Platform Monitor</p>
                  <p className="text-xs text-white/40">System health & metrics</p>
                </div>
                <div className="glass-card rounded-xl p-4">
                  <Users size={20} className="text-amber-400 mb-2" />
                  <p className="text-sm font-semibold text-white mb-1">License Management</p>
                  <p className="text-xs text-white/40">B2B account control</p>
                </div>
                <div className="glass-card rounded-xl p-4">
                  <TrendingUp size={20} className="text-amber-400 mb-2" />
                  <p className="text-sm font-semibold text-white mb-1">Subscriptions</p>
                  <p className="text-xs text-white/40">B2C payment tracking</p>
                </div>
                <div className="glass-card rounded-xl p-4">
                  <CheckCircle2 size={20} className="text-amber-400 mb-2" />
                  <p className="text-sm font-semibold text-white mb-1">Question Validation</p>
                  <p className="text-xs text-white/40">AI content review</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/admin-login"
                  className="group flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-white transition-all hover:scale-105"
                  style={{ background: "linear-gradient(135deg,#fb923c,#f59e0b)", boxShadow: "0 0 30px rgba(251,146,60,0.3)" }}>
                  Access Admin Portal
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link href="/admin-register"
                  className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-white/80 hover:text-white transition-all glass-card glass-card-hover">
                  Register as Admin
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold text-amber-400 uppercase tracking-widest mb-3">Pricing</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Simple, transparent pricing</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <div key={plan.name}
                className="rounded-2xl p-6 flex flex-col"
                style={plan.highlight ? {
                  background: "linear-gradient(135deg, rgba(251,146,60,0.1), rgba(245,158,11,0.05))",
                  border: "1px solid rgba(251,146,60,0.25)",
                  boxShadow: "0 0 40px rgba(251,146,60,0.1)",
                } : {
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}>
                {plan.highlight && (
                  <div className="inline-flex self-start mb-4 px-2.5 py-1 rounded-full text-xs font-semibold text-black"
                    style={{ background: "linear-gradient(135deg,#fb923c,#f59e0b)" }}>
                    Most Popular
                  </div>
                )}
                <p className="text-white/60 text-sm mb-1">{plan.name}</p>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-3xl font-black text-white">{plan.price}</span>
                  {plan.price !== "Custom" && <span className="text-white/30 text-xs">/{plan.period}</span>}
                </div>
                <p className="text-white/30 text-xs mb-6">{plan.price === "Custom" ? plan.period : ""}</p>
                <ul className="space-y-2.5 flex-1 mb-6">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-white/60">
                      <CheckCircle2 size={14} className="text-amber-400 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href={plan.link || "/register"}
                  className="w-full text-center py-2.5 rounded-xl text-sm font-semibold transition-all hover:scale-105"
                  style={plan.highlight ? {
                    background: "linear-gradient(135deg,#fb923c,#f59e0b)",
                    color: "#000",
                    boxShadow: "0 0 20px rgba(251,146,60,0.3)",
                  } : {
                    background: "rgba(255,255,255,0.06)",
                    color: "rgba(255,255,255,0.7)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}>
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center glass-card rounded-3xl p-12"
          style={{ border: "1px solid rgba(251,146,60,0.15)" }}>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to boost your <span className="text-gradient-amber">confidence</span>?
          </h2>
          <p className="text-white/40 mb-8">Join thousands of students and professionals preparing smarter with AI.</p>
          <Link href="/student-register"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-black transition-all hover:scale-105"
            style={{ background: "linear-gradient(135deg,#fb923c,#f59e0b)", boxShadow: "0 0 30px rgba(251,146,60,0.3)" }}>
            Get Started Free <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-white/5 text-center text-xs text-white/20">
        © 2026 AI Interview Coach. All rights reserved. | Built with AWS Bedrock, Rekognition & Transcribe.
      </footer>
    </div>
  );
}
