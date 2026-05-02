"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "../components/DashboardLayout";

export default function RecordsPage() {
  const [records, setRecords] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch("http://localhost:4000/api/records", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch records");
        }

        const data = await res.json();
        setRecords(data);
      } catch (err) {
        console.error("Error loading records:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecords();
  }, []);

  if (loading) {
    return (
      <DashboardLayout>
        <p>Loading records...</p>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <h1 className="text-xl mb-4">Medical Records</h1>

      {records.length === 0 && (
        <p className="text-slate-500">No medical records found.</p>
      )}

      {records.map((r) => (
        <div key={r.id} className="border p-3 mb-2 rounded">
          <p><strong>Patient:</strong> {r.patientId}</p>
          <p><strong>Diagnosis:</strong> {r.diagnosis}</p>
          <p>{r.notes}</p>
        </div>
      ))}
    </DashboardLayout>
  );
}