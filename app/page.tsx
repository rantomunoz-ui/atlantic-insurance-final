"use client";

import { useState } from "react";
import Image from "next/image";
import { generatePdf } from "./pdf";

const rates = {
  "4": { "3 Months": 200, "6 Months": 450, "9 Months": 300, "12 Months": 500 },
  "6": { "3 Months": 210, "6 Months": 460, "9 Months": 310, "12 Months": 520 },
  "8": { "3 Months": 220, "6 Months": 470, "9 Months": 320, "12 Months": 540 },
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: 8,
  border: "1px solid #d0d7e2",
  boxSizing: "border-box",
};

function Field({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
}) {
  return (
    <div>
      <label
        style={{
          display: "block",
          fontSize: 13,
          fontWeight: 600,
          marginBottom: 6,
        }}
      >
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={inputStyle}
      />
    </div>
  );
}

export default function Home() {
  const [step, setStep] = useState(1);

  // Applicant Information
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [surname, setSurname] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [homeAddress, setHomeAddress] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [telephone, setTelephone] = useState("");
  const [cellular, setCellular] = useState("");
  const [email, setEmail] = useState("");

  // Vehicle Information
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [yearManufactured, setYearManufactured] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [registryNo, setRegistryNo] = useState("");
  const [licensePlate, setLicensePlate] = useState("");
  const [color, setColor] = useState("");

  // Policy Information
  const [cylinders, setCylinders] = useState("4");
  const [coverage, setCoverage] = useState("3 Months");

  const premium =
    rates[cylinders as keyof typeof rates][
      coverage as keyof (typeof rates)["4"]
    ];

  return (
    <main>
      <section
        style={{
          backgroundImage:
            "linear-gradient(rgba(11,47,107,0.82), rgba(46,99,201,0.82)), url('https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "white",
          padding: "30px 0 80px",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          <Image
            src="/logo.png"
            alt="Atlantic Insurance"
            width={520}
            height={140}
            style={{
              background: "white",
              padding: 18,
              borderRadius: 16,
            }}
          />

          <h1 style={{ fontSize: 54, marginTop: 40 }}>
            Buy Your Motor Insurance Online
          </h1>

          <p style={{ fontSize: 22, maxWidth: 760 }}>
            Complete your application, upload your documents, calculate your
            premium and proceed to payment.
          </p>
        </div>
      </section>

      <section
        style={{
          maxWidth: 1200,
          margin: "-40px auto 40px",
          padding: "0 24px",
        }}
      >
        <div
          style={{
            background: "white",
            borderRadius: 20,
            boxShadow: "0 20px 60px rgba(0,0,0,0.08)",
            padding: 32,
          }}
        >
          <div
            style={{
              display: "flex",
              gap: 10,
              flexWrap: "wrap",
              marginBottom: 30,
            }}
          >
            {[
              "1. Applicant Information",
              "2. Vehicle Information",
              "3. Documents, Premium & Payment",
            ].map((s, i) => (
              <div
                key={s}
                style={{
                  padding: "10px 14px",
                  borderRadius: 999,
                  background: step === i + 1 ? "#0b2f6b" : "#eaf0fb",
                  color: step === i + 1 ? "white" : "#0b2f6b",
                  fontWeight: 600,
                  fontSize: 14,
                }}
              >
                {s}
              </div>
            ))}
          </div>

          {step === 1 && (
            <>
              <h2 style={{ color: "#0b2f6b" }}>Identification of Applicant</h2>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3,1fr)",
                  gap: 16,
                }}
              >
                <Field label="First Name" value={firstName} onChange={setFirstName} />
                <Field label="Middle Name" value={middleName} onChange={setMiddleName} />
                <Field label="Surname" value={surname} onChange={setSurname} />
              </div>

              <div style={{ marginTop: 16 }}>
                <Field
                  label="Company Name (Optional for Businesses)"
                  value={companyName}
                  onChange={setCompanyName}
                />
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3,1fr)",
                  gap: 16,
                  marginTop: 16,
                }}
              >
                <Field label="Home Address" value={homeAddress} onChange={setHomeAddress} />
                <Field label="City / Town / Village" value={city} onChange={setCity} />
                <Field label="District" value={district} onChange={setDistrict} />
                <Field label="Telephone" value={telephone} onChange={setTelephone} />
                <Field label="Cellular" value={cellular} onChange={setCellular} />
                <Field label="Email" value={email} onChange={setEmail} />
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <h2 style={{ color: "#0b2f6b" }}>
                Particulars of Vehicle Insured
              </h2>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3,1fr)",
                  gap: 16,
                }}
              >
                <Field label="Make" value={make} onChange={setMake} />
                <Field label="Model" value={model} onChange={setModel} />
                <Field
                  label="Year Manufactured"
                  value={yearManufactured}
                  onChange={setYearManufactured}
                />
                <Field label="Type" value={vehicleType} onChange={setVehicleType} />
                <Field label="Registry No. or VIN" value={registryNo} onChange={setRegistryNo} />
                <Field
                  label="License Plate Number"
                  value={licensePlate}
                  onChange={setLicensePlate}
                />
                <Field label="Color" value={color} onChange={setColor} />

                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: 13,
                      fontWeight: 600,
                      marginBottom: 6,
                    }}
                  >
                    Cylinders
                  </label>
                  <select
                    value={cylinders}
                    onChange={(e) => setCylinders(e.target.value)}
                    style={inputStyle}
                  >
                    <option value="4">4 Cylinders</option>
                    <option value="6">6 Cylinders</option>
                    <option value="8">8 Cylinders</option>
                  </select>
                </div>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <h2 style={{ color: "#0b2f6b" }}>
                Documents, Premium & Payment
              </h2>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "2fr 1fr",
                  gap: 24,
                  marginBottom: 24,
                }}
              >
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: 13,
                      fontWeight: 600,
                      marginBottom: 6,
                    }}
                  >
                    Coverage Period
                  </label>

                  <select
                    value={coverage}
                    onChange={(e) => setCoverage(e.target.value)}
                    style={inputStyle}
                  >
                    <option>3 Months</option>
                    <option>6 Months</option>
                    <option>9 Months</option>
                    <option>12 Months</option>
                  </select>
                </div>

                <div
                  style={{
                    background: "#f0fdf4",
                    border: "1px solid #bbf7d0",
                    borderRadius: 12,
                    padding: 20,
                  }}
                >
                  <div style={{ fontSize: 13, color: "#166534" }}>
                    Premium
                  </div>
                  <div
                    style={{
                      fontSize: 38,
                      fontWeight: 700,
                      color: "#15803d",
                      marginTop: 8,
                    }}
                  >
                    BZD {premium.toFixed(2)}
                  </div>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                }}
              >
                {[
                  "Client Data Form",
                  "Proposal Form",
                  "Policy Schedule",
                  "Certificate of Insurance",
                ].map((doc) => (
                  <button
                    key={doc}
                    onClick={() =>
                      generatePdf(doc, {
                        firstName,
                        middleName,
                        surname,
                        companyName,
                        homeAddress,
                        city,
                        district,
                        telephone,
                        cellular,
                        email,
                        make,
                        model,
                        yearManufactured,
                        type: vehicleType,
                        registryNo,
                        licensePlate,
                        color,
                        cylinders,
                        coverage,
                        premium,
                      })
                    }
                    style={{
                      padding: "12px",
                      borderRadius: 8,
                      border: "1px solid #cbd5e1",
                      background: "white",
                      cursor: "pointer",
                    }}
                  >
                    Print {doc}
                  </button>
                ))}
              </div>
            </>
          )}

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 32,
            }}
          >
            <button
              onClick={() => setStep(Math.max(1, step - 1))}
              disabled={step === 1}
              style={{
                padding: "12px 24px",
                borderRadius: 8,
                border: "1px solid #cbd5e1",
              }}
            >
              Back
            </button>

            <button
              onClick={() => setStep(Math.min(3, step + 1))}
              style={{
                padding: "12px 24px",
                borderRadius: 8,
                border: "none",
                background: "#22c55e",
                color: "white",
                fontWeight: 700,
              }}
            >
              {step === 3 ? "Submit Application" : "Next"}
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
