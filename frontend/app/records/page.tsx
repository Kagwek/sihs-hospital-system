"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";

export default function RecordsPage() {
  const [records, setRecords] = useState<any[]>([]);

 useEffect(() => {
  const fetchRecords = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("No token found");
        return;
      }

      const res = await fetch("http://localhost:4000/api/records", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      console.log("RECORDS:", data);

      if (Array.isArray(data)) {
        setRecords(data);
      } else {
        console.error("Unexpected response:", data);
        setRecords([]);
      }

    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  fetchRecords();
}, []);