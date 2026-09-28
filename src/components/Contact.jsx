import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  MessageSquare,
  Mail,
  Instagram,
  Linkedin,
  Github,
  ArrowUpRight,
  Send,
  Sparkles,
  PhoneCall,
  Check
} from "lucide-react";
import { contactInfo } from "../data/personal";
import ShaderButton from "./framer/ShaderButton";
import TubeLight from "./framer/TubeLight";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef(null);
  const leftColRef = useRef(null);
  const rightColRef = useRef(null);
  const centerGlowRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Elements converge toward center as user scrolls (Section 35)
      gsap.fromTo(
        leftColRef.current,
        { x: -80, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%"
          }
        }
      );

      gsap.fromTo(
        rightColRef.current,
        { x: 80, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%"
          }
        }
      );

      gsap.fromTo(
        centerGlowRef.current,
        { scale: 0.6, opacity: 0.2 },
        {
          scale: 1,
          opacity: 0.8,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%"
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative min-h-screen w-full py-28 bg-[#020205] text-slate-100 overflow-hidden flex flex-col justify-center"
    >
      {/* Central Glowing Communication Core (Section 35) */}
      <div
        ref={centerGlowRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-gradient-to-tr from-cyan-600/10 via-purple-600/15 to-transparent rounded-full blur-[160px] pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-xs font-mono text-cyan-300 tracking-[0.25em] uppercase">
            <Send className="w-3.5 h-3.5" />
            <span>COMMUNICATION NEXUS</span>
          </div>

          <h2 className="text-4xl sm:text-6xl md:text-7xl font-display font-black tracking-tight text-white">
            HAVE AN IDEA?
          </h2>

          <p className="text-xl sm:text-3xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-purple-400">
            LET'S TURN IT INTO SOMETHING REAL.
          </p>

          <div className="w-36 mx-auto py-2">
            <TubeLight stop4="#00f2fe" stop3="#8b5cf6" height={1.5} />
          </div>

          <p className="text-sm sm:text-base font-ui text-slate-300 leading-relaxed max-w-xl mx-auto">
            Whether you need a cutting-edge web platform, creative branding, cinematic video pacing, or a photography shoot, let's talk.
          </p>
        </div>

        {/* Converging Contact Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Primary Direct Actions (WhatsApp & Email) */}
          <div ref={leftColRef} className="lg:col-span-6 space-y-6 flex flex-col justify-between">
            {/* Primary WhatsApp Card (Section 34) */}
            <div className="p-8 rounded-3xl glass-card border border-emerald-500/30 hover:border-emerald-400/60 transition-all duration-300 relative overflow-hidden group shadow-2xl">
              <div className="absolute top-0 right-0 w-36 h-36 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-lg">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-mono text-emerald-400 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-800">
                  INSTANT MESSAGING
                </span>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                  DIRECT WHATSAPP
                </span>
                <h3 className="text-2xl sm:text-3xl font-display font-bold text-white">
                  {contactInfo.whatsapp}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 font-body">
                  Available for rapid inquiry, project scoping, and creative consultations.
                </p>
              </div>

              <div className="pt-6">
                <ShaderButton
                  href={contactInfo.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  cursorText="WHATSAPP"
                  icon={ArrowUpRight}
                  className="w-full sm:w-auto bg-emerald-950/80 border-emerald-500/40 text-emerald-300 hover:border-emerald-400"
                >
                  START A PROJECT →
                </ShaderButton>
              </div>
            </div>

            {/* Email Card (Section 34) */}
            <div className="p-8 rounded-3xl glass-card border border-cyan-500/30 hover:border-cyan-400/60 transition-all duration-300 relative overflow-hidden group shadow-2xl">
              <div className="absolute top-0 right-0 w-36 h-36 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shadow-lg">
                  <Mail className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-mono text-cyan-400 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800">
                  OFFICIAL INBOX
                </span>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                  SEND AN EMAIL
                </span>
                <a
                  href={`mailto:${contactInfo.email}`}
                  data-cursor="EMAIL"
                  className="block text-lg sm:text-2xl font-mono font-bold text-cyan-300 hover:text-white transition-colors truncate"
                >
                  {contactInfo.email}
                </a>
                <p className="text-xs sm:text-sm text-slate-400 font-body">
                  Feel free to send proposals, collaboration requests, or direct RFPs.
                </p>
              </div>

              <div className="pt-6">
                <ShaderButton
                  href={`mailto:${contactInfo.email}`}
                  cursorText="SEND"
                  icon={ArrowUpRight}
                  variant="primary"
                >
                  SEND EMAIL →
                </ShaderButton>
              </div>
            </div>
          </div>

          {/* Right Column: Social Channels & Profiles */}
          <div ref={rightColRef} className="lg:col-span-6 space-y-4 flex flex-col justify-between">
            <span className="text-xs font-mono tracking-widest text-slate-400 uppercase font-semibold">
              CONNECTED CHANNELS
            </span>

            {/* Instagram - Primary */}
            <a
              href={contactInfo.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="OPEN"
              className="p-5 rounded-2xl glass-card border border-white/10 hover:border-pink-500/40 transition-all flex items-center justify-between group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-pink-500/15 border border-pink-500/30 flex items-center justify-center text-pink-400 group-hover:scale-105 transition-transform">
                  <Instagram className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-ui font-bold text-white text-base group-hover:text-pink-300 transition-colors">
                    Instagram Main
                  </h4>
                  <p className="text-xs font-mono text-pink-400">
                    {contactInfo.instagram.handle}
                  </p>
                </div>
              </div>
              <ArrowUpRight className="w-5 h-5 text-slate-400 group-hover:text-pink-300 transition-colors" />
            </a>

            {/* Photography Instagram - Shuttersbytec */}
            <a
              href={contactInfo.photographyInstagram.url}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="OPEN"
              className="p-5 rounded-2xl glass-card border border-white/10 hover:border-amber-500/40 transition-all flex items-center justify-between group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:scale-105 transition-transform">
                  <Instagram className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-ui font-bold text-white text-base group-hover:text-amber-300 transition-colors">
                    Photography Instagram
                  </h4>
                  <p className="text-xs font-mono text-amber-400">
                    {contactInfo.photographyInstagram.handle}
                  </p>
                </div>
              </div>
              <ArrowUpRight className="w-5 h-5 text-slate-400 group-hover:text-amber-300 transition-colors" />
            </a>

            {/* LinkedIn */}
            <a
              href={contactInfo.linkedin.url}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="OPEN"
              className="p-5 rounded-2xl glass-card border border-white/10 hover:border-blue-500/40 transition-all flex items-center justify-between group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400 group-hover:scale-105 transition-transform">
                  <Linkedin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-ui font-bold text-white text-base group-hover:text-blue-300 transition-colors">
                    LinkedIn Network
                  </h4>
                  <p className="text-xs font-mono text-blue-400">
                    {contactInfo.linkedin.handle}
                  </p>
                </div>
              </div>
              <ArrowUpRight className="w-5 h-5 text-slate-400 group-hover:text-blue-300 transition-colors" />
            </a>

            {/* GitHub */}
            <a
              href={contactInfo.github.url}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="OPEN"
              className="p-5 rounded-2xl glass-card border border-white/10 hover:border-purple-500/40 transition-all flex items-center justify-between group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400 group-hover:scale-105 transition-transform">
                  <Github className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-ui font-bold text-white text-base group-hover:text-purple-300 transition-colors">
                    GitHub Codebases
                  </h4>
                  <p className="text-xs font-mono text-purple-400">
                    {contactInfo.github.handle}
                  </p>
                </div>
              </div>
              <ArrowUpRight className="w-5 h-5 text-slate-400 group-hover:text-purple-300 transition-colors" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
