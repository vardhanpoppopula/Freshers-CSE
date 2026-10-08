"use client";

import React from "react";
import { Clock } from "lucide-react";
import { ScheduleRecord } from "@/lib/db";

interface ScheduleSectionProps {
  initialSchedule?: ScheduleRecord[];
}

export default function ScheduleSection({ initialSchedule }: ScheduleSectionProps) {
  const scheduleList: ScheduleRecord[] =
    initialSchedule && initialSchedule.length > 0
      ? initialSchedule
      : [
          {
            id: "sch-1",
            time: "09:30 AM",
            title: "Grand Arrival & Red Carpet Entry",
            description: "Freshers enter through the Cyber Arch with wristbands and official pass verification.",
            category: "CEREMONY",
            order: 1,
            published: true,
          },
          {
            id: "sch-2",
            time: "09:50 AM",
            title: "Traditional Lamp Lighting & Dignitary Address",
            description: "Inauguration by Principal, HODs of CSE, CST, IT, and student conveners.",
            category: "CEREMONY",
            order: 2,
            published: true,
          },
          {
            id: "sch-3",
            time: "10:20 AM",
            title: "Ice-Breakers & Freshman Spotlight",
            description: "Interactive crowd games, rapid-fire banter, and freshman self-introductions.",
            category: "INTERACTION",
            order: 3,
            published: true,
          },
          {
            id: "sch-4",
            time: "11:15 AM",
            title: "Electrifying Cultural Extravaganza",
            description: "High-octane fusion dance battles, live acoustics, band solos, and cinematic skits.",
            category: "CULTURAL",
            order: 4,
            published: true,
          },
          {
            id: "sch-5",
            time: "02:00 PM",
            title: "Mr. & Ms. Fresher 2K26 Grand Finale",
            description: "Runway charisma, talent showcase, and crowning of our 2K26 freshers royalty.",
            category: "CULTURAL",
            order: 5,
            published: true,
          },
          {
            id: "sch-6",
            time: "03:30 PM",
            title: "Cyber DJ Celebration & Festival Climax",
            description: "Immersive laser effects, festival drops, and the official welcome to the family.",
            category: "CELEBRATION",
            order: 6,
            published: true,
          },
        ];

  return (
    <section id="schedule" className="relative py-24 px-4 z-20">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16 space-y-3">
          <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-semibold">
            ✦ 13TH OCTOBER 2026 • FROM 9:30 AM ✦
          </div>
          <h2 className="text-3xl sm:text-5xl font-cinzel font-black text-slate-100">
            EVENT <span className="text-gold-metallic">TIMELINE</span>
          </h2>
          <p className="text-sm text-slate-400 font-body max-w-md mx-auto">
            Order of events planned for the day at YNS Auditorium.
          </p>
        </div>

        {/* Minimal Continuous Vertical Timeline */}
        <div className="relative border-l border-yellow-500/30 ml-4 sm:ml-12 pl-6 sm:pl-10 space-y-10">
          {scheduleList.map((item) => (
            <div key={item.id} className="relative group">
              {/* Timeline Dot */}
              <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-3.5 h-3.5 rounded-full bg-yellow-400 border-2 border-[#030712] shadow-[0_0_10px_rgba(255,215,0,0.8)]" />

              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs sm:text-sm font-bold text-cyan-300">
                    {item.time}
                  </span>
                  <span className="text-[10px] font-mono tracking-widest text-slate-500 uppercase">
                    {item.category}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-cinzel font-bold text-slate-100 group-hover:text-yellow-300 transition-colors">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-400 font-body leading-relaxed max-w-xl">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
