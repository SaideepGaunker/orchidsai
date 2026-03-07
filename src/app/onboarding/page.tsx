"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
    BrainCircuit,
    Target,
    Briefcase,
    TrendingUp,
    ChevronRight,
    ArrowRight,
    Sparkles,
} from "lucide-react";

export default function OnboardingPage() {
    const [step, setStep] = useState(1);
    const [role, setRole] = useState("");
    const [goal, setGoal] = useState("");
    const [experience, setExperience] = useState("");
    const router = useRouter();

    const handleFinish = () => {
        // Save preferences logic here
        router.push("/dashboard");
    };

    const steps = [
        { title: "Your Target Role", sub: "What are you preparing for?" },
        { title: "Your Goal", sub: "What's your primary objective?" },
        { title: "Experience Level", sub: "Where are you in your career?" },
    ];

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-grid relative overflow-hidden">
            {/* Background Orbs */}
            <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-[100px] opacity-10 bg-amber-500" />
            <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full blur-[100px] opacity-10 bg-orange-500" />

            <div className="w-full max-w-lg relative">
                <div className="glass-card rounded-[32px] p-10 border border-white/10 shadow-2xl">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg shadow-amber-500/20">
                                <BrainCircuit size={20} className="text-black" />
                            </div>
                            <div>
                                <h2 className="text-sm font-bold text-white leading-none">AI Coach</h2>
                                <p className="text-[10px] text-white/30 uppercase tracking-[2px] mt-1">Setup</p>
                            </div>
                        </div>
                        <div className="flex gap-1.5">
                            {[1, 2, 3].map((s) => (
                                <div key={s} className={`h-1 rounded-full transition-all duration-300 ${s <= step ? 'w-6 bg-amber-400' : 'w-2 bg-white/10'}`} />
                            ))}
                        </div>
                    </div>

                    <h1 className="text-2xl font-bold text-white mb-2 tracking-tight">
                        {steps[step - 1].title}
                    </h1>
                    <p className="text-sm text-white/40 mb-8 leading-relaxed">
                        {steps[step - 1].sub}
                    </p>

                    <div className="space-y-3 mb-10 min-h-[220px]">
                        {step === 1 && (
                            <div className="grid grid-cols-2 gap-3">
                                {[
                                    { l: "Frontend Dev", i: Briefcase },
                                    { l: "Backend Dev", i: Briefcase },
                                    { l: "Fullstack", i: Briefcase },
                                    { l: "Data Scientist", i: Briefcase },
                                    { l: "Product Manager", i: Briefcase },
                                    { l: "Other", i: Sparkles },
                                ].map((item) => (
                                    <button
                                        key={item.l}
                                        onClick={() => setRole(item.l)}
                                        className={`flex items-center gap-3 p-4 rounded-2xl text-sm font-semibold transition-all border ${role === item.l ? 'bg-amber-400/10 border-amber-400/40 text-amber-400' : 'bg-white/5 border-white/5 text-white/40 hover:text-white/70 hover:bg-white/[0.08]'}`}
                                    >
                                        <item.i size={16} />
                                        {item.l}
                                    </button>
                                ))}
                            </div>
                        )}

                        {step === 2 && (
                            <div className="space-y-3">
                                {[
                                    { l: "Job Interview Prep", s: "Focus on technical and behavioral rounds", i: Target },
                                    { l: "Skill Assessment", s: "General check-up of my technical range", i: TrendingUp },
                                    { l: "Confidence Building", s: "Improve communication and presentation", i: Sparkles },
                                ].map((item) => (
                                    <button
                                        key={item.l}
                                        onClick={() => setGoal(item.l)}
                                        className={`w-full flex items-center gap-4 p-4 rounded-2xl text-left transition-all border ${goal === item.l ? 'bg-amber-400/10 border-amber-400/40' : 'bg-white/5 border-white/5 hover:bg-white/[0.08]'}`}
                                    >
                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${goal === item.l ? 'bg-amber-400 text-black' : 'bg-white/5 text-white/40'}`}>
                                            <item.i size={18} />
                                        </div>
                                        <div>
                                            <p className={`text-sm font-bold ${goal === item.l ? 'text-white' : 'text-white/60'}`}>{item.l}</p>
                                            <p className="text-[10px] text-white/30">{item.s}</p>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        )}

                        {step === 3 && (
                            <div className="space-y-3">
                                {[
                                    { l: "Student / Fresher", s: "Entering the industry for the first time" },
                                    { l: "Junior (1-2 yrs)", s: "Looking to switch roles or level up" },
                                    { l: "Mid-Level (3-5 yrs)", s: "Focusing on architecture and leadership" },
                                    { l: "Senior (5+ yrs)", s: "Advanced system design and management" },
                                ].map((item) => (
                                    <button
                                        key={item.l}
                                        onClick={() => setExperience(item.l)}
                                        className={`w-full group flex items-center justify-between gap-4 p-5 rounded-2xl text-left transition-all border ${experience === item.l ? 'bg-amber-400/10 border-amber-400/40' : 'bg-white/5 border-white/5 hover:bg-white/[0.08]'}`}
                                    >
                                        <div>
                                            <p className={`text-sm font-bold ${experience === item.l ? 'text-white' : 'text-white/60'}`}>{item.l}</p>
                                            <p className="text-[10px] text-white/30">{item.s}</p>
                                        </div>
                                        <div className={`w-6 h-6 rounded-full border flex items-center justify-center transition-all ${experience === item.l ? 'bg-amber-400 border-amber-400 text-black' : 'border-white/10 text-transparent group-hover:border-white/20'}`}>
                                            <ChevronRight size={14} />
                                        </div>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="flex gap-4">
                        {step > 1 && (
                            <button
                                onClick={() => setStep(step - 1)}
                                className="flex-1 py-4 rounded-2xl text-sm font-black uppercase tracking-widest text-white/30 hover:text-white transition-all glass-card glass-card-hover border border-white/5"
                            >
                                Back
                            </button>
                        )}
                        <button
                            disabled={(step === 1 && !role) || (step === 2 && !goal) || (step === 3 && !experience)}
                            onClick={() => (step < 3 ? setStep(step + 1) : handleFinish())}
                            className="flex-[2] py-4 rounded-2xl text-sm font-black uppercase tracking-widest text-black transition-all hover:scale-[1.02] disabled:opacity-50 disabled:grayscale disabled:hover:scale-100"
                            style={{
                                background: "linear-gradient(135deg, #fb923c, #f59e0b)",
                                boxShadow: "0 8px 24px rgba(251,146,60,0.25)",
                            }}
                        >
                            {step === 3 ? "Complete Setup" : "Continue"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
