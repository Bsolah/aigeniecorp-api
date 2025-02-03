import dotenv from "dotenv";
import { google } from "googleapis";
dotenv.config();

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

export const getGoogleAccessTokenFromRefreshToken = async (
  accessToken: string
) => {
  try {
    oauth2Client.setCredentials({ refresh_token: accessToken });
    const { credentials } = await oauth2Client.refreshAccessToken();
    return credentials;
  } catch (error: any) {
    throw error;
  }
};
