import express from "express";
import {
  register,
  login,
  forgotPassword,
  resetPassword,
  logout,
  searchUserByName,
  createAgent,
} from "../controllers/authController";
import passport from "passport";
import {
  googleFailed,
  googleSuccess,
} from "../middlewares/googleAuthenticationMiddleware";
import authMiddleware from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get(
  "/google-auth",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  }),
);

router.get(
  "/microsoft-auth",
  passport.authenticate("microsoft", {
    session: false,
  }),
);

// google response uri
router.get("/google-failed", googleFailed);
router.get("/google-success", googleSuccess);

//redirect
router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    successRedirect: "http://localhost:5000/api/auth/google-success",
    failureRedirect: "http://localhost:5000/api/auth/google-failure",
    successFlash: true,
    successMessage: "Goggle authentication successful",
    failureFlash: true,
    failureMessage: "Google authentication was not successful",
  }),
  (req, res, next) => {
    res.redirect(String("http://localhost:5000/api/auth/google-success"));
  },
);

router.get(
  "/microsoft-callback",
  passport.authenticate("microsoft", {
    session: false,
    successRedirect: process.env.MICROSOFT_AUTH_SUCCESS_URL,
    failureRedirect: "http://localhost:3000/",
    // successFlash: true,
    // successMessage: "Microsoft authentication successful",
    // failureFlash: true,
    failureMessage: "Microsoft authentication up was not successful",
  }),
  (error: any, req: any, res: any, next: any) => {
    res.redirect(String(process.env.MICROSOFT_AUTH_SUCCESS_URL));
  },
);

router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
router.post("/logout", logout);
router.get("/search", authMiddleware, searchUserByName);
router.post("/create-agent", authMiddleware, createAgent);
export default router;
