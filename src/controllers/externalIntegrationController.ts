import { google } from "googleapis";
import { Request, Response, NextFunction } from "express";
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

export const redirectGoogleConnection = (req: Request, res: Response) => {
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

export const getGoogleAccessToken = async (req: Request, res: Response) => {
  try {
    const { code } = req.query;
    const { tokens } = await oauth2Client.getToken(String(code));
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

export const getGoogleDocs = async (req: Request, res: Response) => {
  try {
    const integration = await Integration.findOne({ user: req?.user?.id });
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
    oauth2Client.setCredentials({
      access_token: token.access_token,
    });
    const drive = google.drive({
      version: "v3",
      auth: oauth2Client,
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

export const saveGoogleCredentials = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;
    const user = await User.findById(req.user?.id);
    if (user) {
      const getIntegration = await Integration.findOne({ user: req.user?.id });
      if (getIntegration) {
        getIntegration.googleRefreshToken = refreshToken;
        await getIntegration.save();
        res.status(200).json({
          success: true,
          message: "Google credentials saved",
        });
      } else {
        await Integration.create({
          user: req.user?.id,
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

export const getGoogleDocsContent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const integration = await Integration.findOne({ user: req.user?.id });
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
    oauth2Client.setCredentials({
      access_token: token.access_token,
    });
    const docs = google.docs({ version: "v1", auth: oauth2Client });
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

export const getGoogleSheet = async (req: Request, res: Response) => {
  try {
    const integration = await Integration.findOne({ user: req?.user?.id });
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
    oauth2Client.setCredentials({
      access_token: token.access_token,
    });
    const drive = google.drive({
      version: "v3",
      auth: oauth2Client,
    });
    const docs = await drive.files.list({
      q: "mimeType='application/vnd.google-apps.spreadsheet'",
    });
    res.status(200).json({
      success: true,
      message: "Google sheets fetched",
      docs: docs.data.files,
    });
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};

export const getGoogleSheetContent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const integration = await Integration.findOne({ user: req.user?.id });
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
    oauth2Client.setCredentials({
      access_token: token.access_token,
    });
    // const docs = google.docs({ version: "v1", auth: oauth2Client });
    // const doc = await docs.documents.get({ documentId: id });

    const sheets = google.sheets({ version: "v4", auth: oauth2Client });

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: id,
      range: "Sheet1!A1:Z100", // Example: 'Sheet1!A1:D10' (Adjust as needed)
    });
    res.status(200).json({
      success: true,
      message: "Google sheets fetched",
      doc: response.data,
    });
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};
