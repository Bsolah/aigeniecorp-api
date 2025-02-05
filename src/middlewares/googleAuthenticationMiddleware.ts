import dotenv from "dotenv";
dotenv.config();
// import { generateAccessToken } from "../utils/token";
import { NextFunction, Request, Response } from "express";
import passport from "passport";
import passportGoogle from "passport-google-oauth20";
// import { BadRequest } from "../errors";
import User from "../models/User";
import generateAccessToken from "../utils/generateAccessToken";
import { BadRequest } from "../utils/errorHandler";
import generateSecurePassword from "../utils/generateAndHashSocialAuthPassword";

const GoogleStrategy = passportGoogle.Strategy;

let response: any;

passport.use(
  new GoogleStrategy(
    {
      clientID: String(process.env.GOOGLE_CLIENT_ID),
      clientSecret: String(process.env.GOOGLE_CLIENT_SECRET),
      callbackURL: process.env.GOOGLE_REDIRECT_URL,
      passReqToCallback: true,
      scope: ["profile", "email"],
    },
    async (
      request: any,
      accessToken: any,
      refreshToken: any,
      profile: any,
      callback: any,
    ) => {
      try {
        if (profile.emails[0].verified != true) {
          throw new BadRequest("Email not verified");
        }
        // Check if the google profile has an email associated. Sometimes google profiles can be created by phone
        // numbers in which case google doesn't have an email - if email is not present,
        // we fail the signup with the proper error message
        if (!profile._json.email) {
          throw new BadRequest("Email not found in google profile");
        }
        const user = await User.findOne({ email: profile.emails[0].value });

        if (user) {
          response = user;

          return callback(null, profile);
        }
        const newUser = {
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          email: profile.emails[0].value,
          provider: profile.provider,
          providerUserId: profile.id,
          isActive: profile.emails[0].verified,
        };

        try {
          const createUser = await User.create({
            username: `${newUser.firstName} ${newUser.lastName}`,
            email: newUser.email,
            password: generateSecurePassword(),
          });
          response = createUser;

          return callback(null, profile);
        } catch (error) {
          throw new BadRequest(`${error}`);
        }
      } catch (error) {
        return callback(error, false);
      }
    },
  ),
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user: any, done) => {
  done(null, user);
});

const googleFailed = (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(400).json({
      success: false,
      data: "Google authentication failed",
    });
  } catch (error) {
    next(error);
  }
};

const googleSuccess = (req: Request, res: Response, next: NextFunction) => {
  if (!response) {
    res.status(400).json({
      success: false,
      data: "Google authentication failed",
    });
  } else {
    try {
      const payload = {
        id: response?._id,
        email: response?.email,
      };

      const accessToken = generateAccessToken(payload.id, payload.email);
      const userResponse = response;
      response = null;

      res
        .status(200)
        .cookie("accessToken", accessToken, {
          httpOnly: true,
          domain: process.env.CLIENT_DOMAIN,
          secure: true,
          expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours in milliseconds
        })
        .json({
          success: true,
          data: userResponse,
          accessToken,
        });
    } catch (error) {
      next(error);
    }
  }
};

export { googleFailed, googleSuccess };
