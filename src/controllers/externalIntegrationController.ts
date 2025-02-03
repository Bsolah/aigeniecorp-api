import { google } from "googleapis";
import dotenv from "dotenv";
import User from "../models/User";
import Integration from "../models/Integration";
import { getGoogleAccessTokenFromRefreshToken } from "../utils/googleUtils";
dotenv.config();

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

export const redirectGoogleConnection = (req: any, res: any) => {
  try {
    const authUrl = oauth2Client.generateAuthUrl({
      access_type: "offline",
      scope: [
        "https://www.googleapis.com/auth/drive.readonly",
        "https://www.googleapis.com/auth/documents.readonly",
        "https://www.googleapis.com/auth/spreadsheets.readonly",
      ],
    });
    res.redirect(authUrl);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};

export const getGoogleAccessToken = async (req: any, res: any) => {
  try {
    const { code } = req.query;
    const { tokens } = await oauth2Client.getToken(code);
    res.status(200).json({
      success: true,
      message: "Google access token received",
      tokens,
    });
    console.log(tokens);
    res.redirect(
      `${process.env.CLIENT_URL}/dashboard?google=true&token=${tokens.access_token}&refreshToken=${tokens.refresh_token}`
    );
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};

export const getGoogleDocs = async (req: any, res: any) => {
  try {
    const integration = await Integration.findOne({ user: req.user.id });
    if (!integration || !integration.googleRefreshToken) {
      res.status(404).json({
        success: false,
        message: "Google credentials not found",
      });
      return;
    }
    const token = await getGoogleAccessTokenFromRefreshToken(
      integration.googleRefreshToken
    );
    if (!token?.access_token) {
      res.status(404).json({
        success: false,
        message: "Google access token not found",
      });
    }
    const drive = google.drive({
      version: "v3",
      auth: token.access_token!,
    });
    const docs = await drive.files.list({
      q: "mimeType='application/vnd.google-apps.document'",
    });
    res.status(200).json({
      success: true,
      message: "Google docs fetched",
      docs: docs.data.files,
    });
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};

export const saveGoogleCredentials = async (req: any, res: any) => {
  try {
    const { refreshToken } = req.body;
    const user = await User.findById(req.user.id);
    if (user) {
      const getIntegration = await Integration.findOne({ user: req.user.id });
      if (getIntegration) {
        getIntegration.googleRefreshToken = refreshToken;
        await getIntegration.save();
        res.status(200).json({
          success: true,
          message: "Google credentials saved",
        });
      } else {
        await Integration.create({
          user: req.user.id,
          googleRefreshToken: refreshToken,
        });
        res.status(201).json({
          success: true,
          message: "Google credentials saved",
        });
      }
    }
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};

export const getGoogleDocsContent = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const integration = await Integration.findOne({ user: req.user.id });
    if (!integration || !integration.googleRefreshToken) {
      res
        .status(404)
        .json({ success: false, message: "Google credentials not found" });
      return;
    }
    const token = await getGoogleAccessTokenFromRefreshToken(
      integration.googleRefreshToken
    );
    if (!token?.access_token) {
      res
        .status(404)
        .json({ success: false, message: "Google access token not found" });
      return;
    }
    const docs = google.docs({ version: "v1", auth: token.access_token });
    const doc = await docs.documents.get({ documentId: id });
    res.status(200).json({
      success: true,
      message: "Google doc fetched",
      doc: doc.data,
    });
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};
