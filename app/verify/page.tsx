"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { generateCertificateOfInsurance } from "../pdf/certificateOfInsurance";

function VerifyContent() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState("Preparing certificate...");

  useEffect(() => {
    const regenerateCertificate = async () => {
      try {
        const encodedData = searchParams.get("data");

        if (!encodedData) {
          setStatus("No certificate data was provided.");
          return;
        }

        const decodedData = decodeURIComponent(encodedData);
        const certificateData = JSON.parse(decodedData);

        setStatus("Generating certificate...");

        await generateCertificateOfInsurance(certificateData);

        setStatus("Certificate downloaded successfully.");
      } catch (error) {
        console.error(error);
        setStatus("Unable to regenerate certificate.");
      }
    };

    regenerateCertificate();
  }, [searchParams]);

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 40,
        fontFamily: "Arial, sans-serif",
        textAlign: "center",
      }}
    >
      <div>
        <h1>Certificate Verification</h1>
        <p>{status}</p>
      </div>
    </main>
  );
}

export default function VerifyPage() {
  return (
    <Suspense fallback={<p>Loading certificate...</p>}>
      <VerifyContent />
    </Suspense>
  );
}
