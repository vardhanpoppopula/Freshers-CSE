import React from "react";
import { readDb } from "@/lib/db";
import Preloader from "@/components/Preloader";
import ParticleBackground from "@/components/ParticleBackground";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Countdown from "@/components/Countdown";
import AboutSection from "@/components/AboutSection";
import EventDetails from "@/components/EventDetails";
import ScheduleSection from "@/components/ScheduleSection";
import ImportantNoticesSection from "@/components/ImportantNoticesSection";
import VideoPlaceholder from "@/components/VideoPlaceholder";
import InvitationGenerator from "@/components/InvitationGenerator";
import Footer from "@/components/Footer";

// Server component with revalidation
export const revalidate = 0; // always serve fresh database data

export default function HomePage() {
  const db = readDb();
  const publishedNotices = db.notices.filter((n) => n.published);
  const publishedSchedule = db.schedule
    .filter((s) => s.published)
    .sort((a, b) => a.order - b.order);

  return (
    <div className="relative min-h-screen bg-[#030712] overflow-x-hidden text-slate-100">
      {/* Cinematic Bootloader Sequence */}
      <Preloader />

      {/* Interactive 60FPS Canvas Particle Matrix */}
      <ParticleBackground />

      {/* Global Minimal Futuristic Navigation Bar */}
      <Navbar />

      <main className="relative z-10 space-y-12 sm:space-y-20">
        {/* Section 1: Hero Landing Experience */}
        <Hero
          dateDisplay={db.settings.dateDisplay}
          timeDisplay={db.settings.timeDisplay}
          venue={db.settings.venue}
        />

        {/* Section 2: Real-time Countdown Timer to 13 Oct 2026 9:30 AM IST */}
        <Countdown />

        {/* Section 3: About NEXORA Manifesto */}
        <AboutSection />

        {/* Section 4: Event Details & Official Coordinates */}
        <EventDetails settings={db.settings} />

        {/* Section 5: Schedule & Flow of Events */}
        <ScheduleSection initialSchedule={publishedSchedule} />

        {/* Section 6: Important Protocols & Notices */}
        <ImportantNoticesSection initialNotices={publishedNotices} />

        {/* Section 7: The Experience / Cinematic Media */}
        <VideoPlaceholder videoUrl={db.settings.videoUrl} />

        {/* Section 8: Official Invitation Pass Generator */}
        <InvitationGenerator />
      </main>

      {/* Official Event Footer */}
      <Footer />
    </div>
  );
}

