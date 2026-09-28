import React from "react";
import { X, Download, ExternalLink, Printer, Shield, FileText } from "lucide-react";

export default function ResumeModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const resumePdfUrl = `${import.meta.env.BASE_URL}Abdur_Rahman_I_Resume.pdf`;
  const resumePngUrl = `${import.meta.env.BASE_URL}Abdur_Rahman_I_Resume.png`;

  return (
    <div className="fixed inset-0 z-[10006] flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md transition-all animate-fadeIn">
      {/* Click outside to close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Dialog Container */}
      <div className="relative z-10 w-full max-w-4xl max-h-[92vh] bg-slate-950 border border-cyan-500/30 rounded-3xl shadow-[0_0_50px_rgba(0,242,254,0.15)] flex flex-col overflow-hidden">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-4 sm:px-5 py-3 sm:py-4 border-b border-slate-800 bg-slate-900/60 gap-2">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="w-8 h-8 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
              <FileText className="w-4 h-4" />
            </div>
            <div className="truncate">
              <h3 className="font-ui font-bold text-xs sm:text-sm text-white truncate">
                Abdur Rahman I — Official Resume
              </h3>
              <p className="text-[10px] sm:text-[11px] font-mono text-cyan-400 truncate">
                B.E. Computer Science &amp; Engineering (Cyber Security)
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <a
              href={resumePdfUrl}
              download="Abdur_Rahman_I_Resume.pdf"
              className="inline-flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/50 text-cyan-300 text-xs font-mono font-semibold transition-all shadow-[0_0_12px_rgba(0,242,254,0.2)]"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">DOWNLOAD PDF</span>
              <span className="xs:hidden">PDF</span>
            </a>

            <a
              href={resumePdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono transition-all"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>NEW TAB</span>
            </a>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-xl bg-slate-800 hover:bg-red-500/20 hover:text-red-400 flex items-center justify-center text-slate-400 transition-all cursor-pointer ml-1"
              aria-label="Close Modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Resume Viewport */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-900/30 flex items-center justify-center">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-800 max-w-2xl w-full bg-white">
            <img
              src={resumePngUrl}
              alt="Abdur Rahman I - Official Resume"
              className="w-full h-auto object-contain block"
              loading="eager"
            />
          </div>
        </div>

        {/* Footer Bar */}
        <div className="px-5 py-3 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
          <span className="flex items-center gap-1.5 text-emerald-400">
            <Shield className="w-3.5 h-3.5" />
            <span>VERIFIED CREDENTIALS</span>
          </span>
          <span className="text-slate-500">PRESS ESC TO CLOSE</span>
        </div>
      </div>
    </div>
  );
}
