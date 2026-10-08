"use client";

import React, { useRef } from "react";
import { X, FileText, Image as ImageIcon, ShieldCheck } from "lucide-react";

interface InvitationModalProps {
  studentName: string;
  rollNumber: string;
  department: string;
  token?: string;
  qrCodeUrl?: string;
  verificationUrl?: string;
  onClose: () => void;
  onDownloadPdf: () => void;
  isDownloadingPdf: boolean;
}

export default function InvitationModal({
  studentName,
  rollNumber,
  department,
  token,
  qrCodeUrl,
  verificationUrl,
  onClose,
  onDownloadPdf,
  isDownloadingPdf,
}: InvitationModalProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Client-side high-res image export using HTML Canvas with real QR and 9:30 AM patch
  const handleDownloadImage = () => {
    const canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 1536;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const baseImg = new Image();
    baseImg.crossOrigin = "anonymous";
    baseImg.src = "/assets/invitation-template.png";

    baseImg.onload = () => {
      // 1. Draw background template
      ctx.drawImage(baseImg, 0, 0, 1024, 1536);

      // 2. Draw Student Name directly on dotted line (y = 1016)
      ctx.fillStyle = "#0c152e";
      ctx.font = "bold 28px 'Plus Jakarta Sans', Arial, sans-serif";
      ctx.fillText(studentName.trim().toUpperCase(), 315, 1010);

      // 3. Draw Roll Number directly on dotted line (y = 1068)
      ctx.fillStyle = "#0c152e";
      ctx.font = "bold 26px 'JetBrains Mono', monospace";
      ctx.fillText(rollNumber.trim().toUpperCase(), 315, 1062);

      // 4. Seamless Dark Navy Time Update: 9:30 AM ONWARDS (matches dark starry background)
      ctx.fillStyle = "#060d24";
      ctx.fillRect(455, 1144, 155, 46);
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 16px 'Plus Jakarta Sans', Arial, sans-serif";
      ctx.fillText("9:30 AM", 465, 1165);
      ctx.fillStyle = "#cbd5e1";
      ctx.font = "bold 13px 'Plus Jakarta Sans', Arial, sans-serif";
      ctx.fillText("ONWARDS", 465, 1183);

      // 5. Draw QR Code if available
      if (qrCodeUrl) {
        const qrImg = new Image();
        qrImg.onload = () => {
          // Golden frame backdrop
          ctx.fillStyle = "#ffffff";
          ctx.strokeStyle = "#d97706";
          ctx.lineWidth = 2;
          ctx.fillRect(757, 1217, 166, 182);
          ctx.strokeRect(757, 1217, 166, 182);

          // Draw QR
          ctx.drawImage(qrImg, 765, 1225, 150, 150);

          // Label
          ctx.fillStyle = "#0f172a";
          ctx.font = "bold 10px 'JetBrains Mono', Arial, sans-serif";
          ctx.fillText("SCAN TO VERIFY PASS", 772, 1390);

          triggerDownload();
        };
        qrImg.src = qrCodeUrl;
      } else {
        triggerDownload();
      }

      function triggerDownload() {
        const dataUrl = canvas.toDataURL("image/png");
        const a = document.createElement("a");
        a.href = dataUrl;
        a.download = `NEXORA_2K26_Invitation_${rollNumber.toUpperCase()}.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }
    };
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-slate-950 border border-yellow-500/30 rounded-3xl overflow-hidden shadow-[0_0_60px_rgba(245,158,11,0.3)] my-8">
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-slate-900/60">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-mono font-bold tracking-wider text-yellow-300 uppercase">
              OFFICIAL INVITATION PASS
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: The Invitation Card Banner */}
        <div className="p-4 sm:p-8 flex flex-col items-center">
          {/* Card Container mimicking the 1024x1536 aspect ratio */}
          <div
            ref={cardRef}
            className="relative w-full max-w-md aspect-[2/3] rounded-2xl overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.9)] border-2 border-yellow-500/40 select-none bg-slate-900"
          >
            {/* Background template poster */}
            <img
              src="/assets/invitation-template.png"
              alt="Nexora Official Invitation Template"
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Overlaid Dynamic Details precisely on the dotted lines */}
            <div
              className="absolute text-slate-950 font-black uppercase truncate font-body"
              style={{
                top: "63.2%",
                left: "30.8%",
                maxWidth: "46%",
                fontSize: "clamp(10px, 2.2vw, 15px)",
                letterSpacing: "0.03em",
                lineHeight: "1.2",
              }}
            >
              {studentName}
            </div>

            <div
              className="absolute text-slate-950 font-black uppercase truncate font-mono"
              style={{
                top: "66.6%",
                left: "30.8%",
                maxWidth: "46%",
                fontSize: "clamp(10px, 2.1vw, 14px)",
                letterSpacing: "0.05em",
                lineHeight: "1.2",
              }}
            >
              {rollNumber}
            </div>

            {/* Official Time Update: Seamless dark navy banner match */}
            <div
              className="absolute bg-[#060d24] flex flex-col justify-center px-1 text-white font-mono font-bold leading-tight rounded-sm"
              style={{
                top: "74.6%",
                left: "44.8%",
                width: "15%",
                height: "3.2%",
                fontSize: "clamp(6px, 1.1vw, 8.5px)",
              }}
            >
              <div className="font-black text-white">9:30 AM</div>
              <div className="text-[7px] text-slate-300">ONWARDS</div>
            </div>

            {/* Embedded Scannable Real QR Code on Preview Card */}
            {qrCodeUrl && (
              <div
                className="absolute bg-white border border-yellow-500/60 rounded p-0.5 shadow-md flex flex-col items-center"
                style={{
                  bottom: "8.5%",
                  right: "7.5%",
                  width: "16.5%",
                }}
              >
                <img
                  src={qrCodeUrl}
                  alt="Invitation Verification QR"
                  className="w-full aspect-square object-contain"
                />
                <span className="text-[5px] font-mono font-bold text-slate-900 tracking-tighter uppercase mt-0.5 leading-none">
                  VERIFY PASS
                </span>
              </div>
            )}
          </div>

          {/* Verification Badge */}
          <div className="mt-4 flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/20">
            <ShieldCheck className="w-4 h-4" />
            <span>Official Pass Authenticated • YNS Auditorium • 9:30 AM</span>
          </div>

          {/* Action Download Buttons */}
          <div className="mt-6 flex flex-col sm:flex-row items-center gap-3 w-full">
            <button
              onClick={onDownloadPdf}
              disabled={isDownloadingPdf}
              className="flex-1 w-full py-3.5 px-6 rounded-xl btn-gold-epic text-slate-950 text-xs sm:text-sm font-mono font-black tracking-wider uppercase flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            >
              <FileText className="w-4 h-4 text-slate-950" />
              <span>{isDownloadingPdf ? "GENERATING PDF..." : "DOWNLOAD PDF INVITATION"}</span>
            </button>

            <button
              onClick={handleDownloadImage}
              className="flex-1 w-full py-3.5 px-6 rounded-xl bg-slate-900 border border-cyan-400/40 text-cyan-300 hover:text-white text-xs sm:text-sm font-mono font-bold tracking-wider uppercase flex items-center justify-center gap-2 hover:bg-cyan-500/20 transition-all"
            >
              <ImageIcon className="w-4 h-4" />
              <span>DOWNLOAD HD IMAGE</span>
            </button>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-white/10 bg-slate-950/80 text-center text-[11px] font-mono text-slate-400">
          Present this invitation pass alongside your college identity card at the YNS Auditorium registration desk on 13th October 2026.
        </div>
      </div>
    </div>
  );
}
