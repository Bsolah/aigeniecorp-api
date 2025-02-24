import mongoose, { Document, Schema, Model } from "mongoose";

export interface IFolder extends Document {
  name: string;
  createdBy: mongoose.Types.ObjectId;
  parent: mongoose.Types.ObjectId;
  child: mongoose.Types.ObjectId[];
  articles: mongoose.Types.ObjectId[];
  organizationId: mongoose.Types.ObjectId;
}

const folderSchema: Schema<IFolder> = new mongoose.Schema({
  name: { type: String },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Folder",
    default: null,
  },
  child: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Folder",
    },
  ],
  articles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Article",
    },
  ],
  organizationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Organization",
    required: true,
  },
});

const Folder: Model<IFolder> = mongoose.model<IFolder>("Folder", folderSchema);

export default Folder;
