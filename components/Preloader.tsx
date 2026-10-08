"use client";

import React, { useState, useEffect } from "react";

export default function Preloader() {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Smooth, quick 600ms cinematic intro
    const timer = setTimeout(() => {
      setFading(true);
      setTimeout(() => setLoading(false), 300);
    }, 650);

    return () => clearTimeout(timer);
  }, []);

  if (!mounted || !loading) return null;

  return (
    <div
      onClick={() => {
        setFading(true);
        setTimeout(() => setLoading(false), 100);
      }}
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#02050e] text-white transition-opacity duration-300 pointer-events-none select-none ${
        fading ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Background radial glows */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.18)_0%,rgba(0,210,255,0.08)_40%,transparent_70%)]" />

      <div className="relative z-10 flex flex-col items-center max-w-md px-6 text-center animate-fade-in">
        {/* College Logo */}
        <div className="relative w-20 h-20 mb-5 p-1 rounded-2xl border border-yellow-500/30 bg-slate-900/80 shadow-[0_0_30px_rgba(245,158,11,0.3)]">
          <img
            src="/assets/college-logo.png"
            alt="Sri Vasavi Engineering College"
            className="w-full h-full object-contain filter drop-shadow"
          />
        </div>

        <p className="text-[11px] tracking-[0.3em] uppercase text-yellow-400 font-medium font-mono mb-1">
          SRI VASAVI ENGINEERING COLLEGE
        </p>
        <p className="text-[10px] tracking-[0.25em] text-slate-400 font-mono mb-4">
          DEPT OF CSE • CST • IT
        </p>

        {/* NEXORA Glitch Glow Title */}
        <h1 className="text-4xl md:text-5xl font-cinzel font-black tracking-widest text-gold-metallic mb-2 animate-pulse">
          NEXORA
        </h1>
        <p className="text-xs tracking-[0.2em] text-cyan-400 font-mono mb-6">
          FRESHERS PARTY 2K26 // ACCESS GRANTED
        </p>

        {/* Futuristic Cyber Progress Bar */}
        <div className="w-64 sm:w-72 h-1.5 bg-slate-950/80 rounded-full border border-yellow-500/30 overflow-hidden relative shadow-[0_0_15px_rgba(0,210,255,0.2)]">
          <div className="h-full bg-gradient-to-r from-yellow-500 via-cyan-400 to-purple-500 rounded-full w-full animate-pulse" />
        </div>

        <div className="flex items-center justify-between w-64 sm:w-72 text-[10px] font-mono text-slate-400 mt-2">
          <span className="text-yellow-400">STATUS: INITIALIZED</span>
          <span className="text-cyan-400 font-bold">100%</span>
        </div>
      </div>
    </div>
  );
}
