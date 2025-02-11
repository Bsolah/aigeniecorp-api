import express from "express";

import {
  createFolder,
  editFolder,
  getFolder,
  getRootFolders,
} from "../controllers/folderController";
import authMiddleware from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/create", createFolder);
router.put("/edit/:id", editFolder);
router.get("/all", getRootFolders);
router.get("/:id", getFolder);
export default router;
