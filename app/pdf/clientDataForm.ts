import { jsPDF } from "jspdf";

export function generateClientDataForm(data: any) {
  const doc = new jsPDF();

  doc.setFontSize(22);
  doc.text("Atlantic Insurance Company Ltd.", 20, 20);

  doc.setFontSize(18);
  doc.text("Client Data Form", 20, 35);

  doc.setFontSize(12);
  doc.text(`Coverage Period: ${data.coverage}`, 20, 55);
  doc.text(`Cylinders: ${data.cylinders}`, 20, 65);
  doc.text(`Premium: BZD ${data.premium.toFixed(2)}`, 20, 75);

  doc.save("client-data-form-" + Date.now() + ".pdf");
}
