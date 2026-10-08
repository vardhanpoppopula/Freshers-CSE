import { NextRequest, NextResponse } from "next/server";
import { checkRollNumberAuthorization, logInvitation, saveInvitationPass } from "@/lib/db";
import { checkRateLimit } from "@/lib/rate-limit";
import { generateSecureInvitationToken, generateQrDataUrl } from "@/lib/qr";

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "unknown";

    // Anti-abuse rate limiting: 20 attempts per minute per IP
    const rate = checkRateLimit(`val_${ip}`, 20, 60000);
    if (!rate.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: "Too many verification requests. Please wait a moment and try again.",
        },
        { status: 429 }
      );
    }

    const body = await req.json().catch(() => null);
    if (!body) {
      return NextResponse.json(
        { success: false, error: "Invalid request payload." },
        { status: 400 }
      );
    }

    const { name, rollNumber } = body;

    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: "Please enter your name." },
        { status: 400 }
      );
    }

    if (!rollNumber || typeof rollNumber !== "string" || rollNumber.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: "Please enter your roll number." },
        { status: 400 }
      );
    }

    const cleanRoll = rollNumber.trim().toUpperCase();
    const cleanName = name.trim();

    // Check authorization strictly against the authorized student database
    const authResult = checkRollNumberAuthorization(cleanRoll);

    if (!authResult.authorized || !authResult.student) {
      return NextResponse.json(
        {
          success: false,
          error: "Invitation unavailable. Please enter a valid authorized roll number.",
        },
        { status: 403 }
      );
    }

    // Generate secure non-guessable invitation token
    const token = generateSecureInvitationToken();

    // Save invitation pass in database for verification lookup
    saveInvitationPass({
      token,
      rollNumber: cleanRoll,
      studentName: cleanName,
      department: authResult.student.department,
      createdAt: new Date().toISOString(),
    });

    // Determine base URL dynamically so it works in production, LAN testing, and local development
    const host = req.headers.get("x-forwarded-host") || req.headers.get("host");
    const proto = req.headers.get("x-forwarded-proto") || (host && host.includes("localhost") ? "http" : "https");
    let baseUrl = process.env.NEXT_PUBLIC_APP_URL;
    if (host && (!baseUrl || (baseUrl.includes("localhost") && !host.includes("localhost")))) {
      baseUrl = `${proto}://${host}`;
    } else if (!baseUrl && host) {
      baseUrl = `${proto}://${host}`;
    } else if (!baseUrl) {
      baseUrl = "http://localhost:3000";
    }
    const verificationUrl = `${baseUrl}/invitation/${token}`;

    // Generate QR code data URL for instant live preview
    const qrCodeUrl = await generateQrDataUrl(verificationUrl);

    // Log the generation for audit trail
    logInvitation(cleanRoll, cleanName, ip);

    return NextResponse.json({
      success: true,
      data: {
        rollNumber: cleanRoll,
        name: cleanName,
        department: authResult.student.department,
        batch: authResult.student.batch,
        event: "NEXORA - FRESHERS PARTY 2K26",
        date: "13th October 2026",
        time: "9:30 AM Onwards",
        venue: "YNS Auditorium",
        token,
        verificationUrl,
        qrCodeUrl,
      },
    });
  } catch (error) {
    console.error("API error during invitation validation:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Something went wrong while generating your invitation. Please try again.",
      },
      { status: 500 }
    );
  }
}
