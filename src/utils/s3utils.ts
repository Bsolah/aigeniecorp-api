import AWS from "aws-sdk";
import { Storage } from "@google-cloud/storage";
import dotenv from "dotenv";
import { AnyARecord } from "node:dns";
dotenv.config();

const projectId = process.env.PROJECT_ID;
const keyFilename = process.env.KEY_FILENAME;
const storage = new Storage({ projectId, keyFilename });
const bucketName = process.env.BUCKET_NAME as string;

const bucket = storage.bucket(bucketName);

export const uploadFile = async (file: any) => {
  try {
    //   const blob = bucket.file(file.originalname);
    const fileName = file?.originalname || `file-${Date.now()}`;
    const blob = bucket.file(fileName);
    const blobStream = blob.createWriteStream({
      resumable: false,
      contentType: "auto",
    });

    return new Promise<string>((resolve, reject) => {
      blobStream
        .on("finish", async () => {
          
          // await blob.makePublic();
          const publicUrl = `https://storage.googleapis.com/${bucketName}/${fileName}`;
          resolve(publicUrl);
        })
        .on("error", (err) => {
          console.error("Upload error:", err);
          reject(err);
        })
        .end(file.buffer);
    });

  } catch (err) {
    console.error("Error uploading file:", err);
    throw err;
  }
};

export const getSignedUrl = async (fileName: any, bucketName: any) => {

  try {

    const options: any = {
      version: "v4",
      action: "read",
      expires: Date.now() + 60 * 60 * 1000 * 24, // 1 hour expiry
    };
    
    const [url] = await storage.bucket(bucketName).file(fileName).getSignedUrl(options);
    return url
  }
  catch (err) {
    console.error("Error uploading file:", err);
    throw err;
  }
}
