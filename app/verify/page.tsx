// Replace the entire contents of: app/verify/page.tsx

"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

function VerifyContent() {
  const searchParams = useSearchParams();
  const cert = searchParams.get("cert");

  // Look up the certificate data stored when the PDF was created.
  const storedData =
    typeof window !== "undefined" && cert
      ? localStorage.getItem(`certificate_${cert}`)
      : null;

  const data = storedData ? JSON.parse(storedData) : null;

  if (!cert) {
    return (
      <main style={{ padding: 40, fontFamily: "Arial, sans-serif" }}>
        <h1>Certificate Verification</h1>
        <p>No certificate number was provided.</p>
      </main>
    );
  }

  if (!data) {
    return (
      <main style={{ padding: 40, fontFamily: "Arial, sans-serif" }}>
        <h1>Certificate Verification</h1>
        <p>
          Certificate Number: <strong>{cert}</strong>
        </p>
        <p style={{ color: "red", fontWeight: "bold" }}>
          Certificate not found.
        </p>
      </main>
    );
  }

  return (
    <main
      style={{
        maxWidth: 900,
        margin: "40px auto",
        padding: 40,
        background: "#ffffff",
        borderRadius: 12,
        boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1 style={{ color: "#1e3a8a", marginBottom: 10 }}>
        Certificate Verification
      </h1>

      <p style={{ color: "#16a34a", fontWeight: "bold", fontSize: 18 }}>
        ✓ This certificate is authentic.
      </p>

      <hr style={{ margin: "24px 0" }} />

      <h2>Certificate Information</h2>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: 20,
        }}
      >
        <tbody>
          <Row
            label="Certificate Number"
            value={data.certificateNumber}
          />
          <Row label="Policy Number" value={data.policyNumber} />
          <Row
            label="Policyholder"
            value={data.policyholderName}
          />
          <Row
            label="Date of Insured"
            value={new Date(
              data.commencementDate
            ).toLocaleDateString()}
          />
          <Row
            label="Expiry Date"
            value={new Date(data.expiryDate).toLocaleDateString()}
          />
          <Row label="Make & Model" value={data.makeModel} />
          <Row
            label="Year Manufactured"
            value={data.yearManufactured}
          />
          <Row label="VIN" value={data.vin} />
          <Row
            label="License Plate"
            value={data.licensePlate || "N/A"}
          />
          <Row
            label="Type of Vehicle"
            value={data.vehicleType}
          />
          <Row
            label="Coverage Type"
            value={data.coverageType}
          />
          <Row
            label="Coverage Period"
            value={data.coveragePeriod}
          />
          <Row
            label="Premium"
            value={`BZD ${data.premium}`}
          />
          <Row
            label="Issued On"
            value={
              data.issuedOn ||
              new Date().toLocaleString("en-BZ")
            }
          />
        </tbody>
      </table>
    </main>
  );
}

function Row({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <tr>
      <td
        style={{
          padding: "10px 0",
          fontWeight: "bold",
          width: "35%",
          borderBottom: "1px solid #e5e7eb",
        }}
      >
        {label}
      </td>
      <td
        style={{
          padding: "10px 0",
          borderBottom: "1px solid #e5e7eb",
        }}
      >
        {value || "N/A"}
      </td>
    </tr>
  );
}

export default function VerifyPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyContent />
    </Suspense>
  );
}
