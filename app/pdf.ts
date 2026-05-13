import { generateCertificateOfInsurance } from "./pdf/certificateOfInsurance";

export async function generatePdf(data: string, premium: string) {
  const formData = JSON.parse(data);

  // Determine insured name
  const insuredName =
    formData.companyName?.trim() !== ""
      ? formData.companyName
      : `${formData.firstName || ""} ${formData.middleName || ""} ${formData.surname || ""}`
          .replace(/\s+/g, " ")
          .trim();

  // Policy dates
  const commencementDate = new Date();
  const expiryDate = new Date();
  expiryDate.setFullYear(expiryDate.getFullYear() + 1);

  // Generate certificate
  await generateCertificateOfInsurance({
    certificateNumber: `C-${Math.floor(10000 + Math.random() * 90000)}`,
    policyNumber: `BN.${new Date().getFullYear()}.${Math.floor(
      1000 + Math.random() * 9000
    )}`,
    policyholderName: insuredName,
    commencementDate: commencementDate.toISOString(),
    expiryDate: expiryDate.toISOString(),

    makeModel: `${formData.make || ""} ${formData.model || ""}`.trim(),
    vehicleType: formData.vehicleType || "",
    yearManufactured: formData.yearManufactured || "",
    vin: formData.registryNo || "",
    licensePlate: formData.licensePlate || "",

    coverageType:
      "COMPREHENSIVE WITH HURRICANE, PASSENGER LIABILITY",

    premium,
    paymentConfirmation: formData.paymentCode || "",
  });
}
