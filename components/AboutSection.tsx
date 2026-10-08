"use client";

import React from "react";
import { Sparkles } from "lucide-react";

export default function AboutSection() {
  return (
    <section id="about" className="relative py-24 px-4 z-20">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-300 text-xs font-mono tracking-widest uppercase">
          <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
          <span>THE NEXORA SPIRIT</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-cinzel font-black text-slate-100 tracking-wide">
          WHERE NEW FACES BECOME <br className="hidden sm:inline" />
          <span className="text-gold-metallic">ONE FAMILY</span>
        </h2>

        <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-body max-w-2xl mx-auto">
          NEXORA 2K26 is the inaugural welcome celebration exclusively for the incoming 1st-year students of Computer Science & Engineering, Computer Science & Technology, and Information Technology at Sri Vasavi Engineering College.
        </p>

        {/* Narrative Flow (No chunky boxes!) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 text-left border-t border-white/10">
          <div className="space-y-2">
            <span className="text-xs font-mono text-cyan-400 font-bold tracking-wider">// 01 BROTHERHOOD & SISTERHOOD</span>
            <h3 className="text-lg font-cinzel font-bold text-slate-100">One United Family</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Forming bonds and memories that begin on stage and last well beyond your campus years.
            </p>
          </div>

          <div className="space-y-2">
            <span className="text-xs font-mono text-yellow-400 font-bold tracking-wider">// 02 TECH & CREATIVITY</span>
            <h3 className="text-lg font-cinzel font-bold text-slate-100">Engineers of Tomorrow</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Step into an inspiring community of coders, builders, innovators, and problem solvers.
            </p>
          </div>

          <div className="space-y-2">
            <span className="text-xs font-mono text-purple-400 font-bold tracking-wider">// 03 ENERGY & SOUND</span>
            <h3 className="text-lg font-cinzel font-bold text-slate-100">Live Stage Spectacle</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Live acoustics, dance battles, Mr. & Ms. Fresher, and concert lasers at YNS Auditorium.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
