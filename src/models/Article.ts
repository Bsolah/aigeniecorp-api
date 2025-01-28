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
  teamAccess: mongoose.Types.ObjectId[];
  tags: string[];
  categories: string[];
  comments: { user: mongoose.Types.ObjectId; comment: string }[];
  parent: mongoose.Types.ObjectId;
  child: mongoose.Types.ObjectId[];
}

export const articleSchema: Schema<IArticle> = new mongoose.Schema(
  {
    // privacy: { type: String, enum: ["private", "shared"], required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    createdBy: {
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
    parent: { type: mongoose.Schema.Types.ObjectId, ref: "Article" },
    child: [{ type: mongoose.Schema.Types.ObjectId, ref: "Article" }],
  },
  { timestamps: true }
);

const Article: Model<IArticle> = mongoose.model<IArticle>(
  "Article",
  articleSchema
);
export default Article;
