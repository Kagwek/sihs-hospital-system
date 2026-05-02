import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash("ChangeMe!234", 10);

  const users = [
    { name: "System Admin", email: "admin@sihs.local", role: Role.ADMIN, department: "ICT" },
    { name: "Dr. Wanjiku Kimani", email: "doctor@sihs.local", role: Role.DOCTOR, department: "Internal Medicine" },
    { name: "Nurse Otieno", email: "nurse@sihs.local", role: Role.NURSE, department: "Triage" },
    { name: "Lab Tech Muthoni", email: "lab@sihs.local", role: Role.LAB, department: "Laboratory" },
    { name: "Pharmacist Kamau", email: "pharmacy@sihs.local", role: Role.PHARMACY, department: "Pharmacy" },
    { name: "Finance Njeri", email: "finance@sihs.local", role: Role.FINANCE, department: "Finance" }
  ];

  for (const u of users) {
    await prisma.user.upsert({
      where: { email: u.email },
      create: { ...u, passwordHash },
      update: { name: u.name, department: u.department, role: u.role, passwordHash }
    });
  }

  const doctor = await prisma.user.findUniqueOrThrow({ where: { email: "doctor@sihs.local" } });

  const patientsData = [
    {
      name: "Amina Hassan",
      dob: new Date("1988-03-12"),
      gender: "Female",
      contact: "+254712000001",
      nextOfKin: "Hassan Ali",
      nhifNumber: "NHIF-LEG-10001",
      shaMemberNumber: "SHA-UHC-50001"
    },
    {
      name: "John Omondi",
      dob: new Date("1975-11-02"),
      gender: "Male",
      contact: "+254722000002",
      nextOfKin: "Mary Omondi",
      nhifNumber: null,
      shaMemberNumber: "SHA-UHC-50002"
    },
    {
      name: "Grace Wambui",
      dob: new Date("2010-07-20"),
      gender: "Female",
      contact: "+254733000003",
      nextOfKin: "Peter Wambui",
      nhifNumber: "NHIF-LEG-10003",
      shaMemberNumber: null
    }
  ];

  for (const p of patientsData) {
    await prisma.patient.upsert({
      where: {
        name_dob_contact: { name: p.name, dob: p.dob, contact: p.contact }
      },
      create: p,
      update: {
        nextOfKin: p.nextOfKin,
        nhifNumber: p.nhifNumber,
        shaMemberNumber: p.shaMemberNumber
      }
    });
  }

  const p1 = await prisma.patient.findFirstOrThrow({ where: { contact: "+254712000001" } });

  const existingRecord = await prisma.medicalRecord.findFirst({
    where: { patientId: p1.id, diagnosis: "Essential hypertension" }
  });
  if (!existingRecord) {
    await prisma.medicalRecord.create({
      data: {
        patientId: p1.id,
        diagnosis: "Essential hypertension",
        notes: "BP elevated on triage; lifestyle counselling given.",
        createdBy: doctor.id
      }
    });
  }

  const existingBill = await prisma.billing.findFirst({
    where: { patientId: p1.id, service: "Consultation + vitals" }
  });
  if (!existingBill) {
    await prisma.billing.create({
      data: {
        patientId: p1.id,
        service: "Consultation + vitals",
        amount: 2500,
        status: "PENDING",
        payorType: "SHA",
        shaMemberNumber: p1.shaMemberNumber,
        insuranceClaimStatus: "PENDING_VERIFICATION",
        patientCopayKes: 500,
        claimNotes: "SHA claim to be submitted via facility portal workflow."
      }
    });
  }

  console.log("SIHS seed complete. Default password for all accounts: ChangeMe!234");
}

main()
  .then(async () => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
