import express from "express";
import authMiddleware from "../middlewares/authMiddleware";
import {
  addUserToOrganization,
  createOrganization,
  getOrganizationUsers,
  getUserOrganizations,
  removeUserFromOrganization,
} from "../controllers/organizationController";

const router = express.Router();

router.post("/create", authMiddleware, createOrganization);
router.post("/add-user/:id", authMiddleware, addUserToOrganization);
router.get("/all", authMiddleware, getUserOrganizations);
router.get("/users/:id", authMiddleware, getOrganizationUsers);
router.post("/remove-user/:id", authMiddleware, removeUserFromOrganization);
export default router;
