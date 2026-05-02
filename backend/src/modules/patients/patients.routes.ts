import { Router } from "express";
import { asyncHandler } from "../../common/utils/asyncHandler.js";
import { authenticate } from "../../common/middleware/auth.middleware.js";
import { authorize } from "../../common/middleware/rbac.middleware.js";
import { createPatientSchema } from "./patients.schemas.js";
import { patientsController } from "./patients.controller.js";

export const patientsRouter = Router();
patientsRouter.use(authenticate);

patientsRouter.get(
  "/",
  authorize(["ADMIN", "DOCTOR", "NURSE"]),
  asyncHandler(async (req, res) => patientsController.list(req, res))
);

patientsRouter.post(
  "/",
  authorize(["ADMIN", "NURSE"]),
  asyncHandler(async (req, res) => {
    const parsed = createPatientSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json(parsed.error.format());
    req.body = parsed.data;
    return patientsController.create(req, res);
  })
);

patientsRouter.get(
  "/:id",
  authorize(["ADMIN", "DOCTOR", "NURSE"]),
  asyncHandler(async (req, res) => patientsController.getById(req, res))
);
