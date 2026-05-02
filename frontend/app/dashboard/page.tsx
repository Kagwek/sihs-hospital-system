"use client";

import Card from "../../components/Card";
import { ActionCard } from "../../components/actioncard";
import { DashboardLayout } from "../../components/DashboardLayout";
import { usePatients } from "../../hooks/usePatients";
import { useAdminDashboard } from "../../hooks/useAdminDashboard";
import { useHydratedAuth } from "../../hooks/useHydratedAuth";
import { useAppStore } from "../../lib/store";

export default function DashboardPage() {
  const { role } = useAppStore();
  const { ready, hasToken } = useHydratedAuth();

  const adminQ = useAdminDashboard(ready && hasToken && role === "ADMIN");
  const patientsQ = usePatients(ready && hasToken);

  // 🧠 SYSTEM INIT STATE
  if (!ready) return <p className="p-6">Initializing system...</p>;

  if (!hasToken) {
    return (
      <p className="p-6 text-sm text-slate-600">
        Please sign in to continue.
      </p>
    );
  }

  return (
    <DashboardLayout>
      {/* HEADER */}
      <h2 className="text-xl font-semibold text-navy mb-6">
        {role} Control Panel
      </h2>

      {/* ================= ADMIN KPIs ================= */}
      {role === "ADMIN" && adminQ.isSuccess && (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-4 mb-8">

          <Card title="Total Patients">
            <p className="text-2xl font-bold text-medicalGreen">
              {adminQ.data.patientFlow.totalPatients}
            </p>
          </Card>

          <Card title="Today's Appointments">
            <p className="text-2xl font-bold text-medicalGreen">
              {adminQ.data.patientFlow.todayAppointments}
            </p>
          </Card>

          <Card title="Revenue (KES)">
            <p className="text-2xl font-bold text-warmGold">
              {String(adminQ.data.revenue ?? 0)}
            </p>
          </Card>

          <Card title="System Alerts">
            <p className="text-2xl font-bold text-red-500">
              {(adminQ.data as any).alerts ?? 0}
            </p>
          </Card>

        </div>
      )}

      {/* ================= QUICK ACTIONS ================= */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-4 mb-8">
        <ActionCard title="Add Patient" />
        <ActionCard title="Create Appointment" />
        <ActionCard title="Add Staff/User" />
        <ActionCard title="Record Payment" />
      </div>

      {/* ================= PATIENT SNAPSHOT ================= */}
      {patientsQ.isSuccess && (
        <div>
          <h3 className="text-lg font-semibold mb-3">Recent Patients</h3>

          <div className="overflow-x-auto bg-white rounded shadow">
            <table className="w-full text-sm">
              <thead className="bg-slate-100">
                <tr>
                  <th className="p-2 text-left">Name</th>
                  <th className="p-2 text-left">Gender</th>
                  <th className="p-2 text-left">Contact</th>
                  <th className="p-2 text-left">Actions</th>
                </tr>
              </thead>

              <tbody>
                {patientsQ.data.slice(0, 5).map((p: any) => (
                  <tr key={p.id} className="border-t">
                    <td className="p-2">{p.name}</td>
                    <td className="p-2">{p.gender}</td>
                    <td className="p-2">{p.contact}</td>

                    <td className="p-2 space-x-2">
                      <button className="text-blue-600 hover:underline">
                        Edit
                      </button>
                      <button className="text-red-600 hover:underline">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}