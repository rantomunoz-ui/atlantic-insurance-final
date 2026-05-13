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
}

function formatDate(value: string): string {
  return new Date(value).toLocaleDateString("en-BZ", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export async function generateCertificateOfInsurance(
  data: CertificateData
) {
  const doc = new jsPDF("p", "mm", "letter");

  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 15;

  // ===========================================================================
  // QR CODE CONTENT
  // ===========================================================================
  // The QR code contains a direct URL to your verification page.
  // When scanned, the URL can regenerate the same certificate PDF.
  //
  // IMPORTANT:
  // Replace https://yourdomain.com with your actual Vercel domain.
  //
  // Example:
  // https://atlantic-insurance-final.vercel.app/verify?data=...
  // ===========================================================================

  const encodedData = encodeURIComponent(JSON.stringify(data));

  const verificationUrl =
    `https://atlantic-insurance-final.vercel.app/verify?data=${encodedData}`;

  const qrDataUrl = await QRCode.toDataURL(verificationUrl, {
    width: 400,
    margin: 1,
  });

  // ===========================================================================
  // HEADER
  // ===========================================================================
  doc.setFont("times", "bold");
  doc.setFontSize(16);
  doc.text("ATLANTIC INSURANCE COMPANY LTD.", pageWidth / 2, 15, {
    align: "center",
  });

  doc.setFont("times", "normal");
  doc.setFontSize(10);
  doc.text("P.O. BOX 1447, BELIZE CITY, BELIZE", pageWidth / 2, 21, {
    align: "center",
  });

  doc.setFont("times", "bold");
  doc.setFontSize(11);
  doc.text(data.certificateNumber, pageWidth - 20, 15, {
    align: "right",
  });

  // ===========================================================================
  // TITLES
  // ===========================================================================
  doc.setFont("times", "bold");
  doc.setFontSize(18);
  doc.text("Certificate of Insurance", pageWidth / 2, 31, {
    align: "center",
  });

  doc.setFontSize(11);
  doc.text(
    "MOTOR VEHICLE INSURANCE (THIRD PARTY RISKS) ACT, 2000",
    pageWidth / 2,
    38,
    { align: "center" }
  );

  // ===========================================================================
  // SECTION 1 & 2
  // ===========================================================================
  let y = 48;

  doc.setFont("times", "normal");
  doc.setFontSize(10);

  doc.text("1. Name of policyholder", 15, y);
  doc.setFont("times", "bold");
  doc.text(data.policyholderName, 70, y);

  doc.setFont("times", "normal");
  doc.text("2. Policy No.", 125, y);
  doc.setFont("times", "bold");
  doc.text(data.policyNumber, 155, y);

  // ===========================================================================
  // SECTION 3 & 4
  // ===========================================================================
  y += 8;

  doc.setFont("times", "normal");
  doc.text("3. Date of commencement of Insurance", 15, y);
  doc.setFont("times", "bold");
  doc.text(formatDate(data.commencementDate), 78, y);

  doc.setFont("times", "normal");
  doc.text("4. Date of expiry of Insurance", 125, y);
  doc.setFont("times", "bold");
  doc.text(formatDate(data.expiryDate), 165, y);

  // ===========================================================================
  // SECTION 5
  // ===========================================================================
  y += 12;

  doc.setFont("times", "normal");
  doc.text("5. Vehicle(s) covered", 15, y);

  y += 8;
  doc.text("a) Make & Model:", 20, y);
  doc.setFont("times", "bold");
  doc.text(data.makeModel, 50, y);

  doc.setFont("times", "normal");
  doc.text("Year:", 125, y);
  doc.setFont("times", "bold");
  doc.text(data.yearManufactured, 140, y);

  y += 8;
  doc.setFont("times", "normal");
  doc.text("b) Type of vehicle:", 20, y);
  doc.setFont("times", "bold");
  doc.text(data.vehicleType, 50, y);

  doc.setFont("times", "normal");
  doc.text("Type of coverage:", 125, y);
  doc.setFont("times", "bold");
  doc.text(data.coverageType, 165, y, {
    maxWidth: 35,
  });

  y += 8;
  doc.setFont("times", "normal");
  doc.text("VIN #:", 20, y);
  doc.setFont("times", "bold");
  doc.text(data.vin, 50, y);

  doc.setFont("times", "normal");
  doc.text("License Plate No.:", 125, y);
  doc.setFont("times", "bold");
  doc.text(data.licensePlate || "N/A", 165, y);

  // ===========================================================================
  // SECTION 6
  // ===========================================================================
  y += 15;

  doc.setFont("times", "bold");
  doc.text("6. Limits of Liability", 15, y);

  doc.setFont("times", "normal");
  y += 7;
  doc.text(
    "i. Liability for death or bodily injury BZ$50,000.00 in respect of any one claim by any one person.",
    20,
    y,
    { maxWidth: 175 }
  );

  y += 6;
  doc.text(
    "ii. Liability for death or bodily injury BZ$200,000.00 in respect of total claims arising from one accident.",
    20,
    y,
    { maxWidth: 175 }
  );

  y += 6;
  doc.text(
    "iii. Liability of BZ$20,000.00 for damage to property arising from one accident.",
    20,
    y,
    { maxWidth: 175 }
  );

  // ===========================================================================
  // SECTION 7
  // ===========================================================================
  y += 15;

  doc.setFont("times", "bold");
  doc.text("7. Persons or Classes of Person entitled to drive", 15, y);

  y += 7;
  doc.setFont("times", "normal");
  doc.text(
    "As defined in A, E, and F of the standard policy wording.",
    20,
    y,
    { maxWidth: 175 }
  );

  // ===========================================================================
  // SECTION 8
  // ===========================================================================
  y += 15;

  doc.setFont("times", "bold");
  doc.text("8. Limitation as to use", 15, y);

  y += 7;
  doc.setFont("times", "normal");
  doc.text(
    "Social, domestic and pleasure purposes and use for the policyholder's business, subject to policy terms and exclusions.",
    20,
    y,
    { maxWidth: 175 }
  );

  // ===========================================================================
  // CERTIFICATION TEXT
  // ===========================================================================
  y += 20;

  doc.text(
    "We hereby certify that a policy of insurance required by the Motor Vehicle Insurance (Third Party Risks) Act, 2000 has been issued.",
    15,
    y,
    { maxWidth: 180 }
  );

  // ===========================================================================
  // SIGNED DATE
  // ===========================================================================
  y += 25;

  doc.text(
    `Signed in Belize City ${formatDate(new Date().toISOString())}`,
    15,
    y
  );

  // ===========================================================================
  // QR CODE (REPLACES SIGNATURE)
  // ===========================================================================
  const qrSize = 35;
  const qrX = pageWidth - margin - qrSize;
  const qrY = y - 10;

  doc.addImage(qrDataUrl, "PNG", qrX, qrY, qrSize, qrSize);

  doc.setFontSize(8);
  doc.text(
    "Scan QR code to download this certificate.",
    qrX + qrSize / 2,
    qrY + qrSize + 6,
    {
      align: "center",
      maxWidth: 50,
    }
  );

  // ===========================================================================
  // SAVE PDF
  // ===========================================================================
  doc.save(`Certificate_of_Insurance_${data.certificateNumber}.pdf`);
}
