"use client";

import React, { useState, useEffect } from "react";
import { Clock, Zap } from "lucide-react";

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isLive: boolean;
}

export default function Countdown() {
  // Official target: 13 October 2026, 9:30 AM IST
  const targetDateStr = "2026-10-13T09:30:00+05:30";

  const calculateTime = (): TimeRemaining => {
    const target = new Date(targetDateStr).getTime();
    const now = new Date().getTime();
    const difference = target - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isLive: true };
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds, isLive: false };
  };

  const [timeLeft, setTimeLeft] = useState<TimeRemaining>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isLive: false,
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTimeLeft(calculateTime());
    const timer = setInterval(() => {
      setTimeLeft(calculateTime());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!mounted) return null;

  const units = [
    { label: "DAYS", value: timeLeft.days },
    { label: "HOURS", value: timeLeft.hours },
    { label: "MINUTES", value: timeLeft.minutes },
    { label: "SECONDS", value: timeLeft.seconds },
  ];

  return (
    <section className="relative py-12 px-4 z-20">
      <div className="max-w-4xl mx-auto text-center">
        <div className="text-[11px] font-mono tracking-widest text-slate-400 uppercase mb-4">
          COUNTDOWN TO 13 OCTOBER 2026 • 9:30 AM IST
        </div>

        {timeLeft.isLive ? (
          <div className="py-6 space-y-2">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-xs uppercase animate-pulse">
              <Zap className="w-3.5 h-3.5" />
              <span>NEXORA IS LIVE NOW</span>
            </div>
            <h3 className="text-3xl sm:text-4xl font-cinzel font-bold text-gold-metallic">
              THE EXPERIENCE HAS BEGUN!
            </h3>
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-2 sm:gap-6 max-w-2xl mx-auto">
            {units.map((unit) => (
              <div
                key={unit.label}
                className="flex flex-col items-center justify-center p-3 sm:p-5 rounded-2xl bg-slate-950/40 border border-white/5 backdrop-blur-sm"
              >
                <span className="text-3xl sm:text-5xl md:text-6xl font-mono font-black text-gold-bright tracking-tight">
                  {String(unit.value).padStart(2, "0")}
                </span>
                <span className="mt-1 text-[9px] sm:text-[11px] font-cinzel font-bold text-slate-400 tracking-widest uppercase">
                  {unit.label}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
