
import { jsPDF } from "jspdf";
import QRCode from "qrcode";

export interface CertificateData {
  certificateNumber: string;
  policyNumber: string;
  policyholderName: string;
  address?: string;

  commencementDate: string;
  expiryDate: string;

  makeModel: string;
  vehicleType: string;
  yearManufactured: string;
  vin: string;
  licensePlate: string;

  coverageType: string;
  territorialExtension?: string;
  timeOfPurchase?: string;

  authorizedDrivers?: string;
  limitationsAsToUse?: string;

  premium?: string;
  paymentConfirmation?: string;
}

function formatDate(value: string) {
  try {
    return new Date(value).toLocaleDateString("en-BZ", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return value;
  }
}

function addWrappedText(
  doc: jsPDF,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight = 5
) {
  const lines = doc.splitTextToSize(text, maxWidth);
  doc.text(lines, x, y);
  return y + lines.length * lineHeight;
}

export async function generateCertificateOfInsurance(
  data: CertificateData
) {
  const doc = new jsPDF("p", "mm", "letter");

  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 15;

  // ---------------------------------------------------------------------------
  // HEADER
  // ---------------------------------------------------------------------------
  // Logo
  // Make sure this file exists in /public/logo.png
  try {
    doc.addImage("/logo.png", "PNG", margin, 8, 42, 18);
  } catch {
    // If logo is unavailable, continue without failing.
  }

  // Company Info
  doc.setFont("times", "bold");
  doc.setFontSize(14);
  doc.text("ATLANTIC INSURANCE COMPANY LTD.", 60, 14);

  doc.setFont("times", "normal");
  doc.setFontSize(9);
  doc.text("P.O. BOX 1447, BELIZE CITY, BELIZE", 60, 19);

  // Certificate Number (top-right)
  doc.setFont("times", "bold");
  doc.setFontSize(10);
  doc.text(data.certificateNumber, pageWidth - margin, 14, {
    align: "right",
  });

  // Main Title
  doc.setFont("times", "bold");
  doc.setFontSize(16);
  doc.text("Certificate of Insurance", pageWidth / 2, 28, {
    align: "center",
  });

  doc.setFontSize(10);
  doc.text(
    "MOTOR VEHICLE INSURANCE (THIRD PARTY RISKS) ACT, 2000",
    pageWidth / 2,
    34,
    { align: "center" }
  );

  // ---------------------------------------------------------------------------
  // BASIC INFORMATION
  // ---------------------------------------------------------------------------
  let y = 42;

  doc.setFont("times", "normal");
  doc.setFontSize(9);

  doc.text("1. Name of policyholder", margin, y);
  doc.setFont("times", "bold");
  doc.text(data.policyholderName, 65, y);

  doc.setFont("times", "normal");
  doc.text("2. Policy No.", 135, y);
  doc.setFont("times", "bold");
  doc.text(data.policyNumber, 165, y);

  y += 7;

  doc.setFont("times", "normal");
  doc.text("3. Date of commencement of Insurance", margin, y);
  doc.setFont("times", "bold");
  doc.text(formatDate(data.commencementDate), 75, y);

  doc.setFont("times", "normal");
  doc.text("4. Date of expiry of Insurance", 135, y);
  doc.setFont("times", "bold");
  doc.text(formatDate(data.expiryDate), 170, y);

  // ---------------------------------------------------------------------------
  // VEHICLE DETAILS
  // ---------------------------------------------------------------------------
  y += 10;

  doc.setFont("times", "normal");
  doc.text("5. Vehicle(s) covered", margin, y);

  y += 6;
  doc.text("a) Make & Model:", margin + 5, y);
  doc.setFont("times", "bold");
  doc.text(data.makeModel, 50, y);

  doc.setFont("times", "normal");
  doc.text("Year:", 135, y);
  doc.setFont("times", "bold");
  doc.text(data.yearManufactured, 150, y);

  y += 6;
  doc.setFont("times", "normal");
  doc.text("b) Type of vehicle:", margin + 5, y);
  doc.setFont("times", "bold");
  doc.text(data.vehicleType, 50, y);

  doc.setFont("times", "normal");
  doc.text("Type of coverage:", 135, y);
  doc.setFont("times", "bold");
  doc.text(data.coverageType, 172, y);

  y += 6;
  doc.setFont("times", "normal");
  doc.text("VIN #:", margin + 5, y);
  doc.setFont("times", "bold");
  doc.text(data.vin, 50, y);

  doc.setFont("times", "normal");
  doc.text("License Plate No.:", 135, y);
  doc.setFont("times", "bold");
  doc.text(data.licensePlate || "N/A", 172, y);

  // ---------------------------------------------------------------------------
  // LIMITS OF LIABILITY
  // ---------------------------------------------------------------------------
  y += 12;

  doc.setFont("times", "bold");
  doc.text("6. Limits of Liability", margin, y);

  y += 6;
  doc.setFont("times", "normal");
  doc.text(
    "i. Liability for death or bodily injury BZ$50,000.00 in respect of any one claim by any one person.",
    margin + 5,
    y
  );

  y += 5;
  doc.text(
    "ii. Liability for death or bodily injury BZ$200,000.00 in respect of total claims arising from one accident.",
    margin + 5,
    y
  );

  y += 5;
  doc.text(
    "iii. Liability of BZ$20,000.00 for damage to property arising from one accident.",
    margin + 5,
    y
  );

  // ---------------------------------------------------------------------------
  // PERSONS ENTITLED TO DRIVE
  // ---------------------------------------------------------------------------
  y += 10;

  doc.setFont("times", "bold");
  doc.text("7. Persons or Classes of Person entitled to drive", margin, y);

  y += 5;
  doc.setFont("times", "normal");

  const driversText =
    data.authorizedDrivers ||
    "As defined in A, E, and F of the standard policy wording.";

  y = addWrappedText(doc, driversText, margin + 5, y, 180, 4.5);

  // ---------------------------------------------------------------------------
  // LIMITATION AS TO USE
  // ---------------------------------------------------------------------------
  y += 5;

  doc.setFont("times", "bold");
  doc.text("8. Limitation as to use", margin, y);

  y += 5;
  doc.setFont("times", "normal");

  const useText =
    data.limitationsAsToUse ||
    "Social, domestic and pleasure purposes and use for the policyholder's business, subject to policy terms and exclusions.";

  y = addWrappedText(doc, useText, margin + 5, y, 180, 4.5);

  // ---------------------------------------------------------------------------
  // CERTIFICATION STATEMENT
  // ---------------------------------------------------------------------------
  y += 8;

  const certificationText =
    "We hereby certify that a policy of insurance required by the Motor Vehicle Insurance (Third Party Risks) Act, 2000 has been issued.";

  y = addWrappedText(doc, certificationText, margin, y, 180, 4.5);

  // ---------------------------------------------------------------------------
  // SIGNATURE AREA REPLACED BY QR CODE
  // ---------------------------------------------------------------------------
  y += 12;

  doc.setFont("times", "normal");
  doc.text(
    `Signed in Belize City ${formatDate(new Date().toISOString())}`,
    margin,
    y
  );

  // Data encoded in QR code
  const qrPayload = JSON.stringify({
    certificateNumber: data.certificateNumber,
    policyNumber: data.policyNumber,
    policyholderName: data.policyholderName,
    commencementDate: data.commencementDate,
    expiryDate: data.expiryDate,
    makeModel: data.makeModel,
    vin: data.vin,
    licensePlate: data.licensePlate,
    coverageType: data.coverageType,
    generatedAt: new Date().toISOString(),
  });

  const qrDataUrl = await QRCode.toDataURL(qrPayload, {
    width: 300,
    margin: 1,
  });

  // QR Code positioned where signature would normally appear
  const qrSize = 30;
  doc.addImage(
    qrDataUrl,
    "PNG",
    pageWidth - margin - qrSize,
    y - 10,
    qrSize,
    qrSize
  );

  doc.setFontSize(8);
  doc.text(
    "Scan QR code to verify and recreate this certificate.",
    pageWidth - margin - qrSize / 2,
    y + 24,
    { align: "center" }
  );

  // ---------------------------------------------------------------------------
  // FOOTER
  // ---------------------------------------------------------------------------
  doc.setFontSize(7);
  doc.text(
    `Generated on ${new Date().toLocaleString("en-BZ")}`,
    margin,
    272
  );

  // Save PDF
  doc.save(`Certificate_of_Insurance_${data.certificateNumber}.pdf`);
}
