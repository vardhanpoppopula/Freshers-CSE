"use client";

import React, { useState, useRef } from "react";
import { Sparkles, Ticket, Download, CheckCircle2, AlertCircle, RefreshCw, FileText, Eye, ShieldCheck, User, CreditCard } from "lucide-react";
import confetti from "canvas-confetti";
import InvitationModal from "./InvitationModal";

export default function InvitationGenerator() {
  const [name, setName] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [verifiedData, setVerifiedData] = useState<{
    name: string;
    rollNumber: string;
    department: string;
    token?: string;
    verificationUrl?: string;
    qrCodeUrl?: string;
  } | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [downloadingPdf, setDownloadingPdf] = useState(false);

  const handleValidate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const cleanName = name.trim();
    const cleanRoll = rollNumber.trim().toUpperCase();

    if (!cleanName) {
      setError("Please enter your name.");
      return;
    }
    if (!cleanRoll) {
      setError("Please enter your roll number.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/invitations/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: cleanName, rollNumber: cleanRoll }),
      });

      const json = await res.json();

      if (!res.ok || !json.success) {
        setError(json.error || "Invitation unavailable. Please enter a valid authorized roll number.");
        setLoading(false);
        return;
      }

      // Success!
      setVerifiedData({
        name: cleanName,
        rollNumber: cleanRoll,
        department: json.data?.department || "CSE",
        token: json.data?.token,
        verificationUrl: json.data?.verificationUrl,
        qrCodeUrl: json.data?.qrCodeUrl,
      });

      // Fire celebratory festival confetti!
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
          colors: ["#ffd700", "#00d2ff", "#a855f7", "#f97316"],
        });
      } catch (err) {
        // confetti fallback
      }

      setPreviewOpen(true);
    } catch (err) {
      console.error("Validation error:", err);
      setError("Unable to connect to verification server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPdf = async () => {
    if (!verifiedData) return;
    setDownloadingPdf(true);

    try {
      const res = await fetch("/api/invitations/generate-pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: verifiedData.name,
          rollNumber: verifiedData.rollNumber,
          token: verifiedData.token,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to generate PDF");
      }

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `NEXORA_2K26_Invitation_${verifiedData.rollNumber}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      console.error("PDF download failed:", err);
      alert("Failed to download PDF. Please try again.");
    } finally {
      setDownloadingPdf(false);
    }
  };

  return (
    <section id="invitation" className="relative py-24 px-4 z-20">
      <div className="max-w-4xl mx-auto">
        {/* Glow backdrop */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[500px] bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.15)_0%,rgba(0,210,255,0.1)_50%,transparent_80%)] blur-3xl pointer-events-none" />

        <div className="relative p-8 sm:p-12 rounded-3xl glass-panel border border-yellow-500/30 shadow-[0_15px_50px_rgba(0,0,0,0.8)] overflow-hidden">
          {/* Header */}
          <div className="text-center max-w-xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-300 text-xs font-mono font-semibold tracking-widest uppercase mb-4 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
              <Ticket className="w-3.5 h-3.5 text-yellow-400" />
              <span>OFFICIAL VIP ENTRY PASS PORTAL</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-cinzel font-black text-slate-100 tracking-wide mb-3">
              YOUR NEXORA <span className="text-gold-metallic">INVITATION</span>
            </h2>

            <p className="text-sm sm:text-base text-slate-400 font-body">
              Make your entry official. Enter your preferred display name and authorized college roll number.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleValidate} className="max-w-lg mx-auto space-y-6">
            {/* Student Name */}
            <div>
              <label className="block text-xs font-mono tracking-wider text-slate-300 uppercase mb-2">
                YOUR NAME (AS DESIRED ON INVITATION)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Rahul Kumar or Alex"
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-slate-950/80 border border-white/10 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-all font-body text-sm"
                />
              </div>
              <p className="text-[11px] text-slate-500 font-mono mt-1.5">
                ✦ Any name format is accepted (Full name, nickname, or initials)
              </p>
            </div>

            {/* Roll Number */}
            <div>
              <label className="block text-xs font-mono tracking-wider text-slate-300 uppercase mb-2">
                COLLEGE ROLL NUMBER (AUTHORIZED SVEC ID)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                  <CreditCard className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  value={rollNumber}
                  onChange={(e) => setRollNumber(e.target.value)}
                  placeholder="e.g. 23A91A0501, 23A91A0001"
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-slate-950/80 border border-white/10 text-slate-100 placeholder-slate-500 uppercase tracking-widest focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all font-mono text-sm font-bold"
                />
              </div>
              <p className="text-[11px] text-slate-500 font-mono mt-1.5">
                ✦ Roll number is verified securely against the CSE/CST/IT student database
              </p>
            </div>

            {/* Error Message Display */}
            {error && (
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs font-mono flex items-start gap-3 animate-shake">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">VALIDATION NOTICE: </span>
                  {error}
                </div>
              </div>
            )}

            {/* Submit CTA Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl font-cinzel font-black tracking-widest text-slate-950 btn-gold-epic shadow-gold-glow uppercase flex items-center justify-center gap-3 transition-all disabled:opacity-50"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
                  <span>VERIFYING AUTHORIZATION...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 text-slate-950" />
                  <span>GENERATE MY INVITATION</span>
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Roll helper for testers */}
          <div className="mt-8 pt-6 border-t border-white/10 text-center">
            <span className="text-[11px] font-mono text-slate-500 block mb-2">
              QUICK TEST ROLL NUMBERS (CSE, CST, IT):
            </span>
            <div className="flex flex-wrap justify-center gap-2">
              {["23A91A0001", "23A91A0501", "23A91A0601", "23A91A1201"].map((sampleRoll) => (
                <button
                  key={sampleRoll}
                  type="button"
                  onClick={() => {
                    setRollNumber(sampleRoll);
                    if (!name) setName("Fresher Student");
                  }}
                  className="px-2.5 py-1 rounded bg-slate-900 border border-white/10 text-[10px] font-mono text-cyan-400 hover:border-yellow-400/50 hover:text-yellow-300 transition-colors"
                >
                  {sampleRoll}
                </button>
              ))}
            </div>
          </div>

          {/* Post-Validation Quick Actions */}
          {verifiedData && (
            <div className="mt-8 p-6 rounded-2xl bg-yellow-500/10 border border-yellow-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 animate-fade-in">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
                <div>
                  <div className="text-xs font-mono text-yellow-300 uppercase font-bold">
                    INVITATION GENERATED FOR {verifiedData.rollNumber}
                  </div>
                  <div className="text-sm font-cinzel font-bold text-slate-100">
                    {verifiedData.name} ({verifiedData.department})
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={() => setPreviewOpen(true)}
                  className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-slate-900 border border-cyan-400/40 text-cyan-300 hover:text-white text-xs font-mono font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-cyan-500/20 transition-all"
                >
                  <Eye className="w-4 h-4" />
                  <span>VIEW PASS</span>
                </button>

                <button
                  onClick={handleDownloadPdf}
                  disabled={downloadingPdf}
                  className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl btn-gold-epic text-slate-950 text-xs font-mono font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                >
                  {downloadingPdf ? (
                    <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
                  ) : (
                    <Download className="w-4 h-4 text-slate-950" />
                  )}
                  <span>DOWNLOAD PDF</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Preview Modal */}
      {previewOpen && verifiedData && (
        <InvitationModal
          studentName={verifiedData.name}
          rollNumber={verifiedData.rollNumber}
          department={verifiedData.department}
          token={verifiedData.token}
          qrCodeUrl={verifiedData.qrCodeUrl}
          verificationUrl={verifiedData.verificationUrl}
          onClose={() => setPreviewOpen(false)}
          onDownloadPdf={handleDownloadPdf}
          isDownloadingPdf={downloadingPdf}
        />
      )}
    </section>
  );
}
