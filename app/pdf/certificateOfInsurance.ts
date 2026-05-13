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
}

function formatDate(value: string): string {
  return new Date(value).toLocaleDateString("en-BZ", {
    day: "numeric",
    month: "long",
    year: "numeric",
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
  const margin = 10;
  const contentWidth = pageWidth - margin * 2;

  // ===========================================================================
  // QR CODE URL
  // ===========================================================================
  const encodedData = encodeURIComponent(JSON.stringify(data));
  const verificationUrl =
    `https://atlantic-insurance-final.vercel.app/verify?data=${encodedData}`;

  const qrDataUrl = await QRCode.toDataURL(verificationUrl, {
    width: 400,
    margin: 1,
  });

  // ===========================================================================
  // LOGO
  // ===========================================================================
  // Uses /public/logo.png
  try {
    doc.addImage("/logo.png", "PNG", margin + 2, 4, 52, 20);
  } catch {
    // If logo cannot be loaded, continue without it.
  }

// ===========================================================================
// COUNTRY TITLE
// ===========================================================================
doc.setFont("helvetica", "bold");
doc.setFontSize(14);
doc.text("BELIZE", pageWidth / 2, 10, {
  align: "center",
});
 
  // ===========================================================================
  // HEADER
  // ===========================================================================
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text(
    "MOTOR VEHICLE INSURANCE (THIRD PARTY RISKS) ACT, 2000",
    pageWidth / 2,
    18,
    { align: "center" }
  );

  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text("CERTIFICATE OF INSURANCE", pageWidth / 2, 24, {
    align: "center",
  });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text(
    `Certificate Number: ${data.certificateNumber}`,
    margin,
    38
  );

  // ===========================================================================
  // BOX 1–4
  // ===========================================================================
  let y = 44;

  doc.rect(margin, y, contentWidth, 22);

  // Vertical center line
  doc.line(margin + contentWidth / 2, y, margin + contentWidth / 2, y + 22);

  // Horizontal center line
  doc.line(margin, y + 11, margin + contentWidth, y + 11);

  // 1
  doc.setFont("helvetica", "bold");
  doc.text("1. Name of Policyholder:", margin + 3, y + 6);
  doc.setFont("helvetica", "normal");
  doc.text(data.policyholderName, margin + 48, y + 6);

  // 2
  doc.setFont("helvetica", "bold");
  doc.text("2. Policy No.:", margin + contentWidth / 2 + 3, y + 6);
  doc.setFont("helvetica", "normal");
  doc.text(
    data.policyNumber,
    margin + contentWidth / 2 + 35,
    y + 6
  );

  // 3
  doc.setFont("helvetica", "bold");
  doc.text("3. Date of Insured:", margin + 3, y + 17);
  doc.setFont("helvetica", "normal");
  doc.text(
    formatDate(data.commencementDate),
    margin + 48,
    y + 17
  );

  // 4
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
  // BOX 5
  // ===========================================================================
  y += 22;
  doc.rect(margin, y, contentWidth, 40);

  doc.setFont("helvetica", "bold");
  doc.text("4. Vehicle(s) Covered", margin + 2, y + 6);

  doc.setFont("helvetica", "normal");
  doc.text("Make & Model:", margin + 5, y + 14);
  doc.text(data.makeModel, margin + 35, y + 14);

  doc.text("VIN#:", margin + 95, y + 14);
  doc.text(data.vin, margin + 110, y + 14);

  doc.text("Year:", margin + 5, y + 22);
  doc.text(data.yearManufactured, margin + 35, y + 22);

  doc.text("License Plate No.:", margin + 95, y + 22);
  doc.text(data.licensePlate || "N/A", margin + 130, y + 22);

  doc.text("Type of Vehicle:", margin + 5, y + 30);
  doc.text(data.vehicleType, margin + 35, y + 30);

  doc.text("Color:", margin + 95, y + 30);
  doc.text("", margin + 110, y + 30);

  // ===========================================================================
  // BOX 5 TYPE OF COVERAGE
  // ===========================================================================
  y += 40;
  doc.rect(margin, y, contentWidth, 20);

  doc.setFont("helvetica", "bold");
  doc.text("5. Type of Coverage:", margin + 3, y + 7);

  doc.setFont("helvetica", "normal");
  doc.text(data.coverageType, margin + 55, y + 7);

  doc.text(
    `Coverage Period: ${data.coveragePeriod || "3 Months"}`,
    margin + 3,
    y + 15
  );

  doc.text(
    `Premium: BZD ${data.premium || "0.00"}`,
    margin + 100,
    y + 15
  );

  // ===========================================================================
  // BOX 6 LIMITS OF LIABILITY
  // ===========================================================================
  y += 26;
  doc.rect(margin, y, contentWidth, 26);

  doc.setFont("helvetica", "bold");
  doc.text("6. Limits of Liability", margin + 3, y + 6);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);

  doc.text(
    "i. Liability for death or bodily injury BZ$ 50,000.00 in respect of any one claim by any one person.",
    margin + 6,
    y + 12
  );

  doc.text(
    "ii. Liability for death or bodily injury BZ$ 200,000.00 in respect of the total claims arising from any one accident.",
    margin + 6,
    y + 17
  );

  doc.text(
    "iii. Liability of BZ$ 20,000.00 for damage to any property arising from one accident.",
    margin + 6,
    y + 22
  );

  // ===========================================================================
  // BOX 7 PERSONS ENTITLED TO DRIVE
  // ===========================================================================
  y += 26;
  doc.rect(margin, y, contentWidth, 58);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text(
    "7. Persons or Classes of Person Entitled to Drive",
    margin + 3,
    y + 6
  );

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);

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

  textY += 8;
  drawWrappedText(
    doc,
    "F  Any person in the policyholder's employ whilst the vehicle is being used for the Policyholder's business.",
    margin + 100,
    textY,
    70,
    4
  );

  // ===========================================================================
  // BOX 8 LIMITATION AS TO USE
  // ===========================================================================
  y += 58;
  doc.rect(margin, y, contentWidth, 42);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text("8. Limitation as to Use", margin + 3, y + 6);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);

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
  // EXCLUSIONS
  // ===========================================================================
  y += 42;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text("EXCLUSIONS", pageWidth / 2, y + 6, { align: "center" });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);

  doc.text("L  Conveyance of passengers for hire or reward.", margin + 6, y + 12);
  doc.text(
    "O  Use whilst drawing a trailer except where permitted.",
    margin + 100,
    y + 12
  );

  doc.text(
    "M  Use for commercial traveling or Motor Trade.",
    margin + 6,
    y + 18
  );

  doc.text(
    "P  Use for Agriculture or Forestry purposes.",
    margin + 100,
    y + 18
  );

  doc.text("N  Use for hire or reward.", margin + 6, y + 24);

  // ===========================================================================
  // FOOTER CERTIFICATION
  // ===========================================================================
  y += 34;

  doc.setFontSize(8);
  drawWrappedText(
    doc,
    "We hereby certify that a Policy of Insurance required by the Motor Vehicle Insurance (Third Party Risks) Act, 2000 has been issued.",
    margin,
    y,
    120,
    4
  );

  // ===========================================================================
  // QR CODE
  // ===========================================================================
  const qrSize = 24;
  doc.addImage(
    qrDataUrl,
    "PNG",
    pageWidth - margin - qrSize - 2,
    pageHeight - 40,
    qrSize,
    qrSize
  );

  // ===========================================================================
  // SAVE
  // ===========================================================================
  doc.save(`Certificate_of_Insurance_${data.certificateNumber}.pdf`);
}
