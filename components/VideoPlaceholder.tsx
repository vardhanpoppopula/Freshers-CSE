"use client";

import React, { useState } from "react";
import { Play, Film, Sparkles, Video, Lock, Radio } from "lucide-react";

interface VideoPlaceholderProps {
  videoUrl?: string;
}

export default function VideoPlaceholder({ videoUrl }: VideoPlaceholderProps) {
  const [clicked, setClicked] = useState(false);

  return (
    <section id="experience" className="relative py-24 px-4 z-20">
      <div className="max-w-5xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-semibold tracking-widest uppercase mb-4">
            <Film className="w-3.5 h-3.5 text-cyan-400" />
            <span>CINEMATIC ARCHIVE</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-cinzel font-black text-slate-100 tracking-wide mb-4">
            THE NEXORA <span className="text-electric-blue">EXPERIENCE</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400 font-body">
            Official event teaser, documentary, and stage highlights channel.
          </p>
        </div>

        {/* Video Frame */}
        {videoUrl ? (
          <div className="relative aspect-video rounded-3xl overflow-hidden border border-yellow-500/30 shadow-[0_0_50px_rgba(0,0,0,0.8)]">
            <iframe
              src={videoUrl}
              title="Nexora Event Video"
              className="w-full h-full"
              allowFullScreen
            />
          </div>
        ) : (
          <div className="relative aspect-video max-w-4xl mx-auto rounded-3xl bg-slate-950/80 border border-yellow-500/30 overflow-hidden flex flex-col items-center justify-center p-8 text-center shadow-[0_10px_50px_rgba(0,0,0,0.9)] group">
            {/* Cyber Corner HUD elements */}
            <div className="absolute top-4 left-4 flex items-center gap-2 text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded border border-cyan-500/20">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span>FEED STATUS: RESERVED</span>
            </div>

            <div className="absolute top-4 right-4 text-[10px] font-mono text-slate-500">
              RESOLUTION: 4K UHD // 60FPS READY
            </div>

            <div className="absolute bottom-4 left-4 text-[10px] font-mono text-slate-500">
              SVEC MEDIA REEL • CSE | CST | IT
            </div>

            <div className="absolute bottom-4 right-4 text-[10px] font-mono text-yellow-500/80 flex items-center gap-1.5">
              <Radio className="w-3.5 h-3.5 text-yellow-400 animate-pulse" />
              <span>AWAITING STREAM DEPLOYMENT</span>
            </div>

            {/* Glowing Center Holographic Play Accent */}
            <div
              onClick={() => setClicked(true)}
              className="relative cursor-pointer group-hover:scale-105 transition-transform"
            >
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-slate-900/90 border-2 border-yellow-500/60 group-hover:border-yellow-400 flex items-center justify-center text-yellow-400 shadow-[0_0_35px_rgba(245,158,11,0.4)] group-hover:shadow-[0_0_50px_rgba(255,215,0,0.7)] transition-all">
                <Play className="w-8 h-8 sm:w-10 sm:h-10 fill-yellow-400 translate-x-1" />
              </div>
              <div className="absolute -inset-3 rounded-full border border-cyan-500/30 animate-ping pointer-events-none" />
            </div>

            {/* Placeholder Text Display */}
            <div className="mt-8 space-y-2">
              <div className="text-[11px] font-mono tracking-widest text-yellow-400/90 uppercase font-bold">
                [ FUTURE VIDEO AREA ]
              </div>
              <h3 className="text-2xl sm:text-3xl font-cinzel font-bold text-slate-100">
                NEXORA: THE EXPERIENCE
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto font-mono">
                Official event cinematic aftermovie and live stream transmission will be inserted here by the college media cell.
              </p>
            </div>

            {clicked && (
              <div className="mt-4 px-4 py-2 rounded-xl bg-yellow-500/10 border border-yellow-500/40 text-yellow-300 text-xs font-mono animate-fade-in">
                ✨ Official event media capture in progress. Premiere after 13th October 2026!
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
