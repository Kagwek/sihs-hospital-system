"use client";

import { Card } from "../../components/Card";
import { DashboardLayout } from "../../components/DashboardLayout";
import { useBillingList } from "../../hooks/useBilling";
import { useHydratedAuth } from "../../hooks/useHydratedAuth";

export default function BillingPage() {
  const { ready, hasToken } = useHydratedAuth();
  const q = useBillingList(ready && hasToken);

  return (
    <DashboardLayout>
      <Card title="Billing & payments (NHIF / SHA aware)">
        {ready && !hasToken && (
          <p className="text-sm text-slate-600">Sign in as Finance to load invoices.</p>
        )}
        {q.isLoading && ready && hasToken && <p className="text-sm">Loading…</p>}
        {q.isError && <p className="text-sm text-red-600">Could not load billing. Check role (FINANCE) and token.</p>}
        {q.isSuccess && (
          <ul className="text-sm space-y-2 max-h-72 overflow-auto">
            {(q.data as Record<string, unknown>[]).map((row) => (
              <li key={String(row.id)} className="border-b border-slate-100 pb-2">
                <p className="font-medium">{String(row.service)}</p>
                <p className="text-slate-600">
                  Payor: {String(row.payorType ?? "—")} · Claim: {String(row.insuranceClaimStatus ?? "—")}
                </p>
                <p className="text-slate-500">
                  Amount: {String(row.amount)} · Copay (KES): {String(row.patientCopayKes ?? "—")}
                </p>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </DashboardLayout>
  );
}
