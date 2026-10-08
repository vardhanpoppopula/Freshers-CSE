"use client";

import React from "react";
import { Sparkles } from "lucide-react";

interface EventDetailsProps {
  settings?: {
    eventName?: string;
    eventTitle?: string;
    dateDisplay?: string;
    timeDisplay?: string;
    venue?: string;
    collegeName?: string;
    departments?: string;
    location?: string;
  };
}

export default function EventDetails({ settings }: EventDetailsProps) {
  return (
    <section id="details" className="relative py-20 px-4 z-20">
      <div className="max-w-5xl mx-auto text-center space-y-12">
        <div className="space-y-3">
          <div className="text-[11px] font-mono tracking-[0.3em] text-yellow-400 uppercase font-bold">
            ✦ OFFICIAL EVENT COORDINATES ✦
          </div>
          <h2 className="text-3xl sm:text-5xl font-cinzel font-black text-slate-100">
            THE FRESHERS <span className="text-gold-metallic">GATHERING</span>
          </h2>
        </div>

        {/* Grand Typography Specifications — Flowing, Not Boxed! */}
        <div className="space-y-8 py-4">
          <div className="space-y-1">
            <div className="text-xs font-mono text-slate-400 uppercase tracking-widest">
              DATE & TIME
            </div>
            <div className="text-2xl sm:text-4xl md:text-5xl font-cinzel font-black text-yellow-300 tracking-wide">
              13TH OCTOBER 2026
            </div>
            <div className="text-xl sm:text-2xl font-mono font-bold text-cyan-300 tracking-wider">
              9:30 AM ONWARDS
            </div>
          </div>

          <div className="w-16 h-px bg-yellow-500/30 mx-auto" />

          <div className="space-y-1">
            <div className="text-xs font-mono text-slate-400 uppercase tracking-widest">
              VENUE & ARENA
            </div>
            <div className="text-2xl sm:text-4xl font-cinzel font-black text-slate-100 tracking-wider">
              YNS AUDITORIUM
            </div>
            <div className="text-sm sm:text-base font-body text-slate-400">
              Sri Vasavi Engineering College (Autonomous) • Tadepalligudem
            </div>
          </div>

          <div className="w-16 h-px bg-yellow-500/30 mx-auto" />

          <div className="space-y-1">
            <div className="text-xs font-mono text-slate-400 uppercase tracking-widest">
              PARTICIPATING DEPARTMENTS
            </div>
            <div className="text-xl sm:text-3xl font-cinzel font-bold text-slate-200 tracking-widest">
              CSE ✦ CST ✦ IT
            </div>
            <div className="text-xs font-mono text-yellow-400/90 tracking-widest mt-1">
              NEW FACES • NEW VIBE • ONE FAMILY
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
