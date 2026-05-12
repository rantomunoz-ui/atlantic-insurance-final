// app/pdf/certificateOfInsurance.ts

import { jsPDF } from "jspdf";

export function generateCertificateOfInsurance(data: any) {
  const doc = new jsPDF();

  // Header
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.text("ATLANTIC INSURANCE COMPANY LTD.", 105, 20, { align: "center" });

  doc.setFontSize(16);
  doc.text("CERTIFICATE OF INSURANCE", 105, 30, { align: "center" });

  // Certificate details
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);

  const issueDate = new Date().toLocaleDateString();

  doc.text(`Certificate No.: ATL-${Date.now()}`, 20, 45);
  doc.text(`Date Issued: ${issueDate}`, 20, 52);

  // Insured information
  doc.setFont("helvetica", "bold");
  doc.text("INSURED INFORMATION", 20, 68);

  doc.setFont("helvetica", "normal");
  doc.text(`Name: ${data.firstName || ""} ${data.middleName || ""} ${data.surname || ""}`.trim(), 20, 78);
  doc.text(`Company: ${data.companyName || ""}`, 20, 85);
  doc.text(`Address: ${data.homeAddress || ""}`, 20, 92);
  doc.text(`City/Town: ${data.city || ""}`, 20, 99);
  doc.text(`District: ${data.district || ""}`, 20, 106);
  doc.text(`Telephone: ${data.telephone || ""}`, 20, 113);
  doc.text(`Email: ${data.email || ""}`, 20, 120);

  // Vehicle information
  doc.setFont("helvetica", "bold");
  doc.text("VEHICLE INFORMATION", 20, 136);

  doc.setFont("helvetica", "normal");
  doc.text(`Make: ${data.make || ""}`, 20, 146);
  doc.text(`Model: ${data.model || ""}`, 20, 153);
  doc.text(`Year: ${data.yearManufactured || ""}`, 20, 160);
  doc.text(`License Plate: ${data.licensePlate || ""}`, 20, 167);
  doc.text(`VIN / Registry No.: ${data.registryNo || ""}`, 20, 174);
  doc.text(`Color: ${data.color || ""}`, 20, 181);
  doc.text(`Cylinders: ${data.cylinders || ""}`, 20, 188);

  // Policy information
  doc.setFont("helvetica", "bold");
  doc.text("POLICY INFORMATION", 20, 204);

  doc.setFont("helvetica", "normal");
  doc.text(`Coverage Period: ${data.coverage || ""}`, 20, 214);
  doc.text(
    `Premium: BZD ${(data.premium ?? 0).toFixed(2)}`,
    20,
    221
  );

  // Certification statement
  doc.setFontSize(10);
  doc.text(
    "This is to certify that the vehicle described above is insured",
    20,
    236
  );
  doc.text(
    "with Atlantic Insurance Company Ltd. subject to the terms",
    20,
    242
  );
  doc.text(
    "and conditions of the policy.",
    20,
    248
  );

  // Signature line
  doc.text("______________________________", 130, 260);
  doc.text("Authorized Signature", 145, 267);

  // Save file
  doc.save("certificate-of-insurance-" + Date.now() + ".pdf");
}
