import mongoose, { Document, Schema, Model } from "mongoose";

export interface ILead extends Document {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  company: string;
  phoneNumber: string;
  ext: string;
}

const leadSchema: Schema<ILead> = new mongoose.Schema(
  {
    firstName: { type: String, required: false },
    lastName: { type: String, required: false }, // URL of the profile photo
    email: { type: String, required: true, unique: true },
    role: { type: String, required: false },
    company: { type: String, required: false },
    phoneNumber: { type: String, required: false },
    ext: { type: String, required: false },
  },
  { timestamps: true },
);

const Lead: Model<ILead> = mongoose.model<ILead>("Lead", leadSchema);
export default Lead;
