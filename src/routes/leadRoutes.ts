import express from "express";
import authMiddleware from "../middlewares/authMiddleware";
import { createLead, getLeads } from "../controllers/leadController";

const router = express.Router();

router.post("/create", createLead);
router.post("/get", authMiddleware, getLeads);

export default router;
