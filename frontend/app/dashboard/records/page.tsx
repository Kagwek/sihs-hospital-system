"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "../../../components/DashboardLayout";

export default function RecordsPage() {
  const [records, setRecords] = useState<any[]>([]);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch("http://localhost:4000/api/records", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (Array.isArray(data)) {
          setRecords(data);
        } else {
          setRecords([]);
        }
      } catch (err) {
        console.error(err);
        setRecords([]);
      }
    };

    fetchRecords();
  }, []);

  return (
    <DashboardLayout>
      <h1 className="text-xl mb-4">Medical Records</h1>

      {Array.isArray(records) && records.length === 0 && (
        <p>No records found</p>
      )}

      {Array.isArray(records) &&
        records.map((r) => (
          <div key={r.id} className="border p-3 mb-2 rounded">
            <p><strong>Patient:</strong> {r.patientId}</p>
            <p><strong>Diagnosis:</strong> {r.diagnosis}</p>
            <p>{r.notes}</p>
          </div>
        ))}
    </DashboardLayout>
  );
}