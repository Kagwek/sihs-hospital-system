"use client";

import Link from "next/link";

export function AdminLayout({ children }: any) {
  return (
    <div className="flex h-screen bg-slate-50">

      {/* Sidebar */}
      <aside className="w-64 bg-navy text-white hidden md:block p-4">
        <h2 className="text-xl font-bold mb-6">Summit</h2>

        <nav className="space-y-3">
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/dashboard/patients">Patients</Link>
          <Link href="/dashboard/doctors">Doctors</Link>
          <Link href="/dashboard/appointments">Appointments</Link>
          <Link href="/dashboard/billing">Billing</Link>
          <Link href="/dashboard/users">Users</Link>
          <Link href="/dashboard/insurance">Insurance</Link>
          <Link href="/dashboard/reports">Reports</Link>
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 p-6 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}