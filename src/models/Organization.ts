import mongoose, { Document, Schema, Model } from "mongoose";

interface IOrganization extends Document {
  name: string;
  creator: mongoose.Types.ObjectId;
  location: string;
  size: string;
  industry: string;
  website: string;
  regNo: string;
}

const organizationSchema: Schema<IOrganization> = new mongoose.Schema({
  name: { type: String, required: true },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  location: { type: String },
  size: { type: String },
  industry: { type: String },
  website: { type: String },
  regNo: { type: String },
});

const Organization: Model<IOrganization> = mongoose.model<IOrganization>(
  "Organization",
  organizationSchema
);

export default Organization;
