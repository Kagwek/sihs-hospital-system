import { Card } from "../../components/Card";
import { DashboardLayout } from "../../components/DashboardLayout";

export default function LabPage() {
  return (
    <DashboardLayout>
      <Card title="Lab Dashboard">
        <p className="text-sm">Pending tests: 12</p>
        <p className="text-sm">Critical flagged: 2</p>
      </Card>
    </DashboardLayout>
  );
}
