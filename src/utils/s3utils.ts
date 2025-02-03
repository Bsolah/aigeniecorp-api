import AWS from 'aws-sdk';
import {Storage} from '@google-cloud/storage';
import dotenv from 'dotenv';
dotenv.config();

const projectId = process.env.PROJECT_ID;
const keyFilename = process.env.KEY_FILENAME;
const storage = new Storage({projectId, keyFilename});
const bucketName = process.env.BUCKET_NAME as string;

const bucket = storage.bucket(bucketName);

  export const uploadFile = async (file: any) => {
    try {
      console.log("file", file);
    //   const blob = bucket.file(file.originalname);
      const fileName = file.originalname || `file-${Date.now()}`;
      const blob = bucket.file(fileName);
      const blobStream = blob.createWriteStream({
        resumable: false,
        contentType: 'auto',
      });
  
      return new Promise<string>((resolve, reject) => {
        blobStream
          .on('finish', () => {
            const publicUrl = `https://storage.googleapis.com/${bucketName}/${file.filename ?? fileName}`;
            resolve(publicUrl);
          })
          .on('error', (err) => {
            console.error('Upload error:', err);
            reject(err);
          })
          .end(file.content);
      });
    } catch (err) {
      console.error('Error uploading file:', err);
      throw err;
    }
  };