import fs from "fs";
import path from "path";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { generateQrPngBuffer } from "./qr";

export interface GeneratePdfOptions {
  studentName: string;
  rollNumber: string;
  token?: string;
  verificationUrl?: string;
}

export async function generateInvitationPdf({
  studentName,
  rollNumber,
  token,
  verificationUrl,
}: GeneratePdfOptions): Promise<Uint8Array> {
  const templatePath = path.join(
    process.cwd(),
    "public",
    "assets",
    "invitation-template.png"
  );

  if (!fs.existsSync(templatePath)) {
    throw new Error("Invitation template asset not found");
  }

  const templateBytes = fs.readFileSync(templatePath);

  // Create a new PDF document
  const pdfDoc = await PDFDocument.create();

  // Embed the high-resolution PNG template
  const image = await pdfDoc.embedPng(templateBytes);
  const { width, height } = image; // 1024 x 1536

  // Add a page matching the template dimensions exactly
  const page = pdfDoc.addPage([width, height]);

  // Draw the full background poster
  page.drawImage(image, {
    x: 0,
    y: 0,
    width,
    height,
  });

  // Embed professional fonts
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);

  // Normalize text
  const cleanName = studentName.trim().toUpperCase();
  const cleanRoll = rollNumber.trim().toUpperCase();

  // Coordinates calibrated for the 1024x1536 template
  // Dotted lines: Name at y=1016 (PDF: 524), Roll at y=1068 (PDF: 472)
  const nameY = 524;
  const rollY = 472;
  const startX = 315;

  // Render Student Name (Dark luxury slate)
  const textColor = rgb(12 / 255, 21 / 255, 46 / 255);
  const goldColor = rgb(217 / 255, 119 / 255, 6 / 255);

  page.drawText(cleanName, {
    x: startX,
    y: nameY,
    size: 24,
    font: fontBold,
    color: textColor,
  });

  // Render Roll Number
  page.drawText(cleanRoll, {
    x: startX,
    y: rollY,
    size: 23,
    font: fontBold,
    color: textColor,
  });

  // Official Time Update: Seamless dark navy rectangle (matching background)
  page.drawRectangle({
    x: 456,
    y: 346,
    width: 152,
    height: 44,
    color: rgb(6 / 255, 13 / 255, 34 / 255),
  });
  page.drawText("9:30 AM", {
    x: 466,
    y: 368,
    size: 15,
    font: fontBold,
    color: rgb(1, 1, 1),
  });
  page.drawText("ONWARDS", {
    x: 466,
    y: 352,
    size: 12,
    font: fontBold,
    color: rgb(203 / 255, 213 / 255, 225 / 255),
  });

  // Embed Real Scannable QR Code
  const qrTarget =
    verificationUrl ||
    `https://nexora2k26.srivasaviengg.ac.in/invitation/${token || cleanRoll}`;

  try {
    const qrBuffer = await generateQrPngBuffer(qrTarget);
    const qrImage = await pdfDoc.embedPng(qrBuffer);

    const qrSize = 148;
    const qrX = 766;
    const qrY = 145;

    // Golden frame backdrop for QR
    page.drawRectangle({
      x: qrX - 6,
      y: qrY - 20,
      width: qrSize + 12,
      height: qrSize + 26,
      color: rgb(1, 1, 1),
      borderColor: goldColor,
      borderWidth: 2,
    });

    // Draw QR code image
    page.drawImage(qrImage, {
      x: qrX,
      y: qrY,
      width: qrSize,
      height: qrSize,
    });

    // Label below QR
    page.drawText("SCAN TO VERIFY PASS", {
      x: qrX + 12,
      y: qrY - 14,
      size: 9,
      font: fontBold,
      color: rgb(15 / 255, 23 / 255, 42 / 255),
    });
  } catch (qrErr) {
    console.error("Failed to embed QR code in PDF:", qrErr);
  }

  // Serialize PDF to bytes
  return await pdfDoc.save();
}
