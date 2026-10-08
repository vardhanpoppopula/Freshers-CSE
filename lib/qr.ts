import QRCode from "qrcode";
import crypto from "crypto";

export function generateSecureInvitationToken(): string {
  return `nx26_${crypto.randomBytes(18).toString("hex")}`;
}

export async function generateQrPngBuffer(url: string): Promise<Buffer> {
  return await QRCode.toBuffer(url, {
    errorCorrectionLevel: "H",
    type: "png",
    margin: 1,
    width: 320,
    color: {
      dark: "#050b18",
      light: "#ffffff",
    },
  });
}

export async function generateQrDataUrl(url: string): Promise<string> {
  return await QRCode.toDataURL(url, {
    errorCorrectionLevel: "H",
    margin: 1,
    width: 320,
    color: {
      dark: "#050b18",
      light: "#ffffff",
    },
  });
}
