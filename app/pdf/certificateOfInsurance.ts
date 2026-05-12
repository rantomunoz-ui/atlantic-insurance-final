import { jsPDF } from "jspdf";

export function generateCertificateOfInsurance(data: any) {
  const doc = new jsPDF("p", "mm", "letter");

  // ===== HEADER =====
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text("ATLANTIC INSURANCE COMPANY LTD.", 105, 12, { align: "center" });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text("P.O. BOX 1447, BELIZE CITY, BELIZE", 105, 17, {
    align: "center",
  });

  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text("CERTIFICATE OF INSURANCE", 105, 25, {
    align: "center",
  });

  doc.setFontSize(10);
  doc.text("MOTOR VEHICLE INSURANCE (THIRD PARTY RISKS) ACT, 2000", 105, 31, {
    align: "center",
  });

  // ===== CERTIFICATE INFO =====
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);

  const issueDate = new Date().toLocaleDateString();
  const certificateNo = "C-" + Math.floor(10000 + Math.random() * 90000);
  const policyNo = data.policyNo || "BN.11.2033.2024";

  doc.text(`Certificate Number: ${certificateNo}`, 15, 42);
  doc.text(`Policy No.: ${policyNo}`, 110, 42);

  // ===== SECTION 1 =====
  doc.rect(15, 48, 180, 10);
  doc.text("1. Name of Policyholder", 17, 54);
  doc.text(
    `${data.firstName || ""} ${data.middleName || ""} ${
      data.surname || ""
    }`.trim() || data.companyName || "",
    80,
    54
  );

  // ===== SECTION 2 =====
  doc.rect(15, 58, 180, 10);
  doc.text("2. Date of Commencement of Insurance", 17, 64);
  doc.text(data.startDate || issueDate, 110, 64);

  // ===== SECTION 3 =====
  doc.rect(15, 68, 180, 10);
  doc.text("3. Date of Expiry of Insurance", 17, 74);
  doc.text(data.expiryDate || "", 110, 74);

  // ===== SECTION 4 =====
  doc.rect(15, 78, 180, 30);
  doc.text("4. Vehicle(s) Covered", 17, 84);
  doc.text(`Make & Model: ${data.make || ""} ${data.model || ""}`, 20, 91);
  doc.text(`Year: ${data.yearManufactured || ""}`, 20, 97);
  doc.text(`Type of Vehicle: ${data.type || ""}`, 20, 103);
  doc.text(`VIN#: ${data.registryNo || ""}`, 100, 91);
  doc.text(`License Plate No.: ${data.licensePlate || ""}`, 100, 97);
  doc.text(`Color: ${data.color || ""}`, 100, 103);

  // ===== SECTION 5 =====
  doc.rect(15, 108, 180, 20);
  doc.text("5. Type of Coverage", 17, 114);
  doc.text(data.coverageType || "COMPREHENSIVE WITH HURRICANE", 80, 114);
  doc.text(`Coverage Period: ${data.coverage || ""}`, 17, 121);
  doc.text(`Premium: BZD ${(data.premium ?? 0).toFixed(2)}`, 110, 121);

  // ===== SECTION 6 =====
  doc.rect(15, 128, 180, 28);
  doc.text("6. Limits of Liability", 17, 134);
  doc.setFontSize(8);
  doc.text(
    "i. Liability for death or bodily injury: BZ$ 50,000.00 per person.",
    20,
    141
  );
  doc.text(
    "ii. Total claims arising from one accident: BZ$ 200,000.00.",
    20,
    146
  );
  doc.text(
    "iii. Damage to property arising from one accident: BZ$ 20,000.00.",
    20,
    151
  );

  // ===== SECTION 7 =====
  doc.setFontSize(10);
  doc.rect(15, 156, 180, 15);
  doc.text("7. Persons Entitled to Drive", 17, 162);
  doc.text(data.authorizedDrivers || "A, E, F", 90, 162);

  // ===== SECTION 8 =====
  doc.rect(15, 171, 180, 15);
  doc.text("8. Limitation as to Use", 17, 177);
  doc.text(data.limitations || "Social, Domestic and Pleasure Purposes", 90, 177);

  // ===== CERTIFICATION TEXT =====
  doc.setFontSize(8);
  doc.text(
    "We hereby certify that a Policy of Insurance required by the Motor Vehicle Insurance",
    15,
    196
  );
  doc.text(
    "(Third Party Risks) Act, 2000 has been issued.",
    15,
    201
  );

  // ===== SIGNATURE =====
  doc.setFontSize(10);
  doc.text(`Signed in Belize City on ${issueDate}`, 15, 215);

  doc.text("______________________________", 130, 225);
  doc.text("Atlantic Insurance Company Ltd.", 135, 231);

  // ===== SAVE =====
  doc.save("certificate-of-insurance-" + Date.now() + ".pdf");
}
