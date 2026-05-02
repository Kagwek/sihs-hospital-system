"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useAppStore } from "../lib/store";

const links = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/appointments", label: "Appointments" },
  { href: "/consultation", label: "Consultation" },
  { href: "/labs", label: "Labs" },
  { href: "/pharmacy", label: "Pharmacy" },
  { href: "/billing", label: "Billing" },
  { href: "/dashboard/records", label: "Medical Records" },
  { href: "/ai-insights", label: "AI Insights" }
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { role, setRole } = useAppStore();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // 🔥 IMPORTANT: prevent hydration mismatch
  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-softWhite">

      {/* HEADER */}
      <header className="bg-navy text-white px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="font-semibold tracking-wide">
            SUMMIT INTEGRATED HEALTH SYSTEM
          </h1>
          <p className="text-xs opacity-80">
            Kenya Hospital Operations Platform
          </p>
        </div>

        <select
          value={role || "ADMIN"}
          onChange={(e) => setRole(e.target.value as typeof role)}
          className="rounded bg-white text-navy px-2 py-1 text-sm"
        >
          {["ADMIN", "DOCTOR", "NURSE", "LAB", "PHARMACY", "FINANCE"].map((r) => (
            <option key={r}>{r}</option>
          ))}
        </select>
      </header>

      {/* BODY */}
      <main className="grid grid-cols-[220px_1fr]">

        {/* SIDEBAR */}
        <aside className="p-4 border-r border-slate-200 bg-white min-h-[calc(100vh-72px)]">
          <nav className="space-y-2">
            {links.map((item) => (
              <Link
                key={item.href}
                className="block rounded px-3 py-2 text-sm hover:bg-slate-100"
                href={item.href}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>

        {/* CONTENT */}
        <div className="p-6">{children}</div>

      </main>
    </div>
  );
}