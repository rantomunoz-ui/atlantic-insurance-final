import { generateClientDataForm } from "./clientDataForm";
import { generateProposalForm } from "./proposalForm";
import { generatePolicySchedule } from "./policySchedule";
import { generateCertificateOfInsurance } from "./certificateOfInsurance";

export function generatePdf(title: string, data: any) {
  switch (title) {
    case "Client Data Form":
      generateClientDataForm(data);
      break;

    case "Proposal Form":
      generateProposalForm(data);
      break;

    case "Policy Schedule":
      generatePolicySchedule(data);
      break;

    case "Certificate of Insurance":
      generateCertificateOfInsurance(data);
      break;

    default:
      console.log("Unknown document:", title);
  }
}
