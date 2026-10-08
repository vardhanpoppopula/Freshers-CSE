"use client";

import React from "react";
import { AlertCircle, ShieldAlert, CheckCircle2, IdCard, Clock, Lock } from "lucide-react";
import { NoticeRecord } from "@/lib/db";

interface ImportantNoticesSectionProps {
  initialNotices?: NoticeRecord[];
}

export default function ImportantNoticesSection({
  initialNotices,
}: ImportantNoticesSectionProps) {
  const notices: NoticeRecord[] =
    initialNotices && initialNotices.length > 0
      ? initialNotices
      : [
          {
            id: "not-1",
            title: "Mandatory College ID Card Requirement",
            content:
              "All students must carry their physical or digital Sri Vasavi Engineering College ID card alongside their printed/digital NEXORA invitation card for auditorium entry.",
            priority: "MANDATORY",
            published: true,
            createdAt: new Date().toISOString(),
          },
          {
            id: "not-2",
            title: "Auditorium Entry Gates & Reporting Timeline",
            content:
              "Entry doors at YNS Auditorium open promptly at 9:00 AM. Students are strictly advised to take their seats by 9:20 AM to avoid inaugural commotion.",
            priority: "MANDATORY",
            published: true,
            createdAt: new Date().toISOString(),
          },
          {
            id: "not-3",
            title: "Authorized Department Verification",
            content:
              "NEXORA 2K26 is exclusively organized for CSE, CST, and IT department freshers and faculty. Non-departmental entries require prior organizing committee clearance.",
            priority: "CRITICAL",
            published: true,
            createdAt: new Date().toISOString(),
          },
          {
            id: "not-4",
            title: "Digital Code of Conduct & Photography Policy",
            content:
              "Tag @nexora2k26 and use #NexoraFreshers on your social stories! Please respect the performers during the inaugural lamp lighting and formal addresses.",
            priority: "INFO",
            published: true,
            createdAt: new Date().toISOString(),
          },
        ];

  return (
    <section id="notices" className="relative py-20 px-4 z-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/10 border border-red-500/30 text-red-300 text-xs font-mono font-semibold tracking-widest uppercase mb-4">
            <ShieldAlert className="w-3.5 h-3.5 text-red-400" />
            <span>OPERATIONAL PROTOCOL & GUIDELINES</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-cinzel font-black text-slate-100 tracking-wide mb-4">
            IMPORTANT <span className="text-fire-orange">NOTICES</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400 font-body">
            Please review the official regulations established by the Sri Vasavi Engineering College disciplinary and event committees.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {notices.map((notice, idx) => (
            <div
              key={notice.id || idx}
              className="relative p-6 sm:p-7 rounded-2xl bg-slate-950/70 border border-red-500/20 hover:border-red-500/50 transition-all duration-300 flex items-start gap-4 shadow-[0_4px_25px_rgba(0,0,0,0.5)] group"
            >
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 shrink-0 group-hover:scale-110 transition-transform">
                <AlertCircle className="w-5 h-5" />
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] font-mono font-bold tracking-wider px-2 py-0.5 rounded bg-red-500/20 text-red-300 uppercase">
                    {notice.priority}
                  </span>
                  <span className="text-[10px] font-mono text-slate-500">
                    NOTICE #{idx + 1}
                  </span>
                </div>

                <h3 className="text-base font-cinzel font-bold text-slate-100 mb-2 group-hover:text-amber-300 transition-colors">
                  {notice.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-body">
                  {notice.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
