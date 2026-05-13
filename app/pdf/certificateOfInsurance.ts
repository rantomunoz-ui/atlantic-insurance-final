import { jsPDF } from "jspdf";
import QRCode from "qrcode";

export interface CertificateData {
  certificateNumber: string;
  policyNumber: string;
  policyholderName: string;
  commencementDate: string;
  expiryDate: string;
  makeModel: string;
  vehicleType: string;
  yearManufactured: string;
  vin: string;
  licensePlate: string;
  coverageType: string;
  premium?: string;
  paymentConfirmation?: string;
  coveragePeriod?: string;
  color?: string;
}

function formatDate(value: string): string {
  return new Date(value).toLocaleDateString("en-BZ", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatIssuedDateTime(): string {
  return new Date().toLocaleString("en-BZ", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

function drawWrappedText(
  doc: jsPDF,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight = 4
): number {
  const lines = doc.splitTextToSize(text, maxWidth);
  doc.text(lines, x, y);
  return y + lines.length * lineHeight;
}

export async function generateCertificateOfInsurance(
  data: CertificateData
) {
  const doc = new jsPDF("p", "mm", "letter");

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 8;
  const contentWidth = pageWidth - margin * 2;

  // ===========================================================================
  // QR CODE
  // ===========================================================================
  const encodedData = encodeURIComponent(JSON.stringify(data));
  const verificationUrl =
    `https://atlantic-insurance-final.vercel.app/verify?data=${encodedData}`;

  // Higher quality QR code
  const qrDataUrl = await QRCode.toDataURL(verificationUrl, {
    errorCorrectionLevel: "H",
    margin: 1,
    width: 800,
    color: {
      dark: "#000000",
      light: "#FFFFFF",
    },
  });

  // ===========================================================================
  // LOGO
  // ===========================================================================
  try {
    // Move further left and make slightly larger
    doc.addImage("/logo.png", "PNG", 1, 4, 46, 18);
  } catch {
    // Continue without logo if not found
  }

  // ===========================================================================
  // QR CODE TOP RIGHT
  // ===========================================================================
  const qrSize = 26;
  doc.addImage(
    qrDataUrl,
    "PNG",
    pageWidth - qrSize - 6,
    4,
    qrSize,
    qrSize
  );

  // ===========================================================================
  // HEADER
  // ===========================================================================
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text("BELIZE", pageWidth / 2, 8, { align: "center" });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text(
    "MOTOR VEHICLE INSURANCE (THIRD PARTY RISKS) ACT, 2000",
    pageWidth / 2,
    15,
    { align: "center" }
  );

  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text("CERTIFICATE OF INSURANCE", pageWidth / 2, 23, {
    align: "center",
  });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text(
    `Certificate Number: ${data.certificateNumber}`,
    margin,
    34
  );

  // Base font size for sections 1–8
  const sectionTitleSize = 10;
  const bodyFontSize = 8;

  // ===========================================================================
  // BOX 1–4
  // ===========================================================================
  let y = 40;

  doc.rect(margin, y, contentWidth, 22);

  // Dividing lines
  doc.line(
    margin + contentWidth / 2,
    y,
    margin + contentWidth / 2,
    y + 22
  );
  doc.line(margin, y + 11, margin + contentWidth, y + 11);

  // Section 1
  doc.setFont("helvetica", "bold");
  doc.setFontSize(sectionTitleSize);
  doc.text("1. Name of Policyholder:", margin + 3, y + 6);

  doc.setFont("helvetica", "normal");
  doc.text(data.policyholderName || "", margin + 48, y + 6);

  // Section 2
  doc.setFont("helvetica", "bold");
  doc.text(
    "2. Policy No.:",
    margin + contentWidth / 2 + 3,
    y + 6
  );

  doc.setFont("helvetica", "normal");
  doc.text(
    data.policyNumber || "",
    margin + contentWidth / 2 + 35,
    y + 6
  );

  // Section 3
  doc.setFont("helvetica", "bold");
  doc.text("3. Date of Insured:", margin + 3, y + 17);

  doc.setFont("helvetica", "normal");
  doc.text(
    formatDate(data.commencementDate),
    margin + 48,
    y + 17
  );

  // Section 4
  doc.setFont("helvetica", "bold");
  doc.text(
    "4. Expiration Date:",
    margin + contentWidth / 2 + 3,
    y + 17
  );

  doc.setFont("helvetica", "normal");
  doc.text(
    formatDate(data.expiryDate),
    margin + contentWidth / 2 + 40,
    y + 17
  );

  // ===========================================================================
  // SECTION 4 - VEHICLE(S) COVERED
  // ===========================================================================
  y += 22;
  doc.rect(margin, y, contentWidth, 24); // Reduced height

  doc.setFont("helvetica", "bold");
  doc.setFontSize(sectionTitleSize);
  doc.text("4. Vehicle(s) Covered", margin + 3, y + 5);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(bodyFontSize);

  // Compact rows
  const row1 = y + 11;
  const row2 = y + 16;
  const row3 = y + 21;

  // Left column
  doc.text("Make & Model:", margin + 5, row1);
  doc.text(data.makeModel || "", margin + 35, row1);

  doc.text("Year:", margin + 5, row2);
  doc.text(data.yearManufactured || "", margin + 35, row2);

  doc.text("Type of Vehicle:", margin + 5, row3);
  doc.text(data.vehicleType || "", margin + 35, row3);

  // Right column
  doc.text("VIN#:", margin + 95, row1);
  doc.text(data.vin || "", margin + 110, row1);

  doc.text("License Plate No.:", margin + 95, row2);
  doc.text(data.licensePlate || "N/A", margin + 130, row2);

  doc.text("Color:", margin + 95, row3);
  doc.text(data.color || "", margin + 110, row3);

  // ===========================================================================
  // SECTION 5 - TYPE OF COVERAGE
  // ===========================================================================
  y += 24; // Exactly the height of Section 4 (no gap)
  doc.rect(margin, y, contentWidth, 16);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(sectionTitleSize);
  doc.text("5. Type of Coverage:", margin + 3, y + 6);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(bodyFontSize);
  doc.text(
    data.coverageType || "THIRD PARTY ACT",
    margin + 55,
    y + 6
  );

  doc.text(
    `Coverage Period: ${data.coveragePeriod || "3 Months"}`,
    margin + 3,
    y + 13
  );

  doc.text(
    `Premium: BZD ${data.premium || "0.00"}`,
    margin + 100,
    y + 13
  );

  // ===========================================================================
  // SECTION 6 - LIMITS OF LIABILITY
  // ===========================================================================
  y += 16; // Exactly the height of Section 5 (no gap)
  doc.rect(margin, y, contentWidth, 30);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(sectionTitleSize);
  doc.text("6. Limits of Liability", margin + 3, y + 6);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(bodyFontSize);

  doc.text(
    "i. Liability for death or bodily injury BZ$ 50,000.00 in respect of any one claim by any one person.",
    margin + 6,
    y + 12
  );

  doc.text(
    "ii. Liability for death or bodily injury BZ$ 200,000.00 in respect of the total claims arising from any one accident.",
    margin + 6,
    y + 18
  );

  doc.text(
    "iii. Liability of BZ$ 20,000.00 for damage to any property arising from one accident.",
    margin + 6,
    y + 24
  );

  // ===========================================================================
  // SECTION 7 - PERSONS ENTITLED TO DRIVE
  // ===========================================================================
  y += 30;
  doc.rect(margin, y, contentWidth, 58);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(sectionTitleSize);
  doc.text(
    "7. Persons or Classes of Person Entitled to Drive",
    margin + 3,
    y + 6
  );

  doc.setFont("helvetica", "normal");
  doc.setFontSize(bodyFontSize);

  let textY = y + 12;

  textY = drawWrappedText(
    doc,
    "As defined in A, E, F below, provided that the person driving holds a valid driver's licence qualifying to drive the vehicle and is driving with the Policyholder's permission.",
    margin + 6,
    textY,
    contentWidth - 12,
    4
  );

  textY += 4;

  doc.text("A  The Policyholder.", margin + 6, textY);
  doc.text("D  Any person.", margin + 100, textY);

  textY += 8;
  doc.text(
    "B  The Policyholder, who may also drive a private motor car.",
    margin + 6,
    textY
  );
  doc.text("E  Named Driver(s).", margin + 100, textY);

  textY += 8;
  doc.text(
    "C  The Policyholder, who may also drive a private motor car.",
    margin + 6,
    textY
  );

  // Align F with C
  drawWrappedText(
    doc,
    "F  Any person in the policyholder's employ whilst the vehicle is being used for the Policyholder's business.",
    margin + 100,
    textY,
    70,
    4
  );

  // ===========================================================================
  // SECTION 8 - LIMITATION AS TO USE
  // ===========================================================================
  y += 58;
  doc.rect(margin, y, contentWidth, 42);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(sectionTitleSize);
  doc.text("8. Limitation as to Use", margin + 3, y + 6);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(bodyFontSize);

  let useY = y + 12;

  useY = drawWrappedText(
    doc,
    "As defined below, but excluding use for racing, pacemaking, speed-testing or reliability trials.",
    margin + 6,
    useY,
    contentWidth - 12,
    4
  );

  useY += 4;
  doc.text("G  Social, Domestic and Pleasure Purposes.", margin + 6, useY);
  doc.text("J  Use for the Policyholder's business.", margin + 100, useY);

  useY += 8;
  doc.text(
    "H  By Policyholder, in person in connection with business.",
    margin + 6,
    useY
  );
  doc.text("K  Official use by the Policyholder.", margin + 100, useY);

  useY += 8;
  doc.text(
    "I  For the business of the Policyholder as a farmer.",
    margin + 6,
    useY
  );

 // ===========================================================================
// EXCLUSIONS SECTION
// ===========================================================================

y += 42; 

const exclusionsHeight = 28;
doc.rect(margin, y, contentWidth, exclusionsHeight);

// Title
doc.setFont("helvetica", "bold");
doc.setFontSize(sectionTitleSize);
doc.text("EXCLUSIONS", pageWidth / 2, y + 6, {
  align: "center",
});

// Content
doc.setFont("helvetica", "normal");
doc.setFontSize(bodyFontSize);

// Left column
doc.text(
  "L  Conveyance of passengers for hire or reward.",
  margin + 6,
  y + 12
);

doc.text(
  "M  Use for commercial traveling or Motor Trade.",
  margin + 6,
  y + 18
);

doc.text(
  "N  Use for hire or reward.",
  margin + 6,
  y + 24
);

// Right column
doc.text(
  "O  Use whilst drawing a trailer except where permitted.",
  margin + 100,
  y + 12
);

doc.text(
  "P  Use for Agriculture or Forestry purposes.",
  margin + 100,
  y + 18
);

// ===========================================================================
// FOOTER
// Move footer below the EXCLUSIONS box.
// ===========================================================================

doc.setFont("helvetica", "bold");
doc.setFontSize(9);

doc.text(
  "This Certificate of Insurance is valid for 24 hours from time issued.",
  margin,
  y + exclusionsHeight + 8
);

doc.setFont("helvetica", "normal");
doc.text(
  `Issued on: ${formatIssuedDateTime()}`,
  pageWidth - margin,
  y + exclusionsHeight + 8,
  { align: "right" }
);
