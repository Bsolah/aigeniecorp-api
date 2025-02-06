import mongoose, { Document, Schema, Model } from "mongoose";

interface IOrganization extends Document {
  name: string;
  creator: mongoose.Types.ObjectId;
}

const organizationSchema: Schema<IOrganization> = new mongoose.Schema({
  name: { type: String, required: true },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Organization: Model<IOrganization> = mongoose.model<IOrganization>(
  "Organization",
  organizationSchema
);

export default Organization;
