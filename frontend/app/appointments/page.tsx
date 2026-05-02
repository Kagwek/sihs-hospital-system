"use client";

import Card from "../../components/Card";
import DashboardLayout from "../../components/DashboardLayout";
import { useAppointments } from "../../hooks/useAppointments";
import { useHydratedAuth } from "../../hooks/useHydratedAuth";

export default function AppointmentPage() {
  const { ready, hasToken } = useHydratedAuth();
  const q = useAppointments(ready && hasToken);

  return (
    <DashboardLayout>
      <Card title="Appointment scheduler">
        <div className="grid gap-3 md:grid-cols-2 mb-6">
          <input className="border rounded px-3 py-2" placeholder="Patient ID" />
          <input className="border rounded px-3 py-2" placeholder="Doctor ID" />
          <input className="border rounded px-3 py-2" type="datetime-local" />
          <button type="button" className="bg-navy text-white rounded px-4 py-2">
            Schedule
          </button>
        </div>
        {ready && !hasToken && (
          <p className="text-sm text-slate-600">Sign in to load appointments from the API.</p>
        )}
        {q.isLoading && hasToken && <p className="text-sm">Loading…</p>}
        {q.isError && <p className="text-sm text-red-600">Unable to load appointments.</p>}
        {q.isSuccess && (
          <ul className="text-sm space-y-2 max-h-64 overflow-auto">
            {(q.data as Record<string, unknown>[]).map((row) => (
              <li key={String(row.id)} className="border-b border-slate-100 pb-2">
                <p>{String(row.department)} — {String(row.status)}</p>
                <p className="text-slate-500">{String(row.datetime)}</p>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </DashboardLayout>
  );
}
