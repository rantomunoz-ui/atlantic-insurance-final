import { jsPDF } from "jspdf";

export function generateCertificateOfInsurance(data: any) {
  const doc = new jsPDF("p", "mm", "letter");

  // Helper to format dates
  const formatDate = (date: Date) =>
    date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });

  // Calculate dates
  const startDate = new Date();

  const monthsToAdd =
    data.coverage === "3 Months"
      ? 3
      : data.coverage === "6 Months"
      ? 6
      : data.coverage === "9 Months"
      ? 9
      : 12;

  const expiryDate = new Date(startDate);
  expiryDate.setMonth(expiryDate.getMonth() + monthsToAdd);
expiryDate.setDate(expiryDate.getDate() - 1);

  // Basic values
  const issueDate = formatDate(startDate);
  const commencementDate = formatDate(startDate);
  const expirationDate = formatDate(expiryDate);

  const certificateNo =
    data.certificateNo ||
    "C-" + Math.floor(10000 + Math.random() * 90000);

  const policyNo = data.policyNo || "PE.11.0011.2026";

  const insuredName =
    `${data.firstName || ""} ${data.middleName || ""} ${
      data.surname || ""
    }`.trim() || data.companyName || "";

  const coverageType =
    data.coverageType ||
    "THIRD PARTY ACT";

  const makeModel = `${data.make || ""} ${data.model || ""}`.trim();

  // ===== HEADER =====
  const img = new Image();
img.src = "/logo.png";

img.onload = () => {
  // Add logo
  doc.addImage(img, "PNG", 15, 5, 70, 20);

  // Certificate title
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text("CERTIFICATE OF INSURANCE", 105, 32, {
    align: "center",
  });

  // Subtitle
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text(
    "MOTOR VEHICLE INSURANCE (THIRD PARTY RISKS) ACT, 2000",
    105,
    24,
    { align: "center" }
  );


  // ===== CERTIFICATE INFO =====
  doc.setFontSize(10);
  doc.text(`Certificate Number: ${certificateNo}`, 15, 42);
  doc.text(`Policy No.: ${policyNo}`, 110, 42);

  // ===== SECTION 1 =====
  doc.rect(15, 48, 180, 10);
  doc.text("1. Name of Policyholder", 17, 54);
  doc.text(insuredName, 80, 54);

  // ===== SECTION 2 =====
  doc.rect(15, 58, 180, 10);
  doc.text("2. Date of Commencement of Insurance", 17, 64);
  doc.text(commencementDate, 110, 64);

  // ===== SECTION 3 =====
  doc.rect(15, 68, 180, 10);
  doc.text("3. Date of Expiry of Insurance", 17, 74);
  doc.text(expirationDate, 110, 74);

  // ===== SECTION 4 =====
  doc.rect(15, 78, 180, 30);
  doc.text("4. Vehicle(s) Covered", 17, 84);
  doc.text(`Make & Model: ${makeModel}`, 20, 91);
  doc.text(`Year: ${data.yearManufactured || ""}`, 20, 97);
  doc.text(`Type of Vehicle: ${data.type || ""}`, 20, 103);
  doc.text(`VIN#: ${data.registryNo || ""}`, 100, 91);
  doc.text(`License Plate No.: ${data.licensePlate || ""}`, 100, 97);
  doc.text(`Color: ${data.color || ""}`, 100, 103);

  // ===== SECTION 5 =====
  doc.rect(15, 108, 180, 20);
  doc.text("5. Type of Coverage", 17, 114);
  doc.text(coverageType, 80, 114);
  doc.text(`Coverage Period: ${data.coverage || ""}`, 17, 121);
  doc.text(`Premium: BZD ${(data.premium ?? 0).toFixed(2)}`, 110, 121);

  // ===== SECTION 6 =====
  doc.rect(15, 128, 180, 24);
  doc.text("6. Limits of Liability", 17, 134);

  doc.setFontSize(8);
  doc.text(
    "i. Liability for death or bodily injury BZ$ 50,000.00 in respect of any one claim by any one person.",
    20,
    140
  );
  doc.text(
    "ii. Liability for death or bodily injury BZ$ 200,000.00 in respect of the total claims arising from any one accident.",
    20,
    145
  );
  doc.text(
    "iii. Liability of BZ$ 20,000.00 for damage to any property arising from any one accident.",
    20,
    150
  );

  // ===== SECTION 7 =====
  doc.setFontSize(10);
  doc.rect(15, 152, 180, 55);
  doc.text("7. Persons or Classes of Person Entitled to Drive", 17, 158);

  doc.setFontSize(8);
  doc.text(
    "As defined in A, E, F below, provided that the person driving holds a valid driver's",
    20,
    164
  );
  doc.text(
    "license qualifying to drive the vehicle and is driving with the Policyholder's permission.",
    20,
    168
  );

  doc.text("A  The Policyholder.", 20, 176);
  doc.text("D  Any person.", 110, 176);

  doc.text(
    "B  The Policyholder, who may also drive a private motor car",
    20,
    184
  );
  doc.text("E  Named Driver(s).", 110, 184);

  doc.text(
    "C  The Policyholder, who may also drive a private motor car",
    20,
    192
  );
  doc.text(
    "F  Any person in the policyholder's employ whilst the vehicle",
    110,
    192
  );
  doc.text(
    "   is being used for the Policyholder's business.",
    110,
    196
  );

  // ===== SECTION 8 =====
  doc.rect(15, 207, 180, 38);
  doc.setFontSize(10);
  doc.text("8. Limitation as to Use", 17, 213);

  doc.setFontSize(8);
  doc.text(
    "As defined below, but excluding use for racing, pacemaking, speed-testing or reliability trials.",
    20,
    219
  );

  doc.text("G  Social, Domestic and Pleasure Purposes.", 20, 227);
  doc.text("J  Use for the Policyholder's business.", 110, 227);

  doc.text(
    "H  By Policyholder, in person in connection with business.",
    20,
    233
  );
  doc.text(
    "K  Official use by the Policyholder.",
    110,
    233
  );

  doc.text(
    "I  For the business of the Policyholder as a farmer.",
    20,
    239
  );

  // ===== EXCLUSIONS =====
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.text("EXCLUSIONS", 105, 249, { align: "center" });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);

  doc.text("L  Conveyance of passengers for hire or reward.", 20, 255);
  doc.text(
    "O  Use whilst drawing a trailer except where permitted.",
    110,
    255
  );

  doc.text(
    "M  Use for commercial traveling or Motor Trade.",
    20,
    261
  );
  doc.text(
    "P  Use for Agriculture or Forestry purposes.",
    110,
    261
  );

  doc.text("N  Use for hire or reward.", 20, 267);

  // ===== CERTIFICATION =====
  doc.setFontSize(8);
  doc.text(
    "We hereby certify that a Policy of Insurance required by the Motor Vehicle Insurance",
    15,
    273
  );
  doc.text(
    "(Third Party Risks) Act, 2000 has been issued.",
    15,
    277
  );

  // ===== SIGNATURE =====
  doc.setFontSize(9);
  doc.text(`Signed in Belize City on ${issueDate}`, 15, 284);

  const verificationUrl =
  "https://atlantic-insurance-final.vercel.app/verify?cert=" + certificateNo;

const qrUrl =
  "https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=" +
  encodeURIComponent(verificationUrl);

const qrImg = new Image();
qrImg.src = qrUrl;

qrImg.onload = () => {
  // Bottom-right corner
  doc.addImage(qrImg, "PNG", 165, 250, 25, 25);

  // ===== SAVE =====
  doc.save("certificate-of-insurance-" + Date.now() + ".pdf");
};
};
}  
