import React, { useState, useEffect } from "react";
import { Terminal, Shield, Cpu, Lock, CheckCircle, Radio, Sparkles } from "lucide-react";

const COMMANDS = {
  whoami: {
    cmd: "whoami",
    desc: "Identity & Academic Credentials",
    output: [
      "[USER] Abdur Rahman I",
      "[ROLE] Cybersecurity Undergraduate & Creative Technologist",
      "[DEGREE] B.E. Computer Science & Engineering (Cyber Security) — 3rd Year",
      "[INSTITUTION] Dhanalakshmi College of Engineering, Chennai",
      "[STATUS] Open for Web, Visual & Cybersecurity Opportunities"
    ]
  },
  skills: {
    cmd: "cat skills.sec",
    desc: "Technical Arsenal",
    output: [
      "[LANGUAGES] Python, Java, HTML5, CSS3, JavaScript",
      "[CORE] Computer Fundamentals, Network Architecture, Secure Coding",
      "[DESIGN & MEDIA] Adobe Photoshop, Canva, Figma, Premiere / CapCut",
      "[WORK] Web Developer Intern @ Profolio (Aug – Oct 2026) • Video Editing @ Team O7",
      "[CERTIFICATIONS] 2 Professional Certifications Completed"
    ]
  },
  scan: {
    cmd: "sec_scan --integrity",
    desc: "Defensive Security Audit",
    output: [
      "[INITIATING] Running automated cyber defense audit...",
      "[PORT 443] TLS 1.3 / AES-256-GCM — SECURE",
      "[INPUT VALIDATION] Sanitization filter active against XSS & SQLi",
      "[ZERO TRUST] Principle of least privilege enforced",
      "[RESULT] Vulnerabilities detected: 0 | Integrity: 100% NOMINAL"
    ]
  },
  roles: {
    cmd: "ls -la /leadership",
    desc: "Leadership & Rotaract Roles",
    output: [
      "[TEAM] Designing & Photography Team Member — Rotaract Club of DCE",
      "[HEAD] Head of Photography Committee — Adaiyalam 11",
      "[MEMBER] Photography Team Member — Nakshatra 18"
    ]
  }
};

export default function MiniCyberTheme() {
  const [activeTab, setActiveTab] = useState("whoami");
  const [typedLines, setTypedLines] = useState(COMMANDS.whoami.output);
  const [isTyping, setIsTyping] = useState(false);
  const [radarAngle, setRadarAngle] = useState(0);

  // Radar continuous rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setRadarAngle((prev) => (prev + 3) % 360);
    }, 30);
    return () => clearInterval(interval);
  }, []);

  // Safe typing simulation on tab change
  useEffect(() => {
    const commandData = COMMANDS[activeTab];
    const lines = commandData?.output ? [...commandData.output] : [];

    setTypedLines([]);
    setIsTyping(true);

    let idx = 0;
    const interval = setInterval(() => {
      if (idx < lines.length) {
        const nextLine = lines[idx];
        if (typeof nextLine === "string") {
          setTypedLines((prev) => [...prev, nextLine]);
        }
        idx++;
      } else {
        setIsTyping(false);
        clearInterval(interval);
      }
    }, 80);

    return () => clearInterval(interval);
  }, [activeTab]);

  return (
    <div className="mt-16 rounded-3xl glass-card border border-emerald-500/30 p-5 sm:p-7 relative overflow-hidden shadow-[0_0_40px_rgba(16,185,129,0.08)]">
      {/* Subtle Matrix / Cyber ambient glow */}
      <div className="absolute top-0 right-1/4 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Cyber HUD Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-emerald-950/80">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
            <Shield className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold text-sm text-white tracking-wider">
                AR-CYBERSEC // DEFENSE TERMINAL
              </span>
              <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[9px] font-mono bg-emerald-950 text-emerald-400 border border-emerald-800">
                v2.4 SECURE
              </span>
            </div>
            <span className="text-[10px] font-mono text-emerald-400 tracking-widest uppercase">
              B.E. COMPUTER SCIENCE &amp; ENGINEERING (CYBER SECURITY)
            </span>
          </div>
        </div>

        {/* Live Status Pill */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-950/70 border border-emerald-500/50 text-emerald-300 font-mono text-xs shadow-[0_0_12px_rgba(16,185,129,0.2)]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-semibold tracking-wider">DEFENSE INTEGRITY: 100%</span>
          </div>
        </div>
      </div>

      {/* Main Mini Cyber Layout: Terminal Console (Left) + Radar Telemetry (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mt-5">
        {/* Terminal Console Panel */}
        <div className="lg:col-span-8 rounded-2xl bg-black/80 border border-emerald-900/60 p-4 sm:p-5 font-mono text-xs flex flex-col justify-between shadow-inner">
          {/* Terminal Title Bar */}
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-900">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
              <span className="ml-2 text-[11px] text-slate-500">root@abdur-cybersec:~</span>
            </div>
            <span className="text-[10px] text-emerald-400/80 flex items-center gap-1.5">
              <Lock className="w-3 h-3 text-emerald-400" />
              <span>TLS 1.3 ARMED</span>
            </span>
          </div>

          {/* Command Switcher Buttons */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="text-[10px] text-slate-500 uppercase tracking-widest mr-1">RUN:</span>
            {Object.keys(COMMANDS).map((key) => {
              const item = COMMANDS[key];
              const isActive = activeTab === key;
              return (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-mono transition-all cursor-pointer ${
                    isActive
                      ? "bg-emerald-500/20 text-emerald-300 border border-emerald-400/60 shadow-[0_0_12px_rgba(16,185,129,0.25)]"
                      : "bg-slate-900/80 text-slate-400 border border-slate-800 hover:text-slate-200 hover:border-slate-700"
                  }`}
                >
                  ${item.cmd}
                </button>
              );
            })}
          </div>

          {/* Terminal Body Screen */}
          <div className="min-h-[145px] p-3 rounded-xl bg-slate-950/90 border border-emerald-950/60 text-slate-300 space-y-1.5 select-text overflow-x-auto">
            <div className="text-emerald-400 flex items-center gap-2 font-semibold pb-1">
              <span>root@abdur-cybersec:~$</span>
              <span className="text-cyan-300">{COMMANDS[activeTab]?.cmd}</span>
            </div>

            {typedLines.map((line, i) => {
              if (typeof line !== "string") return null;
              const isHighlight =
                line.includes("Vulnerabilities: 0") ||
                line.includes("100% NOMINAL") ||
                line.includes("SECURE");
              const isPrimary = line.includes("[USER]") || line.includes("[DEGREE]");

              return (
                <div key={i} className="leading-relaxed text-[11.5px] font-mono text-slate-300 flex items-start gap-2">
                  <span className="text-emerald-500 font-bold">›</span>
                  <span
                    className={
                      isHighlight
                        ? "text-emerald-400 font-bold"
                        : isPrimary
                        ? "text-cyan-300 font-semibold"
                        : "text-slate-300"
                    }
                  >
                    {line}
                  </span>
                </div>
              );
            })}

            {/* Blinking Cursor */}
            <div className="inline-flex items-center text-emerald-400 pt-1">
              <span>root@abdur-cybersec:~$</span>
              <span className="w-2 h-3.5 bg-emerald-400 ml-1.5 animate-pulse inline-block" />
            </div>
          </div>

          {/* Quick Execution Status */}
          <div className="pt-3 mt-3 border-t border-slate-900 flex items-center justify-between text-[10px] text-slate-500">
            <span className="flex items-center gap-1.5 text-emerald-400/90">
              <CheckCircle className="w-3 h-3 text-emerald-400" />
              <span>EXIT_CODE: 0 (SUCCESS)</span>
            </span>
            <span>CLICK TABS TO QUERY DEFENSIVE MODULES</span>
          </div>
        </div>

        {/* Mini Radar Telemetry HUD (Right) */}
        <div className="lg:col-span-4 rounded-2xl bg-black/80 border border-emerald-900/60 p-4 sm:p-5 flex flex-col justify-between items-center text-center shadow-inner">
          <div className="w-full flex items-center justify-between pb-2 border-b border-slate-900 text-[10px] font-mono text-slate-400 uppercase tracking-widest">
            <span>SECTOR RADAR</span>
            <span className="text-emerald-400 flex items-center gap-1">
              <Radio className="w-3 h-3 animate-ping" />
              <span>LIVE</span>
            </span>
          </div>

          {/* Animated Mini Radar Display */}
          <div className="relative w-36 h-36 my-3 rounded-full border border-emerald-500/40 bg-emerald-950/20 flex items-center justify-center overflow-hidden shadow-[0_0_20px_rgba(16,185,129,0.15)]">
            {/* Concentric Radar Rings */}
            <div className="absolute w-28 h-28 rounded-full border border-emerald-500/25" />
            <div className="absolute w-18 h-18 rounded-full border border-emerald-500/30" />
            <div className="absolute w-8 h-8 rounded-full border border-emerald-500/40" />

            {/* Radar Crosshairs */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-[1px] bg-emerald-500/20" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-full w-[1px] bg-emerald-500/20" />
            </div>

            {/* Rotating Scanner Needle */}
            <div
              className="absolute inset-0 origin-center pointer-events-none"
              style={{ transform: `rotate(${radarAngle}deg)` }}
            >
              <div className="w-1/2 h-1/2 ml-auto bg-gradient-to-br from-emerald-400/40 via-emerald-400/10 to-transparent rounded-tl-full" />
              <div className="w-1/2 h-[1px] bg-emerald-400 shadow-[0_0_8px_#10b981]" />
            </div>

            {/* Simulated Verified Nodes */}
            <div className="absolute top-8 left-10 w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <div className="absolute bottom-9 right-8 w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <div className="absolute top-12 right-11 w-1.5 h-1.5 rounded-full bg-emerald-300" />

            {/* Center Core Dot */}
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#10b981] z-10" />
          </div>

          {/* Cyber Telemetry Badges */}
          <div className="w-full grid grid-cols-2 gap-2 text-left font-mono text-[10px]">
            <div className="p-2 rounded-lg bg-slate-950/80 border border-emerald-950/80">
              <span className="text-slate-500 block text-[9px]">FIREWALL</span>
              <span className="text-emerald-400 font-bold">ARMED // ACTIVE</span>
            </div>
            <div className="p-2 rounded-lg bg-slate-950/80 border border-emerald-950/80">
              <span className="text-slate-500 block text-[9px]">ENCRYPTION</span>
              <span className="text-cyan-400 font-bold">AES-256-GCM</span>
            </div>
            <div className="p-2 rounded-lg bg-slate-950/80 border border-emerald-950/80">
              <span className="text-slate-500 block text-[9px]">ZERO-DAY</span>
              <span className="text-emerald-300 font-bold">GUARD: ON</span>
            </div>
            <div className="p-2 rounded-lg bg-slate-950/80 border border-emerald-950/80">
              <span className="text-slate-500 block text-[9px]">PORTS</span>
              <span className="text-emerald-400 font-bold">FILTERED [0]</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
