import { Router } from "express";
import { asyncHandler } from "../../common/utils/asyncHandler.js";
import { authenticate } from "../../common/middleware/auth.middleware.js";
import { authorize } from "../../common/middleware/rbac.middleware.js";
import { createAppointmentSchema } from "./appointments.schemas.js";
import { appointmentsController } from "./appointments.controller.js";

export const appointmentsRouter = Router();
appointmentsRouter.use(authenticate);

appointmentsRouter.get(
  "/",
  authorize(["ADMIN", "DOCTOR", "NURSE"]),
  asyncHandler(async (req, res) => appointmentsController.list(req, res))
);

appointmentsRouter.post(
  "/",
  authorize(["ADMIN", "NURSE"]),
  asyncHandler(async (req, res) => {
    const parsed = createAppointmentSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json(parsed.error.format());
    req.body = parsed.data;
    return appointmentsController.create(req, res);
  })
);
