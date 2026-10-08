"use client";

import React from "react";
import { Sparkles, Calendar, Clock, MapPin, ArrowRight, Zap } from "lucide-react";

interface HeroProps {
  dateDisplay?: string;
  timeDisplay?: string;
  venue?: string;
}

export default function Hero({
  dateDisplay = "13TH OCTOBER 2026",
  timeDisplay = "9:30 AM ONWARDS",
  venue = "YNS AUDITORIUM",
}: HeroProps) {
  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center text-center pt-24 pb-16 px-4 overflow-hidden">
      {/* Background Poster Visual Ambiance */}
      <div className="absolute inset-0 z-0 opacity-25 pointer-events-none">
        <img
          src="/assets/poster-banner.png"
          alt="Nexora Background Poster"
          className="w-full h-full object-cover filter blur-[2px] scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/80 to-[#030712]/60" />
      </div>

      {/* Atmospheric Nebula Glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[550px] bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.22)_0%,rgba(168,85,247,0.18)_40%,rgba(0,210,255,0.1)_70%,transparent_100%)] blur-3xl pointer-events-none" />

      {/* Live Badge */}
      <div className="relative z-10 mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/60 border border-yellow-500/30 backdrop-blur-md">
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500"></span>
        </span>
        <span className="text-[11px] font-mono font-bold tracking-wider text-yellow-300 uppercase">
          CSE ✦ CST ✦ IT FRESHERS GATHERING
        </span>
      </div>

      {/* College Identity */}
      <div className="relative z-10 max-w-4xl mx-auto space-y-1.5 mb-4">
        <h2 className="text-xs sm:text-sm md:text-base font-cinzel font-bold tracking-[0.28em] text-yellow-200/90 uppercase drop-shadow">
          SRI VASAVI ENGINEERING COLLEGE
        </h2>
        <p className="text-[10px] sm:text-xs font-mono tracking-widest text-slate-400 uppercase">
          (AUTONOMOUS) • TADEPALLIGUDEM
        </p>
      </div>

      {/* Event Sub-headline */}
      <div className="relative z-10 mb-2">
        <p className="text-xs sm:text-sm md:text-base font-mono tracking-[0.3em] uppercase text-slate-300">
          YOU ARE CORDIALLY INVITED TO
        </p>
        <p className="text-2xl sm:text-3xl md:text-4xl font-script tracking-wide text-fire-orange -rotate-1 mt-1 drop-shadow-[0_2px_10px_rgba(249,115,22,0.6)]">
          Freshers Party 2K26
        </p>
      </div>

      {/* Central NEXORA Title */}
      <div className="relative z-10 my-4 select-none">
        <div className="relative inline-block px-6 py-2">
          <h1 className="text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] font-cinzel font-black tracking-widest text-gold-metallic drop-shadow-[0_0_40px_rgba(255,215,0,0.55)]">
            NEXORA
          </h1>

          {/* Star cross sparkle accent */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-80">
            <div className="w-1 h-28 bg-yellow-200/90 blur-[1px]" />
            <div className="w-28 h-1 bg-yellow-200/90 blur-[1px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          </div>
        </div>

        {/* Tagline */}
        <div className="mt-2 flex items-center justify-center gap-2 sm:gap-4 text-xs sm:text-sm md:text-base font-cinzel font-bold tracking-[0.22em] text-yellow-300">
          <span>NEW FACES</span>
          <span className="text-yellow-500 text-sm">✦</span>
          <span>NEW VIBE</span>
          <span className="text-yellow-500 text-sm">✦</span>
          <span>ONE FAMILY</span>
        </div>
      </div>

      {/* Clean Floating Information Bar (No heavy boxes!) */}
      <div className="relative z-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-xs sm:text-sm md:text-base font-cinzel font-bold tracking-widest text-slate-200 my-8 py-3 px-6 rounded-full bg-slate-950/40 border border-white/10 backdrop-blur-md">
        <div className="flex items-center gap-2 text-yellow-300">
          <Calendar className="w-4 h-4 text-yellow-400" />
          <span>13 OCTOBER 2026</span>
        </div>
        <span className="hidden sm:inline text-slate-600">•</span>
        <div className="flex items-center gap-2 text-cyan-300">
          <Clock className="w-4 h-4 text-cyan-400" />
          <span className="font-mono font-bold">9:30 AM ONWARDS</span>
        </div>
        <span className="hidden sm:inline text-slate-600">•</span>
        <div className="flex items-center gap-2 text-rose-300">
          <MapPin className="w-4 h-4 text-rose-400" />
          <span>YNS AUDITORIUM</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md sm:max-w-none">
        <a
          href="#invitation"
          className="w-full sm:w-auto px-8 py-4 rounded-xl text-xs sm:text-sm font-black text-slate-950 btn-gold-epic tracking-widest uppercase flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(245,158,11,0.5)] transition-all"
        >
          <Sparkles className="w-4 h-4 text-slate-950" />
          <span>GET YOUR INVITATION</span>
          <ArrowRight className="w-4 h-4 text-slate-950" />
        </a>

        <a
          href="#details"
          className="w-full sm:w-auto px-7 py-4 rounded-xl text-xs sm:text-sm font-bold text-slate-200 hover:text-white border border-white/15 hover:border-white/30 bg-slate-900/40 backdrop-blur-md tracking-wider uppercase transition-all"
        >
          <span>EVENT DETAILS</span>
        </a>
      </div>
    </section>
  );
}
