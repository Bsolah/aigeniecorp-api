import express from "express";

import {
  createFolder,
  editFolder,
  getFolder,
  getRootFolders,
  deleteFolder
} from "../controllers/folderController";
import authMiddleware from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/create", authMiddleware, createFolder);
router.put("/edit/:id", authMiddleware, editFolder);
router.get("/all", authMiddleware, getRootFolders);
router.get("/:id", authMiddleware, getFolder);
router.delete("/delete/:id", authMiddleware, deleteFolder);
export default router;
