"use client";

import { useRouter } from "next/navigation";

export default function ActionCard({ title }: { title: string }) {
  const router = useRouter();

  const handleClick = () => {
    switch (title) {
      case "Add Patient":
        router.push("/dashboard/patients/new");
        break;
      case "Create Appointment":
        router.push("/dashboard/appointments/new");
        break;
      case "Add Staff/User":
        router.push("/dashboard/users/new");
        break;
      case "Record Payment":
        router.push("/dashboard/billing/new");
        break;
      default:
        console.warn("No route for:", title);
    }
  };

  return (
    <button
      onClick={handleClick}
      className="bg-white p-4 rounded-xl shadow hover:shadow-md cursor-pointer transition w-full text-left"
    >
      <p className="font-semibold">{title}</p>
      <p className="text-xs text-slate-500">Quick action</p>
    </button>
  );
}