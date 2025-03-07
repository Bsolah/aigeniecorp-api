import { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    // added this to prevent typescript error
    interface User {
      id: string;
      email: string;
    }
    interface Request {
      user?: {
        // User will be attached after authentication
        id: string;
        email: string;
        // Add any other properties your user object might have
      };
    }
  }
}
