"use client";

import React, { useState } from "react";
import Image from "next/image";
import { generatePdf } from "./pdf";

const rates = {
  "4": {
    "3 Months": 200,
    "6 Months": 450,
    "9 Months": 300,
    "12 Months": 500,
  },
  "6": {
    "3 Months": 210,
    "6 Months": 460,
    "9 Months": 310,
    "12 Months": 520,
  },
  "8": {
    "3 Months": 220,
    "6 Months": 470,
    "9 Months": 320,
    "12 Months": 540,
  },
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: 8,
  border: "1px solid #d0d7e2",
  boxSizing: "border-box",
};

const primaryButtonStyle: React.CSSProperties = {
  background: "#0b2f6b",
  color: "white",
  border: "none",
  padding: "12px 24px",
  borderRadius: 8,
  cursor: "pointer",
  fontWeight: 600,
};

const secondaryButtonStyle: React.CSSProperties = {
  background: "#eaf0fb",
  color: "#0b2f6b",
  border: "none",
  padding: "12px 24px",
  borderRadius: 8,
  cursor: "pointer",
  fontWeight: 600,
};

const codeBoxStyle: React.CSSProperties = {
  width: 55,
  height: 55,
  textAlign: "center",
  fontSize: 24,
  border: "1px solid #ccc",
  borderRadius: 8,
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
  const [cylinders, setCylinders] = useState<"4" | "6" | "8">("4");
  const [coverage, setCoverage] = useState<
    "3 Months" | "6 Months" | "9 Months" | "12 Months"
  >("3 Months");

  // Payment
  const [showPayment, setShowPayment] = useState(false);
  const [paymentCode, setPaymentCode] = useState<string[]>([
    "",
    "",
    "",
    "",
    "",
  ]);

  const premium = rates[cylinders][coverage];

  const formData = {
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
    vehicleType,
    registryNo,
    licensePlate,
    color,
    cylinders,
    coverage,
    premium,
    paymentCode: paymentCode.join(""),
  };

  const handleGenerateCertificate = () => {
    generatePdf(formData);
  };

  return (
    <main>
      {/* Hero Section */}
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
            width={320}
            height={90}
            style={{
              background: "white",
              padding: 10,
              borderRadius: 12,
            }}
          />

          <h1 style={{ fontSize: 36, marginTop: 20 }}>
            Buy Your Motor Insurance Online
          </h1>

          <p style={{ fontSize: 16, maxWidth: 760 }}>
            Complete your application, upload your documents, calculate your
            premium and proceed to payment.
          </p>
        </div>
      </section>

      {/* Main Form Section */}
      <section
        style={{
          maxWidth: 1200,
          margin: "-20px auto 40px",
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
          {/* Steps */}
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

          {/* STEP 1 */}
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
                <Field
                  label="First Name"
                  value={firstName}
                  onChange={setFirstName}
                />
                <Field
                  label="Middle Name"
                  value={middleName}
                  onChange={setMiddleName}
                />
                <Field
                  label="Surname"
                  value={surname}
                  onChange={setSurname}
                />
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
                <Field
                  label="Home Address"
                  value={homeAddress}
                  onChange={setHomeAddress}
                />
                <Field
                  label="City / Town / Village"
                  value={city}
                  onChange={setCity}
                />
                <Field
                  label="District"
                  value={district}
                  onChange={setDistrict}
                />
                <Field
                  label="Telephone"
                  value={telephone}
                  onChange={setTelephone}
                />
                <Field
                  label="Cellular"
                  value={cellular}
                  onChange={setCellular}
                />
                <Field label="Email" value={email} onChange={setEmail} />
              </div>

              <div style={{ marginTop: 30 }}>
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  style={primaryButtonStyle}
                >
                  Next
                </button>
              </div>
            </>
          )}

          {/* STEP 2 */}
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
                <Field
                  label="Type"
                  value={vehicleType}
                  onChange={setVehicleType}
                />
                <Field
                  label="Registry No. or VIN"
                  value={registryNo}
                  onChange={setRegistryNo}
                />
                <Field
                  label="License Plate Number"
                  value={licensePlate}
                  onChange={setLicensePlate}
                />
                <Field label="Color" value={color} onChange={setColor} />

                {/* Cylinders */}
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
                    onChange={(e) =>
                      setCylinders(e.target.value as "4" | "6" | "8")
                    }
                    style={inputStyle}
                  >
                    <option value="4">4 Cylinders</option>
                    <option value="6">6 Cylinders</option>
                    <option value="8">8 Cylinders</option>
                  </select>
                </div>

                {/* Coverage */}
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
                    onChange={(e) =>
                      setCoverage(
                        e.target.value as
                          | "3 Months"
                          | "6 Months"
                          | "9 Months"
                          | "12 Months"
                      )
                    }
                    style={inputStyle}
                  >
                    <option value="3 Months">3 Months</option>
                    <option value="6 Months">6 Months</option>
                    <option value="9 Months">9 Months</option>
                    <option value="12 Months">12 Months</option>
                  </select>
                </div>
              </div>

              <div
                style={{
                  marginTop: 30,
                  display: "flex",
                  gap: 12,
                }}
              >
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  style={secondaryButtonStyle}
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  style={primaryButtonStyle}
                >
                  Next
                </button>
              </div>
            </>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div>
              <h2 style={{ fontSize: 24, marginBottom: 20 }}>
                Documents, Premium & Payment
              </h2>

              {/* Premium Box */}
              <div
                style={{
                  background: "#eef8ef",
                  border: "1px solid #b8e0b8",
                  borderRadius: 16,
                  padding: 24,
                  marginBottom: 30,
                }}
              >
                <div style={{ fontSize: 14, marginBottom: 8 }}>Premium</div>
                <div
                  style={{
                    fontSize: 48,
                    fontWeight: "bold",
                    color: "#1d6f2c",
                  }}
                >
                  BZD {premium.toFixed(2)}
                </div>
              </div>

              {/* Proceed to Payment */}
              {!showPayment && (
                <button
                  type="button"
                  onClick={() => setShowPayment(true)}
                  style={primaryButtonStyle}
                >
                  Proceed to Payment
                </button>
              )}

              {/* Payment Section */}
              {showPayment && (
                <div
                  style={{
                    marginTop: 30,
                    padding: 30,
                    border: "1px solid #d9d9d9",
                    borderRadius: 16,
                    background: "#fafafa",
                  }}
                >
                  <h3 style={{ marginBottom: 20 }}>Payment Instructions</h3>

                  <div style={{ textAlign: "center", marginBottom: 20 }}>
                    <img
                      src="/payment-qr.png"
                      alt="Payment QR Code"
                      style={{ width: 220, height: 220 }}
                    />
                  </div>

                  <p style={{ textAlign: "center", marginBottom: 30 }}>
                    Or pay online at:
                    <br />
                    <a
                      href="https://your-payment-link.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      https://your-payment-link.com
                    </a>
                  </p>

                  <h4>Enter Payment Confirmation Code</h4>
                  <p>
                    Please enter the 6-digit payment confirmation number.
                  </p>

                  <div
                    style={{
                      display: "flex",
                      gap: 10,
                      justifyContent: "center",
                      margin: "20px 0 30px",
                    }}
                  >
                    {[0, 1, 2, 3].map((i) => (
                      <input
                        key={i}
                        type="text"
                        maxLength={1}
                        value={paymentCode[i] || ""}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, "");
                          const updated = [...paymentCode];
                          updated[i] = value;
                          setPaymentCode(updated);
                        }}
                        style={codeBoxStyle}
                      />
                    ))}

                    <input
                      type="text"
                      maxLength={2}
                      value={paymentCode[4] || ""}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, "");
                        const updated = [...paymentCode];
                        updated[4] = value;
                        setPaymentCode(updated);
                      }}
                      style={{
                        ...codeBoxStyle,
                        width: 80,
                      }}
                    />
                  </div>

                  {paymentCode.join("").length === 6 && (
                    <button
                      type="button"
                      onClick={handleGenerateCertificate}
                      style={primaryButtonStyle}
                    >
                      Print Certificate of Insurance
                    </button>
                  )}
                </div>
              )}

              <div style={{ marginTop: 30 }}>
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  style={secondaryButtonStyle}
                >
                  Back
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
