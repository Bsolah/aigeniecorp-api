import mongoose, { Schema, Document as MongooseDocument, Model } from 'mongoose';

export interface IDocument extends MongooseDocument {
  url: string;
  privacy: "private" | "shared";
  uploadedBy: mongoose.Types.ObjectId;
  teamAccess: mongoose.Types.ObjectId[];

}

const documentSchema: Schema<IDocument> = new mongoose.Schema(
  {
    url: { type: String, required: true },
    privacy: { type: String, enum: ["private", "shared"], required: true },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
 
  },
  { timestamps: true }
);

const Document: Model<IDocument> = mongoose.model<IDocument>('Document', documentSchema);
export default Document;
