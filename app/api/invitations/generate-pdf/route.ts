import { NextRequest, NextResponse } from "next/server";
import { checkRollNumberAuthorization, getInvitationPassByToken, getInvitationPassByRoll } from "@/lib/db";
import { generateInvitationPdf } from "@/lib/pdf";
import { checkRateLimit } from "@/lib/rate-limit";

function sanitizeFilename(name: string): string {
  return name.replace(/[^a-zA-Z0-9_-]/g, "_").replace(/_+/g, "_");
}

function getBaseUrl(req: NextRequest): string {
  const host = req.headers.get("x-forwarded-host") || req.headers.get("host");
  const proto = req.headers.get("x-forwarded-proto") || (host && host.includes("localhost") ? "http" : "https");
  let baseUrl = process.env.NEXT_PUBLIC_APP_URL;

  if (host && (!baseUrl || (baseUrl.includes("localhost") && !host.includes("localhost")))) {
    return `${proto}://${host}`;
  }
  if (!baseUrl && host) {
    return `${proto}://${host}`;
  }
  return baseUrl || "http://localhost:3000";
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");
    let name = searchParams.get("name") || "";
    let rollNumber = searchParams.get("roll") || "";

    if (token) {
      const pass = getInvitationPassByToken(token);
      if (pass) {
        rollNumber = pass.rollNumber;
        name = pass.studentName;
      }
    }

    if (!rollNumber || !name) {
      return NextResponse.json(
        { error: "Roll number and name or valid token required." },
        { status: 400 }
      );
    }

    const cleanRoll = rollNumber.trim().toUpperCase();
    const cleanName = name.trim();

    // Re-verify roll number on server
    const authResult = checkRollNumberAuthorization(cleanRoll);
    if (!authResult.authorized) {
      return NextResponse.json(
        { error: "Invitation unavailable. Please enter a valid authorized roll number." },
        { status: 403 }
      );
    }

    const baseUrl = getBaseUrl(req);
    const existingPass = token ? getInvitationPassByToken(token) : getInvitationPassByRoll(cleanRoll);
    const finalToken = token || existingPass?.token;
    const verificationUrl = finalToken ? `${baseUrl}/invitation/${finalToken}` : undefined;

    const pdfBytes = await generateInvitationPdf({
      studentName: cleanName,
      rollNumber: cleanRoll,
      token: finalToken || undefined,
      verificationUrl,
    });

    const safeName = sanitizeFilename(cleanName);
    const filename = `NEXORA-Invitation-${safeName}.pdf`;

    return new NextResponse(Buffer.from(pdfBytes), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Cache-Control": "no-store, no-cache, must-revalidate",
      },
    });
  } catch (error) {
    console.error("GET PDF generation error:", error);
    return NextResponse.json({ error: "Failed to generate PDF" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "unknown";

    // Rate limit PDF generation: 15 per minute per IP
    const rate = checkRateLimit(`pdf_${ip}`, 15, 60000);
    if (!rate.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: "Rate limit exceeded. Please wait a moment before downloading again.",
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

    const { name, rollNumber, token } = body;

    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: "Name is required." },
        { status: 400 }
      );
    }

    if (!rollNumber || typeof rollNumber !== "string" || rollNumber.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: "Roll number is required." },
        { status: 400 }
      );
    }

    const cleanRoll = rollNumber.trim().toUpperCase();
    const cleanName = name.trim();

    // Critical security check: re-verify roll number on server
    const authResult = checkRollNumberAuthorization(cleanRoll);
    if (!authResult.authorized) {
      return NextResponse.json(
        {
          success: false,
          error: "Invitation unavailable. Please enter a valid authorized roll number.",
        },
        { status: 403 }
      );
    }

    const baseUrl = getBaseUrl(req);
    const existingPass = token ? getInvitationPassByToken(token) : getInvitationPassByRoll(cleanRoll);
    const finalToken = token || existingPass?.token;
    const verificationUrl = finalToken ? `${baseUrl}/invitation/${finalToken}` : undefined;

    const pdfBytes = await generateInvitationPdf({
      studentName: cleanName,
      rollNumber: cleanRoll,
      token: finalToken,
      verificationUrl,
    });

    const safeName = sanitizeFilename(cleanName);
    const filename = `NEXORA-Invitation-${safeName}.pdf`;

    return new NextResponse(Buffer.from(pdfBytes), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Cache-Control": "no-store, no-cache, must-revalidate",
      },
    });
  } catch (error) {
    console.error("PDF generation route error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Something went wrong while generating your invitation PDF. Please try again.",
      },
      { status: 500 }
    );
  }
}
