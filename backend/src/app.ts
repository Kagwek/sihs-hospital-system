import cors from "cors";
import express, { type NextFunction, type Request, type Response } from "express";
import helmet from "helmet";
import { auditLogger } from "./common/middleware/audit.middleware.js";
import { authRouter } from "./modules/auth/auth.routes.js";
import { patientsRouter } from "./modules/patients/patients.routes.js";
import { appointmentsRouter } from "./modules/appointments/appointments.routes.js";
import { recordsRouter } from "./modules/records/records.routes.js";
import { labsRouter } from "./modules/labs/labs.routes.js";
import { pharmacyRouter } from "./modules/pharmacy/pharmacy.routes.js";
import { billingRouter } from "./modules/billing/billing.routes.js";
import { aiModuleRouter } from "./modules/ai/ai.routes.js";
import { adminRouter } from "./modules/admin/admin.routes.js";
import { reportingRouter } from "./modules/reporting/reporting.routes.js";

export const app = express();

app.use(helmet());
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));
app.get("/", (req, res) => {
  res.send("🚀 SIHS Backend is running");
});
app.use(express.json({ limit: "1mb" }));
app.use(auditLogger);

app.get("/health", (_req, res) => res.json({ status: "ok", system: "SIHS" }));
app.use("/api/auth", authRouter);
app.use("/api/patients", patientsRouter);
app.use("/api/appointments", appointmentsRouter);
app.use("/api/records", recordsRouter);
app.use("/api/labs", labsRouter);
app.use("/api/pharmacy", pharmacyRouter);
app.use("/api/billing", billingRouter);
app.use("/api/admin", adminRouter);
app.use("/api/reports", reportingRouter);
app.use("/api/ai", aiModuleRouter);

app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err);
  return res.status(500).json({ message: "Internal server error" });
});
