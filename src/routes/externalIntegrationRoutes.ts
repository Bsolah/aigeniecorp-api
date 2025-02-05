import express from "express";
import {
  getGoogleAccessToken,
  getGoogleDocs,
  getGoogleDocsContent,
  getGoogleSheet,
  getGoogleSheetContent,
  redirectGoogleConnection,
  saveGoogleCredentials,
} from "../controllers/externalIntegrationController";
import authMiddleware from "../middlewares/authMiddleware";

const router = express.Router();

router.get("/connect-google", redirectGoogleConnection);
router.get("/connect-google/callback", getGoogleAccessToken);
router.post("/set-google", authMiddleware, saveGoogleCredentials);
router.get("/google-docs", authMiddleware, getGoogleDocs);
router.get("/google-docs/:id", authMiddleware, getGoogleDocsContent);
router.get("/google-sheets", authMiddleware, getGoogleSheet);
router.get("/google-sheets/:id", authMiddleware, getGoogleSheetContent);

export default router;
