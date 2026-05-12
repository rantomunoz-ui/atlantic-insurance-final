import { jsPDF } from "jspdf";

export function generateClientDataForm(data: any) {
  const doc = new jsPDF();
  doc.text("Client Data Form", 20, 20);
  doc.save("client-data-form.pdf");
}
