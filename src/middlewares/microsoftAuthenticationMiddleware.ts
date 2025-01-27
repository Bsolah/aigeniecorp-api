import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
dotenv.config();
import passport from "passport";
import passportMicrosoft from "passport-microsoft";
import User from "../models/User";
import generateAccessToken from "../utils/generateAccessToken";

const MicrosoftStrategy = passportMicrosoft.Strategy;
let response: any;

passport.use(
  new MicrosoftStrategy(
    {
      clientID: String(process.env.MICROSOFT_CLIENT_ID),
      clientSecret: String(process.env.MICROSOFT_SECRET_ID),
      callbackURL: process.env.MICROSOFT_AUTH_REDIRECT_URL,
      scope: ["openid", "profile", "email", "user.read"],
    },
    async (
      accessToken: any,
      refreshToken: any,
      profile: any,
      callback: any
    ) => {
      try {
        const user = await User.findOne({ email: profile.emails[0].value });

        if (user) {
          response = user;

          return callback(null, profile);
        }

        const newUser = {
          firstName: profile._json.givenName,
          lastName: profile._json.surname,
          email: profile.emails[0].value,
          provider: profile.provider,
          providerUserId: profile.id,
          isActive: true,
        };

        try {
          const createUser = await User.create({
            username: `${newUser.firstName} ${newUser.lastName}`,
            email: newUser.email,
            password: null,
          });
          response = createUser;

          return callback(null, profile);
        } catch (error) {
          return callback(error);
        }
      } catch (error) {
        console.log(error);
        return callback(error);
      }
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj: any, done) {
  done(null, obj);
});

const microsoftFailed = (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(400).json({
      success: false,
      data: "Microsoft authentication failed",
    });
  } catch (error) {
    next(error);
  }
};

const microsoftSuccess = (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!response) {
      // throw new Error("Authentication Failed");
      return res.redirect(process.env.CLIENT_BASE_URL!);
    }
    const payload = {
      id: response.id,
      email: response.email,
    };

    const accessToken = generateAccessToken(payload.id, payload.email);

    res
      .status(200)
      .cookie("accessToken", accessToken, {
        httpOnly: true,
        domain: process.env.CLIENT_DOMAIN,
        secure: process.env.NODE_ENV == "production" ? true : false,
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours in milliseconds
      })
      .json({
        success: true,
        data: response,
        accessToken,
      });
  } catch (error) {
    next(error);
  }
};

export { microsoftFailed, microsoftSuccess };
