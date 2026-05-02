import { Card } from "../../../components/Card";
import { DashboardLayout } from "../../../components/DashboardLayout";

export default function PatientProfilePage() {
  return (
    <DashboardLayout>
      <h2 className="text-xl font-semibold text-navy mb-4">Patient Profile</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <Card title="Demographics">
          <p>Name: Jane Mwangi</p>
          <p>DOB: 1992-08-18</p>
          <p>Contact: +2547xxxxxxx</p>
        </Card>
        <Card title="Clinical History">
          <p>Diagnosis: Hypertension</p>
          <p>Last Visit: 2026-04-18</p>
        </Card>
      </div>
    </DashboardLayout>
  );
}
