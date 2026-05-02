"use client";

import { useState } from "react";
import { Card } from "../../components/Card";
import { DashboardLayout } from "../../components/DashboardLayout";
import { useAiRoute } from "../../hooks/useAiRoute";

export default function AiInsightsPage() {
  const mutation = useAiRoute();
  const [out, setOut] = useState<{ recommendedDepartment: string; urgencyLevel: string; rationale: string } | null>(
    null
  );

  return (
    <DashboardLayout>
      <Card title="AI routing insights">
        <p className="text-sm text-slate-600 mb-3">
          Symptom + vitals triage (requires auth). Example sends elevated BP.
        </p>
        <button
          type="button"
          className="bg-navy text-white rounded px-4 py-2 text-sm mb-3"
          onClick={() =>
            mutation.mutate(
              { symptoms: ["chest discomfort"], vitals: { systolicBP: 190 } },
              { onSuccess: setOut }
            )
          }
        >
          Run sample triage
        </button>
        {mutation.isPending && <p className="text-sm">Running…</p>}
        {mutation.isError && <p className="text-sm text-red-600">Sign in required or request failed.</p>}
        {out && (
          <div className="text-sm space-y-1">
            <p>
              <span className="text-slate-500">Department:</span> {out.recommendedDepartment}
            </p>
            <p>
              <span className="text-slate-500">Urgency:</span> {out.urgencyLevel}
            </p>
            <p className="text-slate-600">{out.rationale}</p>
          </div>
        )}
      </Card>
    </DashboardLayout>
  );
}
