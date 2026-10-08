"use client";

import React from "react";
import { ArrowUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-yellow-500/20 bg-[#02050e] pt-16 pb-12 px-4 z-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Col 1: Brand (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl p-1 border border-yellow-500/40 bg-slate-900 shadow-[0_0_20px_rgba(245,158,11,0.3)]">
                <img
                  src="/assets/college-logo.png"
                  alt="Sri Vasavi Engineering College"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h3 className="text-2xl font-cinzel font-black tracking-wider text-gold-metallic">
                  NEXORA
                </h3>
                <p className="text-[10px] font-mono tracking-widest text-yellow-400 uppercase">
                  FRESHERS PARTY 2K26
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm font-body">
              The flagship freshman welcome festival organized by Sri Vasavi Engineering College (Autonomous), Tadepalligudem for the brilliant incoming classes of CSE, CST, and IT.
            </p>

            <div className="text-xs font-cinzel font-bold text-yellow-300 tracking-widest">
              NEW FACES ✦ NEW VIBE ✦ ONE FAMILY
            </div>
          </div>

          {/* Col 2: Fast Navigation (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-xs font-mono tracking-widest text-cyan-400 uppercase font-bold">
              NAVIGATION
            </div>
            <ul className="space-y-2 text-xs font-body text-slate-400">
              <li>
                <a href="#about" className="hover:text-yellow-400 transition-colors">About Nexora</a>
              </li>
              <li>
                <a href="#details" className="hover:text-yellow-400 transition-colors">Event Details</a>
              </li>
              <li>
                <a href="#schedule" className="hover:text-yellow-400 transition-colors">Live Schedule</a>
              </li>
              <li>
                <a href="#notices" className="hover:text-yellow-400 transition-colors">Important Notices</a>
              </li>
              <li>
                <a href="#experience" className="hover:text-yellow-400 transition-colors">The Experience</a>
              </li>
              <li>
                <a href="#invitation" className="hover:text-yellow-400 transition-colors">Invitation Generator</a>
              </li>
            </ul>
          </div>

          {/* Col 3: Coordinates (4 cols) */}
          <div className="md:col-span-4 space-y-3">
            <div className="text-xs font-mono tracking-widest text-cyan-400 uppercase font-bold">
              ARENA PROTOCOLS
            </div>
            <div className="text-xs text-slate-400 space-y-1.5 font-body">
              <p><strong className="text-slate-200">Date:</strong> 13th October 2026</p>
              <p><strong className="text-slate-200">Time:</strong> 9:30 AM Onwards (Doors open 9:00 AM)</p>
              <p><strong className="text-slate-200">Venue:</strong> YNS Auditorium</p>
              <p><strong className="text-slate-200">Institution:</strong> Sri Vasavi Engineering College (Autonomous)</p>
              <p><strong className="text-slate-200">Campus:</strong> Pedatadepalli, Tadepalligudem, AP</p>
            </div>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div>
            © 2026 NEXORA • Sri Vasavi Engineering College (Autonomous). All Rights Reserved.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-white/10 hover:border-yellow-400/40 text-slate-400 hover:text-yellow-400 transition-all"
          >
            <span>TOP</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
