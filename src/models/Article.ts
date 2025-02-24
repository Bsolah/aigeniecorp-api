import mongoose, {
  Schema,
  Document as MongooseDocument,
  Model,
} from "mongoose";

export interface IArticle extends MongooseDocument {
  name: string;
  content: string;
  createdBy: mongoose.Types.ObjectId;
  organizationId: mongoose.Types.ObjectId;
  teamAccess: { user: mongoose.Types.ObjectId; role: string }[];
  tags: string[];
  categories: string[];
  comments: { user: mongoose.Types.ObjectId; comment: string }[];
  parent: mongoose.Types.ObjectId;
  access: "private" | "public";
}

export const articleSchema: Schema<IArticle> = new mongoose.Schema(
  {
    name: { type: String },
    content: { type: String },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    organizationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Organization",
      },
    teamAccess: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        role: { type: String, enum: ["admin", "editor", "viewer"] },
      },
    ],
    comments: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        comment: { type: String },
      },
    ],
    tags: [{ type: String }],
    categories: [{ type: String }],
    parent: { type: mongoose.Schema.Types.ObjectId, ref: "Folder", required: true },
    access: {
      type: String,
      enum: ["private", "public"],
      default: "private",
    },
  },
  { timestamps: true },
);

const Article: Model<IArticle> = mongoose.model<IArticle>(
  "Article",
  articleSchema,
);
export default Article;
