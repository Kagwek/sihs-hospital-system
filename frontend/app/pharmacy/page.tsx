import { Card } from "../../components/Card";
import { DashboardLayout } from "../../components/DashboardLayout";

export default function PharmacyPage() {
  return (
    <DashboardLayout>
      <Card title="Pharmacy Screen">
        <p className="text-sm">Open prescriptions: 18</p>
        <button className="mt-3 bg-warmGold rounded px-4 py-2 text-navy font-medium">Dispense Selected</button>
      </Card>
    </DashboardLayout>
  );
}
