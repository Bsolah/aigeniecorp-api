import mongoose, { Schema, Document as MongooseDocument, Model } from 'mongoose';

export interface IDocument extends MongooseDocument {
  url: string;
  privacy: "private" | "shared";
  uploadedBy: mongoose.Types.ObjectId;
  teamAccess: mongoose.Types.ObjectId[];
  tags: string[];
  categories: string[];
  comments: { user: mongoose.Types.ObjectId; comment: string }[];
  parent: mongoose.Types.ObjectId;
  child: mongoose.Types.ObjectId[];
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
    teamAccess: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    comments: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        comment: { type: String },
      },
    ],
    tags: [{ type: String }],
    categories: [{ type: String }],
    parent: { type: mongoose.Schema.Types.ObjectId, ref: "Document" },
    child: [{ type: mongoose.Schema.Types.ObjectId, ref: "Document" }],
  },
  { timestamps: true }
);

const Document: Model<IDocument> = mongoose.model<IDocument>('Document', documentSchema);
export default Document;
