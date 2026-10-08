import React from "react";
import Link from "next/link";
import { getInvitationPassByToken } from "@/lib/db";
import { generateQrDataUrl } from "@/lib/qr";
import { ShieldCheck } from "lucide-react";
import InvitationCardView from "@/components/InvitationCardView";

interface PageProps {
  params: {
    token: string;
  };
}

export default async function InvitationVerificationPage({ params }: PageProps) {
  const { token } = params;
  const pass = getInvitationPassByToken(token);

  if (!pass) {
    return (
      <div className="min-h-screen bg-[#02050e] text-white flex flex-col items-center justify-center p-6 text-center font-body">
        <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 mb-4">
          <ShieldCheck className="w-8 h-8" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-cinzel font-bold text-red-400 mb-2">
          INVALID OR EXPIRED PASS
        </h1>
        <p className="text-sm text-slate-400 max-w-md font-mono mb-6">
          This invitation QR token could not be verified in the Sri Vasavi Engineering College authorized registry.
        </p>
        <Link
          href="/"
          className="px-6 py-3 rounded-xl btn-gold-epic text-slate-950 font-mono text-xs font-bold uppercase"
        >
          Return to Nexora Portal
        </Link>
      </div>
    );
  }

  const qrTarget = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/invitation/${token}`;
  const qrCodeUrl = await generateQrDataUrl(qrTarget);

  return (
    <div className="min-h-screen bg-[#02050e] text-white flex flex-col items-center justify-center p-4 sm:p-8 font-body relative overflow-x-hidden">
      {/* Background radial glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.18)_0%,rgba(0,210,255,0.1)_50%,transparent_80%)] blur-3xl pointer-events-none" />

      {/* Main Content: ONLY the Invitation Card Banner (No Header, No Special Card) */}
      <main className="relative z-10 w-full my-4">
        <InvitationCardView
          studentName={pass.studentName}
          rollNumber={pass.rollNumber}
          department={pass.department}
          token={token}
          qrCodeUrl={qrCodeUrl}
        />
      </main>
    </div>
  );
}

