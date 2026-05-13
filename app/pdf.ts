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

// Calculate expiry date based on selected coverage period
switch (formData.coverage) {
  case "3 Months":
    expiryDate.setMonth(expiryDate.getMonth() + 3);
    break;

  case "6 Months":
    expiryDate.setMonth(expiryDate.getMonth() + 6);
    break;

  case "9 Months":
    expiryDate.setMonth(expiryDate.getMonth() + 9);
    break;

  case "12 Months":
    expiryDate.setMonth(expiryDate.getMonth() + 12);
    break;

  default:
    expiryDate.setMonth(expiryDate.getMonth() + 3);
    break;
}

  // Generate certificate
  await generateCertificateOfInsurance({
    certificateNumber: `ONLINE-${Math.floor(10000 + Math.random() * 90000)}`,
    policyNumber: `BN.${Math.floor(
  1000 + Math.random() * 9000
)}.${new Date().getFullYear()}`,
    policyholderName: insuredName,
    commencementDate: commencementDate.toISOString(),
    expiryDate: expiryDate.toISOString(),

    makeModel: `${formData.make || ""} ${formData.model || ""}`.trim(),
    vehicleType: formData.vehicleType || "",
    yearManufactured: formData.yearManufactured || "",
    vin: formData.registryNo || "",
    licensePlate: formData.licensePlate || "",

    coverageType:
      "THIRD PART ACT",

    premium,
    paymentConfirmation: formData.paymentCode || "",
  });
}
