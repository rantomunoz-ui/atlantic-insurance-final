"use client";

import { useSearchParams } from "next/navigation";
import { generateCertificateOfInsurance } from "../pdf/certificateOfInsurance";

export default function VerifyPage() {
  const searchParams = useSearchParams();
  const cert = searchParams.get("cert");

  const handleDownload = () => {
    const data = JSON.parse(localStorage.getItem(cert || "") || "{}");
    generateCertificateOfInsurance(data);
  };

  return (
    <main style={{ padding: 40 }}>
      <h1>Certificate Verification</h1>
      <p>Certificate Number: {cert}</p>
      <button
        onClick={handleDownload}
        style={{
          padding: "12px 24px",
          borderRadius: 8,
          border: "none",
          background: "#0b2f6b",
          color: "white",
          cursor: "pointer",
          marginTop: 20,
        }}
      >
        Download Certificate of Insurance
      </button>
    </main>
  );
}