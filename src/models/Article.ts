import mongoose, {
  Schema,
  Document as MongooseDocument,
  Model,
} from "mongoose";

export interface IArticle extends MongooseDocument {
  title: string;
  content: string;
  //   privacy: "private" | "shared";
  createdBy: mongoose.Types.ObjectId;
  teamAccess: { user: mongoose.Types.ObjectId; role: string }[];
  tags: string[];
  categories: string[];
  comments: { user: mongoose.Types.ObjectId; comment: string }[];
  parent: mongoose.Types.ObjectId;
  child: mongoose.Types.ObjectId[];
  type: "folder" | "file";
}

export const articleSchema: Schema<IArticle> = new mongoose.Schema(
  {
    // privacy: { type: String, enum: ["private", "shared"], required: true },
    title: { type: String },
    content: { type: String },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
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
    parent: { type: mongoose.Schema.Types.ObjectId, ref: "Article" },
    child: [{ type: mongoose.Schema.Types.ObjectId, ref: "Article" }],
    type: { type: String, enum: ["folder", "file"], required: true },
  },
  { timestamps: true }
);

const Article: Model<IArticle> = mongoose.model<IArticle>(
  "Article",
  articleSchema
);
export default Article;
