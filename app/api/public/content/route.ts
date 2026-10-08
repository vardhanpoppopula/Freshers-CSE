import { NextResponse } from "next/server";
import { readDb } from "@/lib/db";

// Public endpoint for published announcements, notices, schedule, and public settings
export async function GET() {
  try {
    const db = readDb();

    const publishedAnnouncements = db.announcements.filter((a) => a.published);
    const publishedNotices = db.notices.filter((n) => n.published);
    const publishedSchedule = db.schedule
      .filter((s) => s.published)
      .sort((a, b) => a.order - b.order);

    return NextResponse.json(
      {
        success: true,
        settings: db.settings,
        announcements: publishedAnnouncements,
        notices: publishedNotices,
        schedule: publishedSchedule,
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=10, stale-while-revalidate=30",
        },
      }
    );
  } catch (error) {
    console.error("Error fetching public content:", error);
    return NextResponse.json(
      { success: false, error: "Failed to load event data" },
      { status: 500 }
    );
  }
}
