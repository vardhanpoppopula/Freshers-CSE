"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Ticket } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Details", href: "#details" },
    { name: "Schedule", href: "#schedule" },
    { name: "Notices", href: "#notices" },
    { name: "Experience", href: "#experience" },
    { name: "Invitation", href: "#invitation" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-[#02050e]/95 backdrop-blur-xl border-b border-yellow-500/20 py-2.5 shadow-[0_10px_30px_rgba(0,0,0,0.85)]"
          : "bg-gradient-to-b from-[#02050e]/80 to-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* LEFT: NEXORA Brand & College Crest */}
        <Link href="/" className="flex items-center gap-3 group shrink-0">
          <div className="relative w-10 h-10 rounded-xl p-0.5 border border-yellow-500/30 bg-slate-900/80 shadow-[0_0_15px_rgba(245,158,11,0.25)] group-hover:border-yellow-400 transition-all">
            <img
              src="/assets/college-logo.png"
              alt="SVEC Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex flex-col text-left">
            <span className="font-cinzel font-black text-xl tracking-wider text-gold-metallic leading-none">
              NEXORA
            </span>
            <span className="text-[9px] text-slate-400 tracking-widest font-mono uppercase mt-0.5">
              SRI VASAVI ENGG COLLEGE
            </span>
          </div>
        </Link>

        {/* CENTER: Direct Horizontal Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="px-3 py-1.5 rounded-lg text-xs font-mono text-slate-300 hover:text-yellow-400 hover:bg-yellow-500/10 transition-colors uppercase tracking-wider font-semibold"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* RIGHT: Action CTA */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="#invitation"
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-slate-950 btn-gold-epic shadow-gold-glow tracking-wider uppercase transition-all"
          >
            <Ticket className="w-3.5 h-3.5 text-slate-950" />
            <span>GET INVITATION</span>
          </a>
        </div>
      </div>

      {/* Sub-bar for mobile devices to quickly navigate sections without any sidebar */}
      <div className="md:hidden flex items-center gap-2 overflow-x-auto px-4 pt-2 pb-1 text-[11px] font-mono no-scrollbar border-t border-white/5 mt-2">
        {navLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            className="px-2.5 py-1 rounded-md bg-slate-950/60 border border-white/5 text-slate-400 hover:text-yellow-400 whitespace-nowrap uppercase shrink-0"
          >
            {link.name}
          </a>
        ))}
      </div>
    </header>
  );
}

