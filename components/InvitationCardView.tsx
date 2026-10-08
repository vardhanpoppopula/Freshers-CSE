"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Download, Image as ImageIcon, ArrowLeft, RefreshCw, CheckCircle2 } from "lucide-react";

interface InvitationCardViewProps {
  studentName: string;
  rollNumber: string;
  department: string;
  token: string;
  qrCodeUrl: string;
}

export default function InvitationCardView({
  studentName,
  rollNumber,
  department,
  token,
  qrCodeUrl,
}: InvitationCardViewProps) {
  const [downloadingPdf, setDownloadingPdf] = useState(false);

  // Client-side high-res canvas image generation
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
      // 1. Draw base poster
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
          ctx.fillStyle = "#ffffff";
          ctx.strokeStyle = "#d97706";
          ctx.lineWidth = 2;
          ctx.fillRect(757, 1217, 166, 182);
          ctx.strokeRect(757, 1217, 166, 182);
          ctx.drawImage(qrImg, 765, 1225, 150, 150);
          ctx.fillStyle = "#0f172a";
          ctx.font = "bold 10px 'JetBrains Mono', Arial, sans-serif";
          ctx.fillText("SCAN TO VERIFY PASS", 772, 1390);

          saveImage();
        };
        qrImg.src = qrCodeUrl;
      } else {
        saveImage();
      }

      function saveImage() {
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

  const handleDownloadPdf = async () => {
    setDownloadingPdf(true);
    try {
      const res = await fetch("/api/invitations/generate-pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: studentName,
          rollNumber,
          token,
        }),
      });

      if (!res.ok) throw new Error("PDF download failed");

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `NEXORA_2K26_Invitation_${rollNumber.toUpperCase()}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      console.error("PDF error:", err);
      alert("Failed to download PDF. Please try downloading the HD Image instead.");
    } finally {
      setDownloadingPdf(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-xl mx-auto space-y-6">
      {/* Official Invitation Card Banner */}
      <div className="relative w-full aspect-[2/3] rounded-3xl overflow-hidden shadow-[0_25px_80px_rgba(245,158,11,0.35)] border-2 border-yellow-500/40 select-none bg-slate-900">
        {/* Background Poster Template */}
        <img
          src="/assets/invitation-template.png"
          alt="Official Nexora 2K26 Invitation Card"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Student Name precisely printed on the dotted line */}
        <div
          className="absolute text-slate-950 font-black uppercase truncate font-body"
          style={{
            top: "63.2%",
            left: "30.8%",
            maxWidth: "46%",
            fontSize: "clamp(12px, 2.5vw, 17px)",
            letterSpacing: "0.03em",
            lineHeight: "1.2",
          }}
        >
          {studentName}
        </div>

        {/* Roll Number precisely printed on the dotted line */}
        <div
          className="absolute text-slate-950 font-black uppercase truncate font-mono"
          style={{
            top: "66.6%",
            left: "30.8%",
            maxWidth: "46%",
            fontSize: "clamp(11px, 2.4vw, 16px)",
            letterSpacing: "0.05em",
            lineHeight: "1.2",
          }}
        >
          {rollNumber}
        </div>

        {/* Seamless Dark Navy Time Update: 9:30 AM ONWARDS */}
        <div
          className="absolute bg-[#060d24] flex flex-col justify-center px-1 text-white font-mono font-bold leading-tight rounded-sm"
          style={{
            top: "74.6%",
            left: "44.8%",
            width: "15%",
            height: "3.2%",
            fontSize: "clamp(7px, 1.2vw, 9.5px)",
          }}
        >
          <div className="font-black text-white">9:30 AM</div>
          <div className="text-[7px] text-slate-300">ONWARDS</div>
        </div>

        {/* Embedded Scannable Real QR Code on Banner */}
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
              alt="Verification QR"
              className="w-full aspect-square object-contain"
            />
            <span className="text-[5px] font-mono font-bold text-slate-900 tracking-tighter uppercase mt-0.5 leading-none">
              VERIFY PASS
            </span>
          </div>
        )}
      </div>

      {/* Action Download Buttons & Return */}
      <div className="w-full space-y-3">
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
          <button
            onClick={handleDownloadPdf}
            disabled={downloadingPdf}
            className="flex-1 w-full py-4 px-6 rounded-2xl btn-gold-epic text-slate-950 text-xs sm:text-sm font-mono font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-gold-glow transition-all disabled:opacity-50"
          >
            {downloadingPdf ? (
              <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
            ) : (
              <Download className="w-4 h-4 text-slate-950" />
            )}
            <span>{downloadingPdf ? "GENERATING PDF..." : "DOWNLOAD PDF INVITATION"}</span>
          </button>

          <button
            onClick={handleDownloadImage}
            className="flex-1 w-full py-4 px-6 rounded-2xl bg-slate-900/90 border border-cyan-400/50 text-cyan-300 hover:text-white text-xs sm:text-sm font-mono font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-cyan-500/20 transition-all shadow-[0_0_20px_rgba(0,210,255,0.2)]"
          >
            <ImageIcon className="w-4 h-4" />
            <span>DOWNLOAD HD IMAGE</span>
          </button>
        </div>

        <div className="text-center pt-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-yellow-400 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Nexora 2K26 Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
