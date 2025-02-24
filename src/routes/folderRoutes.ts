import express from "express";

import {
  createFolder,
  editFolder,
  getFolder,
  getRootFolders,
} from "../controllers/folderController";
import authMiddleware from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/create", authMiddleware, createFolder);
router.put("/edit/:id", authMiddleware, editFolder);
router.get("/all", authMiddleware, getRootFolders);
router.get("/:id", authMiddleware, getFolder);
// router.get("/:id", authMiddleware, deleteFolder);
export default router;
