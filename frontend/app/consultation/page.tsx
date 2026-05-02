"use client";

import { useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";

export default function ConsultationPage() {
  const [patientId, setPatientId] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [notes, setNotes] = useState("");

  const handleSave = async () => {
    const token = localStorage.getItem("token");

    await fetch("http://localhost:4000/api/records", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        patientId,
        doctorId: "doctor-1", // later replace with logged-in user
        diagnosis,
        notes,
      }),
    });

    alert("Medical record saved");
  };

  return (
    <DashboardLayout>
      <h1 className="text-xl mb-4">Consultation</h1>

      <input
        placeholder="Patient ID"
        className="border p-2 mb-2 w-full"
        onChange={(e) => setPatientId(e.target.value)}
      />

      <input
        placeholder="Diagnosis"
        className="border p-2 mb-2 w-full"
        onChange={(e) => setDiagnosis(e.target.value)}
      />

      <textarea
        placeholder="Notes"
        className="border p-2 mb-2 w-full"
        onChange={(e) => setNotes(e.target.value)}
      />

      <button
        onClick={handleSave}
        className="bg-navy text-white px-4 py-2 rounded"
      >
        Save Medical Record
      </button>
    </DashboardLayout>
  );
}